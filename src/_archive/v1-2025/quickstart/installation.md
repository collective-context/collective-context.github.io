---
title: Installation & Einrichtung
description: Collective Context System installieren und einrichten
---

## System Requirements

- **Operating System**: Linux, macOS, or Windows (mit WSL2)
- **Python**: 3.10 oder höher
- **tmux**: Für Multi-Panel Management
- **Git**: Für Code-Integration
- **API Keys**: Claude (Anthropic) und/oder OpenAI

## Quick Install

### 1. Prerequisites installieren

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install python3 python3-pip tmux git
```

**macOS:**
```bash
# Mit Homebrew
brew install python tmux git
```

**Windows (WSL2):**
```bash
# In WSL2 Terminal
sudo apt update && sudo apt install python3 python3-pip tmux git
```

### 2. CCC Commander installieren

```bash
# Via pip (empfohlen)
pip install ccc

# Oder von Source
git clone https://github.com/collective-context/ccc
cd ccc
pip install -e .
```

### 3. API Keys konfigurieren

**Anthropic Claude:**
```bash
export ANTHROPIC_API_KEY="sk-ant-api03-..."
```

**OpenAI (für Aider):**
```bash
export OPENAI_API_KEY="sk-..."
```

**Persistent speichern:**
```bash
echo 'export ANTHROPIC_API_KEY="sk-ant-..."' >> ~/.bashrc
echo 'export OPENAI_API_KEY="sk-..."' >> ~/.bashrc
source ~/.bashrc
```

## Detailed Setup

### Aider Installation
```bash
# Aider für Code-Entwicklung
pip install aider-chat

# Verify installation
aider --version
```

### Tmux Konfiguration
```bash
# Basis tmux config erstellen
cat > ~/.tmux.conf << 'EOF'
# CC Standard Config
set -g mouse on
set -g base-index 1
set -g pane-base-index 1

# Keybindings
bind-key % split-window -h -c "#{pane_current_path}"
bind-key '"' split-window -v -c "#{pane_current_path}"
EOF

# Reload config
tmux source-file ~/.tmux.conf
```

### Verification

```bash
# System Check
ccc doctor

# Test API Connectivity
ccc test api --provider=anthropic
ccc test api --provider=openai

# Test tmux Integration  
ccc test tmux
```

## Project Setup

### 1. Neues Projekt initialisieren
```bash
mkdir my-project
cd my-project
git init

# CCC für Projekt konfigurieren
ccc init
```

### 2. 4-Agent Setup starten
```bash
# Tmux Layout erstellen
ccc tmux init --agents=4

# Agents starten
ccc agent start --all

# Projekt Context setzen
ccc context init "Building web application with authentication"
```

## API Keys erhalten

### Anthropic Claude API
1. Gehe zu https://console.anthropic.com
2. Erstelle Account oder login
3. Navigiere zu "API Keys"
4. Erstelle neuen API Key
5. Kopiere Key (beginnt mit `sk-ant-`)

### OpenAI API
1. Gehe zu https://platform.openai.com
2. Erstelle Account oder login
3. Navigiere zu "API Keys"
4. Erstelle neuen API Key
5. Kopiere Key (beginnt mit `sk-`)

## Troubleshooting

### Permission Errors
```bash
# User Installation
pip install --user collective-context-commander

# Python Path
export PATH="$HOME/.local/bin:$PATH"
```

### tmux Issues
```bash
# Install tmux wenn missing
# Ubuntu/Debian
sudo apt install tmux

# macOS
brew install tmux

# Test tmux
tmux new -d -s test && tmux kill-session -t test
```

### API Connection Issues
```bash
# Test API Keys
curl -H "Authorization: Bearer $ANTHROPIC_API_KEY" \
     https://api.anthropic.com/v1/complete

# Check environment
echo $ANTHROPIC_API_KEY
echo $OPENAI_API_KEY
```

## Next Steps

Nach erfolgreicher Installation:

1. [4-Agent Setup Guide](/quickstart/4-agent-setup/) - Ersten Multi-Agent Workflow starten
2. [Tmux Workflows](/agents/tmux-workflows/) - Terminal-Setup optimieren  
3. [CCC CLI Reference](/ccc/cli/) - Alle verfügbaren Commands

## Getting Help

- **Documentation**: https://collective-context.org
- **GitHub Issues**: https://github.com/collective-context/ccc/issues
- **Discord Community**: https://discord.gg/collective-context

---

**Ready to revolutionize your development workflow? Start with the [4-Agent Setup](/quickstart/4-agent-setup/)!**