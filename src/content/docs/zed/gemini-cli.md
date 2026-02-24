---
title: Gemini CLI Setup
description: Gemini CLI als ACP External Agent für parallele Scan-Tasks
---

## Was ist Gemini CLI im ZED-Kontext?

Gemini CLI ist Google's offizielles Command-Line-Tool für Gemini-Modelle. Als ACP External Agent in ZED fungiert es als zweiter Agent für **parallele Scan-Tasks** — der ideale Partner für den [Dual-Agent Workflow](/patterns/dual-agent).

## Rolle in Collective Context

Gemini CLI übernimmt in der typischen CC-Konfiguration die **Scanner-Rolle**:

```
Gemini CLI (Scanner)          Claude Code Tab (Fixer)
─────────────────────         ─────────────────────────
Scannt Codebase               Monitort postbox/todo.md
Sucht Probleme/Muster         Implementiert Lösungen
Schreibt in todo.md           Committed und räumt auf
"Never stop scanning."        "Never stop fixing."
```

Durch diese Aufgabenteilung arbeiten beide Agenten unabhängig, koordinieren sich aber über das gemeinsame Dateisystem.

## Installation in ZED

```bash
# In ZED:
Ctrl+? → Agent Panel öffnen
+ → Gemini CLI (aus ACP Registry)
→ ZED installiert den ACP-Adapter automatisch
/login → Google OAuth
```

## Stärken von Gemini CLI

- **Großes Context Window**: Ideal für vollständige Codebase-Scans
- **Gemini 2.5 Pro**: Starkes Reasoning für Code-Analyse
- **Batch-Verarbeitung**: Kann viele Dateien in einem Durchlauf analysieren
- **AGENTS.md-kompatibel**: Liest automatisch AGENTS.md als Shared Context

## AGENTS.md als Shared Context

Gemini CLI liest standardmäßig `AGENTS.md` (analog zu CLAUDE.md für Claude). Das ermöglicht denselben Shared-Context-Mechanismus:

```
projekt/
├── CLAUDE.md    ← für Claude Code Tab
├── AGENTS.md    ← für Gemini CLI, Codex, OpenCode
└── postbox/
    ├── todo.md
    └── done.md
```

Empfehlung: Beide Dateien mit identischem Kerninhalt pflegen, oder AGENTS.md als Symlink auf CLAUDE.md.

## Typischer Scanner-Prompt

```
Du bist der Scanner-Agent. Deine Aufgaben:
1. Scanne src/ auf [Fehler/Code-Smells/TODO-Kommentare]
2. Schreibe jeden Fund als Task in postbox/todo.md
3. Format: | #ID | Beschreibung | Priorität | Datei:Zeile |
4. Starte sofort mit dem nächsten Scan nach dem Schreiben.
Wichtig: Löse keine Tasks. Nur scannen und dokumentieren.
```

## Nächste Schritte

- [Dual-Agent Pattern einrichten](/patterns/dual-agent)
- [Postbox Pattern verstehen](/cc/postbox-pattern)
- [AGENTS.md Guide](/cc/agents-md)
