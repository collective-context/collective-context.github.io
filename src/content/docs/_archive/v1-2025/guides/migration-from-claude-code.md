---
title: Migration von Claude Code zu Aider
description: Schritt-für-Schritt Anleitung für den Umstieg
---

# Migration Guide: Claude Code → Aider

## ⚠️ Wichtiger Hinweis

Claude Code ist proprietäre Software und widerspricht den Prinzipien von Collective Context. Diese Migration ist essentiell für die Integrität des Projekts.

## 🔄 Migration Steps

### 1. Backup bestehender Konfiguration
```bash
cp -r ~/.claude ~/.claude-backup
```

### 2. Aider Installation
```bash
pip install aider-chat[voice]
```

### 3. API Keys übertragen
- Claude API Key → OpenRouter Account
- Zusätzlich: PublicAI Account für Privacy

### 4. Workflow-Anpassung

| Alt (Claude Code) | Neu (Aider) |
|-------------------|-------------|
| `claude-code` | `aider` |
| Proprietär | Open Source (Apache 2.0) |
| Single Provider | Multi-Provider |
| Keine Voice | Voice Support |
| Closed Development | Community-Driven |

## ✅ Vorteile nach Migration

- **Transparenz**: Vollständiger Einblick in Code
- **Flexibilität**: 200+ Modelle verfügbar
- **Community**: Aktive Open Source Community
- **Features**: Voice, Web, Image Support
- **Kosten**: Optimierung durch Model-Auswahl

## 🚀 Detailed Migration Workflow

### Schritt 1: Environment Setup
```bash
# Erstelle neue Umgebung für CC Multi-Provider
python -m venv cc-aider-env
source cc-aider-env/bin/activate

# Installiere Aider mit allen Features
pip install aider-chat[voice,browser,playwright]
```

### Schritt 2: Provider Accounts
1. **OpenRouter Setup**:
   - Registrierung auf [openrouter.ai](https://openrouter.ai)
   - API Key generieren
   - $5 Initial Credit für Tests

2. **PublicAI Setup**:
   - Registrierung auf [publicai.co](https://publicai.co)
   - Schweizer Datenschutz-Option aktivieren
   - API Key für Apertus Model

### Schritt 3: Configuration Files
```bash
# ~/.aider.conf.yml
models:
  architecture: "openrouter/anthropic/claude-3.5-sonnet"
  review: "publicai/apertus-v1"
  coding: "openrouter/deepseek/deepseek-coder"
  docs: "openrouter/mistralai/mixtral-8x22b"

api_bases:
  publicai: "https://api.publicai.co/v1"

default_model: "openrouter/deepseek/deepseek-coder"
auto_commits: true
test_cmd: "pytest"
```

### Schritt 4: Shell Aliases
```bash
# Füge zu ~/.bashrc hinzu
alias aider-architect="aider --model openrouter/anthropic/claude-3.5-sonnet"
alias aider-review="aider --model publicai/apertus-v1 --api-base https://api.publicai.co/v1"
alias aider-code="aider --model openrouter/deepseek/deepseek-coder --auto-commits"
alias aider-docs="aider --model openrouter/mistralai/mixtral-8x22b"

# CC Multi-Provider Session
alias cc-session="tmux new-session -s cc-multi-provider \; split-window -h \; split-window -v \; select-pane -t 0 \; split-window -v"
```

### Schritt 5: Test Migration
```bash
# Test jede Konfiguration
aider-architect --help
aider-review --help
aider-code --help
aider-docs --help

# Test API Connectivity
aider --model openrouter/anthropic/claude-3.5-sonnet --yes --message "Test connection"
```

## 💰 Cost Comparison

### Vor Migration (Claude Code)
- **Tool**: $20/Monat Claude Pro
- **API**: ~$100/Monat Claude API
- **Total**: $120/Monat
- **Flexibilität**: Keine

### Nach Migration (Aider Multi-Provider)
- **Tool**: $0 (Open Source)
- **API Budget**: $10-30/Monat (je nach Strategie)
- **API Premium**: $60-100/Monat (nur bei Bedarf)
- **Total**: $10-100/Monat (je nach Use Case)
- **Flexibilität**: Maximum

## 🔒 Privacy Benefits

| Aspekt | Claude Code | Aider + Apertus |
|--------|-------------|-----------------|
| Tool Source | Closed | Apache 2.0 |
| Data Location | US | Schweiz (EU) |
| Audit Capability | Keine | Vollständig |
| Vendor Lock-in | Hoch | Null |
| DSGVO Compliance | Unklar | Garantiert |

## 📋 Migration Checklist

- [ ] Claude Code Backup erstellt
- [ ] Aider installiert
- [ ] OpenRouter Account + API Key
- [ ] PublicAI Account + API Key
- [ ] Environment Variables gesetzt
- [ ] Shell Aliases konfiguriert
- [ ] Test-Session erfolgreich
- [ ] Bestehende Projekte migriert
- [ ] Team informiert über neue Workflows

## 🚨 Troubleshooting

### Problem: "API Key nicht gefunden"
```bash
# Überprüfe Environment Variables
echo $OPENROUTER_API_KEY
echo $PUBLICAI_API_KEY

# Setze temporär für Tests
export OPENROUTER_API_KEY="sk-or-v1-..."
export PUBLICAI_API_KEY="pub-..."
```

### Problem: "Model nicht verfügbar"
```bash
# Liste verfügbare Modelle
aider --models

# Fallback auf funktionierende Modelle
aider --model gpt-3.5-turbo  # Immer verfügbar
```

### Problem: "Tmux Session Fehler"
```bash
# Bestehende Sessions anzeigen
tmux list-sessions

# Session killen falls nötig
tmux kill-session -t cc-multi-provider

# Neu starten
tmux new-session -s cc-multi-provider
```

## 🎯 Success Criteria

Migration ist erfolgreich wenn:
1. **Alle 4 Aider-Instanzen** funktionieren
2. **Multi-Provider Switching** funktioniert
3. **Kosten reduziert** um mindestens 50%
4. **Privacy-First Option** verfügbar (Apertus)
5. **Team Produktivität** mindestens gleich

## 📞 Support

- **Aider GitHub**: [paul-gauthier/aider](https://github.com/paul-gauthier/aider)
- **OpenRouter Discord**: Vendor Support
- **PublicAI Support**: Schweizer Datenschutz-Fragen
- **CC Community**: [GitHub Discussions](https://github.com/collective-context/ccc/discussions)

## 🎉 Willkommen in der Open Source Zukunft!

Mit dieser Migration bist du jetzt Teil einer **100% transparenten** Multi-Agent Orchestrierung. Keine Black Boxes mehr, nur Open Source Excellence!