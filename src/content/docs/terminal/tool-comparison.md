---
title: Terminal-Agenten 2026 im Vergleich
description: Claude Code, Codex CLI, Aider, Gemini CLI, OpenCode — Stärken, Kosten und Einsatzszenarien im direkten Vergleich.
---

> Stand: Februar 2026. Terminal-Agenten entwickeln sich schnell — Preise und Features ändern sich. Offizielle Docs als verbindliche Quelle prüfen.

## Übersicht

| Tool | Anbieter | Modell(e) | Kosten | Open Source | Stärke |
|------|----------|-----------|--------|-------------|--------|
| **Claude Code** | Anthropic | Sonnet 4.6, Opus 4.6 | Max ~$100–200/M (Flat) | Teilweise | 200k Kontext, CLAUDE.md, MCP, Sub-Agents |
| **Gemini CLI** | Google | Gemini 2.5 Pro | Free Tier + API | **Ja** (Apache 2.0) | 1M Token Context, Google-Ökosystem, gratis |
| **Aider** | Paul Gauthier | Multi-Provider | API-Kosten | **Ja** (Apache 2.0) | Git-native, provider-agnostisch, 41k Stars |
| **Codex CLI** | OpenAI | GPT-4o, o3 | API-Kosten | **Ja** (GitHub) | Sandbox-Execution, AGENTS.md nativ, Rust |
| **OpenCode** | Community | Multi-Provider | API-Kosten | **Ja** | Leichtgewichtig, TUI, Rust |

---

## Claude Code

**Von:** Anthropic | **Lizenz:** Proprietär (CLI kostenlos, Modell kostenpflichtig)

```bash
curl -fsSL https://claude.ai/install.sh | bash
# oder: brew install --cask claude-code
cd projekt && claude
```

**Stärken:**
- **CLAUDE.md** als git-versioniertes Projekt-Gedächtnis — lädt automatisch in jede Session
- **Sub-Agents**: Parallele Agenten für große Tasks (`claude --sub-agents`)
- **MCP-Integration**: Direkte Verbindung zu Datenbanken, Jira, Slack, Google Drive
- **Hooks**: Shell-Befehle vor/nach jeder Aktion (Auto-Lint, Auto-Format, Pre-Commit)
- **Cross-Surface**: `/teleport` zwischen Terminal ↔ Web ↔ Desktop ↔ iOS
- **GitHub Actions**: Native CI/CD-Integration
- **Composable**: Vollständig pipe-kompatibel

**Kosten:**
- Claude Max (~$100/M oder ~$200/M) = Flat Rate, kein Token-Counting
- Alternativ: API-Credits (Pay-per-Token über Anthropic Console)
- ZED Claude Code Tab = Claude Max deckt auch den ZED-Tab ab

**Ideal für:** Teams die bereits Claude-Abonnement haben, komplexe Multi-File-Tasks, CI/CD-Automation, Projekte mit CLAUDE.md-Workflow.

---

## Gemini CLI

**Von:** Google | **Lizenz:** Apache 2.0 | **GitHub:** [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

```bash
npm install -g @google/gemini-cli
gemini
```

**Stärken:**
- **1M Token Context Window** — größtes Context Window aller Terminal-Agenten
- **Free Tier**: 60 Requests/Minute, 1.000 Requests/Tag — kostenlos mit Google-Account
- **GEMINI.md**: Equivalenz zu CLAUDE.md für persistenten Kontext
- **Google Search Grounding**: Direkte Web-Recherche im Agent-Loop
- **MCP-Support**: Kompatibel mit MCP-Servern
- **Headless-Modus**: Für Automation und CI/CD
- **Postbox-kompatibel**: Ideal als Scanner-Agent im [Dual-Agent Pattern](/patterns/dual-agent)

**Kosten:**
- Free Tier: 60 req/min, 1.000 req/Tag (Gemini 2.5 Pro)
- Gemini API: Pay-per-Token für höhere Limits

**Ideal für:** Kostenlose Einstiegslösung, große Codebase-Scans (1M Token!), Scanner-Rolle im Multi-Agent-Setup, Google-Workspace-Integration.

---

## Aider

**Von:** Paul Gauthier | **Lizenz:** Apache 2.0 | **GitHub:** [paul-gauthier/aider](https://github.com/paul-gauthier/aider)

```bash
pip install aider-chat
aider --model claude-sonnet-4-6   # oder gpt-4o, deepseek, etc.
```

**Stärken:**
- **Provider-agnostisch**: Claude, GPT-4o, DeepSeek, Gemini, Llama — ein Tool, alle Modelle
- **Git-native**: Automatische Commits mit sinnvollen Commit-Messages nach jeder Änderung
- **Repo-Map**: Automatische Analyse der gesamten Codebase-Struktur
- **IDE-Integration**: Funktioniert über Kommentare in beliebigen Editoren
- **41.000 GitHub-Stars**, 5,1M Installationen — größte Community aller Terminal-Agenten
- **Chirurgische Präzision**: Spezialisiert auf bestehende Codebases, nicht auf neue Projekte

**Kosten:** Nur API-Kosten des gewählten Providers (kein Aider-Abo)

**Ideal für:** Provider-Flexibilität, Git-fokussierte Workflows, Teams die Kosten kontrollieren wollen, Einsatz mit lokalen Modellen via Ollama.

---

## Codex CLI

**Von:** OpenAI | **Lizenz:** Open Source (GitHub) | **Sprache:** Rust

```bash
# Installation via npm
npm install -g @openai/codex
codex
```

**Stärken:**
- **AGENTS.md nativ**: Erste Klasse-Unterstützung für den Linux Foundation Standard
- **Sandbox-Execution**: Konfigurierbares Sandboxing für Shell-Befehle (systemlevel, open source)
- **Multi-Agent**: Parallele Workflows via `config.toml`
- **In Rust gebaut**: Schnell, ressourceneffizient, zero-overhead
- **Transparent**: Vollständiger Source-Code auf GitHub, Community-Debugging

**Kosten:** OpenAI API-Credits (GPT-4o, o3)

**Ideal für:** OpenAI-Ökosystem, Sandbox-kritische Umgebungen, Teams die AGENTS.md als primären Standard nutzen, Open-Source-orientierte Projekte.

---

## OpenCode

**Von:** Community | **Lizenz:** Open Source | **Sprache:** Rust/Go

Ein leichtgewichtiger TUI-Agent (Terminal User Interface) der mehrere LLM-Provider unterstützt und besonders auf niedrigen Ressourcenverbrauch optimiert ist.

**Ideal für:** Embedded-Systeme, minimale Setups, Provider-Flexibilität ohne Overhead.

---

## Welches Tool für welche Situation?

```
Kein Budget, großer Kontext?      → Gemini CLI (Free Tier, 1M Token)
Bereits Claude-Abo?               → Claude Code (Flat Rate, kein Token-Counting)
Provider-Flexibilität gewünscht?  → Aider (100+ Modelle, Apache 2.0)
OpenAI-Ökosystem, Sandbox nötig?  → Codex CLI (Rust, AGENTS.md nativ)
Multi-Agent mit Scanner-Rolle?    → Gemini CLI (Scanner) + Claude Code (Fixer)
CI/CD ohne GUI?                   → Claude Code oder Gemini CLI (Headless-Modus)
```

## Kombination: Das beste Setup

In der Praxis schließen sich die Tools nicht aus:

```
Gemini CLI    → Scanner (Free Tier, 1M Token, schreibt todo.md)
Claude Code   → Fixer (Max Flat Rate, committed + pusht)
Aider         → Spezial-Tasks mit DeepSeek (günstig, lokale Modelle)
```

Das [Dual-Agent Pattern](/patterns/dual-agent) und das [Postbox Pattern](/cc/postbox-pattern) funktionieren mit jeder Kombination dieser Tools — weil alle das Dateisystem als gemeinsamen State nutzen.

---

*Weiter: [Claude Code Deep-Dive](/terminal/claude-code) · [Praxis-Patterns](/terminal/patterns)*

*Quellen: [Claude Code Docs](https://code.claude.com/docs/en/overview) · [Gemini CLI GitHub](https://github.com/google-gemini/gemini-cli) · [Aider](https://aider.chat) · [Codex CLI GitHub](https://github.com/openai/codex)*
