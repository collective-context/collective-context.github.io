---
title: AGENTS.md Guide
description: Das CLAUDE.md-Äquivalent für Gemini CLI, Codex und andere ACP-Agenten
---

## Was ist AGENTS.md?

AGENTS.md ist der offene Standard für Agent-Kontext-Dateien — analog zu CLAUDE.md, aber für alle ACP-Agenten außer Claude. Unterstützt von:

- **Gemini CLI** — liest AGENTS.md automatisch
- **Codex** (OpenAI) — liest AGENTS.md automatisch
- **OpenCode** — liest AGENTS.md automatisch
- Weitere ACP-Agenten, die den Standard implementieren

## AGENTS.md vs. CLAUDE.md

| Datei | Zielgruppe | Auto-load |
|---|---|---|
| `CLAUDE.md` | Claude Code Tab, Claude Code Web | Ja (alle Claude-Instanzen) |
| `AGENTS.md` | Gemini CLI, Codex, OpenCode | Ja (kompatible Agenten) |

**Empfehlung für Collective Context:** Beide Dateien mit identischem Kern-Inhalt pflegen. Die Dateien können identisch sein — sie unterscheiden sich nur in welcher Agent sie auto-lädt.

## Template: AGENTS.md

```markdown
# AGENTS.md

## Project
[1-3 sentences: What does this project do? For whom? Why?]

## Stack
- [Language/Framework 1]
- [Language/Framework 2]
- [Database/Infra]

## Decisions (don't question)
- We use [X] instead of [Y] because [Z]
- API responses are always [format]

## What agents should NOT do
- No [anti-pattern] — leads to [problem]
- Don't use [tool X] — we have [tool Y] for this
- Never [operation] without [check] first

## Repository Structure
- `src/` — Main code
- `tests/` — Tests
- `postbox/` — Agent coordination
  - `todo.md` — open tasks
  - `done.md` — completed tasks

## Commit Format
feat: / fix: / docs: / refactor: / test: (Conventional Commits)
```

**Hinweis:** AGENTS.md wird oft auf Englisch gehalten, da nicht alle Agenten gleich gut mit Deutsch umgehen. CLAUDE.md kann auf Deutsch sein (Claude versteht Deutsch exzellent).

## Minimalst-Setup für Collective Context

```
projekt/
├── CLAUDE.md    ← Deutsch, ausführlich
└── AGENTS.md    ← Englisch, identischer Kern-Inhalt
```

Langfristig: AGENTS.md Spec wird weiterentwickelt. Wir halten die Seite aktuell.

[Weiter: Postbox Pattern](/cc/postbox-pattern)
