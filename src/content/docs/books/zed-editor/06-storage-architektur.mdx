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

## Claude Code CLI Storage (extern zu ZED)

Claude Code CLI speichert seine Daten **unabhängig von ZED** — im Home-Verzeichnis:

```
~/.claude/projects/<projekt-slug>/
├── <uuid>.jsonl              ← Session-Transcript (eine Zeile = ein JSON-Objekt)
├── <uuid>/
│   └── subagents/
│       └── agent-<id>.jsonl  ← Sub-Agenten-Transcripts
└── memory/
    ├── MEMORY.md             ← auto-geladen beim nächsten Start (max. 200 Zeilen)
    ├── titles.json           ← Custom-Titel für Sessions
    └── <uuid>.md             ← Session-spezifische Notizen
```

Der `<projekt-slug>` ist der absolute Pfad zum Working Directory,
mit `/` → `-` kodiert:
```
/mnt/8100-data/prog/ai/git/edikte/fb-data
→  -mnt-8100-data-prog-ai-git-edikte-fb-data
```

### JSONL-Format

Jede Zeile ist ein JSON-Objekt mit `type: "user" | "assistant"`, dem `message`-Content
(Text oder strukturierte Tool-Calls), Timestamps und Session-Metadaten.
Die Transkripte sind vollständig und maschinenlesbar — kein proprietäres Binärformat.

### Session-Verwaltung mit eigenen Tools

Aus diesem Format lässt sich ein vollständiger Session-Browser bauen:

```bash
# Terminal-Browser (mutt-artig)
python scripts/bin/claude_tui.py

# CLI
python scripts/claude_memory.py threads   # Liste aller Sessions
python scripts/claude_memory.py read #7   # Session lesen
python scripts/claude_memory.py backup fb-data  # Backup
```

→ Referenz: [claude_tui.py im fb-data Repo](https://github.com/collective-context)

## Backup-Empfehlung

```bash
# Einmalig: Backup-Verzeichnis anlegen
rsync -av ~/.local/share/zed/threads/ ~/backup/zed-threads/
rsync -av ~/.local/share/zed/conversations/ ~/backup/zed-conversations/
```

→ Weiter: [Die wichtigste Lektion](/books/zed-editor/07-die-wichtigste-lektion/)
