---
title: CCC v0.3.2 Quick Start Guide
description: Get started with the production-ready CCC Commander in 5 minutes
sidebar:
  order: 2
---

# 🚀 CCC v0.3.2 Quick Start Guide

Get up and running with the **production-ready** CCC Commander in just 5 minutes!

## 📦 Step 1: Installation

### Option A: pipx (Recommended)
```bash
# Install pipx if you don't have it
python3 -m pip install --user pipx
python3 -m pipx ensurepath

# Install CCC Commander
pipx install cccmd

# Verify installation
ccc version
```

### Option B: pip
```bash
pip install cccmd
ccc version
```

## 🎮 Step 2: First Commands

### Check System Status
```bash
# See all available commands
ccc help

# Check current configuration
ccc config

# List available services
ccc list
```

### Start Your First Session
```bash
# Start the autoinput service
ccc start autoinput

# Check status
ccc status autoinput

# Stop when done
ccc stop autoinput
```

## 🔧 Step 3: Advanced Features (v0.3.2)

### Multi-Agent Context System
```bash
# Read your AI instance context
ccc context

# Send message to another AI instance
ccc context to cl2 -- "Hello from Claude-1!"

# Broadcast to all instances
ccc context to all -- "Project update: v0.3.2 released!"
```

### Session Management
```bash
# Save current session
ccc session save

# Start session for specific AI
ccc session start cl1
```

### New v0.3.2 Commands
```bash
# Upload packages to Ubuntu PPA (if you're a maintainer)
ccc exec upload ppa

# Update homepage documentation
ccc git push homepage
```

## 📊 Step 4: Verify Installation Quality

Thanks to our **96-test suite**, you can verify everything works:

### Check Test Coverage
```bash
# If you have the source code:
git clone https://github.com/collective-context/ccc.git
cd ccc
make test

# Expected: 96 tests passing ✅
```

### Security Validation
```bash
# Run security checks (source install)
make security

# Expected: Zero critical issues ✅
```

## 🔗 Step 5: Integration Examples

### With Your Development Workflow
```bash
# Start multi-agent session for code review
ccc start autoinput -m -t=10 -- "Code review session"

# Monitor in real-time
ccc status --all
```

### Context Synchronization
```bash
# Initialize shared context
ccc context init "Building the next-gen platform"

# Sync across all agents
ccc context sync --all
```

## 📚 Next Steps

### Explore Advanced Features
- **[CLI Reference](/ccc/cli/)** - Complete command documentation
- **[Configuration](/ccc/configuration/)** - Customize your setup
- **[PPA Installation](/ccc/installation-apt/)** - Ubuntu native packages

### Stay Updated
- **GitHub**: [collective-context/ccc](https://github.com/collective-context/ccc)
- **PyPI**: [cccmd package](https://pypi.org/project/cccmd/)
- **Releases**: [v0.3.2 Release Notes](/ccc/release-v032/)

## 🎯 What Makes v0.3.2 Special?

| Feature | Benefit |
|---------|---------|
| **96 Tests** | Rock-solid reliability |
| **CI/CD Pipeline** | Continuous quality assurance |
| **Security Hardening** | Enterprise-ready safety |
| **Multi-Platform** | Works on Linux, macOS, Windows |
| **PPA Distribution** | Native Ubuntu/Debian packages |

## 💡 Pro Tips

1. **Use pipx** for isolated installation
2. **Start with `ccc help`** to explore commands
3. **Check `ccc status`** regularly for monitoring
4. **Use short forms**: `ccc ex up ppa` instead of `ccc exec upload ppa`
5. **Read the logs** in `local-only/logs/` for debugging

---

**🚀 Ready to orchestrate multiple AI agents?** Start with `ccc help` and explore the possibilities!

**⚡ Quick Install**: `pipx install cccmd && ccc version`