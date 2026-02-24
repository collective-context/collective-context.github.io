---
title: Orchestra Pattern
description: Mehrere spezialisierte Agenten mit klarer Rollenverteilung — koordiniert via Shared Context
---

## Konzept

Das Orchestra Pattern erweitert den Dual-Agent Ansatz auf mehr als zwei Agenten. Wie in einem Orchester hat jeder Musiker (Agent) eine Spezialisierung — der Dirigent (Shared Context via CLAUDE.md/Postbox) koordiniert.

```
ZED Editor
├── Claude Code Tab (Architekt/Fixer)
│   └── Liest CLAUDE.md, schreibt in postbox/done.md
├── Gemini CLI (Scanner)
│   └── Liest AGENTS.md, schreibt in postbox/todo.md
└── Zed First-Party (Schnelle Tasks)
    ├── Grok 4.1 Fast → Code-Reviews, kleine Fixes
    └── Gemini Flash → Tests schreiben
```

## Empfohlene Rollenverteilung

| Agent | Modell | Rolle | Trigger |
|---|---|---|---|
| Claude Code Tab | Sonnet 4.6 (Max) | Architekt, komplexe Implementierung | Große Tasks in todo.md |
| Gemini CLI | Gemini 2.5 Pro | Scanner, Codebase-Analyse | Kontinuierlich |
| Grok 4.1 Fast | Grok | Code-Review, kleine Fixes | Mittlere Tasks in todo.md |
| Gemini Flash | Gemini | Test-Generierung | Nach Implementierungen |
| Ollama lokal | qwen3:14b | Privacy-Tasks, interne Analyse | Tasks mit sensitive-Flag |

## Postbox-Erweiterung für Orchestra

```markdown
# postbox/todo.md — Orchestra-Format

| ID | Task | Priorität | Typ | Ziel-Agent | Quelle |
|----|------|-----------|-----|------------|--------|
| #001 | Auth-Refactoring | hoch | Architektur | Claude-Tab | Human |
| #002 | Tests für UserService | mittel | Tests | Gemini-Flash | Claude |
| #003 | Credentials-Check | hoch | Privacy | Ollama | Gemini-Scan |
```

Der `Ziel-Agent`-Spalte ermöglicht Task-Routing ohne API:
- Jeder Agent liest todo.md und wählt **nur Tasks mit seinem Namen**
- Kein Broadcast, kein Message-Passing

## Shared Context Schichten

```
Schicht 1: CLAUDE.md / AGENTS.md
→ Projektkontext, Regeln, Entscheidungen
→ Alle Agenten lesen beim Start

Schicht 2: postbox/todo.md + done.md
→ Aktueller Task-State
→ Alle Agenten lesen/schreiben bei jedem Schritt

Schicht 3: Git History
→ Was wurde wann von wem implementiert
→ Alle Agenten können `git log` nutzen
```

Drei Schichten, kein einziger API-Call zwischen Agenten.

## Wann Orchestra statt Dual-Agent?

| Situation | Empfehlung |
|---|---|
| 2 Agenten reichen | Dual-Agent Pattern |
| Klare Typ-Unterschiede (Scan/Fix/Test) | Orchestra |
| Privacy-Tasks im Mix | Orchestra mit Ollama-Routing |
| Sehr schnelle Iteration | Dual-Agent (weniger Koordinationsaufwand) |

[Weiter: Pipeline Pattern](/patterns/pipeline)
