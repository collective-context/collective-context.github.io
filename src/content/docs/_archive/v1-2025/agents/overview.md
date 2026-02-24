---
title: Agent Roles & Configuration
description: Hybrid Multi-Provider Architektur im CC Workflow
---

# Agent Roles im Collective Context

## 🔄 Pragmatischer Hybrid-Ansatz: Evolution statt Revolution

Nach dem KAIZEN-Prinzip führen wir eine **schrittweise Migration** durch, die es uns ermöglicht, aus der Praxis zu lernen und Tools zu vergleichen:

- **Claude-1**: Migriert zu Aider (FOSS)
- **Claude-2**: Behält Claude Code/CCC für Testing und Vergleiche
- **Aider-1/2**: Bleiben bei Aider als FOSS-Agents

## 📊 Agent-Konfiguration im CC Workflow

| Agent | Tool | Provider | Model | Temperature | Focus |
|-------|------|----------|-------|-------------|-------|
| **Claude-1** | Aider | OpenRouter | Claude 3.5 Sonnet | 0.3 | System Architecture, Design Decisions |
| **Claude-2** | Claude Code/CCC | Anthropic | Claude 3.5 Sonnet | 0.1 | Development, Documentation, CCC Testing |
| **Aider-1** | Aider | OpenRouter | DeepSeek Coder | 0.5 | Implementation, Features |
| **Aider-2** | Aider | PublicAI | Apertus v1 | 0.5 | Tests, Refactoring, Privacy Compliance |

## 🌟 Browser-Orchestrator

**Claude-Max** (Browser Chat) fungiert als Meta-Orchestrator:
- Erstellt strukturierte Arbeitspakete
- Koordiniert die 4 Terminal-Agenten
- Persistiert Wissen über Sessions hinweg
- Temperature: 0.5

## 💡 Warum diese Hybrid-Lösung?

### 1. **Pragmatismus**: Schrittweise Migration ermöglicht Vergleiche
- Direkter Performance-Vergleich zwischen Aider und Claude Code
- Reduziertes Risiko durch schrittweise Umstellung
- Best-of-both-worlds Ansatz

### 2. **Testing**: Claude-2 testet unseren CCC Commander in der Praxis
- Real-world Testing des eigenen CCC Tools
- Dogfooding: Wir nutzen was wir entwickeln
- Baseline für Performance-Messungen

### 3. **KAIZEN**: Lernen aus der Praxis, kontinuierliche Verbesserung
- Datenbasierte Entscheidungen statt ideologische
- Iterative Optimierung basierend auf Erfahrung
- Flexibilität für Anpassungen

### 4. **Flexibilität**: Beide Tool-Welten verfügbar
- FOSS-Option für Privacy-kritische Tasks
- Proprietäre Option als Fallback
- Multi-Provider für maximale Resilience

## 🌐 Unprecedented Flexibility

Mit OpenRouter haben alle Agents Zugang zu **300+ Modellen**:
- **Cloud**: Claude, GPT-4, Gemini, Mistral, Llama, DeepSeek...
- **Local**: Eigene Modelle via Ollama, vLLM, LocalAI
- **Hybrid**: Mix aus Cloud und Self-Hosted je nach Anforderung

## 🔒 Privacy & Compliance Options

- **Standard**: OpenRouter für Performance und Vielfalt
- **Privacy-First**: PublicAI/Apertus für DSGVO-Compliance
- **Self-Hosted**: Ollama für vollständige Kontrolle
- **Hybrid**: Mix je nach Sensitivität der Daten