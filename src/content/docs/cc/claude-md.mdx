---
title: CLAUDE.md Guide
description: Best Practices für das geteilte Teamgedächtnis aller Claude-Agenten
---

## Was ist CLAUDE.md?

CLAUDE.md ist eine Markdown-Datei im Projekt-Root, die automatisch in **jede** neue Claude-Session geladen wird — ob Claude Code Web, ZED Claude Code Tab, oder jede andere ACP-Implementation.

Sie ist der **Collective Context**: das geteilte Gedächtnis aller Agenten, das über Session-Grenzen hinweg erhalten bleibt.

## Was CLAUDE.md enthalten soll

CLAUDE.md ist ein sich selbst korrigierendes Teamgedächtnis:

- **Was wurde entschieden** — Architektur-Entscheidungen, Naming-Konventionen
- **Was soll NICHT getan werden** — bekannte Fehler, Anti-Patterns
- **Wie das Team arbeitet** — Commit-Format, Branch-Strategy, Prompt-Stil
- **Wo was liegt** — Repo-Struktur, Key Files, Entry Points

> "Anytime we see Claude do something incorrectly we add it to the CLAUDE.md, so Claude knows not to do it next time. Every mistake becomes a rule." — Boris Cherny, Creator of Claude Code

## Was CLAUDE.md NICHT enthalten soll

- Code-Style-Guidelines (dafür gibt es Linter wie ESLint, Ruff, Black)
- Ausführliche How-To-Erklärungen (LLMs lesen Docs selbst)
- Alles was ein Agent durch `grep` oder `find` selbst herausfinden kann
- Generelle Programmierprinzipien (SOLID, DRY — die kennt das Modell schon)

## Template: Minimales CLAUDE.md

```markdown
# CLAUDE.md

## Projekt
[1-3 Sätze: Was macht dieses Projekt? Für wen? Warum?]

## Stack
- [Sprache/Framework 1]
- [Sprache/Framework 2]
- [Datenbank/Infra]

## Entscheidungen (nicht mehr hinterfragen)
- Wir nutzen [X] statt [Y], weil [Z]
- API-Responses sind immer [Format]
- Fehler werden immer [Strategie] behandelt

## Was Claude NICHT tun soll
- Keine [Anti-Pattern] — führt zu [Problem]
- Nicht [Tool X] nutzen — wir haben [Tool Y] dafür
- Niemals [Operation] ohne vorher [Check]

## Repo-Struktur
- `src/` — Hauptcode
- `tests/` — Tests (pytest)
- `postbox/` — Agent Coordination
  - `todo.md` — offene Tasks
  - `done.md` — erledigte Tasks

## Commit-Format
feat: / fix: / docs: / refactor: / test: (Conventional Commits)

## Branch-Strategy
- `main` — Production
- `claude/[feature]-[session-id]` — Agent-Branches
```

## KAIZEN: CLAUDE.md als lernendes System

Nach jeder Session, in der ein Agent einen Fehler gemacht hat:

1. Fehler identifizieren (z.B. "Claude hat X verwendet statt Y")
2. Als Regel in CLAUDE.md aufnehmen: "Nicht X — stattdessen Y"
3. Beim nächsten Session-Start liest Claude die Regel und wiederholt den Fehler nicht

**Das Ergebnis:** CLAUDE.md akkumuliert über Wochen und Monate das gesamte Projektwissen in der präzisen Form, die für LLMs optimal ist.

## Kapazitätsplanung

Frontier-Modelle (Claude Sonnet, Gemini Pro) folgen **ca. 150–200 Instruktionen** mit guter Konsistenz. Darüber nimmt die Einhaltung ab.

Empfehlung:
- Bis 50 Regeln: Volle Zuverlässigkeit
- 50–150 Regeln: Gut, gelegentliche Ausreißer
- 150+: Selektivität nötig — nur die wichtigsten Regeln behalten

## Multi-Repo Strategie

Wenn mehrere Repos dasselbe CLAUDE.md-Wissen teilen sollen:

**Option A: Kopieren** — Manuelle Synchronisation, einfach

**Option B: Symlink** — `ln -s ../shared/CLAUDE.md CLAUDE.md` — automatisch synchron, aber an Repo-Grenzen komplex

**Option C: Include** — Custom-Convention: CLAUDE.md enthält `@include: ../shared/base.md` — noch kein nativer Support in Claude Code, aber als Workaround via Pre-Hook machbar

## Zusammenspiel mit AGENTS.md

```
CLAUDE.md  →  Claude Code Tab, Claude Code Web, alle Claude-Instanzen
AGENTS.md  →  Gemini CLI, Codex, OpenCode (und andere ACP-Agenten)
```

Empfehlung: Beide Dateien mit identischem Kerninhalt pflegen, oder AGENTS.md als Symlink auf CLAUDE.md setzen (falls Gemini CLI das unterstützt).

[Weiter: AGENTS.md Guide](/cc/agents-md)
