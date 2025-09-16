---
title: CCC Installation
description: Installation des Collective Context Commanders
---

# CCC Installation

## Empfohlene Installation: pipx

Der CCC Commander folgt der **XDG Base Directory Specification** für moderne Linux/Unix-Systeme.

### Option 1: pipx (EMPFOHLEN)

```bash
# pipx installieren falls nicht vorhanden
python3 -m pip install --user pipx
python3 -m pipx ensurepath

# CCC installieren
pipx install collective-context-ccc
```

**Vorteile:**
- ✅ Automatische Isolation
- ✅ PATH-Management
- ✅ Einfache Updates mit `pipx upgrade ccc`
- ✅ XDG-konforme Installation

### Option 2: pip --user

```bash
pip install --user collective-context-ccc
```

**Installation landet in:**
- Binary: `~/.local/bin/ccc`
- Package: `~/.local/lib/python3.X/site-packages/ccc`

### Option 3: Development Installation (from Source)

```bash
# Repository klonen
cd ~/prog/ai/git/collective-context/
git clone https://github.com/collective-context/ccc
cd ccc

# Development-Installation
pip install -e .
```

**Quellcode und ausführbare Dateien:**
- `~/prog/ai/git/collective-context/ccc/`

## Verzeichnisstruktur nach Installation

CCC nutzt die **XDG Base Directory Specification**:

```
~/.local/share/ccc/     # Daten (Sessions, Cache)
├── sessions/           # Lokale Session-Dateien
├── tools/              # Tool-spezifische Daten
└── cache/              # Temporäre Dateien

~/.config/ccc/          # Konfiguration
├── config.json         # Hauptkonfiguration
└── tools.json          # Tool-Konfigurationen

~/.local/bin/ccc        # Ausführbare Datei (via pipx/pip)
```

## Umgebungsvariablen

CCC unterstützt Override-Möglichkeiten:

```bash
# Datenverzeichnis überschreiben
export CCC_HOME="$HOME/.myccc"

# Konfigurationsdatei
export CCC_CONFIG="$HOME/.myccc/config.json"

# Log-Level
export CCC_LOG_LEVEL="DEBUG"
```

## Migration von alten Installationen

Falls du CCC bereits aus Source installiert hast:

```bash
# Die lokalen Session-Dateien bleiben wo sie sind
# Konfiguration wird beim ersten Start automatisch erstellt
ccc --help
```

## Systemanforderungen

- Python 3.8 oder höher
- pip oder pipx
- Optional: git (für Development-Installation)

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