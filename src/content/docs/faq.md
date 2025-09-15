---
title: Frequently Asked Questions
description: Häufig gestellte Fragen zu Collective Context
---

# FAQ - Häufig gestellte Fragen

## Allgemein

### Was ist Collective Context?

Collective Context ist ein Framework für die Orchestrierung mehrerer KI-Agenten, die zusammenarbeiten können, um komplexe Aufgaben zu lösen.

### Welche KI-Modelle werden unterstützt?

- **Claude 3.5 Sonnet** (Anthropic) - Hauptfokus
- **GPT-4** (OpenAI) - Über Aider Integration
- **OpenRouter** - Zugang zu verschiedenen Modellen

## Sicherheit

### Warum wurde von TypeScript zu JSON Configs gewechselt?

TypeScript-Konfigurationsdateien können beliebigen Code ausführen, was ein Sicherheitsrisiko darstellt. JSON ist sicher und wird mit Zod-Schemas validiert.

### Wie werden API Keys sicher gespeichert?

API Keys sollten **ausschließlich** als Environment Variables gespeichert werden:
- Nutze `.env` Dateien lokal (niemals committen!)
- Nutze Secret Management in Production (z.B. Docker Secrets, Kubernetes Secrets)

### Ist CCC sicher für Production?

Nach den Security Updates in v0.2.0 wurden die kritischen Sicherheitslücken geschlossen. Dennoch empfehlen wir:
- Regelmäßige Updates
- Monitoring der Logs
- Prinzip der minimalen Berechtigungen

## Installation & Setup

### Wie installiere ich CCC?

```bash
# Option 1: pip (Empfohlen)
pip install ccc

# Option 2: From Source
git clone https://github.com/collective-context/ccc
cd ccc
pip install -e .
```

### Welche Python Version wird benötigt?

Python 3.10 oder höher ist erforderlich.

### Warum benötige ich tmux?

Tmux ermöglicht es, mehrere Agenten gleichzeitig in separaten Panels zu verwalten und zwischen ihnen zu wechseln.

## Nutzung

### Wie starte ich eine Multi-Agent Session?

```bash
# 4-Agent Orchestrierung starten
ccc orchestra start

# Spezifische Agenten-Kombination
ccc agents start claude-1 claude-2 --layout pipeline
```

### Wie kann ich Agenten zwischen Sessions wechseln?

```bash
# Zu Agent wechseln
ccc switch claude-1

# Kontext teilen
ccc context share --from claude-1 --to claude-2
```

### Was sind Workflows?

Workflows definieren, wie Agenten zusammenarbeiten:
- **Orchestra**: Koordinierte Zusammenarbeit mit einem Dirigenten
- **Swarm**: Parallele Bearbeitung von Teilaufgaben
- **Pipeline**: Sequenzielle Bearbeitung durch verschiedene Spezialisten

## Troubleshooting

### API Verbindung schlägt fehl

```bash
# API Keys prüfen
ccc test api --provider anthropic
ccc test api --provider openai

# Konfiguration überprüfen
ccc doctor
```

### Tmux Session funktioniert nicht

```bash
# Tmux Version prüfen
tmux -V

# Sessions zurücksetzen
tmux kill-server
ccc orchestra start
```

### Agent antwortet nicht

```bash
# Agent-Status prüfen
ccc status

# Session neu starten
ccc session restart claude-1
```

## Entwicklung

### Kann ich eigene Agenten erstellen?

Ja! Erstelle Agent-Profile in `~/.ccc/agents/`:

```yaml
# ~/.ccc/agents/custom-agent.yaml
name: "custom-agent"
model: "claude-3.5-sonnet"
role: "specialist"
prompts:
  system: "You are a specialist for..."
```

### Wie erweitere ich Workflows?

Workflow-Templates befinden sich in `~/.ccc/workflows/`. Du kannst eigene erstellen oder bestehende anpassen.

### Gibt es eine API?

CCC bietet sowohl eine CLI als auch eine Python API:

```python
from ccc import Orchestra

orchestra = Orchestra()
result = orchestra.run_task("Analyze this code...")
```

## Community

### Wo finde ich Hilfe?

- **GitHub Issues**: Bug Reports und Feature Requests
- **Discussions**: Community-Support und Ideen
- **Documentation**: Umfassende Anleitungen und Tutorials

### Wie kann ich beitragen?

Wir freuen uns über Beiträge! Siehe unsere [Contributing Guidelines](https://github.com/collective-context/ccc/blob/main/CONTRIBUTING.md).