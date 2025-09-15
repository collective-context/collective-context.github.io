---
title: CCC Installation
description: CCC Commander installieren und einrichten
---

# CCC Commander Installation

## Requirements

- **Python**: 3.10 oder höher
- **tmux**: Für Multi-Panel Management
- **Git**: Für Aider Integration
- **API Keys**: Claude (Anthropic) oder OpenAI

## Installation

### Option 1: pip (Empfohlen)
```bash
pip install ccc
```

### Option 2: From Source
```bash
git clone https://github.com/collective-context/ccc
cd ccc
pip install -e .
```

## Setup

### 1. API Keys konfigurieren
```bash
# Anthropic Claude
export ANTHROPIC_API_KEY="sk-ant-..."

# OpenAI (für Aider)
export OPENAI_API_KEY="sk-..."

# Persistent speichern
echo 'export ANTHROPIC_API_KEY="sk-ant-..."' >> ~/.bashrc
echo 'export OPENAI_API_KEY="sk-..."' >> ~/.bashrc
```

### 2. CCC initialisieren
```bash
ccc init
```

Dies erstellt:
- `~/.ccc/config.yaml` - Hauptkonfiguration
- `~/.ccc/agents/` - Agent-Profile
- `~/.ccc/workflows/` - Workflow-Templates

### 3. Tmux installieren (falls nötig)
```bash
# Ubuntu/Debian
sudo apt install tmux

# macOS
brew install tmux

# Arch Linux
sudo pacman -S tmux
```

## Verification

```bash
# Version check
ccc --version

# System check
ccc doctor

# Test agent communication
ccc test connection
```

## Configuration

Edit `~/.ccc/config.yaml`:

```yaml
agents:
  claude-1:
    model: "claude-3.5-sonnet"
    temperature: 0.3
    role: "architect"
  claude-2:
    model: "claude-3.5-sonnet" 
    temperature: 0.1
    role: "reviewer"

tmux:
  session_name: "cc-work"
  default_layout: "orchestra"

workflows:
  default: "orchestra"
  available: ["orchestra", "swarm", "pipeline"]
```

## Troubleshooting

### API Key Issues
```bash
# Test API connectivity
ccc test api --provider anthropic
ccc test api --provider openai
```

### Tmux Issues
```bash
# Check tmux availability
which tmux
tmux -V

# Reset tmux sessions
tmux kill-server
```

### Permission Issues
```bash
# Fix pip permissions (if needed)
pip install --user collective-context-commander
```

## 🔒 Sicherheits-Best Practices

### Environment Variables einrichten

**Niemals API Keys im Code speichern!**

```bash
# .env Datei erstellen (NICHT ins Repository committen!)
cat > .env << EOF
ANTHROPIC_API_KEY=sk-ant-...
OPENROUTER_API_KEY=sk-or-...
EOF

# .env zu .gitignore hinzufügen
echo ".env" >> .gitignore
```

### Sichere Konfiguration

Seit v0.2.0 nutzt CCC JSON-basierte Konfigurationen:

```json
// config-json/global/config.json
{
  "prompts": {
    "system": "You are a helpful assistant"
  },
  "settings": {
    "temperature": 0.7
  }
}
```

**Wichtig**: Keine `.ts` Konfigurationsdateien mehr verwenden!

### Berechtigungen einschränken

```bash
# Nur notwendige Berechtigungen
chmod 600 .env
chmod 644 config-json/**/*.json
```

## Next Steps

Nach erfolgreicher Installation:
1. [CLI Reference](/ccc/cli/) - Alle verfügbaren Commands
2. [Quick Start](/quickstart/4-agent-setup/) - Erstes Multi-Agent Setup
3. [Workflows](/agents/tmux-workflows/) - Tmux Integration nutzen
4. [Security Notice](/security/notice/) - Wichtige Sicherheitsinformationen