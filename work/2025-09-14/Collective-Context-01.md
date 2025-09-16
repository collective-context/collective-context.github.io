# 🔧 Arbeitsauftrag für Claude-1: Navigation Fix collective-context.org

## 📍 Context
**Arbeitsverzeichnis**: `~/prog/ai/collective-context.github.io`  
**Problem**: Navigation zeigt auf nicht-existierende Seiten → 404 Fehler  
**Ziel**: Alle Links funktionsfähig machen durch Erstellen der fehlenden Seiten

## 🎯 Deine Aufgabe

### 1. Status Check
```bash
cd ~/prog/ai/collective-context.github.io
pwd
ls -la src/content/docs/
```
Bestätige das Arbeitsverzeichnis und zeige aktuelle Struktur.

### 2. Fehlende Verzeichnisse erstellen
```bash
mkdir -p src/content/docs/agents
mkdir -p src/content/docs/patterns
mkdir -p src/content/docs/guides
mkdir -p src/content/docs/tools
```

### 3. Erstelle alle fehlenden Seiten

#### 3.1 Agents Overview
```bash
cat > src/content/docs/agents/overview.md << 'EOF'
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
EOF
```

#### 3.2 Tmux Workflows
```bash
cat > src/content/docs/agents/tmux-workflows.md << 'EOF'
---
title: Tmux Workflow Setup
description: Multi-Terminal Orchestrierung mit tmux
---

# Tmux Workflow Setup

## Quick Start

```bash
# Neue tmux Session starten
tmux new -s cc-work

# 4 Panes erstellen
Ctrl+b %  # Vertikal teilen
Ctrl+b "  # Horizontal teilen
```

## Optimales Layout

```
┌─────────────┬─────────────┐
│  Claude-1   │  Claude-2   │
│  Architect  │  Reviewer   │
├─────────────┼─────────────┤
│  Aider-1    │  Aider-2    │
│  Main Dev   │  Parallel   │
└─────────────┴─────────────┘
```
EOF
```

#### 3.3 Claude Instanzen
```bash
# Claude-1
cat > src/content/docs/agents/claude-1.md << 'EOF'
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

## Optimale Temperature: 0.3

Niedrige Temperature für konsistente Architektur-Entscheidungen.
EOF

# Claude-2
cat > src/content/docs/agents/claude-2.md << 'EOF'
---
title: Claude-2 Code Reviewer
description: Quality Gate und Best Practices Guardian
---

# Claude-2: Code Reviewer

## Rolle & Verantwortung

Claude-2 agiert als Quality Gate:

- **Review Fokus**:
  - Code-Qualität
  - Security Vulnerabilities
  - Performance
  - Best Practices
  - Test Coverage

## Optimale Temperature: 0.1

Sehr niedrige Temperature für strikte, konsistente Reviews.
EOF
```

#### 3.4 Aider Instanzen
```bash
# Aider-1
cat > src/content/docs/agents/aider-1.md << 'EOF'
---
title: Aider-1 Main Developer
description: Haupt-Entwickler für Feature-Implementation
---

# Aider-1: Main Developer

## Rolle & Verantwortung

Der primäre Entwickler im System:

- **Fokus**: Core Features und Business Logic
- **Temperature**: 0.5
- **Tools**: Git Integration, Auto-Commit

## Workflow Integration

1. Erhält Specs von Claude-1
2. Implementiert Features
3. Committed automatisch zu Git
4. Übergibt an Claude-2 für Review
EOF

# Aider-2
cat > src/content/docs/agents/aider-2.md << 'EOF'
---
title: Aider-2 Parallel Developer
description: Tests, Docs und Refactoring Spezialist
---

# Aider-2: Parallel Developer

## Rolle & Verantwortung

Parallel-Entwicklung für Support-Tasks:

- **Aufgaben**: Tests, Documentation, Refactoring
- **Temperature**: 0.5
- **Workflow**: Git Worktrees für konfliktfreie Parallelarbeit
EOF
```

#### 3.5 Orchestration Patterns
```bash
# Orchestra Pattern
cat > src/content/docs/patterns/orchestra.md << 'EOF'
---
title: Orchestra Pattern
description: Zentrale Orchestrierung mehrerer Agenten
---

# Orchestra Pattern

## Konzept

Ein zentraler "Dirigent" koordiniert spezialisierte Agenten.

## Vorteile

- Klare Hierarchie
- Spezialisierung
- Parallelisierung
- Qualitätssicherung

## Implementation

User → Claude-1 → Aider-1/2 → Claude-2 → Output
EOF

# Weitere Patterns
cat > src/content/docs/patterns/swarm.md << 'EOF'
---
title: Swarm Pattern
description: Dezentrale Agent-Koordination
---

# Swarm Pattern

Agenten koordinieren sich selbstständig ohne zentrale Kontrolle.
EOF

cat > src/content/docs/patterns/pipeline.md << 'EOF'
---
title: Pipeline Pattern
description: Sequentielle Verarbeitung durch Agent-Kette
---

# Pipeline Pattern

Aufgaben durchlaufen sequentiell verschiedene Agent-Stufen.
EOF
```

#### 3.6 Guides & Tools
```bash
# Example Guide
cat > src/content/docs/guides/example.md << 'EOF'
---
title: Example Guide
description: Beispiel für einen Guide
---

# Example Guide

Placeholder für zukünftige Guides.
EOF

# CCC Commander Pages
cat > src/content/docs/tools/ccc-overview.md << 'EOF'
---
title: CCC Commander Overview
description: Python Tool für Agent-Orchestrierung
---

# CCC Commander Overview

Das CCC Tool automatisiert die Agent-Orchestrierung.
EOF

cat > src/content/docs/tools/ccc-installation.md << 'EOF'
---
title: CCC Installation
description: CCC Commander installieren
---

# CCC Commander Installation

```bash
pip install ccc-commander
ccc init
```
EOF

cat > src/content/docs/tools/ccc-reference.md << 'EOF'
---
title: CCC CLI Reference
description: Command Line Interface Referenz
---

# CCC CLI Reference

## Commands

- `ccc start --agents 4`
- `ccc status`
- `ccc stop`
EOF
```

### 4. Navigation Config anpassen

Überprüfe und update `astro.config.mjs` falls nötig. Die Sidebar-Links sollten auf die jetzt existierenden Dateien zeigen.

### 5. Lokal testen
```bash
npm run dev
```
Öffne http://localhost:4321 und teste ALLE Links in der Navigation.

### 6. Git Commit & Push
```bash
git add .
git status  # Zeige alle neuen Dateien
git commit -m "fix: Add all missing documentation pages - fixes 404 errors"
git push origin main
```

### 7. Deployment verifizieren
```bash
# Check GitHub Actions
echo "Check: https://github.com/collective-context/collective-context.github.io/actions"

# Warte 2 Minuten, dann:
curl -I https://collective-context.org/quickstart/4-agent-setup/
# Sollte HTTP 200 zurückgeben
```

## ✅ Erfolgskriterien

- [ ] Alle Verzeichnisse erstellt
- [ ] Alle .md Dateien angelegt
- [ ] Lokal getestet - keine 404 mehr
- [ ] Git pushed
- [ ] Live-Site funktioniert

## 📊 Status-Report

Bitte melde zurück:
1. Anzahl erstellter Dateien
2. Git Commit Hash
3. Lokaler Test erfolgreich? (ja/nein)
4. GitHub Actions Status

---

**COLLECTIVE CONTEXT EVOLUTION** 🚀  
Dies ist ein kritischer Fix für die User Experience. Zeig was du kannst, Claude-1!
