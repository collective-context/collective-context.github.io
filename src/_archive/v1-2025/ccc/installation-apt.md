---
title: "APT Installation (Ubuntu)"
description: "Installation via Ubuntu PPA"
sidebar:
  order: 2
---

# Installation via APT (Ubuntu)

> 🎉 **LIVE NOW!** CCC is officially available on Ubuntu via PPA!

## 🚀 Quick Install

### Basis-Installation (nur CCC)
```bash
sudo add-apt-repository ppa:collective-context/ccc
sudo apt update
sudo apt install ccc
```

### Vollständige Suite (CCC + Tools)
```bash
sudo add-apt-repository ppa:collective-context/ccc
sudo apt update
sudo apt install cccmd
```

## 📦 Was wird installiert?

### Package: `ccc`
Nur der CCC Commander:
- `/usr/bin/ccc` - Hauptcommand
- `/usr/bin/cccmd` - Alias
- Python Dependencies

### Meta-Package: `cccmd` *(Coming Soon)*
Komplette Entwicklungsumgebung:
- `ccc` - Core Commander
- `tmux` - Session Management
- `git` - Version Control
- `pipx` - Python App Management
- `npm`, `nodejs` - JavaScript Tools
- `python3`, `python3-pip`, `python3-venv` - Python Development
- `jq` - JSON Processing
- `sqlite3` - Database
- `inotify-tools` - File Monitoring
- `build-essential`, `devscripts` - Build Tools

## 🌐 Ubuntu Versions

**Currently Available:**
- ✅ **Ubuntu 22.04 LTS (Jammy)** - Fully supported
- 🚧 **Ubuntu 24.04 LTS (Noble)** - Coming soon

**PPA Information:**
- Repository: `ppa:collective-context/ccc`
- Launchpad: https://launchpad.net/~collective-context/+archive/ubuntu/ccc

Empfohlene Zusatz-Pakete:
- `gh` - GitHub CLI
- `docker.io` oder `podman` - Container

## 🔄 Updates

```bash
# Normale System-Updates
sudo apt update
sudo apt upgrade

# Nur CCC updaten
sudo apt update
sudo apt install --only-upgrade ccc
```

## ⚙️ Post-Installation

### Aider installieren (für AI-Coding)
```bash
pipx install aider-chat
```

### Session Management aktivieren
```bash
# Neue tmux session starten
tmux new -s collective-context

# CCC initialisieren
ccc init
```

## 🐛 Troubleshooting

### PPA nicht gefunden
```bash
# Software properties installieren
sudo apt install software-properties-common

# Nochmal versuchen
sudo add-apt-repository ppa:collective-context/ccc
```

### Alte Version entfernen
```bash
# Wenn via pip installiert
pip uninstall cccmd

# APT Version installieren
sudo apt install ccc
```