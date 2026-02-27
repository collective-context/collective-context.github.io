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
**Erkenntnis (damals):** External Agents wie Claude Code Tab unterstützen Thread History Restore in ZED's UI schlicht noch nicht.

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

Die Lektion bleibt gültig — aber die Geschichte hat eine Fortsetzung.

Die Session History, die ZED's UI nicht zeigt, existiert. Vollständig.
Jede Session liegt als `.jsonl` unter `~/.claude/projects/<slug>/`.
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

**Die Lektion erweitert sich:**
> Docs first. Debug second. **Und: Das Dateisystem lügt nicht.**

Was du in ZED's UI nicht siehst, kann trotzdem existieren.
Claude Code ist ein CLI-Tool das in ZED läuft — nicht umgekehrt.

---

*Dieses Buch wurde aus einer echten Session geboren, in der wir gemeinsam auf die harte Tour gelernt haben.
Danke für die Ehrlichkeit, die es brauchte, daraus ein Buch zu machen.*
