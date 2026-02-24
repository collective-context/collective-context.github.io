---
title: "3. Das Agent Panel"
description: Das Agent Panel ist das mächtigste KI-Interface in ZED — so nutzt du es richtig.
---

# Das Agent Panel

## Starten

```
Ctrl+Shift+P → "agent: new thread"
# oder
Klick auf ✨ in der Status Bar
```

## Modell auswählen

Im `+` Button oben rechts kannst du wählen:
- **Zed's first-party agent** (Standard) — nutzt Zed Pro oder eigene API Keys
- **Externe Agenten** — Claude Code Tab, Gemini CLI (falls konfiguriert)

Das Modell wechselst du per `Ctrl+Alt+/` oder über den Model Selector im Eingabefeld.

## Was der Agent kann

Der Agent hat Zugriff auf **Built-in Tools:**
- `read_file` / `write_file` — Dateien lesen und schreiben
- `run_terminal_command` — Shell-Befehle ausführen (git, gh, npm, etc.)
- `search_files` — Dateien im Projekt finden
- `diagnostics` — Compiler-Fehler und Linter-Warnungen

Zusätzlich können **MCP-Server** weitere Tools hinzufügen.

## Thread History

Die letzten 6 Threads erscheinen im Dropdown-Menü oben rechts.
Alle Threads: `Ctrl+Shift+H` (im Panel fokussiert)

:::caution[Wichtig für externe Agenten]
Für Claude Code Tab und Gemini CLI (External Agents via ACP) wird die Thread-History
aktuell **nicht** von ZED wiederhergestellt. Das ist eine bekannte Einschränkung, die
laut Zed-Docs in Zukunft behoben werden soll.
:::

## Checkpoints

Bei jeder KI-Änderung erscheint ein "Restore Checkpoint" Button. Damit kannst du
den Zustand deines Projekts auf den Zeitpunkt vor dieser Aktion zurücksetzen.

→ Weiter: [Text Threads — wofür sie da sind](/books/zed-editor/04-text-threads/)
