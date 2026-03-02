---
title: "#002: Dual-Agent Workflow — Gemini CLI + Claude Code Tab"
description: Kontinuierliche Code-Qualitätsverbesserung via Scanner + Fixer, koordiniert via postbox/
---

## Kontext

Dokumentierter Workflow aus der Praxis (Juli 2025, Medium).

**Setup**: ZED Editor, zwei ACP-Agenten gleichzeitig aktiv
**Agenten**:
- Gemini CLI → Scanner (liest nur, schreibt in todo.md)
- Claude Code Tab → Fixer (liest todo.md, fixt Code, schreibt done.md)

**Koordination**: postbox/todo.md + postbox/done.md

## Das Problem

Eine Legacy-Codebase mit über 200 Python-Dateien hatte akkumulierte technische Schulden:
- Deprecated API-Aufrufe (Python 3.8 → 3.12 Migration)
- Fehlende Fehlerbehandlung in kritischen Paths
- Auskommentierter Code und TODO-Kommentare
- Keine Tests für neue Features

Manuell zu finden und zu beheben wäre Wochen-Arbeit.

## Lösung: Dual-Agent Setup

### Schritt 1: Postbox initialisieren

```bash
mkdir -p postbox
# todo.md und done.md anlegen (siehe Postbox Pattern)
git commit -m "feat: postbox für Dual-Agent Workflow"
```

### Schritt 2: Gemini CLI als Scanner

Gemini CLI im ZED Agent Panel, Systemprompt:

```
Du bist der Scanner. Lies AGENTS.md.

Scanne src/ nach:
- Deprecated Python 3.8 APIs (urllib2, collections.MutableMapping, etc.)
- Fehlende Fehlerbehandlung (bare except, keine Rückgabe bei None)
- TODO-Kommentare
- Funktionen ohne Tests (prüfe tests/ parallel)

Schreibe JEDEN Fund als Tabellenzeile in postbox/todo.md:
| #ID | Beschreibung | hoch/mittel/niedrig | Gemini-Scan | Datei:Zeile |

NICHT LÖSEN. Nur scannen.
Starte sofort nach dem Schreiben mit dem nächsten Scan.
```

### Schritt 3: Claude Code Tab als Fixer

Claude Code Tab im ZED Agent Panel, Prompt:

```
Du bist der Fixer. Lies CLAUDE.md.

1. Lies postbox/todo.md
2. Wähle den Task mit höchster Priorität
3. Fixe ihn (schreibe auch Tests wenn sinnvoll)
4. Commit: fix: [Beschreibung] (#ID)
5. Verschiebe den Task nach done.md mit Commit-Hash
6. Nächster Task.
```

## Ergebnisse nach 4 Stunden

Gemini CLI hat kontinuierlich gescannt. Claude Code Tab hat parallel Fixes committed.

```
postbox/done.md — Auszug:
| #001 | Deprecated urllib2 → requests | Claude | a1b2c3d | 2025-07-12 |
| #002 | Bare except in config.py:89 | Claude | b2c3d4e | 2025-07-12 |
| #007 | Test für UserService | Claude | c3d4e5f | 2025-07-12 |
...
| #043 | Letzter Task des Tages | Claude | xyz1234 | 2025-07-12 |
```

43 technische Schulden abgebaut in einem Tag.

```bash
git log --oneline | wc -l
# 48 neue Commits (inkl. 5 refactoring)
```

## Lernpunkte

**Was gut funktioniert hat:**
- Gemini CLI's großes Context Window: konnte ganze Module in einem Scan prüfen
- Claude Code Tab hat CLAUDE.md-Regeln konsistent angewendet (keine Regressions)
- postbox/done.md als Audit-Trail: jeder Fix mit Commit nachvollziehbar

**Was wir angepasst haben:**
- Gemini schrieb initial zu viele niedrig-prioritäre Tasks → Prompt angepasst: "Maximal 5 Tasks pro Scan-Runde"
- Batch-Größe limitieren vermeidet Überlastung des Fixers

**In CLAUDE.md aufgenommen:**
- "Nach Dual-Agent Session: done.md reviewen, Top-3-Learnings in CLAUDE.md"

## Kosten

| Agent | Laufzeit | Kosten |
|---|---|---|
| Gemini CLI | 4h kontinuierlich | ~$1.20 (Gemini 2.5 Pro) |
| Claude Code Tab | 4h Fixes | Flat Rate |

Für 43 technische Schulden abgebaut: unter $2 externe Kosten.
