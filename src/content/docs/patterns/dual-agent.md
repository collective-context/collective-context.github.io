---
title: Dual-Agent Pattern
description: Gemini CLI als Scanner + Claude Code Tab als Fixer — koordiniert via postbox/
---

## Übersicht

Das Dual-Agent Pattern ist die einfachste und gleichzeitig effektivste Form von Multi-Agent-Koordination im CC-Stack. Dokumentiert aus der Praxis (Medium, Juli 2025).

**Zwei Agenten, ein Dateisystem, kein API-Overhead.**

```
Gemini CLI (Scanner)                Claude Code Tab (Fixer)
─────────────────────               ─────────────────────────
Scannt kontinuierlich Codebase      Monitort postbox/todo.md
↓                                   ↓
Schreibt Findings in todo.md        Übernimmt offene Tasks
↓                                   ↓
"Never stop scanning. Never solve." Fixiert Code, committed
                                    ↓
                                    Verschiebt Task nach done.md
```

**Shared State:** `./postbox/todo.md` und `./postbox/done.md` — beide Agenten lesen und schreiben ins selbe Dateisystem.

## Warum diese Rollenteilung?

- **Gemini CLI**: Großes Context Window → ideal für vollständige Codebase-Scans
- **Claude Code Tab**: Tiefes Code-Verständnis + Filesystem-Zugriff → ideal für präzise Fixes
- **Spezialisierung vermeidet Konflikte**: Scanner ändert nie Code, Fixer scannt nie

## Setup

### 1. Postbox initialisieren

```bash
mkdir -p postbox
echo "# Todo — Offene Tasks" > postbox/todo.md
echo "" >> postbox/todo.md
echo "| ID | Task | Priorität | Quelle | Datei:Zeile |" >> postbox/todo.md
echo "|----|------|-----------|--------|-------------|" >> postbox/todo.md
echo "" >> postbox/todo.md

echo "# Done — Erledigte Tasks" > postbox/done.md
echo "" >> postbox/done.md
echo "| ID | Task | Agent | Commit | Datum |" >> postbox/done.md
echo "|----|------|-------|--------|-------|" >> postbox/done.md

git add postbox/ && git commit -m "feat: postbox pattern initialisiert"
```

### 2. Gemini CLI als Scanner starten (im ZED Agent Panel)

```
Du bist der Scanner-Agent für dieses Projekt. Lies zuerst AGENTS.md.

Deine Aufgaben:
1. Scanne src/ vollständig nach [Bugs / Code-Smells / TODO-Kommentaren / deprecated APIs]
2. Schreibe jeden Fund als neue Zeile in postbox/todo.md
   Format: | #ID | [Beschreibung] | [hoch/mittel/niedrig] | Gemini-Scan | [Datei:Zeile] |
3. Löse NIEMALS selbst einen Task — nur scannen und dokumentieren
4. Beginne sofort nach dem Schreiben mit dem nächsten Scan-Durchlauf

Starte jetzt mit dem ersten Scan.
```

### 3. Claude Code Tab als Fixer starten

```
Du bist der Fixer-Agent. Lies zuerst CLAUDE.md.

Deine Aufgaben:
1. Lies postbox/todo.md
2. Wähle den offenen Task mit höchster Priorität
3. Trage deinen Namen unter "In Bearbeitung" ein
4. Fixe den Code, schreibe Tests wenn sinnvoll
5. Committe mit: fix: [Task-Beschreibung] (#ID)
6. Verschiebe den Task nach postbox/done.md (mit Commit-Hash)
7. Beginne sofort mit dem nächsten Task

Starte jetzt.
```

## Praktisches Beispiel

### Ausgangssituation

```
postbox/todo.md:
| #001 | Fehlende Fehlerbehandlung in parse_config() | hoch | Gemini-Scan | src/config.py:89 |
| #002 | Deprecated json.load ohne encoding | mittel | Gemini-Scan | src/utils.py:34 |
```

### Claude Code Tab arbeitet #001 ab

1. Liest todo.md → wählt #001 (höchste Priorität)
2. Öffnet `src/config.py:89`
3. Implementiert Fehlerbehandlung
4. `git commit -m "fix: Fehlerbehandlung in parse_config() (#001)"`
5. Schreibt in done.md: `| #001 | ... | Claude Code Tab | abc1234 | 2026-02-24 |`
6. Entfernt #001 aus todo.md

### Gemini CLI scannt weiter

Während Claude Code Tab #001 fixt, hat Gemini CLI bereits #003, #004 in todo.md geschrieben.

**Kein Synchronisationsaufwand. Kein API-Call. Nur Dateien.**

## Variante: Mensch als dritter Akteur

Das Pattern funktioniert auch mit einem Menschen in der Schleife:

```
Gemini CLI (Scanner) → todo.md ← Mensch (Prioritätssetzung) → Claude Code Tab (Fixer)
```

Der Mensch prüft todo.md, setzt Prioritäten, löscht Falsch-Positive — und lässt Claude Code Tab dann die priorisierten Tasks abarbeiten.

## Häufige Fehler vermeiden

**Scanner löst Tasks** → Systemprompt explizit: "Never solve. Only scan."

**Fixer setzt keine Commit-Referenz** → done.md ohne Hash ist nutzlos für Debugging

**Zu viele Tasks auf einmal** → Gemini schreibt 50 Einträge, Claude kommt nicht nach → Scan-Intervall oder Batch-Größe limitieren

[Weiter: Orchestra Pattern](/patterns/orchestra)
