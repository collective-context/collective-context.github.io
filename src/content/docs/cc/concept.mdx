---
title: Konzept & Architektur
description: Das Kernkonzept von Collective Context — Shared State via Dateisystem
---

## Das Kernproblem

LLMs sind zustandslose Funktionen. Jede neue Session startet bei null. Wenn mehrere Agenten an demselben Projekt arbeiten — Claude, Gemini, Grok, Ollama — reden sie aneinander vorbei. Jeder kennt nur seinen eigenen Kontext.

**Das ist das Problem, das Collective Context löst.**

## Die Lösung: Shared Context via Dateisystem

Der einzige State, der zwischen allen Agenten geteilt werden kann, ist das **Dateisystem des Projekts**. Darin liegen:

```
projekt/
├── CLAUDE.md          ← Automatisch in JEDE Session aller ACP-Agenten geladen
├── AGENTS.md          ← Kompatibles Äquivalent für Gemini CLI, Codex, OpenCode
├── .claude/
│   └── agents/        ← Spezialisierte Sub-Agenten-Definitionen
└── postbox/
    ├── todo.md        ← Offene Tasks (Shared State zwischen Agenten)
    └── done.md        ← Erledigte Tasks mit Commit-Referenzen
```

**CLAUDE.md ist der Collective Context.** Sie ist die einzige Datei, die standardmäßig in jede einzelne Conversation mit dem Agenten geht — egal welches Modell, egal welcher ACP-Client.

## Architektur-Übersicht

```
ZED Editor (ACP Client)
├── Agent Panel (Ctrl+?)
│   ├── Claude Code Tab    ← ACP External Agent, Claude Max Flat Rate
│   │   └── CLAUDE.md      ← Automatisch geladen
│   │
│   ├── Gemini CLI         ← ACP External Agent
│   │   └── AGENTS.md      ← Automatisch geladen
│   │
│   └── Ollama Adapter     ← Community, lokal
│
├── Gemeinsames Dateisystem
│   ├── CLAUDE.md / AGENTS.md   ← Shared Memory
│   └── postbox/                ← Shared Task State
│
└── MCP Servers            ← Tool-Erweiterungen
```

## KAIZEN-Prinzip: Das Gedächtnis wächst mit

Jeder Fehler, den ein Agent macht und den ein Mensch korrigiert, wird als Regel in CLAUDE.md aufgenommen:

```
Session 1: Claude macht Fehler X → Mensch korrigiert → Regel in CLAUDE.md
Session 2: Claude Code Tab liest CLAUDE.md → Fehler X wiederholt sich nicht
Session 3: Gemini CLI liest AGENTS.md → dasselbe Wissen, anderes Modell
```

> "Anytime we see Claude do something incorrectly we add it to the CLAUDE.md, so Claude knows not to do it next time. Every mistake becomes a rule." — Boris Cherny, Creator of Claude Code

**Frontier-Modelle (Sonnet, Gemini Pro) folgen ca. 150–200 Instruktionen mit guter Konsistenz.** CLAUDE.md sollte deshalb prägnant bleiben — nur das Nicht-Offensichtliche dokumentieren.

## Empfohlene Stack-Konfiguration

```
ZED Editor (Fundament)
│
├── Claude Code Tab (Max Abo, flat)     → Komplexe Tasks, Recode, Architektur
│   └── CLAUDE.md + AGENTS.md          → Shared Context für alle Agenten
│
├── Zed First-Party Agent
│   ├── Grok 4.1 Fast (Reasoning)      → Code lesen, Fixes, Git
│   ├── Gemini 3 Flash                  → Code schreiben, Tests
│   └── Claude Sonnet 4.6              → Höchste Qualität
│
├── Gemini CLI (ACP External)           → Parallele Scan-Tasks (Dual-Agent)
│
└── Ollama (lokal, via Script)          → Privacy-First, Credentials-safe
    └── qwen3:14b oder llama3.3         → Tier C Extraktion, interne Tasks
```

## Warum kein API-Overhead?

Das Collective Context-Modell nutzt bewusst **kein** Message-Passing zwischen Agenten, keine zentrale Koordinations-API, keine Echtzeit-Kommunikation.

Stattdessen: **Asynchrones Shared State via Dateisystem.**

- Vorteil: Kein zusätzlicher Code, keine Abhängigkeiten
- Vorteil: Funktioniert mit jedem Tool, das Dateien lesen kann
- Vorteil: Kein Single Point of Failure
- Nachteil: Keine Echtzeit-Koordination (ist aber in der Praxis selten nötig)

[Weiter: CLAUDE.md Guide](/cc/claude-md)
