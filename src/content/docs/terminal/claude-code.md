---
title: Claude Code — Deep Dive
description: Installation, CLAUDE.md, Hooks, Sub-Agents, MCP, CI/CD und Cross-Surface-Workflows — alles was professionelle Teams über Claude Code wissen müssen.
---

> Claude Code ist mehr als ein Chat-Interface im Terminal. Es ist ein vollständiger Coding-Agent mit Filesystem-Zugriff, Shell-Execution, git-Integration und einem offenen Ökosystem für Erweiterungen.

## Installation

**macOS / Linux / WSL (empfohlen — auto-updates):**
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Homebrew (kein auto-update):**
```bash
brew install --cask claude-code
brew upgrade claude-code   # manuell aktualisieren
```

**Windows PowerShell:**
```powershell
irm https://claude.ai/install.ps1 | iex
```

**Erster Start:**
```bash
cd dein-projekt
claude
# → Browser-Login bei claude.ai → OAuth → fertig
```

## CLAUDE.md: Das Projekt-Gedächtnis

`CLAUDE.md` wird **automatisch in jede neue Session geladen** — ohne Prompt, ohne Benutzeraktion. Es ist das einzige persistente Gedächtnis des Agents über Session-Grenzen hinweg.

```markdown
# CLAUDE.md — Mein Projekt

## Projekt
Python-Backend für Domain-Harvesting. PostgreSQL 16, FastAPI, Celery.

## Regeln (nicht verhandelbar)
1. JAIL: Nur in /app/ — kein Zugriff auf /etc/, /home/, /root/
2. KEIN SUDO. Niemals.
3. VENV: Ausschließlich /app/bin/.venv/ — kein system-pip
4. DB: db_config.py liest os.environ[] — nie Passwörter hardcoden

## Bekannte Fehler / NIE WIEDER
- pytest IMMER mit /app/bin/.venv/bin/pytest — nicht system-pytest
- db.session.commit() IMMER in try/except (deadlock-Erfahrung 2026-02-15)
- Bei git merge: IMMER manuell reviewen — nie auto-accept

## Commit-Format
feat: / fix: / docs: / refactor: / chore: (Conventional Commits)
```

**Best Practice:** CLAUDE.md ≤100 Zeilen halten. Details in `README.md` auslagern, mit Anker-Links.

Standard-Richtung: `AGENTS.md` ist die Quelle, `CLAUDE.md` ist der Symlink:
```bash
mv CLAUDE.md AGENTS.md
ln -s AGENTS.md CLAUDE.md
echo "CLAUDE.md" >> .gitignore
```

## Hooks: Determinismus durch Automatisierung

Hooks sind Shell-Befehle die **vor oder nach** jeder Claude Code Aktion ausgeführt werden — konfigurierbar in `~/.claude/settings.json` oder `CLAUDE.md`.

```json
// ~/.claude/settings.json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          { "type": "command", "command": "cd $PROJECT_ROOT && ruff check --fix $CLAUDE_TOOL_INPUT_FILE_PATH" }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "command": "echo '[HOOK] Bash: $CLAUDE_TOOL_INPUT_COMMAND'" }
        ]
      }
    ]
  }
}
```

**Typische Hook-Anwendungen:**
- Auto-Lint nach jedem File-Edit (ruff, eslint, gofmt)
- Test-Run nach Code-Änderungen
- Audit-Log aller Shell-Befehle
- Slack-Notification bei Task-Abschluss
- `.env`-Check vor Commits (verhindert Credential-Leaks)

## Sub-Agents: Parallele Task-Bearbeitung

Claude Code kann **mehrere Agenten parallel spawnen**, die unabhängig an verschiedenen Teilen eines Tasks arbeiten:

```bash
claude "Implement the new auth module:
  - Sub-agent 1: Write unit tests for all edge cases
  - Sub-agent 2: Implement the JWT validation logic
  - Sub-agent 3: Update the API documentation
  Merge results when all three are done."
```

Intern: Ein Lead-Agent koordiniert, Unteragenten arbeiten parallel, Ergebnisse werden zusammengeführt. Ideal für:
- Feature-Implementierung mit Tests (parallel)
- Multi-File-Refactoring mit unabhängigen Modulen
- Gleichzeitige Übersetzungen in mehrere Sprachen

## MCP: Model Context Protocol

MCP verbindet Claude Code mit externen Datenquellen und Services — ohne Code:

```json
// .mcp.json  (Projektebene, git-versioniert — empfohlen)
// oder: ~/.claude.json  (User-Ebene, Feld "mcpServers")
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"]
    },
    "jira": {
      "command": "npx",
      "args": ["-y", "@scope/mcp-jira"],
      "env": { "JIRA_TOKEN": "$JIRA_API_TOKEN" }
    }
  }
}
```

Nach Konfiguration kann Claude Code direkt:
- PostgreSQL-Abfragen ausführen: `"Zeig mir die 10 langsamsten Queries der letzten Stunde"`
- Jira-Tickets erstellen/lesen: `"Erstelle Bug-Report für den Auth-Fehler aus dem Log"`
- Google Drive lesen: `"Fasse das Design-Doc für Feature X zusammen"`
- Slack senden: `"Informiere #backend über das Deployment"`

## Cross-Surface Workflows

Claude Code läuft auf mehreren Oberflächen, die denselben Engine teilen:

```
Terminal (Claude Code CLI)
    ↕ claude --teleport
Web (claude.ai/code)
    ↕ Desktop App
iOS App (Claude)
```

**Typischer Workflow:**
```bash
# Langen Task im Terminal starten
claude "Refaktoriere das gesamte Auth-Modul auf JWT, schreibe Tests, erstelle PR"

# Zwischendurch ins Web wechseln (mobil weiterarbeiten)
claude --teleport   # → öffnet laufende Session im Browser, auf jedem Gerät

# Diff visuell reviewen → Desktop App
# Im ZED Claude Code Tab: Inline Diffs direkt im Editor
```

## CI/CD Integration

```yaml
# .github/workflows/ai-review.yml
name: AI Code Review
on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Install Claude Code
        run: curl -fsSL https://claude.ai/install.sh | bash

      - name: Security Review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          git diff origin/main --name-only | \
          claude -p "Review for SQL injection, XSS, hardcoded secrets.
                     Exit code 1 if critical issues found, 0 otherwise.
                     Output findings as GitHub PR comment format."
```

## Kosten-Realität

| Option | Kosten | Token-Limit | Ideal für |
|--------|--------|-------------|-----------|
| Claude Max Basic | ~$100/M | Flat Rate | Solo-Entwickler |
| Claude Max Pro | ~$200/M | Höhere Limits | Teams |
| API (Console) | Pay-per-Token | Unbegrenzt | CI/CD, Scripts |
| ZED Claude Code Tab | Im Max-Abo | Flat Rate | Interaktive Entwicklung |

**Wichtig:** Ein Claude Max Abo deckt gleichzeitig Claude Code CLI, Claude Code Web, ZED Claude Code Tab und Claude Pro ab — keine mehrfachen Abos nötig.

## Eigene TUI mit dem Postbox Pattern

Das [Postbox Pattern](/cc/postbox-pattern) macht Claude Code orchestrierbar — auch ohne GUI. Eine eigene TUI-Session-Verwaltung (wie [claude_tui.py](https://github.com/collective-context) aus unserem fb-data-Projekt) ergänzt den Terminal-Workflow um:

- Session-Browser mit Volltextsuche
- Notizen direkt in Session-Kontext
- Clipboard-Integration für Handover-Dokumente
- Projektübergreifende Navigation

Das zeigt: Claude Code ist nicht nur ein Tool — es ist ein Baustein für eigene Entwicklungs-Infrastruktur.

---

*Weiter: [Praxis-Patterns](/terminal/patterns) · [Tool-Vergleich](/terminal/tool-comparison)*

*Quelle: [Claude Code Docs](https://code.claude.com/docs/en/overview) · [GitHub](https://github.com/anthropics/claude-code)*
