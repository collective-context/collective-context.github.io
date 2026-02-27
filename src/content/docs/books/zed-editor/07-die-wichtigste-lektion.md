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
**Erkenntnis (damals):** External Agents wie Claude Code Tab unterstützen Thread History Restore in ZED's UI — so stand es in der Doku.

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

---

## Nachtrag (Feb 2026)

Die Lektion bleibt gültig — aber die Geschichte hat eine Fortsetzung, die größer ist.

Erstens: ZED zeigt die Claude Code Sessions längst im **History-Panel**.
Es liest `~/.claude/projects/` direkt — clever, still, ohne Aufsehen.
Was wir stundenlang gesucht haben, war die ganze Zeit da.

Zweitens: Die Sessions als Dateien eröffnen eine neue Dimension.
Jede `.jsonl` unter `~/.claude/projects/<slug>/` ist ein vollständiger Transcript.
Jede Zeile: ein JSON-Objekt. Menschenlesbar, maschinenverarbeitbar, archivierbar.

Daraus entstand `claude_tui.py` — ein mutt-artiger Terminal-Browser:

```
┌─ Projekte ──┬─ Sessions ─────────────────────────────────────────┐
│ ● fb-data   │ #1  22:50  Try "fix lint errors"         1307.9K   │
│   github-io │ #2  21:31  Wieso habe ich jetzt in...   3166.8K   │
└─────────────┴────────────────────────────────────────────────────┘
┌─ Reader ───────────────────────────────────────────────────────────┐
│ ▶ YOU                                                               │
│   Try "fix lint errors"                                             │
│ ◀ CLAUDE                                                           │
│   Gemäß CLAUDE.md Regel 3 …                                       │
└────────────────────────────────────────────────────────────────────┘
```

Sessions umbenennen, löschen, annotieren, im Editor öffnen — alles lokal, kein Cloud-Service.

**Drittens — und das ist die eigentliche Lektion:**

ZED 2026 ist kein Editor mit KI-Addon.
Es ist das professionelle Interface, mit dem Human SysOps ihre LLMs dirigieren.
Filesystem-Zugriff. ACP-Integration. History. Memory. Open Source.

> Docs first. Debug second.
> **Und: Unterschätze nie, was Open Source mit dem richtigen Werkzeug erreicht.**

---

*Dieses Buch wurde aus einer echten Session geboren, in der wir gemeinsam auf die harte Tour gelernt haben.
Danke für die Ehrlichkeit, die es brauchte, daraus ein Buch zu machen.*
