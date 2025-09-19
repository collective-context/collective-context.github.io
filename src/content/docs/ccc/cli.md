---
description: Command Line Interface Referenz
title: CCC CLI Reference
---

## 🚀 Quick Start - Version Management

CCC supports multiple installation modes for different use cases:

### Check Current Version
```bash
ccc version
```

### Config-Based Mode Management

**Set Preferred Mode:**
```bash
# Configure preferred mode (stored in ~/.config/ccc/config.json)
ccc config mode set dev      # Development mode
ccc config mode set pipx     # Production mode
ccc config mode set apt      # System mode (future)

# Check current configuration
ccc config mode
```

**Switch Between Versions:**

**Development Mode** (Full Features + Session Management):
```bash
# Set and activate development mode
ccc config mode set dev
export PATH=/usr/local/bin:$PATH
ccc version  # → v0.3.2-dev, Mode: dev
```

**Production Mode** (PyPI Package):
```bash
# Set and activate pipx mode
ccc config mode set pipx
export PATH=$HOME/.local/bin:$PATH
ccc version  # → v0.3.2, Mode: pipx
```

**System Mode** (Coming Soon):
```bash
# Future: apt install ccc
sudo apt install ccc
ccc version  # → Mode: apt
```

### Configuration Management
```bash
ccc config mode                 # Show current configuration
ccc config mode set <mode>      # Set preferred mode
ccc config mode reset           # Reset to auto mode

# Alternative: Legacy version switching
ccc version dev                 # Quick switch to development
ccc version pipx                # Quick switch to pipx
```

---

## Global Options

```bash
ccc --version                    # Show version
ccc --help                      # Show help
ccc --config /path/to/config    # Use custom config
ccc --verbose                   # Enable debug output
```

## Agent Management

### Agent Commands
```bash
# Start agents
ccc agent start <name>              # Start specific agent
ccc agent start --all               # Start all configured agents
ccc agent start claude-1 --role=architect --temperature=0.3

# Agent status
ccc agent status                    # Show all agent status
ccc agent status <name>            # Show specific agent status
ccc agent list                     # List configured agents

# Stop agents
ccc agent stop <name>              # Stop specific agent
ccc agent stop --all               # Stop all agents
ccc agent restart <name>           # Restart agent
```

### Agent Configuration
```bash
ccc agent config <name>            # Show agent config
ccc agent config <name> --edit     # Edit agent config
ccc agent create <name>            # Create new agent profile
```

## Tmux Integration

### Layout Management
```bash
ccc tmux init                      # Initialize default layout
ccc tmux init --agents=4           # 4-pane layout
ccc tmux init --layout=orchestra   # Orchestra pattern
ccc tmux init --layout=swarm       # Swarm pattern
ccc tmux init --layout=pipeline    # Pipeline pattern

ccc tmux status                    # Show current tmux state
ccc tmux kill                      # Kill all tmux sessions
```

### Session Management
```bash
ccc tmux attach                    # Attach to session
ccc tmux detach                    # Detach from session
ccc tmux new --name=project-x      # Create named session
```

## Context Management

### Context Operations
```bash
ccc context init "Project description"    # Initialize context
ccc context show                          # Show current context
ccc context sync --all                    # Sync to all agents
ccc context sync --agent=claude-1        # Sync to specific agent

ccc context save <name>                   # Save context snapshot
ccc context load <name>                   # Load context snapshot
ccc context list                          # List saved contexts
```

### Context Sharing
```bash
ccc context export context.json          # Export to file
ccc context import context.json          # Import from file
ccc context merge <context-name>         # Merge contexts
```

## Workflow Management

### Workflow Control
```bash
ccc workflow start <pattern>             # Start workflow pattern
ccc workflow status                      # Show workflow status
ccc workflow stop                        # Stop current workflow
ccc workflow list                        # List available workflows

ccc workflow create <name>               # Create custom workflow
ccc workflow edit <name>                 # Edit workflow definition
```

### Predefined Workflows
```bash
ccc workflow start orchestra            # Start orchestra pattern
ccc workflow start swarm                # Start swarm pattern
ccc workflow start pipeline             # Start pipeline pattern
```

## Monitoring & Logging

### Real-time Monitoring
```bash
ccc monitor                              # Live dashboard
ccc monitor --agent=claude-1             # Agent-specific monitor
ccc monitor --export=metrics.json        # Export metrics

ccc logs                                 # Show all logs
ccc logs --agent=claude-1                # Agent-specific logs
ccc logs --follow                        # Follow logs in real-time
ccc logs --level=error                   # Filter by log level
```

### Performance Metrics
```bash
ccc metrics                              # Show performance metrics
ccc metrics --export=json                # Export to JSON
ccc metrics --export=csv                 # Export to CSV
ccc metrics --timerange=24h              # Metrics for last 24h
```

## Configuration

### Config Management
```bash
ccc config show                          # Show current config
ccc config edit                          # Edit config in editor
ccc config reset                         # Reset to defaults
ccc config validate                      # Validate config syntax
```

### Environment Setup
```bash
ccc setup                               # Interactive setup wizard
ccc setup --api-keys                    # Setup API keys only
ccc setup --tmux                        # Setup tmux integration only
```

## System Commands

### Health & Diagnostics
```bash
ccc doctor                              # System health check
ccc test connection                     # Test agent connectivity
ccc test api --provider=anthropic       # Test specific API
ccc test tmux                           # Test tmux integration
```

### Maintenance
```bash
ccc cleanup                             # Clean temporary files
ccc cache clear                         # Clear internal cache
ccc update                              # Update CCC to latest version
```

## Examples

### Quick Start Sequence
```bash
# 1. Setup
ccc init

# 2. Start 4-agent setup
ccc tmux init --agents=4
ccc agent start --all

# 3. Initialize project
ccc context init "Build web app with authentication"
ccc context sync --all

# 4. Monitor progress
ccc monitor --live
```

### Custom Workflow
```bash
# Create custom workflow
ccc workflow create my-workflow

# Start with specific context
ccc workflow start my-workflow
ccc context init "Custom project requirements"

# Monitor and export metrics
ccc monitor --export=project-metrics.json
```