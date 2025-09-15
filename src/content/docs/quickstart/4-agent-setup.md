---
title: 4-Agent Setup in 5 Minuten
description: Der CC Standard Workflow - sofort einsatzbereit
---

# 4-Agent Setup Guide

## Der Collective Context Standard

Unser bewährtes Setup mit 4 spezialisierten KI-Agenten:

| Agent | Role | Temperature | Focus |
|-------|------|-------------|-------|
| **Claude-1** | System Architect | 0.3 | Design, Architecture, ADRs |
| **Claude-2** | Code Reviewer | 0.1 | Quality, Security, Best Practices |
| **Aider-1** | Main Developer | 0.5 | Implementation, Features |
| **Aider-2** | Parallel Dev | 0.5 | Tests, Refactoring, Docs |

## Prerequisites

- Linux/macOS (Windows mit WSL2)
- Python 3.10+
- tmux (`apt install tmux`)
- API Keys (Claude oder OpenAI)

## Installation

### Step 1: CCC Commander
```bash
pip install ccc
```

### Step 2: API Configuration
```bash
export ANTHROPIC_API_KEY="sk-ant-..."
export OPENAI_API_KEY="sk-..."
```

### Step 3: Tmux Layout
```bash
# Automated setup
ccc tmux init --agents 4

# Or manual:
tmux new-session -d -s cc
tmux split-window -h
tmux split-window -v
tmux select-pane -t 0
tmux split-window -v
tmux attach-session -t cc
```

### Step 4: Start Agents

**Pane 0 - Claude-1:**
```bash
ccc agent start claude-1 --role architect --temperature 0.3
```

**Pane 1 - Claude-2:**
```bash
ccc agent start claude-2 --role reviewer --temperature 0.1
```

**Pane 2 - Aider-1:**
```bash
aider --model gpt-4 --auto-commits --yes
```

**Pane 3 - Aider-2:**
```bash
aider --model gpt-4 --test-cmd pytest --yes
```

## Context Synchronization

```bash
# Initialize project context
ccc context init "Building next-gen e-commerce platform"

# Sync to all agents
ccc context sync --all
```

## Tmux Navigation

| Command | Action |
|---------|--------|
| `Ctrl-b →/←/↑/↓` | Navigate panes |
| `Ctrl-b z` | Zoom pane |
| `Ctrl-b d` | Detach |
| `tmux attach` | Reattach |

## Success Metrics

Mit diesem Setup erreichst du:
- **4x Development Speed**
- **80%+ Test Coverage**
- **50% weniger Bugs**
- **$50-100 pro Projekt** (API Kosten)

---

[← Back to Home](/) | [Tmux Workflows →](/agents/tmux-workflows/)