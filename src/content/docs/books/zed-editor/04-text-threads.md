---
title: "4. Text Threads"
description: Text Threads sind für Gespräche — nicht für agentic work. Der Unterschied ist wichtig.
---

# Text Threads

## Was sie sind

Text Threads sind ZEDs originales KI-Interface — entstanden bevor der Agent Panel existierte.
Sie sind **editor-like**: du öffnest einen Buffer, schreibst deine Nachricht, die KI antwortet.
Das ist kein Bug, das ist Design.

## Die Monospace-Schrift

Wenn du Text Threads öffnest und die Schrift im Eingabefeld plötzlich Monospace ist —
das ist normal. Text Threads verhalten sich wie ein Code-Buffer. Editor-Keybindings,
multiple Cursors, alles funktioniert. Das ist ein Feature, kein Fehler.

## Wofür sie gedacht sind

- Schnelle Fragen ohne Dateikontext
- Code-Vorschläge basierend auf Code, den du manuell hineinkopierst
- Gespräche mit verschiedenen Modellen (Grok, GPT, Gemini, Claude)
- Leichtgewichtige Interaktionen ohne agentic overhead

## Wofür sie NICHT gedacht sind

- Dateien lesen oder schreiben
- git/gh Befehle ausführen
- MCP-Server nutzen
- Projektstruktur analysieren

## Storage

Jeder Text Thread wird als einzelne JSON-Datei gespeichert:
```
~/.local/share/zed/conversations/
└── "Thread-Titel - 1.zed.json"
```

Das Format ist `zed: context, version: 0.4.0` — komplett anders als Agent Threads.

→ Weiter: [Externe Agenten (Claude Code Tab)](/books/zed-editor/05-externe-agenten/)
