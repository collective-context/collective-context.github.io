---
title: Multi-Agent System Übersicht
description: Das Collective Context 4-Agent System im Detail
---

# Multi-Agent System Übersicht

Das Collective Context System orchestriert spezialisierte KI-Agenten für maximale Produktivität.

## Die 4 Kern-Agenten

### 🏗️ Claude-1: System Architect
- **Rolle**: High-Level Design und Architektur-Entscheidungen
- **Temperature**: 0.3 (präzise, konsistent)
- **Fokus**: System-Design, ADRs, Technologie-Stack

### 🔍 Claude-2: Code Reviewer
- **Rolle**: Qualitätssicherung und Best Practices
- **Temperature**: 0.1 (strikt, regelbasiert)
- **Fokus**: Code Reviews, Security, Performance

### 💻 Aider-1: Main Developer
- **Rolle**: Haupt-Implementation
- **Temperature**: 0.5 (kreativ, aber fokussiert)
- **Fokus**: Feature-Entwicklung, Core-Funktionalität

### 🔧 Aider-2: Parallel Developer
- **Rolle**: Tests, Docs, Refactoring
- **Temperature**: 0.5 (adaptiv)
- **Fokus**: Testing, Dokumentation, Code-Optimierung

## Workflow Integration

Das System arbeitet nach dem **Orchestra Pattern**: Ein Dirigent (User/Claude-1) koordiniert spezialisierte Musiker (Agenten) für harmonische Ergebnisse.

```
User Input → Claude-1 (Design) → Aider-1/2 (Implementation) → Claude-2 (Review) → Quality Output
```

## Success Metrics

- **10x Development Speed**
- **89% Test Coverage**
- **48h Time to MVP**
- **$112 API Costs per Project**