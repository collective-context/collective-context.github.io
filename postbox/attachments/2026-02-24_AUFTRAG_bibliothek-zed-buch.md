# Claude Code Auftrag: Bibliothek & Buch "Der ZED Editor — Verstehen statt Raten"

## Kontext

Du arbeitest auf der lokalen Workstation im Verzeichnis:
```
github.io/
```

Die Website läuft auf **Astro + Starlight**, deployed via GitHub Actions auf:
- **Live:** https://collective-context.org
- **Repo:** https://github.com/collective-context/collective-context.github.io

Content liegt in: `src/content/` als `.md` oder `.mdx` Dateien.
Navigation wird konfiguriert in: `astro.config.mjs` → `sidebar` Array.

---

## Deine Aufgabe

### 1. Neue Bibliotheks-Sektion anlegen

Erstelle die Verzeichnisstruktur für eine Bibliothek:

```
src/content/books/
├── index.md                        ← Bibliotheks-Übersicht
└── zed-editor/
    ├── index.md                    ← Buchübersicht / Inhaltsverzeichnis
    ├── 01-was-ist-zed.md
    ├── 02-drei-panels.md
    ├── 03-agent-panel.md
    ├── 04-text-threads.md
    ├── 05-externe-agenten.md
    ├── 06-storage-architektur.md
    └── 07-die-wichtigste-lektion.md
```

### 2. Navigation in `astro.config.mjs` erweitern

Füge zur bestehenden `sidebar` folgende neue Gruppe hinzu (nicht ersetzen, hinzufügen):

```javascript
{
  label: '📚 Bibliothek',
  items: [
    { label: 'Alle Bücher', link: '/books/' },
    {
      label: 'Der ZED Editor',
      collapsed: true,
      items: [
        { label: 'Inhaltsverzeichnis', link: '/books/zed-editor/' },
        { label: '1. Was ist ZED?', link: '/books/zed-editor/01-was-ist-zed/' },
        { label: '2. Die drei Panels', link: '/books/zed-editor/02-drei-panels/' },
        { label: '3. Agent Panel', link: '/books/zed-editor/03-agent-panel/' },
        { label: '4. Text Threads', link: '/books/zed-editor/04-text-threads/' },
        { label: '5. Externe Agenten', link: '/books/zed-editor/05-externe-agenten/' },
        { label: '6. Storage-Architektur', link: '/books/zed-editor/06-storage-architektur/' },
        { label: '7. Die wichtigste Lektion', link: '/books/zed-editor/07-die-wichtigste-lektion/' },
      ],
    },
  ],
},
```

### 3. Inhalte der Dateien

---

#### `src/content/books/index.md`

```markdown
---
title: Bibliothek
description: Bücher und Guides aus der Praxis — geschrieben von echten Anwendern für echte Anwender.
---

# Bibliothek

Diese Bibliothek enthält Bücher, die aus echter Arbeit entstanden sind.
Kein Marketing. Keine Theorie. Nur das, was wir selbst gelernt haben — oft auf die harte Tour.

## Verfügbare Bücher

### [Der ZED Editor — Verstehen statt Raten](/books/zed-editor/)
**Für:** Einsteiger und Fortgeschrittene, die ZED als KI-Arbeitsumgebung nutzen.
**Entstanden aus:** Einer Arbeit, die mit einem Blick ins Handbuch überflüssig gewesen wäre.
**Kernbotschaft:** ZED hat drei grundlegend verschiedene KI-Systeme. Wer das nicht weiß, rätselt stundenlang.
```

---

#### `src/content/books/zed-editor/index.md`

```markdown
---
title: "ZED Editor — Verstehen"
description: Ein praktischer Leitfaden zur KI-Architektur des ZED Editors. Entstanden aus praktischer Anwendung.
---

# ZED Editor — Verstehen

> *"Wir haben unnötigerweise in SQLite-Datenbanken herumgebastelt, bevor wir ins Handbuch geschaut haben.  
> Dieses Buch soll dafür sorgen, dass dir das nicht passiert."*

## Warum dieses Buch?

ZED ist ein moderner Code-Editor mit tief integrierter KI. Das klingt einfach — ist es aber nicht,
wenn man nicht versteht, dass ZED **drei völlig verschiedene KI-Systeme** hat, die unterschiedlich
funktionieren, unterschiedlich speichern und unterschiedliche Fähigkeiten haben.

Wer das nicht weiß, erlebt Folgendes:
- Die KI kann plötzlich keine Threads mehr lesen, obwohl sie es gestern noch konnte
- Die Schrift im Eingabefeld ist plötzlich Monospace
- Die Thread-History ist "verschwunden"
- git-Befehle können von der KI nicht mehr angestoßen werden

All das hat eine simple Erklärung — aber nur wenn man die Architektur kennt.

## Inhaltsverzeichnis

1. [Was ist ZED?](/books/zed-editor/01-was-ist-zed/) — Editor, KI-Plattform oder beides?
2. [Die drei Panels](/books/zed-editor/02-drei-panels/) — Text Thread, Agent Panel, Claude Code Tab
3. [Das Agent Panel](/books/zed-editor/03-agent-panel/) — Werkzeuge, Dateizugriff, Terminal
4. [Text Threads](/books/zed-editor/04-text-threads/) — Wofür sie gedacht sind (und wofür nicht)
5. [Externe Agenten](/books/zed-editor/05-externe-agenten/) — Claude Code, Gemini CLI via ACP
6. [Storage-Architektur](/books/zed-editor/06-storage-architektur/) — Wo ZED was speichert
7. [Die wichtigste Lektion](/books/zed-editor/07-die-wichtigste-lektion/) — Docs first, debug second

## Versions-Info

- Getestet mit: **ZED 0.224.11**
- Betriebssystem: Debian Linux
- Stand: Februar 2026
```

---

#### `src/content/books/zed-editor/01-was-ist-zed.md`

```markdown
---
title: "1. Was ist ZED?"
description: ZED ist mehr als ein Editor — aber man muss verstehen, was genau.
---

# Was ist ZED?

ZED ist ein Code-Editor, der von Grund auf für Geschwindigkeit und KI-Integration entwickelt wurde.
Er ist in Rust geschrieben, Open Source, und für Linux, Mac und Windows verfügbar.

## Das Wichtigste zuerst

ZED ist **kein** KI-Chatbot. ZED ist ein **Editor mit eingebetteter KI** — und das ist ein
entscheidender Unterschied. Die KI in ZED hat direkten Zugriff auf deine Dateien, dein Terminal
und deinen Code. Aber: **nur wenn du es erlaubst und nicht in jedem Modus.**

## Was ZED kann

- Code schreiben, editieren, refactoren (klassischer Editor)
- KI-Gespräche führen (Text Threads)
- KI-Agenten ausführen lassen, die aktiv in deinem Projekt arbeiten (Agent Panel)
- Externe KI-Tools wie Claude Code oder Gemini CLI einbinden (External Agents via ACP)

## Die zentrale Frage

Bevor du ZED benutzt, musst du dir eine Frage stellen:

> **"Will ich mit der KI reden — oder soll die KI für mich arbeiten?"**

Das ist kein philosophischer Unterschied. Das ist ein technischer. Und er bestimmt,
welches der drei KI-Systeme du öffnen musst und wie du sich ochestrieren kannst.

→ Weiter: [Die drei Panels](/books/zed-editor/02-drei-panels/)
```

---

#### `src/content/books/zed-editor/02-drei-panels.md`

```markdown
---
title: "2. Die drei Panels"
description: Warum gibt es in ZED drei verschiedene KI-Systeme mit unzählogen LLMs und was ist der Unterschied?
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

***Text Threads sind das erste** KI-Interface von ZED (vor Mai 2025).
Sie funktionieren wie ein Chat Fenster im Editor: du tippst, die KI antwortet.

**Was sie können:** Fragen beantworten, Code vorschlagen, Texte schreiben  
**Was sie NICHT können:** Dateien lesen, Befehle ausführen, aktiv im Projekt arbeiten  
**Erkennungsmerkmal:** Monospace-Schrift im Eingabebereich, "Recent Text Threads" im Dropdown

:::caution[Häufige Verwechslung]
Wenn du im Text Thread bist und fragst "Kannst du meine Datei lesen?" — antwortet die KI
trotzdem hilfreich. Aber es kann gut sein dass sie lügt: sie *glaubt*, dass sie helfen kann.
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

**Das CLI Tool Claude Code von Anthropics**, kann über das **Agent Client Protocol (ACP)**
in ZED integriert werden. Es läuft als eigener Prozess und kommuniziert mit ZED.

**Vorteil:** Claude Code nutzt dein Claude-Konto direkt im Claude Abo (flat - ohne Gebühr für API-Key)  
**Besonderheit:** Die Thread-History wird unabhängig vom Agent Panel mitgeführt.

→ Weiter: [Das Agent Panel im Detail](/books/zed-editor/03-agent-panel/)
```

---

#### `src/content/books/zed-editor/03-agent-panel.md`

```markdown
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
```

---

#### `src/content/books/zed-editor/04-text-threads.md`

```markdown
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
multiple Cursors, alles funktioniert. Das ist eine Feature, kein Fehler.

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
```

---

#### `src/content/books/zed-editor/05-externe-agenten.md`

```markdown
---
title: "5. Externe Agenten"
description: Claude Code, Gemini CLI und andere externe Agenten via ACP — so funktioniert die Integration.
---

# Externe Agenten

## Was ist ACP?

Das **Agent Client Protocol (ACP)** ist ZEDs Interface für externe KI-Tools.
Es ermöglicht, dass CLI-basierte Agenten wie Claude Code oder Gemini CLI innerhalb
von ZED laufen — als wären sie ein eingebettetes System.

## Konfigurierte Agenten anzeigen

Settings → External Agents (`Ctrl+,` → "External Agents")

Typische Konfiguration:
- Claude Agent ✓
- Codex CLI ✓  
- Gemini CLI ✓

## Claude Code Tab

Claude Code (Version 2.x) läuft als eigener Terminal-Prozess in einem ZED-Tab.
Es nutzt dein **Anthropic-Konto via OAuth — keine separaten API-Key Kosten entstehen.**

**Starten:** Im Agent Panel `+` → "Claude Agent" → "/login" → "rechts auf Login Claude" klicken.

:::note[Native Installer]
Ab Claude Code 2.x wurde von npm auf einen nativen Installer umgestellt.
Falls du eine Warnung siehst: `claude install` ausführen.
:::

## Bekannte Einschränkungen (Stand ZED 0.224.11)

Laut offizieller ZED-Dokumentation sind folgende Features für externe Agenten
**noch nicht implementiert:**

- Thread History wiederherstellen
- Checkpoints
- Token Usage Anzeige (unnötig im Abo Betrieb)
- Model Selection innerhalb von ZED

Das ist kein Bug — das steht explizit in der Doku mit dem Hinweis "should be supported in the future".

→ Weiter: [Storage-Architektur](/books/zed-editor/06-storage-architektur/)
```



---

#### `src/content/books/zed-editor/06-storage-architektur.md`

```markdown
---
title: "6. Storage-Architektur"
description: Wo ZED was speichert — für alle, die ihre Daten verstehen wollen.
---

# Storage-Architektur

## Überblick

ZED verwendet mehrere Datenbanken und Dateiformate, je nach System:

| Was | Pfad | Format |
|---|---|---|
| Text Threads | `~/.local/share/zed/conversations/*.zed.json` | JSON, unkomprimiert |
| Agent Threads | `~/.local/share/zed/threads/threads.db` | SQLite + zstd-Komprimierung |
| UI-State, History-Index | `~/.local/share/zed/db/0-stable/db.sqlite` | SQLite, kv_store Tabelle |
| Globale Settings | `~/.local/share/zed/db/0-global/db.sqlite` | SQLite |
| Prompts Library | `~/.local/share/zed/prompts/prompts-library-db.0.mdb` | LMDB |

## Der kv_store

In `db/0-stable/db.sqlite` gibt es eine `kv_store` Tabelle.
Darin speichert ZED u.a.:

- `recent-agent-threads` — Liste der letzten Agent Thread UUIDs (global)
- `recent-agent-threads-{workspace_id}` — workspace-spezifische Liste
- `agent_panel` — letzter Panel-Zustand

Das Format der Thread-Referenzen ist `[{"AcpThread": "uuid"}, ...]`.

## WAL-Dateien

ZED nutzt SQLite im WAL-Modus (Write-Ahead Logging). Solange ZED läuft,
können Änderungen in der `-wal` Datei stehen, nicht in der Hauptdatei.
Nach dem Beenden von ZED wird der WAL automatisch committed.

## Backup-Empfehlung

```bash
# Einmalig: Backup-Verzeichnis anlegen
rsync -av ~/.local/share/zed/threads/ ~/backup/zed-threads/
rsync -av ~/.local/share/zed/conversations/ ~/backup/zed-conversations/
```

→ Weiter: [Die wichtigste Lektion](/books/zed-editor/07-die-wichtigste-lektion/)
```

---

#### `src/content/books/zed-editor/07-die-wichtigste-lektion.md`

```markdown
---
title: "7. Die wichtigste Lektion"
description: Umfangreiches Debugging in drei Sätzen zusammengefasst.
---

# Die wichtigste Lektion

## Was passiert ist

An einem Abend verschwand die Thread-History in ZED.
Die Reaktion: SQLite-Datenbanken öffnen, kv_store-Einträge manuell editieren,
WAL-Dateien committen, Binary-Strings durchsuchen, Hypothesen testen.

Stunden später. Kein Ergebnis.

**Die Lösung:** Die offizielle ZED-Dokumentation aufrufen.  
**Zeitaufwand:** 5 Minuten.  
**Erkenntnis:** External Agents wie Claude Code Tab unterstützen Thread History Restore schlicht noch nicht.

## Was wir gelernt haben

**Über ZED:**
- Es gibt drei völlig verschiedene KI-Systeme (Text Thread, Agent Panel, External Agents)
- Thread History für externe Agenten ist eine bekannte, dokumentierte Einschränkung
- "Delete All History" löscht nur den Index, nicht die Daten

**Über professionelles Arbeiten:**
- Bei tool-spezifischen Problemen: **erst Docs, dann Debugging**
- Wenn ein Verhalten sich plötzlich ändert: Fast immer Architektur oder Konfiguration
- Datenbank-Manipulation ohne Verständnis des Schemas führt zu Zeitverlust, nicht zu Lösungen

## Die Regel

> **Docs first. Debug second.**

Das gilt für ZED. Das gilt für jedes Tool.  
Das ist keine Selbstverständlichkeit — es muss bewusst praktiziert werden.

---

*Dieses Buch wurde aus einer echten Session geboren, in der wir gemeinsam auf die harte Tour gelernt haben.  
Danke für die Ehrlichkeit, die es brauchte, daraus ein Buch zu machen.*
```

---

## Abschluss: Lokaler Build und Deploy

Nach dem Erstellen aller Dateien:

```bash
cd /mnt/8100-data/prog/ai/git/collective-context/github.io

# Lokaler Test
npm run dev
# Öffne http://localhost:4321 und prüfe die Bibliothek-Navigation

# Build prüfen
npm run build

# Deploy
git add .
git commit -m "📚 Bibliothek hinzugefügt: Buch 'Der ZED Editor — Verstehen statt Raten'"
git push origin main
```

GitHub Actions deployed automatisch. Live nach ~3 Minuten auf https://collective-context.org.

---

## Wichtige Hinweise

1. **Verzeichnisname:** Das lokale Verzeichnis heißt `github.io`
2. **Navigation:** Zur bestehenden `sidebar` in `astro.config.mjs` hinzufügen, nicht ersetzen
3. **Starlight Links:** In Starlight werden Routen automatisch aus Dateinamen generiert — keine manuelle Routing-Konfiguration nötig
4. **Frontmatter:** Jede `.md` Datei braucht mindestens `title` und `description` im Frontmatter
