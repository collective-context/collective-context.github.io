# Postbox Pattern

> Asynchrone Koordination zwischen AI-Agenten via Dateisystem.
> Vollständige Dokumentation: https://collective-context.org/cc/postbox-pattern/#das-postbox-konzept

## Konzept

Zwei Dateien fungieren als geteiltes Task-Board für mehrere Agenten:

```
postbox/
├── todo.md    ← Offene Tasks (alle Agenten lesen/schreiben)
├── done.md    ← Erledigte Tasks (mit Commit-Referenz)
└── README.md  ← Diese Datei
```

Kein API-Overhead, kein Message-Passing — nur normale Dateioperationen.

## Rollen

**Scanner-Agent** (z.B. Gemini CLI)
- Scannt das Projekt nach Problemen
- Schreibt Funde in `todo.md`
- Löst keine Tasks selbst

**Fixer-Agent** (z.B. Claude Code Tab)
- Liest `todo.md`, wählt Task mit höchster Priorität
- Markiert Task als "In Bearbeitung"
- Fixt, committet, trägt Commit-Hash in `done.md` ein

## Format todo.md

```markdown
## Offene Tasks
| ID | Task | Priorität | Quelle | Datei:Zeile |
|----|------|-----------|--------|-------------|
| #001 | Beschreibung | hoch | Agent | src/file.py:42 |

## In Bearbeitung
| ID | Task | Agent | Seit |
|----|------|-------|------|
| #001 | Beschreibung | Claude Code Tab | 2026-02-24 14:30 |
```

## Format done.md

```markdown
| ID | Task | Agent | Commit | Datum |
|----|------|-------|--------|-------|
| #001 | Beschreibung | Claude Code Tab | abc1234 | 2026-02-24 14:45 |
```

## Regeln

- IDs nicht wiederverwenden (done.md ist Audit-Log)
- Commit-Hash immer eintragen (`git show <hash>` für Details)
- Bei gleichzeitigem Schreiben: kurzer Human-in-the-loop-Check reicht
