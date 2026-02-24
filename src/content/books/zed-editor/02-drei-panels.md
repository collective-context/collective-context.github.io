---
title: "2. Die drei Panels"
description: Warum gibt es in ZED drei verschiedene KI-Systeme mit unzähligen LLMs und was ist der Unterschied?
---

# Die drei Panels

Das Herzstück dieses Buches. Wer das versteht, versteht ZED.

## Übersicht

| Panel | Geöffnet mit | Kann Dateien lesen? | Kann Terminal nutzen? | Speichert in |
|---|---|---|---|---|
| **Text Threads** | `Ctrl+Shift+H` | ❌ Nein | ❌ Nein | `conversations/*.zed.json` |
| **Agent Panel** | `Ctrl+Shift+P` → `agent: new thread` | ✅ Ja | ✅ Ja | `threads/threads.db` |
| **Claude Code Tab** | Über External Agents (ACP) | ✅ Ja | ✅ Ja | `threads/threads.db` |

## Text Threads — Nur Gespräche

**Text Threads sind das erste** KI-Interface von ZED (vor Mai 2025).
Sie funktionieren wie ein Chat-Fenster im Editor: du tippst, die KI antwortet.

**Was sie können:** Fragen beantworten, Code vorschlagen, Texte schreiben
**Was sie NICHT können:** Dateien lesen, Befehle ausführen, aktiv im Projekt arbeiten
**Erkennungsmerkmal:** Monospace-Schrift im Eingabebereich, "Recent Text Threads" im Dropdown

:::caution[Häufige Verwechslung]
Wenn du im Text Thread bist und fragst "Kannst du meine Datei lesen?" — antwortet die KI
trotzdem hilfreich. Aber es kann gut sein, dass sie lügt: sie *glaubt*, dass sie helfen kann.
Tatsächlich hat sie keinen Zugriff auf dein Dateisystem.
:::

## Agent Panel — Die KI arbeitet für dich im Haupt-Interface

**Das Agent Panel wurde im Mai 2025** eingeführt und ist das aktuelle Haupt-Interface für
agentic workflows. Hier kann die KI:

- Dateien lesen und schreiben
- Terminal-Befehle ausführen
- git- und gh-Befehle nutzen
- MCP-Server verwenden
- Checkpoints erstellen (Änderungen rückgängig machen)

**Öffnen:** `Ctrl+Shift+P` → `agent: new thread`
**Oder:** Klick auf das ✨ Sparkles-Icon in der Status Bar

## Claude Code Tab — Externer Agent

**Das CLI Tool Claude Code von Anthropic**, kann über das **Agent Client Protocol (ACP)**
in ZED integriert werden. Es läuft als eigener Prozess und kommuniziert mit ZED.

**Vorteil:** Claude Code nutzt dein Claude-Konto direkt im Claude Abo (flat - ohne Gebühr für API-Key)
**Besonderheit:** Die Thread-History wird unabhängig vom Agent Panel mitgeführt.

→ Weiter: [Das Agent Panel im Detail](/books/zed-editor/03-agent-panel/)
