---
title: CCC Commander Overview
description: Production-Ready Multi-Agent AI Orchestration Platform with Professional Build System (v0.3.4)
---

# CCC Commander Overview

Das **Collective Context Commander** (CCC) Tool automatisiert die Multi-Agent Orchestrierung mit revolutionärem Professional Build System.

:::tip[Latest Release v0.3.4]
🎉 **Professional Build System Release** mit 100% PPA Upload Erfolgsrate, flexiblen Abkürzungen und erweiterten Multi-Agent Features!
:::

## Was ist CCC?

CCC ist ein Python CLI-Tool, das:
- **Professional Package Deployment** zu Ubuntu PPA automatisiert
- **Multi-Agent Orchestrierung** mit flexiblen Abkürzungen
- **Session Management** mit JSON-Metadaten
- **Git Integration** für automatisierte Website-Updates
- **Context Synchronization** zwischen AI-Agents

## 🆕 Core Features (v0.3.4)

### 🏗️ Professional PPA Upload System
```bash
# 100% zuverlässiger Upload aller Pakete
ccc exec upload ppa              # Alle Pakete (base + meta)
ccc ex up ppa                    # Kurze Form

# Spezifische Pakete
ccc ex up ppa ccc                # Nur base package
ccc ex up ppa cccmd              # Nur meta package
ccc ex sh ppa                    # PPA Status anzeigen
```

### ⚡ Flexible Command Abbreviations
```bash
# Minimum 2-Zeichen Abkürzungen für alle Befehle
ccc version                      # Vollständiger Befehl
ccc ve                           # Kurze Form
ccc gi pu ccc te                 # git push ccc tests
ccc co mo dev                    # config mode dev
ccc ses man save test            # session manage save test
```

### 🤖 Enhanced Multi-Agent Context System
```bash
ccc context                      # Eigenen AI Kontext lesen
ccc co cl2                       # Claude-2's Kontext lesen
ccc context to cl2 -- "Hi"       # Nachricht an Claude-2
ccc context to all -- "Update"   # Broadcast an alle Agents
```

### 📝 JSON Session Management
```bash
ccc session manage save test     # Session mit Metadaten speichern
ccc ses man list                 # Alle JSON Sessions auflisten
ccc ses man load file.json       # Session laden und anzeigen
```

### 🚀 Git Integration
```bash
ccc git push homepage            # Website aktualisieren
ccc gi pu ccc                    # GitHub push (schnell)
ccc gi pu ccc te                 # Push mit Tests
```

## Architecture

```
┌─────────────────────────────────────┐
│           CCC Commander             │
├─────────────────────────────────────┤
│  Agent Manager │  Context Manager   │
│  Tmux Manager  │  Workflow Engine   │
├─────────────────────────────────────┤
│     Claude-1   │   Claude-2         │
│     Aider-1    │   Aider-2          │
└─────────────────────────────────────┘
```

## Installation & Setup

See [Installation Guide](/ccc/installation/) for detailed setup instructions.