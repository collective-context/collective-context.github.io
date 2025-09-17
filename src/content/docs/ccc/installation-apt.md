---
title: "APT Installation (Ubuntu)"
description: "Installation via Ubuntu PPA"
sidebar:
  order: 2
---

# Installation via APT (Ubuntu)

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

### Meta-Package: `cccmd`
Komplette Entwicklungsumgebung:
- `ccc` - Core Commander
- `tmux` - Session Management
- `git` - Version Control
- `curl`, `wget` - Download Tools
- `jq` - JSON Processing
- `pipx` - Python App Management

Empfohlene Zusatz-Pakete:
- `gh` - GitHub CLI
- `nodejs`, `npm` - JavaScript Tools
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