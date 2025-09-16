---
title: CCC Konfiguration
description: Konfiguration des Collective Context Commanders
---

# CCC Konfiguration

## XDG Base Directory Standard

CCC folgt dem XDG Base Directory Standard für eine saubere System-Organisation:

### Verzeichnisse

| Verzeichnis | Zweck | Standard-Pfad |
|-------------|-------|---------------|
| **Daten** | Sessions, Cache | `~/.local/share/ccc/` |
| **Konfiguration** | Settings, Tools | `~/.config/ccc/` |
| **Cache** | Temporäre Dateien | `~/.cache/ccc/` |
| **Logs** | Log-Dateien | `~/.local/state/ccc/` |

### Umgebungsvariablen

```bash
# Überschreibe Standard-Verzeichnisse
export XDG_DATA_HOME="$HOME/.local/share"
export XDG_CONFIG_HOME="$HOME/.config"
export XDG_CACHE_HOME="$HOME/.cache"
export XDG_STATE_HOME="$HOME/.local/state"

# CCC-spezifische Overrides
export CCC_HOME="$HOME/.myccc"           # Datenverzeichnis
export CCC_CONFIG="$HOME/.myccc.json"    # Konfigurationsdatei
export CCC_LOG_LEVEL="DEBUG"             # Log-Level
```

## Konfigurationsdatei

**Speicherort**: `~/.config/ccc/config.json`

```json
{
  "version": "0.3.0",
  "prompts": {
    "system": "You are a helpful assistant",
    "temperature": 0.7
  },
  "tools": {
    "aider": {
      "path": "/usr/local/bin/aider",
      "config": "~/.config/aider/config.yml"
    }
  },
  "sessions": {
    "autosave": true,
    "retention_days": 30
  }
}
```

## Konfigurationsdatei automatisch erstellen

CCC erstellt beim ersten Start automatisch die Konfiguration:

**Speicherort**: `~/.config/ccc/config.json`

## API Keys und Umgebungsvariablen

### Sichere Konfiguration

```bash
# .env Datei erstellen (NICHT ins Repository committen!)
cat > .env << EOF
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
EOF

# .env zu .gitignore hinzufügen
echo ".env" >> .gitignore
```

### Environment Variables einrichten

```bash
# Anthropic Claude
export ANTHROPIC_API_KEY="sk-ant-..."

# OpenAI (für Aider)
export OPENAI_API_KEY="sk-..."

# Persistent speichern
echo 'export ANTHROPIC_API_KEY="sk-ant-..."' >> ~/.bashrc
echo 'export OPENAI_API_KEY="sk-..."' >> ~/.bashrc
```

## Session-Management

### Datenverzeichnis Struktur

```
~/.local/share/ccc/
├── sessions/
│   ├── 2025-09-16_CL1_SESSION-FULL.md
│   ├── 2025-09-16_CL1_SESSION-KNOWLEDGE.md
│   └── 2025-09-16_CL1_SESSION-SAVE.md
├── tools/
│   ├── aider/
│   └── claude/
└── cache/
    └── temp-files/
```

### Konfiguration der Session-Speicherung

```json
{
  "sessions": {
    "autosave": true,
    "retention_days": 30,
    "format": "markdown",
    "location": "~/.local/share/ccc/sessions/"
  }
}
```

## Tool-Integration

### Aider Konfiguration

```json
{
  "tools": {
    "aider": {
      "path": "/usr/local/bin/aider",
      "config": "~/.config/aider/config.yml",
      "model": "gpt-4",
      "auto_commits": true
    }
  }
}
```

### Claude Code Integration

```json
{
  "tools": {
    "claude": {
      "api_key_env": "ANTHROPIC_API_KEY",
      "model": "claude-3.5-sonnet",
      "temperature": 0.3,
      "max_tokens": 4096
    }
  }
}
```

## Troubleshooting

### Konfigurationsprobleme

```bash
# Konfiguration zurücksetzen
rm -rf ~/.config/ccc/
ccc init

# Verzeichnisse manuell erstellen
mkdir -p ~/.local/share/ccc/sessions
mkdir -p ~/.config/ccc
mkdir -p ~/.cache/ccc
mkdir -p ~/.local/state/ccc
```

### Permission Issues

```bash
# Berechtigungen korrigieren
chmod 700 ~/.config/ccc/
chmod 600 ~/.config/ccc/config.json
chmod 600 .env
```

### Debug-Modus

```bash
# Detaillierte Logs aktivieren
export CCC_LOG_LEVEL="DEBUG"
ccc --verbose status
```