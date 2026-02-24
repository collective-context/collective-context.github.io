---
title: Quick Start — ZED + Claude Code Tab
description: In 5 Minuten zum laufenden Collective Context Setup
---

## Voraussetzungen

- Linux / macOS / Windows (ZED läuft auf allen)
- Claude Max Abo (claude.ai) — für Flat Rate
- Node.js 18+ (für den ACP-Adapter)

## Schritt 1: ZED installieren

Download unter: https://zed.dev/download

ZED ist kostenlos und Open Source (GPL). Kein Account erforderlich für die Basis-Nutzung.

## Schritt 2: Claude Code Tab aktivieren

1. Agent Panel öffnen: `Ctrl+?`
2. `+` Button klicken → **Claude Agent** (aus ACP Registry auswählen)
3. ZED installiert `@zed-industries/claude-agent-acp` automatisch
4. `/login` eingeben → "Log in with Claude.ai" → OAuth im Browser abschließen
5. Fertig — Claude Code Tab ist aktiv.

## Schritt 3: CLAUDE.md anlegen

Im Projekt-Root eine Datei `CLAUDE.md` anlegen:

```markdown
# CLAUDE.md

## Projekt
[Kurzbeschreibung des Projekts, max. 3 Sätze]

## Entscheidungen (nicht mehr hinterfragen)
- [Architektur-Entscheidung 1]
- [Architektur-Entscheidung 2]

## Was Claude NICHT tun soll
- [Anti-Pattern 1 aus schlechter Erfahrung]
- [Anti-Pattern 2]

## Commit-Format
feat: / fix: / docs: (Conventional Commits)
```

CLAUDE.md wird **automatisch** in jede neue Session geladen — kein manueller Upload nötig.

## Schritt 4: Ersten Task starten

Im Agent Panel (Claude Code Tab aktiv):

```
Lies CLAUDE.md und erkläre mir die Projektstruktur
```

Claude liest automatisch CLAUDE.md, AGENTS.md (falls vorhanden) und scannt den Codebase.

## Schritt 5 (optional): Postbox für Multi-Agent

Für den [Dual-Agent Workflow](/patterns/dual-agent) mit Gemini CLI:

```bash
mkdir postbox
touch postbox/todo.md postbox/done.md
```

```markdown
# postbox/todo.md

## Offene Tasks

| ID | Task | Priorität | Quelle |
|----|------|-----------|--------|
| #001 | Beispiel-Task | hoch | Gemini |
```

## Nächste Schritte

- [Was ist ACP? — Konzeptueller Hintergrund](/quickstart/what-is-acp)
- [Claude Code Tab — alle Features im Detail](/zed/claude-code-tab)
- [CLAUDE.md Best Practices](/cc/claude-md)
- [Dual-Agent Pattern einrichten](/patterns/dual-agent)
