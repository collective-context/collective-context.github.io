---
title: Agent Roles & Configuration
description: Die neue Multi-Provider Architektur im CC Workflow
---

# Agent Roles im Collective Context

## 🔄 Paradigmenwechsel: Von Proprietary zu Open Source

Ab September 2025 nutzt das CC Projekt ausschließlich **Open Source Tools** für die Agent-Orchestrierung:

- **Früher**: Claude Code (proprietär) + Aider (FOSS)
- **Neu**: Aider (FOSS) für ALLE Agenten mit Multi-Provider Support

## 📊 Neue Rollenverteilung

| Agent | Tool | Provider | Model | Temperature | Focus |
|-------|------|----------|-------|-------------|-------|
| **Aider-1** | Aider | OpenRouter | Claude 3.5 Sonnet | 0.3 | System Architecture, Design Decisions |
| **Aider-2** | Aider | PublicAI | Apertus v1 | 0.1 | Code Review, Privacy Compliance |
| **Aider-3** | Aider | OpenRouter | DeepSeek Coder | 0.5 | Implementation, Features |
| **Aider-4** | Aider | OpenRouter | Mixtral 8x22B | 0.5 | Tests, Refactoring, Docs |

## 🌟 Browser-Orchestrator

**Claude-Max** (Browser Chat) fungiert als Meta-Orchestrator:
- Erstellt strukturierte Arbeitspakete
- Koordiniert die 4 Terminal-Agenten
- Persistiert Wissen über Sessions hinweg
- Temperature: 0.5

## 💡 Multi-Provider Strategie

### Provider-Auswahl nach Use Case

**Production (Qualität)**:
- Critical Reviews: Claude 3.5 Sonnet via OpenRouter
- Privacy-sensitive: Apertus via PublicAI (Schweizer Server)

**Budget (Kosten-optimiert)**:
- Simple Tasks: GPT-3.5 Turbo
- General Coding: Mixtral (Open Source)

**Privacy-First**:
- Alle Tasks: Apertus oder lokale Modelle

### Warum Multi-Provider?

1. **Keine Vendor Lock-in**: Freiheit zwischen Providern zu wechseln
2. **Kosten-Optimierung**: Günstige Modelle für einfache Tasks
3. **Datenschutz**: Europäische Provider für sensitive Daten
4. **Redundanz**: Fallback bei Provider-Ausfällen