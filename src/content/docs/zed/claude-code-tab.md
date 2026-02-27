---
title: Claude Code Tab Setup
description: Der ZED Claude Code Tab — Referenz-Implementierung von ACP mit Claude Max Flat Rate
---

## Was ist der Claude Code Tab?

Der **ZED Claude Code Tab** ist Claude Code CLI (Anthropic), eingebettet in ZED über einen ACP-Adapter von Zed Industries. Er läuft als eigenständiger Prozess auf der lokalen Workstation — ZED stellt nur die UI.

**Kernmerkmal:** Claude Max Abo (Flat Rate) — kein Token-Pricing. Unbegrenzte Nutzung im Rahmen des Abos.

## Installation

```bash
# In ZED:
# 1. Agent Panel öffnen
Ctrl+?

# 2. Neuen Agenten hinzufügen
+ → Claude Agent (aus ACP Registry auswählen)

# ZED installiert automatisch:
# @zed-industries/claude-agent-acp

# 3. Authentifizieren
/login
→ "Log in with Claude.ai" anklicken
→ OAuth im Browser abschließen (Claude Max Abo erforderlich)
```

## Features im Detail

| Feature | Claude Code Web | ZED Claude Code Tab |
|---|---|---|
| Modell | Sonnet 4.6 (Max) | Sonnet 4.6 (Max) |
| Kosten | Flat Rate | Flat Rate |
| Filesystem-Zugriff | Nein (copy-paste) | Ja (direkt) |
| Inline Diffs | Im Browser | Im Editor |
| @file Kontext | Nein | Ja (@Dateiname) |
| Playwright lokal | Nein | Ja |
| Ollama (indirekt) | Nein | Ja via Script |
| Session History (ZED UI) | Ja (Sidebar) | Nein — nicht in ZED integriert |
| Session History (Filesystem) | Nein | Ja — `~/.claude/projects/` |
| CLAUDE.md auto-load | Ja | Ja |

## Permission-Konfiguration

In ZED `settings.json` (`Ctrl+,` → JSON):

```json
{
  "agent_servers": {
    "claude": {
      "env": {
        "ACP_PERMISSION_MODE": "acceptEdits"
      }
    }
  }
}
```

| Mode | Verhalten | Empfehlung |
|---|---|---|
| `default` | Fragt bei jeder Aktion nach | Sensible Repos |
| `acceptEdits` | Akzeptiert Datei-Edits automatisch | Standard-Workflow |
| `bypassPermissions` | Vollständig autonom | Nur in Sandboxes |

Mid-session per Prompt-Marker wechseln:
- `[ACP:PERMISSION:ACCEPT_EDITS]`
- `[ACP:PERMISSION:BYPASS]`
- `[ACP:PERMISSION:DEFAULT]`

## @file Kontext

Im ZED Claude Code Tab können Dateien explizit in den Kontext gezogen werden:

```
@src/main.py Warum schlägt der Test fehl?
@CLAUDE.md Bin ich mit dem Projekt-Setup vertraut?
@postbox/todo.md Was ist der nächste offene Task?
```

Mehrere Dateien in einer Nachricht möglich.

## Lokale Script-Ausführung und Ollama

**Technische Besonderheit:** Wenn der Claude Code Tab einen Bash-Befehl ausführt (z.B. `python crawl.py`) und dieses Script intern Ollama aufruft, läuft Ollama dabei lokal — ZED orchestriert nur die Ausführung. Das ermöglicht indirekte lokale LLM-Ausführung über die Agentic Shell.

Beispiel-Workflow:

```bash
# Script das lokal Ollama nutzt:
# analyse.py
import ollama
result = ollama.chat(model='qwen3:14b', messages=[...])
```

```
# Im Claude Code Tab:
"Führe analyse.py aus und erkläre mir die Ergebnisse"
```

Claude Code Tab führt das Script aus, Ollama läuft lokal, Claude interpretiert die Ausgabe.

## CLAUDE.md Auto-Load

CLAUDE.md wird automatisch beim Start jeder neuen Session geladen — kein Upload, kein Copy-Paste erforderlich. Das ist das Kernmechanismus für [Collective Context](/cc/concept).

## Session History: Filesystem statt UI

Während ZED keine Session History für externe Agenten in der Sidebar anzeigt,
speichert **Claude Code CLI jede Session vollständig** unter:

```
~/.claude/projects/<projekt-slug>/
├── <uuid>.jsonl          ← kompletter Session-Transcript
├── <uuid>/
│   └── subagents/        ← Sub-Agenten-Transcripts
└── memory/
    ├── MEMORY.md         ← persistentes Agenten-Gedächtnis (auto-geladen)
    ├── titles.json       ← Custom-Titel für Sessions
    └── <uuid>.md         ← Session-spezifische Notizen
```

Jede `.jsonl`-Datei enthält den vollständigen Verlauf: Human-Turns, Assistant-Antworten,
alle Tool-Calls mit Ein- und Ausgabe, Timestamps, Sub-Agenten.

Das `memory/`-Verzeichnis ermöglicht **persistenten Kontext über Sessions hinweg** —
`MEMORY.md` wird beim nächsten Start automatisch in den Kontext geladen.

Tools für die Session-Verwaltung:
- **`claude_tui.py`** — mutt-artiger Terminal-Browser: Threads lesen, umbenennen, annotieren
- **`claude_memory.py`** — CLI: list, threads, read, backup, delete

## Bekannte Limitierungen

- Kein Context-Window-Indicator im Panel (GitHub Discussion #49472, Feb 2026)
- `/compact` noch nicht als Slash-Command verfügbar
  - Workaround: "Schreibe ein Handover-Dokument für die nächste Session"
- Session History nicht in ZED's UI integriert (aber vollständig via Filesystem zugänglich, s.o.)
- Agent Teams (mehrere Claude-Instanzen pro Session) noch nicht unterstützt

## Nächste Schritte

- [Gemini CLI hinzufügen](/zed/gemini-cli) — für den Dual-Agent Workflow
- [CLAUDE.md Guide](/cc/claude-md) — den Shared Context optimal nutzen
- [Dual-Agent Pattern](/patterns/dual-agent) — Gemini CLI + Claude Code Tab koordinieren
