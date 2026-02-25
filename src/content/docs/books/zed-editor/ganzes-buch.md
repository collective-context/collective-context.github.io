---
title: "ZED Editor — Verstehen statt Raten (Ganzes Buch)"
description: Alle 7 Kapitel in einem Dokument — der komplette Leitfaden zur KI-Architektur des ZED Editors.
---

> *"Wir haben unnötigerweise in SQLite-Datenbanken herumgebastelt, bevor wir ins Handbuch geschaut haben.
> Dieses Buch soll dafür sorgen, dass dir das nicht passiert."*

---

## Kapitel 1 — Was ist ZED?

ZED ist ein Code-Editor, der von Grund auf für Geschwindigkeit und KI-Integration entwickelt wurde.
Er ist in Rust geschrieben, Open Source, und für Linux, Mac und Windows verfügbar.

### Das Wichtigste zuerst

ZED ist **kein** KI-Chatbot. ZED ist ein **Editor mit eingebetteter KI** — und das ist ein
entscheidender Unterschied. Die KI in ZED hat direkten Zugriff auf deine Dateien, dein Terminal
und deinen Code. Aber: **nur wenn du es erlaubst und nicht in jedem Modus.**

### Was ZED kann

- Code schreiben, editieren, refactoren (klassischer Editor)
- KI-Gespräche führen (Text Threads)
- KI-Agenten ausführen lassen, die aktiv in deinem Projekt arbeiten (Agent Panel)
- Externe KI-Tools wie Claude Code oder Gemini CLI einbinden (External Agents via ACP)

### Die zentrale Frage

Bevor du ZED benutzt, musst du dir eine Frage stellen:

> **"Will ich mit der KI reden — oder soll die KI für mich arbeiten?"**

Das ist kein philosophischer Unterschied. Das ist ein technischer. Und er bestimmt,
welches der drei KI-Systeme du öffnen musst und wie du sie orchestrieren kannst.

---

## Kapitel 2 — Die drei Panels

Das Herzstück dieses Buches. Wer das versteht, versteht ZED.

### Übersicht

| Panel | Geöffnet mit | Kann Dateien lesen? | Kann Terminal nutzen? | Speichert in |
|---|---|---|---|---|
| **Text Threads** | `Ctrl+Shift+H` | ❌ Nein | ❌ Nein | `conversations/*.zed.json` |
| **Agent Panel** | `Ctrl+Shift+P` → `agent: new thread` | ✅ Ja | ✅ Ja | `threads/threads.db` |
| **Claude Code Tab** | Über External Agents (ACP) | ✅ Ja | ✅ Ja | `threads/threads.db` |

### Text Threads — Nur Gespräche

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

### Agent Panel — Die KI arbeitet für dich im Haupt-Interface

**Das Agent Panel wurde im Mai 2025** eingeführt und ist das aktuelle Haupt-Interface für
agentic workflows. Hier kann die KI:

- Dateien lesen und schreiben
- Terminal-Befehle ausführen
- git- und gh-Befehle nutzen
- MCP-Server verwenden
- Checkpoints erstellen (Änderungen rückgängig machen)

**Öffnen:** `Ctrl+Shift+P` → `agent: new thread`
**Oder:** Klick auf das ✨ Sparkles-Icon in der Status Bar

### Claude Code Tab — Externer Agent

**Das CLI Tool Claude Code von Anthropic**, kann über das **Agent Client Protocol (ACP)**
in ZED integriert werden. Es läuft als eigener Prozess und kommuniziert mit ZED.

**Vorteil:** Claude Code nutzt dein Claude-Konto direkt im Claude Abo (flat - ohne Gebühr für API-Key)
**Besonderheit:** Die Thread-History wird unabhängig vom Agent Panel mitgeführt.

---

## Kapitel 3 — Das Agent Panel

### Starten

```
Ctrl+Shift+P → "agent: new thread"
# oder
Klick auf ✨ in der Status Bar
```

### Modell auswählen

Im `+` Button oben rechts kannst du wählen:
- **Zed's first-party agent** (Standard) — nutzt Zed Pro oder eigene API Keys
- **Externe Agenten** — Claude Code Tab, Gemini CLI (falls konfiguriert)

Das Modell wechselst du per `Ctrl+Alt+/` oder über den Model Selector im Eingabefeld.

### Was der Agent kann

Der Agent hat Zugriff auf **Built-in Tools:**
- `read_file` / `write_file` — Dateien lesen und schreiben
- `run_terminal_command` — Shell-Befehle ausführen (git, gh, npm, etc.)
- `search_files` — Dateien im Projekt finden
- `diagnostics` — Compiler-Fehler und Linter-Warnungen

Zusätzlich können **MCP-Server** weitere Tools hinzufügen.

### Thread History

Die letzten 6 Threads erscheinen im Dropdown-Menü oben rechts.
Alle Threads: `Ctrl+Shift+H` (im Panel fokussiert)

:::caution[Wichtig für externe Agenten]
Für Claude Code Tab und Gemini CLI (External Agents via ACP) wird die Thread-History
aktuell **nicht** von ZED wiederhergestellt. Das ist eine bekannte Einschränkung, die
laut Zed-Docs in Zukunft behoben werden soll.
:::

### Checkpoints

Bei jeder KI-Änderung erscheint ein "Restore Checkpoint" Button. Damit kannst du
den Zustand deines Projekts auf den Zeitpunkt vor dieser Aktion zurücksetzen.

---

## Kapitel 4 — Text Threads

### Was sie sind

Text Threads sind ZEDs originales KI-Interface — entstanden bevor der Agent Panel existierte.
Sie sind **editor-like**: du öffnest einen Buffer, schreibst deine Nachricht, die KI antwortet.
Das ist kein Bug, das ist Design.

### Die Monospace-Schrift

Wenn du Text Threads öffnest und die Schrift im Eingabefeld plötzlich Monospace ist —
das ist normal. Text Threads verhalten sich wie ein Code-Buffer. Editor-Keybindings,
multiple Cursors, alles funktioniert. Das ist ein Feature, kein Fehler.

### Wofür sie gedacht sind

- Schnelle Fragen ohne Dateikontext
- Code-Vorschläge basierend auf Code, den du manuell hineinkopierst
- Gespräche mit verschiedenen Modellen (Grok, GPT, Gemini, Claude)
- Leichtgewichtige Interaktionen ohne agentic overhead

### Wofür sie NICHT gedacht sind

- Dateien lesen oder schreiben
- git/gh Befehle ausführen
- MCP-Server nutzen
- Projektstruktur analysieren

### Storage

Jeder Text Thread wird als einzelne JSON-Datei gespeichert:
```
~/.local/share/zed/conversations/
└── "Thread-Titel - 1.zed.json"
```

Das Format ist `zed: context, version: 0.4.0` — komplett anders als Agent Threads.

---

## Kapitel 5 — Externe Agenten

### Was ist ACP?

Das **Agent Client Protocol (ACP)** ist ZEDs Interface für externe KI-Tools.
Es ermöglicht, dass CLI-basierte Agenten wie Claude Code oder Gemini CLI innerhalb
von ZED laufen — als wären sie ein eingebettetes System.

### Konfigurierte Agenten anzeigen

Settings → External Agents (`Ctrl+,` → "External Agents")

Typische Konfiguration:
- Claude Agent ✓
- Codex CLI ✓
- Gemini CLI ✓

### Claude Code Tab

Claude Code (Version 2.x) läuft als eigener Terminal-Prozess in einem ZED-Tab.
Es nutzt dein **Anthropic-Konto via OAuth — keine separaten API-Key Kosten entstehen.**

**Starten:** Im Agent Panel `+` → "Claude Agent" → "/login" → "rechts auf Login Claude" klicken.

:::note[Native Installer]
Ab Claude Code 2.x wurde von npm auf einen nativen Installer umgestellt.
Falls du eine Warnung siehst: `claude install` ausführen.
:::

### Bekannte Einschränkungen (Stand ZED 0.224.11)

Laut offizieller ZED-Dokumentation sind folgende Features für externe Agenten
**noch nicht implementiert:**

- Thread History wiederherstellen
- Checkpoints
- Token Usage Anzeige (unnötig im Abo-Betrieb)
- Model Selection innerhalb von ZED

Das ist kein Bug — das steht explizit in der Doku mit dem Hinweis "should be supported in the future".

---

## Kapitel 6 — Storage-Architektur

### Überblick

ZED verwendet mehrere Datenbanken und Dateiformate, je nach System:

| Was | Pfad | Format |
|---|---|---|
| Text Threads | `~/.local/share/zed/conversations/*.zed.json` | JSON, unkomprimiert |
| Agent Threads | `~/.local/share/zed/threads/threads.db` | SQLite + zstd-Komprimierung |
| UI-State, History-Index | `~/.local/share/zed/db/0-stable/db.sqlite` | SQLite, kv_store Tabelle |
| Globale Settings | `~/.local/share/zed/db/0-global/db.sqlite` | SQLite |
| Prompts Library | `~/.local/share/zed/prompts/prompts-library-db.0.mdb` | LMDB |

### Der kv_store

In `db/0-stable/db.sqlite` gibt es eine `kv_store` Tabelle.
Darin speichert ZED u.a.:

- `recent-agent-threads` — Liste der letzten Agent Thread UUIDs (global)
- `recent-agent-threads-{workspace_id}` — workspace-spezifische Liste
- `agent_panel` — letzter Panel-Zustand

Das Format der Thread-Referenzen ist `[{"AcpThread": "uuid"}, ...]`.

### WAL-Dateien

ZED nutzt SQLite im WAL-Modus (Write-Ahead Logging). Solange ZED läuft,
können Änderungen in der `-wal` Datei stehen, nicht in der Hauptdatei.
Nach dem Beenden von ZED wird der WAL automatisch committed.

### Backup-Empfehlung

```bash
# Einmalig: Backup-Verzeichnis anlegen
rsync -av ~/.local/share/zed/threads/ ~/backup/zed-threads/
rsync -av ~/.local/share/zed/conversations/ ~/backup/zed-conversations/
```

---

## Kapitel 7 — Die wichtigste Lektion

### Was passiert ist

An einem Abend verschwand die Thread-History in ZED.
Die Reaktion: SQLite-Datenbanken öffnen, kv_store-Einträge manuell editieren,
WAL-Dateien committen, Binary-Strings durchsuchen, Hypothesen testen.

Stunden später. Kein Ergebnis.

**Die Lösung:** Die offizielle ZED-Dokumentation aufrufen.
**Zeitaufwand:** 5 Minuten.
**Erkenntnis:** External Agents wie Claude Code Tab unterstützen Thread History Restore schlicht noch nicht.

### Was wir gelernt haben

**Über ZED:**
- Es gibt drei völlig verschiedene KI-Systeme (Text Thread, Agent Panel, External Agents)
- Thread History für externe Agenten ist eine bekannte, dokumentierte Einschränkung
- "Delete All History" löscht nur den Index, nicht die Daten

**Über professionelles Arbeiten:**
- Bei tool-spezifischen Problemen: **erst Docs, dann Debugging**
- Wenn ein Verhalten sich plötzlich ändert: Fast immer Architektur oder Konfiguration
- Datenbank-Manipulation ohne Verständnis des Schemas führt zu Zeitverlust, nicht zu Lösungen

### Die Regel

> **Docs first. Debug second.**

Das gilt für ZED. Das gilt für jedes Tool.
Das ist keine Selbstverständlichkeit — es muss bewusst praktiziert werden.

---

*Dieses Buch wurde aus einer echten Session geboren, in der wir gemeinsam auf die harte Tour gelernt haben.
Danke für die Ehrlichkeit, die es brauchte, daraus ein Buch zu machen.*
