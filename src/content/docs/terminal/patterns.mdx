---
title: Terminal-Patterns in der Praxis
description: Fünf bewährte Muster für Agentic Coding im Terminal — von Solo-Agent bis CI/CD-Pipeline, mit echten Befehlen aus der Praxis.
---

> Diese Patterns entstanden aus der Praxis des [who@/B2B-Projekts](https://collective-context.org) und anderen produktiven CC-Deployments. Kein Pseudocode — echte Befehle.

## Pattern 1: Solo-Agent (Feature-Entwicklung)

Der einfachste Einstieg: ein Agent, ein Feature, ein Repo.

```bash
cd mein-projekt
claude "Implementiere eine Rate-Limiting-Middleware für FastAPI.
       - Nutze Redis als Backend (Connection via REDIS_URL env var)
       - Limits: 100 req/min pro IP, 1000 req/min pro API-Key
       - Tests mit pytest + pytest-asyncio
       - CLAUDE.md Regeln gelten"
```

**Wann verwenden:**
- Neue Features in bestehender Codebase
- Bug-Fixes mit klarer Fehlerursache
- Refactoring einzelner Module
- Code-Reviews vor Merge

**Stärken des Solo-Agent-Patterns:**
- Kein Koordinationsaufwand
- CLAUDE.md als einzige Kontext-Quelle
- Volle Kontrolle über jeden Schritt

---

## Pattern 2: Dual-Agent (Scanner + Fixer)

Zwei Agents, zwei Terminals, ein Dateisystem. Der Scanner findet Probleme — der Fixer löst sie.

```bash
# Terminal 1: Gemini CLI als Scanner
gemini --prompt "
Du bist der Scanner. Deine einzige Aufgabe:
1. Scanne src/ vollständig nach Bugs, Code-Smells, deprecated APIs
2. Schreibe jeden Fund in postbox/todo.md (Format: | #ID | Beschreibung | Priorität | Gemini-Scan | Datei:Zeile |)
3. Löse NIEMALS selbst einen Task — nur scannen und dokumentieren
4. Starte sofort mit dem nächsten Scan-Durchlauf
"
```

```bash
# Terminal 2: Claude Code als Fixer
claude "
Du bist der Fixer. Deine Aufgabe:
1. Lies postbox/todo.md — wähle Task mit höchster Priorität (Fällig: sofort)
2. Trage deinen Namen in 'In Bearbeitung' ein
3. Fixe den Code, schreibe Tests wenn sinnvoll
4. Committe: fix: [Beschreibung] (#ID)
5. Trage Commit-Hash in postbox/done.md ein, entferne Task aus todo.md
6. Beginne sofort mit dem nächsten Task
"
```

**Koordination:** Nur via `postbox/todo.md` und `postbox/done.md` — kein API-Call zwischen Agenten.

Vollständige Dokumentation: [Dual-Agent Pattern](/patterns/dual-agent) · [Postbox Pattern](/cc/postbox-pattern)

---

## Pattern 3: Review-Pipeline

Pipe-basiertes Review: Code geht rein, strukturierter Bericht kommt raus.

```bash
# Security-Review aller geänderten Dateien
git diff origin/main --name-only | \
  claude -p "Review jede Datei auf OWASP Top 10.
             Format: Datei | Severity | Problem | Zeile | Fix-Vorschlag.
             Exit 1 wenn Critical gefunden."

# Dependency-Audit
pip list --outdated | \
  claude -p "Prüfe auf bekannte CVEs. Empfehle Update-Reihenfolge nach Risiko."

# SQL-Review
grep -r "cursor.execute\|raw_query\|f\"SELECT" src/ | \
  claude -p "Identifiziere potentielle SQL-Injection-Stellen. Zeige sicheres Äquivalent."

# API-Kompatibilitäts-Check vor Release
git diff v1.0..HEAD -- "*.py" | \
  claude -p "Identifiziere Breaking Changes in der Public API.
             Liste alle Methoden-Signaturen die sich geändert haben."
```

**In GitHub Actions:**
```yaml
- name: AI Security Gate
  run: |
    RESULT=$(git diff origin/main --name-only | \
      claude -p "Security review. Output: PASS oder FAIL:[reason]")
    if [[ "$RESULT" == FAIL:* ]]; then
      echo "❌ Security issues: ${RESULT#FAIL:}"
      exit 1
    fi
    echo "✅ Security review passed"
```

---

## Pattern 4: CI/CD-Agent (Vollautomatisch)

Claude Code als vollwertiger CI-Teilnehmer — ohne menschliche Interaktion.

```yaml
# .github/workflows/ai-agent.yml
name: AI Agent Tasks
on:
  issues:
    types: [labeled]   # Label "ai-fix" triggert Agent

jobs:
  fix:
    if: contains(github.event.label.name, 'ai-fix')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Claude Code Fix
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          curl -fsSL https://claude.ai/install.sh | bash
          claude -p "
            Issue #${{ github.event.issue.number }}: ${{ github.event.issue.title }}
            Body: ${{ github.event.issue.body }}

            1. Analysiere den Bug
            2. Implementiere den Fix
            3. Schreibe einen Regression-Test
            4. Erstelle einen PR mit Conventional Commit Message
          "
```

**Weitere CI-Anwendungsfälle:**
```bash
# Automatische Übersetzungen bei neuen Strings
claude -p "Übersetze alle neuen Strings in src/i18n/de.json ins Englische, Französische und Spanische. Erstelle separaten PR je Sprache."

# Release Notes generieren
git log v1.0..HEAD --oneline | claude -p "Erstelle professionelle Release Notes für v1.1. Gruppiere nach: New Features, Bug Fixes, Breaking Changes."

# Dependency Updates
claude -p "Update alle Python-Dependencies auf neueste kompatible Versionen. Führe danach pytest aus. Committe nur wenn alle Tests grün sind."
```

---

## Pattern 5: Log-Monitor (Event-getrieben)

Real-time-Monitoring mit Terminal-Agent — kein Dashboard, kein Grafana-Setup.

```bash
# Echtzeit-Anomalie-Detektion
tail -f /var/log/app.log | \
  claude -p "
  Analysiere den Log-Stream kontinuierlich.
  Alarmiere bei:
  - Error-Rate > 5 Fehler/Minute
  - Response-Time > 2000ms (3 Mal in Folge)
  - Memory > 85% (aus 'used' in Log)
  - Unbekannte Exception-Typen

  Format: 🚨 ALARM: [Typ] | [Wert] | [Zeile]
  Sonst: Stille (kein Output bei normalem Betrieb)
  "

# Strukturiertes Log-Parsing für Incidents
cat /var/log/app.log | \
  claude -p "
  Finde alle Fehler-Cluster im Log.
  Gruppiere nach Root-Cause.
  Zeige Timeline: wann begann das Problem, was hat es ausgelöst?
  Output als Incident-Report Markdown.
  " > incident-report-$(date +%Y%m%d).md

# Datenbank-Query-Analyse
tail -n 10000 /var/log/postgresql.log | \
  claude -p "Identifiziere die 5 teuersten Queries.
             Erkläre warum sie langsam sind.
             Schlage Index-Optimierungen vor."
```

---

## Pattern 6: Multi-Repo-Koordination

Eine Claude Code Instanz, mehrere Repositories — koordiniert via Postbox:

```bash
# fb-data Agent schreibt Docs für github.io
cd fb-data-projekt
claude "
Schreibe die Dokumentation für das neue Multi-Repo Pattern.
Speichere unter: /pfad/zu/github.io/src/content/docs/patterns/multi-repo.md
Füge anschließend einen Task in /pfad/zu/github.io/postbox/todo.md ein:
'| #015 | patterns/multi-repo.md committen und pushen | Hoch | sofort | fb-data-Claude | — |'
Committe danach in fb-data (nicht in github.io).
"

# github.io Agent committed + pusht
cd github.io-projekt
claude "Lies postbox/todo.md. Bearbeite alle Tasks mit Fällig: sofort."
```

Dokumentiert als Pattern: [Multi-Repo Coordination](/patterns/multi-repo)

---

## Anti-Patterns: Was vermeiden?

**Agent löst eigene Scanner-Tasks**
```bash
# ❌ Falsch: Scanner und Fixer in einem Prompt
claude "Scanne src/ auf Bugs UND fixe sie sofort"

# ✓ Richtig: Trennung via todo.md + zwei Agenten
```

**Kein Commit-Hash in done.md**
```bash
# ❌ Nutzlos für Debugging
| #001 | Login-Fix | Claude | — | 2026-02-28 |

# ✓ Vollständig
| #001 | Login-Fix | Claude Sonnet 4.6 | abc1234 | 2026-02-28 |
```

**Tasks ohne Kontext in todo.md**
```bash
# ❌ Zu vage für den Fixer
| #002 | Fix auth | Hoch | sofort | Scan | auth.py |

# ✓ Actionable
| #002 | auth.py:89 login() — fehlende Fehlerbehandlung bei DB-Timeout, wirft unhandled Exception | Hoch | sofort | Gemini-Scan | auth.py:89 |
```

**Zu viele Tasks gleichzeitig**
```bash
# ❌ Gemini schreibt 50 Einträge → Claude kommt nicht nach
# ✓ SysOps reviewed todo.md, setzt Prioritäten, löscht False Positives → dann Fixer loslassen
```

---

*Zurück: [Claude Code Deep-Dive](/terminal/claude-code) · [Dual-Agent Pattern](/patterns/dual-agent) · [Postbox Pattern](/cc/postbox-pattern)*
