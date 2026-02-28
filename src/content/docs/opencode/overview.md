---
title: OpenCode — Der Open-Source AI Coding Agent
description: OpenCode ist ein MIT-lizenzierter, provider-agnostischer AI Coding Agent mit ~113k GitHub-Stars, TUI-First-Design und nativer ZED/ACP-Integration.
---

> OpenCode ist kein weiteres Claude-Wrapper-Tool. Es ist ein unabhängiger, offener Coding-Agent — entwickelt von Softwareentwicklern für Softwareentwickler, ohne Vendor-Lock-in.

## Was ist OpenCode?

**OpenCode** ist ein open-source AI Coding Agent, der direkt im Terminal läuft — als TUI (Terminal User Interface) gebaut von den Entwicklern von [terminal.shop](https://terminal.shop/) und Neovim-Nutzern.

| Eigenschaft | Wert |
|---|---|
| **Lizenz** | MIT |
| **GitHub** | [anomalyco/opencode](https://github.com/anomalyco/opencode) (~113k Stars) |
| **Website** | [opencode.ai](https://opencode.ai/) |
| **Sprache** | TypeScript |
| **LLM-Provider** | 75+ via [models.dev](https://models.dev) |
| **ZED ACP** | [zed.dev/acp/agent/opencode](https://zed.dev/acp/agent/opencode) |
| **AGENTS.md** | Ja (CLAUDE.md als Fallback) |

```bash
# Installation
curl -fsSL https://opencode.ai/install | bash
# oder: npm, Homebrew, Scoop, AUR
```

---

## Warum OpenCode 2026 Ihre Aufmerksamkeit verdient

### 1. Null Vendor-Lock-in — echte Modell-Freiheit

OpenCode ist von Grund auf **provider-agnostisch**. Es nutzt [models.dev](https://models.dev) (von denselben Entwicklern) als Modell-Datenbank — 75+ Provider aus einem einzigen Tool:

```
Cloud:  Anthropic Claude · OpenAI GPT · Google Gemini · Groq
        AWS Bedrock · Azure OpenAI · Google VertexAI · OpenRouter
Lokal:  Ollama (qwen3, llama3.3, gemma3, phi4 — vollständig offline)
```

Das Ergebnis: Wenn Anthropic die Preise erhöht, wechselt man den Provider — ohne das Tool zu wechseln. Wenn ein Ollama-Modell für einen spezifischen Task besser ist, nutzt man es. **Data > Ideology**, auch beim Tool-Routing.

### 2. Community-Driven: Oh-My-OpenCode

[Oh-My-OpenCode](https://github.com/code-yeongyu/oh-my-opencode) ist eine Erweiterungsebene über OpenCode:

- **11 spezialisierte Agenten** (Planer, Coder, Tester, Reviewer, ...)
- **44 Lifecycle-Hooks** für präzise Steuerung der Agenten-Schritte
- **26+ Tools** inkl. LSP- und AST-aware Code Search
- **Multi-Model Fallback Chains** — automatischer Wechsel bei Fehlern

```bash
# Installation
bunx oh-my-opencode install
```

Das ist das Open-Source-Prinzip in Aktion: Wenn das Core-Tool eine Funktion nicht hat, baut die Community sie — und alle profitieren.

### 3. TUI-First: Das Terminal als Heimat

OpenCode wurde von Neovim-Nutzern geschrieben — das merkt man:

- **Keine Electron-App**, kein Browser: ~40 MB RAM-Verbrauch
- **SSH-fähig**: läuft auf entfernten Servern, in Docker, auf Hetzner-VMs
- **Composable**: vollständig pipe-kompatibel mit Unix-Toolset
- **AGENTS.md** wird automatisch geladen — kein manueller Upload

Der Vergleich mit proprietären Tools ist deutlich:

| Aspekt | Proprietäres Tool | OpenCode |
|---|---|---|
| Modell-Wahl | Vendor vorgegeben | 75+ Provider frei wählbar |
| Offline-Fähigkeit | Nein | Ja (via Ollama) |
| Erweiterbarkeit | Plugin-Store | Open Source, forkbar |
| RAM-Verbrauch | 800–900 MB (Electron) | ~40 MB |
| Lizenz | Proprietär | MIT |

### 4. ZED + ACP: Native Integration

OpenCode ist offiziell in der **ZED ACP Registry** gelistet — gleichrangig mit Claude Code Tab und Gemini CLI:

```
ZED Agent Panel
├── Claude Code Tab     ← Anthropic, Max Flat Rate
├── Gemini CLI          ← Google, Free Tier
└── OpenCode            ← MIT, 75+ Provider, lokal möglich
```

Details zur Einrichtung: [OpenCode in ZED via ACP](/opencode/zed-integration)

### 5. AGENTS.md — Linux Foundation Standard

OpenCode liest `AGENTS.md` als primäre Konfigurationsquelle (CLAUDE.md als Fallback). Projekte die bereits AGENTS.md nutzen, funktionieren mit OpenCode **ohne Anpassung**:

```
Lookup-Reihenfolge:
1. ./AGENTS.md (lokales Projekt, von CWD aufwärts traversiert)
2. ~/.config/opencode/AGENTS.md (global)
3. Fallback: CLAUDE.md (dieselbe Reihenfolge)
```

Ein AGENTS.md-Projekt läuft mit Claude Code, Gemini CLI **und** OpenCode — der Agent wechselt, der Kontext bleibt.

---

## Zahlen (Stand Feb 2026)

| Metrik | Wert | Quelle |
|---|---|---|
| GitHub Stars | ~113.000 | GitHub |
| Contributors | ~450 | GitHub |
| Monthly Users | "2.5M" | Offizieller Claim (Methodik nicht veröffentlicht) |
| LLM-Provider | 75+ | models.dev |

> **Hinweis:** Die 2.5M-User-Zahl ist ein offizieller Marketing-Claim ohne publizierte Methodik. Die ~113k Stars sind unabhängig verifizierbar und das verlässlichste Signal für Community-Größe.

---

## Quick Start

```bash
# 1. Installieren
curl -fsSL https://opencode.ai/install | bash

# 2. Provider konfigurieren (oder Ollama für offline)
export ANTHROPIC_API_KEY=sk-ant-...
# oder: OPENAI_API_KEY, GEMINI_API_KEY, etc.

# 3. Im Projekt-Verzeichnis starten
cd mein-projekt
opencode

# 4. AGENTS.md wird automatisch geladen — kein weiterer Setup
```

```bash
# Mit Ollama (vollständig offline, zero API-Kosten)
ollama pull qwen3:14b
opencode --model ollama/qwen3:14b
```

---

## Einordnung im CC-Stack

```
Scanner-Rolle:  OpenCode (großes Context Window via Ollama/Gemini)
                → schreibt Tasks in postbox/todo.md

Fixer-Rolle:    Claude Code Tab (Qualität) ODER
                OpenCode mit Claude Sonnet (cost-optimiert)

Koordination:   Postbox Pattern — provider-unabhängig
```

OpenCode ist kein Ersatz für Claude Code — es ist **eine weitere Option** im Stack, die Privacy, Kosten oder Offline-Anforderungen erfüllt wo Claude Code nicht passt.

---

*Weiter: [OpenCode in ZED via ACP](/opencode/zed-integration) · [Dual-Agent Patterns](/opencode/dual-agent)*

*Quelle: [opencode.ai](https://opencode.ai/) · [GitHub anomalyco/opencode](https://github.com/anomalyco/opencode) · [ZED ACP Registry](https://zed.dev/acp)*
