---
title: CCC Commander Installation
description: Install cccmd v0.3.2 - Production Ready Multi-Agent Orchestration
sidebar:
  order: 1
---

# CCC Commander (cccmd) Installation

:::tip[Latest Version: v0.3.2]
🎉 **Production-ready release** with 96 tests, CI/CD pipeline, and enterprise features!
:::

## 🚀 Quick Install

### Empfohlen: pipx

```bash
# pipx installieren (falls nicht vorhanden)
python3 -m pip install --user pipx
python3 -m pipx ensurepath

# cccmd installieren
pipx install cccmd

# ✅ Verfügbar als: ccc und cccmd
ccc version
```

### 🔄 Nach der Installation: Version Management

**Erste Schritte - Überprüfe deine Installation:**
```bash
ccc version
# → CCC Commander (cccmd) v0.3.2
# → Mode: pipx (PyPI package)
```

**Für Development/Vollständige Features:**
```bash
# Set preferred mode via config (empfohlen)
ccc config mode set dev
# → ✅ Preferred mode changed: auto → dev
# → 🔄 To activate: export PATH=/usr/local/bin:$PATH

# Aktivieren für diese Session
export PATH=/usr/local/bin:$PATH
ccc version  # → v0.3.2-dev, Mode: dev
```

**Was sind die Modi?**
- **pipx Mode**: Stable PyPI package, grundlegende Commands
- **dev Mode**: Vollständiges Session-Management, alle Features
- **apt Mode**: System package (kommend)

### Alternative: pip

```bash
pip install --user cccmd
```

## 📦 Platform-spezifische Installation

### Ubuntu (PPA)

```bash
# PPA hinzufügen
sudo add-apt-repository ppa:collective-context/ccc
sudo apt update

# Installation
sudo apt install cccmd
```

### Debian

Für Debian nutze die Python-Installation via pipx oder pip (siehe oben).

Ein natives APT-Repository kommt Q4 2025!

### macOS

```bash
# Via pipx
pipx install cccmd

# Oder via Homebrew (coming soon)
# brew install collective-context/tap/cccmd
```

### Windows

```powershell
# Via pipx
pipx install cccmd

# Oder via pip
pip install --user cccmd
```

## 🔧 Development Installation

```bash
# Repository klonen
git clone https://github.com/collective-context/ccc
cd ccc

# Development Installation
pip install -e ".[dev]"

# Tests ausführen
pytest
```

## ✅ Installation verifizieren

```bash
# Version prüfen
cccmd --version

# Hilfe anzeigen
cccmd --help

# Konfiguration testen
cccmd config check
```

## 📁 Installationspfade

cccmd folgt der XDG Base Directory Specification:

| Component | Pfad |
|-----------|------|
| Binary | `~/.local/bin/cccmd` |
| Config | `~/.config/ccc/` |
| Data | `~/.local/share/ccc/` |
| Cache | `~/.cache/ccc/` |

## 🆘 Troubleshooting

### Command not found

```bash
# PATH prüfen
echo $PATH | grep -q "$HOME/.local/bin" || echo "PATH needs update"

# PATH updaten
export PATH="$HOME/.local/bin:$PATH"
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
```

### Permission denied

```bash
# Mit --user flag installieren
pip install --user cccmd

# Oder pipx verwenden (empfohlen)
pipx install cccmd
```

## 📈 Updates

```bash
# Mit pipx
pipx upgrade cccmd

# Mit pip
pip install --upgrade cccmd

# Mit apt (Ubuntu)
sudo apt update && sudo apt upgrade cccmd
```