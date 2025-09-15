---
title: Tmux Workflow Setup
description: Multi-Terminal Orchestrierung mit Aider Multi-Provider
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

## Terminal Layout (NEU)

```
┌─────────────┬─────────────┐
│  Aider-1    │  Aider-2    │
│  Architect  │  Reviewer   │
│  (Claude)   │  (Apertus)  │
├─────────────┼─────────────┤
│  Aider-3    │  Aider-4    │
│  Main Dev   │  Parallel   │
│  (DeepSeek) │  (Mixtral)  │
└─────────────┴─────────────┘
```

Browser: Claude-Max (Meta-Orchestrator)

## Multi-Provider Workspace

### Pane 0 - Aider-1 (System Architect)
```bash
# Claude 3.5 Sonnet via OpenRouter - höchste Qualität für Architecture
export OPENROUTER_API_KEY='sk-or-v1-...'
aider --model openrouter/anthropic/claude-3.5-sonnet --architect
```

### Pane 1 - Aider-2 (Privacy-First Reviewer)
```bash
# Apertus via PublicAI - Schweizer Datenschutz für Reviews
export PUBLICAI_API_KEY='pub-...'
aider --model publicai/apertus-v1 --api-base https://api.publicai.co/v1 --review
```

### Pane 2 - Aider-3 (Main Implementation)
```bash
# DeepSeek Coder via OpenRouter - beste Code-Qualität für Hauptarbeit
aider --model openrouter/deepseek/deepseek-coder --auto-commits --yes
```

### Pane 3 - Aider-4 (Tests & Docs)
```bash
# Mixtral via OpenRouter - kosteneffizient für Tests und Dokumentation
aider --model openrouter/mistralai/mixtral-8x22b --test-cmd=pytest --yes
```

## Navigation Commands

| Command | Action |
|---------|--------|
| `Ctrl+b →/←/↑/↓` | Navigate panes |
| `Ctrl+b z` | Zoom pane |
| `Ctrl+b d` | Detach session |
| `tmux attach -t cc-work` | Reattach |

## Multi-Provider Setup Script

Save as `cc-multi-provider-setup.sh`:

```bash
#!/bin/bash

# Multi-Provider CC Session Setup
SESSION="cc-multi-provider"

# Überprüfe API Keys
if [[ -z "$OPENROUTER_API_KEY" ]]; then
    echo "❌ OPENROUTER_API_KEY not set"
    exit 1
fi

if [[ -z "$PUBLICAI_API_KEY" ]]; then
    echo "❌ PUBLICAI_API_KEY not set"
    exit 1
fi

# Neue Session erstellen
tmux new-session -d -s $SESSION

# Panes einrichten
tmux split-window -h
tmux split-window -v
tmux select-pane -t 0
tmux split-window -v

# Aider-1: Architecture (Claude 3.5)
tmux send-keys -t 0 'aider --model openrouter/anthropic/claude-3.5-sonnet' C-m

# Aider-2: Privacy Review (Apertus)
tmux send-keys -t 1 'aider --model publicai/apertus-v1 --api-base https://api.publicai.co/v1' C-m

# Aider-3: Main Dev (DeepSeek)
tmux send-keys -t 2 'aider --model openrouter/deepseek/deepseek-coder --auto-commits' C-m

# Aider-4: Tests (Mixtral)
tmux send-keys -t 3 'aider --model openrouter/mistralai/mixtral-8x22b --test-cmd=pytest' C-m

# Attach zur Session
tmux attach-session -t $SESSION
```

## Cost Optimization Tips

1. **Development Phase**: Nutze günstige Modelle (Mixtral, GPT-3.5)
2. **Critical Reviews**: Upgrade zu Claude 3.5 Sonnet
3. **Privacy Projects**: Ausschließlich Apertus
4. **Budget Monitoring**: Setze Provider-Limits

## Provider-Switching Commands

```bash
# Quick provider switch aliases
alias cc-premium="export AIDER_MODEL=openrouter/anthropic/claude-3.5-sonnet"
alias cc-budget="export AIDER_MODEL=openrouter/mistralai/mixtral-8x7b"
alias cc-privacy="export AIDER_MODEL=publicai/apertus-v1"
```