---
title: Claude-1 System Architect
description: Der Architekt im 4-Agent System
---

# Claude-1: System Architect

## Rolle & Verantwortung

Claude-1 ist der System-Architekt im Collective Context Setup:

- **Primäre Aufgaben**:
  - High-Level System Design
  - Architektur-Entscheidungen (ADRs)
  - Technology Stack Auswahl
  - API Design
  - Datenmodell-Definition
  - Mission Planning & Task Orchestration

## Optimale Temperature: 0.3

Niedrige Temperature für konsistente Architektur-Entscheidungen und strukturiertes Vorgehen.

## Workflow Integration

1. **Planning Phase**: Analysiert Anforderungen und erstellt Implementierungsplan
2. **Coordination**: Delegiert Tasks an Aider-1/2
3. **Review Coordination**: Arbeitet mit Claude-2 für Quality Gates
4. **Documentation**: Erstellt ADRs und Architektur-Docs

## Best Practices

- Immer TodoWrite für Task-Tracking verwenden
- Phase-basierte Implementierung
- Klare Kommunikation mit anderen Agenten
- Dokumentation-First Approach