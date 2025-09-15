---
title: Tmux Workflow Setup
description: Hybrid Multi-Provider Terminal Orchestrierung
---

# Tmux Workflow Setup

## Quick Start

```bash
# Neue tmux Session starten
tmux new -s cc-hybrid

# 4 Panes erstellen
Ctrl+b %  # Vertikal teilen
Ctrl+b "  # Horizontal teilen
```

## Terminal Layout (Hybrid Setup)

```
┌─────────────┬─────────────┐
│  Claude-1   │  Claude-2   │
│  (Aider)    │  (CCC/Code) │
│  Architect  │  Dev + Docs │
├─────────────┼─────────────┤
│  Aider-1    │  Aider-2    │
│  Main Dev   │  Parallel   │
│  (DeepSeek) │  (Apertus)  │
└─────────────┴─────────────┘
```

Browser: Claude-Max (Meta-Orchestrator)

## Hybrid Multi-Provider Workspace

### Pane 0 - Claude-1 (System Architect - FOSS Migration)
```bash
# Claude-1 nutzt Aider mit Claude 3.5 via OpenRouter
export OPENROUTER_API_KEY='sk-or-v1-...'
aider --model openrouter/anthropic/claude-3.5-sonnet --temperature 0.3 --architect
```

### Pane 1 - Claude-2 (Dev + Docs - CCC Testing)
```bash
# Claude-2 nutzt Claude Code/CCC für Testing und Baseline
ccc ses sta cl2  # oder: claude-code
```

### Pane 2 - Aider-1 (Main Implementation - FOSS)
```bash
# Aider-1 mit DeepSeek Coder für Cost-Efficient Development
aider --model openrouter/deepseek/deepseek-coder --temperature 0.5 --auto-commits --yes
```

### Pane 3 - Aider-2 (Privacy-First Testing - FOSS)
```bash
# Aider-2 mit Apertus für DSGVO-compliant Testing
export PUBLICAI_API_KEY='pub-...'
aider --model publicai/apertus-v1 --api-base https://api.publicai.co/v1 --temperature 0.5 --test-cmd=pytest
```

## Navigation Commands

| Command | Action |
|---------|--------|
| `Ctrl+b →/←/↑/↓` | Navigate panes |
| `Ctrl+b z` | Zoom pane |
| `Ctrl+b d` | Detach session |
| `tmux attach -t cc-hybrid` | Reattach |

## Hybrid Setup Script

Save as `cc-hybrid-setup.sh`:

```bash
#!/bin/bash

# CC Hybrid Session Setup
SESSION="cc-hybrid"

# Überprüfe API Keys
if [[ -z "$OPENROUTER_API_KEY" ]]; then
    echo "❌ OPENROUTER_API_KEY not set (für Claude-1 & Aider-1)"
    exit 1
fi

if [[ -z "$PUBLICAI_API_KEY" ]]; then
    echo "❌ PUBLICAI_API_KEY not set (für Aider-2)"
    exit 1
fi

# Überprüfe CCC Installation
if ! command -v ccc &> /dev/null; then
    echo "❌ CCC not installed (für Claude-2)"
    echo "Install: https://github.com/collective-context/ccc"
    exit 1
fi

# Neue Session erstellen
tmux new-session -d -s $SESSION

# Panes einrichten
tmux split-window -h
tmux split-window -v
tmux select-pane -t 0
tmux split-window -v

# Claude-1: Architecture mit Aider (FOSS)
tmux send-keys -t 0 'aider --model openrouter/anthropic/claude-3.5-sonnet --temperature 0.3' C-m

# Claude-2: Development mit CCC (Testing)
tmux send-keys -t 1 'ccc ses sta cl2' C-m

# Aider-1: Main Dev mit DeepSeek (Cost-Efficient)
tmux send-keys -t 2 'aider --model openrouter/deepseek/deepseek-coder --temperature 0.5 --auto-commits' C-m

# Aider-2: Privacy Testing mit Apertus (DSGVO)
tmux send-keys -t 3 'aider --model publicai/apertus-v1 --api-base https://api.publicai.co/v1 --temperature 0.5' C-m

# Attach zur Session
tmux attach-session -t $SESSION
```

## Hybrid Strategy Benefits

### 1. **Tool Comparison**
- **Claude-1 (Aider)** vs **Claude-2 (CCC)** Performance-Vergleich
- Direktes Feedback welches Tool für welche Tasks optimal ist
- Datenbasierte Entscheidungen für zukünftige Migrations-Schritte

### 2. **CCC Real-World Testing**
- Claude-2 nutzt unser eigenes CCC Tool in der täglichen Arbeit
- Dogfooding: Wir entwickeln und nutzen gleichzeitig
- Sofortiges Feedback für CCC Verbesserungen

### 3. **Risk Mitigation**
- Fallback-Option falls Aider-Probleme auftreten
- Schrittweise Migration statt Big Bang
- Bewährte Workflows bleiben verfügbar

### 4. **Best of Both Worlds**
- FOSS-Benefits: Transparenz, Community, Multi-Provider
- Proprietär-Benefits: Stabilität, Integration, Support

## Cost Optimization in Hybrid Mode

```bash
# Budget-optimierte Aliases
alias claude1-budget="aider --model openrouter/mistralai/mixtral-8x7b --temperature 0.3"
alias aider1-budget="aider --model openrouter/openchat/openchat-7b --temperature 0.5"

# Premium-Qualität für Critical Tasks
alias claude1-premium="aider --model openrouter/anthropic/claude-3.5-sonnet --temperature 0.3"
alias aider1-premium="aider --model openrouter/deepseek/deepseek-coder --temperature 0.5"

# Privacy-First für sensitive Tasks
alias aider2-privacy="aider --model publicai/apertus-v1 --api-base https://api.publicai.co/v1"
```

## KAIZEN Evolution Path

### Phase 1: Hybrid (Current)
- Claude-1: Aider, Claude-2: CCC, Aider-1/2: Aider
- Lernen und Vergleichen

### Phase 2: Data-Driven Decision
- Performance-Metriken sammeln
- User Experience evaluieren
- Cost-Benefit Analyse

### Phase 3: Optimization
- Best Tool für jeden Use Case
- Möglicherweise vollständige FOSS-Migration
- Oder optimierte Hybrid-Konfiguration

*Evolution through Experience - Das ist der CC Way!*