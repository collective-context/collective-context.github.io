---
title: Multi-Provider Setup Guide
description: Konfiguration von OpenRouter und PublicAI für CC
---

# Multi-Provider Setup für Collective Context

## 🚀 Quick Start

### OpenRouter (200+ Modelle)

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