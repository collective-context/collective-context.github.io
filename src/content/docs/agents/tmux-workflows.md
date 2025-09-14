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

## Agent Configuration

### Pane 0 - Claude-1 (Architect)
```bash
# Start Claude-1 with architectural focus
claude-1 --role=architect --temperature=0.3
```

### Pane 1 - Claude-2 (Reviewer)
```bash
# Start Claude-2 with strict review settings
claude-2 --role=reviewer --temperature=0.1
```

### Pane 2 - Aider-1 (Main Dev)
```bash
# Primary development with auto-commits
aider --model=gpt-4 --auto-commits --yes
```

### Pane 3 - Aider-2 (Parallel Dev)
```bash
# Parallel development for tests and docs
aider --model=gpt-4 --test-cmd=pytest --yes
```

## Navigation Commands

| Command | Action |
|---------|--------|
| `Ctrl+b →/←/↑/↓` | Navigate panes |
| `Ctrl+b z` | Zoom pane |
| `Ctrl+b d` | Detach session |
| `tmux attach -t cc-work` | Reattach |

## Automation Script

Save as `cc-setup.sh`:

```bash
#!/bin/bash
tmux new-session -d -s cc-work
tmux split-window -h
tmux split-window -v
tmux select-pane -t 0
tmux split-window -v
tmux attach-session -t cc-work
```