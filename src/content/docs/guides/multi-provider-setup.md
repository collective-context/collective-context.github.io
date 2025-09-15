---
title: Multi-Provider Setup Guide
description: Konfiguration von OpenRouter und PublicAI für CC
---

# Multi-Provider Setup für Collective Context

## 🚀 Quick Start

### OpenRouter (300+ Modelle)

1. Account erstellen auf [openrouter.ai](https://openrouter.ai)
2. API Key generieren
3. Environment Variable setzen:
   ```bash
   export OPENROUTER_API_KEY='sk-or-v1-...'
   ```

### PublicAI / Apertus (Schweizer Open Source)

1. Account auf [publicai.co](https://publicai.co)
2. API Key anfordern
3. Environment Variable:
   ```bash
   export PUBLICAI_API_KEY='pub-...'
   ```

## 📊 Kosten-Vergleich

| Setup | Kosten/Monat | Qualität | Datenschutz |
|-------|--------------|----------|-------------|
| Premium (Claude 3.5) | ~$100 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Budget (Mixtral/GPT-3.5) | ~$10 | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Privacy (Apertus) | ~$30 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

## 🔧 Aider Konfiguration

### Basis-Installation
```bash
pip install aider-chat[voice]
```

### Provider-Aliases
```bash
# ~/.bashrc
alias aider-claude="aider --model openrouter/anthropic/claude-3.5-sonnet"
alias aider-apertus="aider --model publicai/apertus-v1 --api-base https://api.publicai.co/v1"
alias aider-budget="aider --model openrouter/mistralai/mixtral-8x7b"
```

## 🎯 Best Practices

1. **Task-basierte Model-Auswahl**:
   - Architecture: Claude 3.5
   - Reviews: Apertus (Privacy)
   - Coding: DeepSeek Coder
   - Docs: Mixtral

2. **Kosten-Kontrolle**:
   - Nutze `--max-tokens` Flag
   - Monitore Usage via Provider-Dashboards
   - Setze monatliche Budgets

3. **Privacy-First für sensitive Projekte**:
   - Nutze ausschließlich Apertus
   - Oder self-hosted Modelle (Ollama)

## 🔄 Hybrid-Strategie: Der pragmatische Weg

### Warum nicht 100% Migration?

Nach dem KAIZEN-Prinzip lernen wir aus der Praxis:

1. **Claude-2 bleibt bei Claude Code/CCC**
   - Testing unseres eigenen CCC Commanders
   - Baseline für Performance-Vergleiche
   - Backup-Option bei Aider-Problemen

2. **Claude-1 migriert zu Aider**
   - Hauptarchitekt nutzt FOSS
   - Multi-Provider Flexibilität
   - Voice Support für Hands-free Design

3. **Aider-1/2 als reine FOSS-Agents**
   - Vollständige Open Source Experience
   - Privacy-First mit Apertus Option

### Setup für Hybrid-Workflow

```bash
# Terminal 1: Claude-1 mit Aider
aider --model openrouter/anthropic/claude-3.5-sonnet --temperature 0.3

# Terminal 2: Claude-2 mit CCC/Claude Code
ccc ses sta cl2  # oder: claude-code

# Terminal 3: Aider-1 mit DeepSeek
aider --model openrouter/deepseek/deepseek-coder --temperature 0.5

# Terminal 4: Aider-2 mit Apertus
aider --model publicai/apertus-v1 --api-base https://api.publicai.co/v1 --temperature 0.5
```

### Hybrid Strategy Benefits

1. **Tool Comparison**: Direkter Vergleich Aider vs CCC
2. **Risk Mitigation**: Bewährte Workflows als Fallback
3. **CCC Testing**: Real-world Testing unseres eigenen Tools
4. **KAIZEN Evolution**: Lernen aus der Praxis, dann optimieren
# Test Überschreibung
