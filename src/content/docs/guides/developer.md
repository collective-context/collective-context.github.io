---
title: Developer Guide
description: Entwicklungsumgebung für Collective Context
---

# Developer Guide

## Verzeichnisstruktur

Alle Collective Context Projekte befinden sich unter:
```
~/prog/ai/git/collective-context/
├── ccc/                           # CCC Commander
├── collective-context.github.io/  # Website & Docs
└── other-projects/                # Weitere CC Projekte
```

## Development Setup

### 1. Workspace vorbereiten

```bash
# Basis-Verzeichnis erstellen
mkdir -p ~/prog/ai/git/collective-context
cd ~/prog/ai/git/collective-context

# Repositories klonen
git clone https://github.com/collective-context/ccc.git
git clone https://github.com/collective-context/collective-context.github.io.git
```

### 2. CCC Development Installation

```bash
cd ~/prog/ai/git/collective-context/ccc

# Virtual Environment (empfohlen)
python3 -m venv venv
source venv/bin/activate

# Development Dependencies
pip install -e ".[dev]"

# Tests ausführen
pytest
npm test  # für TypeScript Tests
```

### 3. XDG-konforme Entwicklung

CCC folgt der XDG Base Directory Specification:

```python
# src/ccc/paths.py
import os
from pathlib import Path

class CCCPaths:
    @property
    def data_home(self) -> Path:
        """XDG_DATA_HOME oder ~/.local/share/ccc"""
        xdg_data = os.environ.get('XDG_DATA_HOME')
        if xdg_data:
            return Path(xdg_data) / 'ccc'
        return Path.home() / '.local' / 'share' / 'ccc'

    @property
    def config_home(self) -> Path:
        """XDG_CONFIG_HOME oder ~/.config/ccc"""
        xdg_config = os.environ.get('XDG_CONFIG_HOME')
        if xdg_config:
            return Path(xdg_config) / 'ccc'
        return Path.home() / '.config' / 'ccc'
```

## Development Workflow

### Branch-Strategie

```bash
# Feature entwickeln
git checkout -b feature/neue-funktion

# Regelmäßige Commits
git add .
git commit -m "feat: neue Funktion implementiert"

# Pull Request erstellen
git push origin feature/neue-funktion
```

### Testing

```bash
# Python Tests
pytest tests/
pytest --cov=ccc tests/  # Mit Coverage

# TypeScript Tests
npm test
npm run test:coverage

# Integration Tests
pytest tests/integration/
```

### Code Quality

```bash
# Linting
ruff check .
black .
mypy ccc/

# Pre-commit Hooks (empfohlen)
pre-commit install
```

## Packaging & Distribution

### Development Build

```bash
# Lokaler Build
python -m build

# Test Installation
pip install dist/collective-context-ccc-*.whl
```

### Release Process

```bash
# Version bumpen
sed -i 's/version = "0.2.0"/version = "0.3.0"/' pyproject.toml

# Build für PyPI
python -m build
twine check dist/*

# Upload zu TestPyPI
twine upload --repository testpypi dist/*

# Upload zu PyPI
twine upload dist/*
```

## XDG Standards Implementation

### Verzeichnisse automatisch erstellen

```python
def ensure_xdg_directories():
    """Stelle sicher, dass alle XDG-Verzeichnisse existieren"""
    paths = CCCPaths()

    # Erstelle benötigte Verzeichnisse
    paths.data_home.mkdir(parents=True, exist_ok=True)
    paths.config_home.mkdir(parents=True, exist_ok=True)
    (paths.data_home / "sessions").mkdir(exist_ok=True)
    (paths.data_home / "cache").mkdir(exist_ok=True)
```

### Migration Helper

```python
def migrate_old_config():
    """Migriere alte ~/.ccc Konfiguration zu XDG"""
    old_config = Path.home() / ".ccc"
    new_paths = CCCPaths()

    if old_config.exists():
        # Konfiguration migrieren
        if (old_config / "config.yaml").exists():
            shutil.copy2(old_config / "config.yaml",
                        new_paths.config_home / "config.json")

        # Sessions migrieren
        if (old_config / "sessions").exists():
            shutil.copytree(old_config / "sessions",
                           new_paths.data_home / "sessions")
```

## Environment Setup für Developer

### Development Environment Variables

```bash
# Development-spezifische Einstellungen
export CCC_ENV="development"
export CCC_LOG_LEVEL="DEBUG"
export CCC_CONFIG="./config-json/dev/config.json"

# Für Testing
export CCC_TEST_MODE="true"
export CCC_DATA_HOME="./test-data"
```

### IDE Konfiguration

#### VSCode (.vscode/settings.json)

```json
{
  "python.defaultInterpreterPath": "./venv/bin/python",
  "python.linting.enabled": true,
  "python.linting.ruffEnabled": true,
  "python.formatting.provider": "black",
  "python.testing.pytestEnabled": true
}
```

#### Pre-commit Configuration (.pre-commit-config.yaml)

```yaml
repos:
  - repo: https://github.com/psf/black
    rev: 23.9.1
    hooks:
      - id: black

  - repo: https://github.com/charliermarsh/ruff-pre-commit
    rev: v0.1.0
    hooks:
      - id: ruff

  - repo: https://github.com/pre-commit/mirrors-mypy
    rev: v1.6.1
    hooks:
      - id: mypy
```

## Documentation Development

### Docs lokal entwickeln

```bash
cd ~/prog/ai/git/collective-context/collective-context.github.io

# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Build für Produktion
npm run build
```

### Migration von alten Pfaden

Entwickler die noch `~/prog/claude/git/` nutzen, sollten auf die neue Struktur wechseln:

```bash
# Die Migration wurde bereits durchgeführt
# Arbeite jetzt in:
cd ~/prog/ai/git/collective-context/
```

## Debugging & Troubleshooting

### Common Issues

```bash
# Python Path Problems
export PYTHONPATH="${PYTHONPATH}:$(pwd)/lib"

# XDG Directory Creation Issues
mkdir -p ~/.local/share/ccc ~/.config/ccc ~/.cache/ccc

# Permission Problems
chmod -R 755 ~/.local/share/ccc
chmod -R 700 ~/.config/ccc
```

### Debug Utilities

```python
def debug_xdg_paths():
    """Debug XDG Path Resolution"""
    paths = CCCPaths()
    print(f"Data Home: {paths.data_home}")
    print(f"Config Home: {paths.config_home}")
    print(f"Cache Home: {paths.cache_home}")
```