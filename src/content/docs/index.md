---
title: Collective Context (CC)
description: Mehrere AI-Agenten. Ein gemeinsamer Kontext. Powered by ZED + ACP.
template: splash
hero:
  tagline: Mehrere AI-Agenten. Ein gemeinsamer Kontext. Powered by ZED + ACP.
  actions:
    - text: Quick Start (5 Minuten)
      link: /quickstart/setup
      icon: right-arrow
      variant: primary
    - text: Was ist ACP?
      link: /zed/acp
      icon: external
    - text: Bücher
      link: /books/
      icon: open-book
---

---

<figure style="margin: -2rem 0 2rem; text-align: center;">
  <img src="/og-image.jpg" alt="Collective Context (CC) — Mehrere AI-Agenten im Einklang" style="width: 100%; max-width: 960px; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.18);" />
  <figcaption style="margin-top: 0.75rem; font-size: 1.15rem; font-style: italic; opacity: 0.85;">
    Collective Context (CC) — Wie ein Orchester mit vielen Stimmen und einem gemeinsamen Kontext.
  </figcaption>
</figure>

## CC 2.0 — Der Paradigmenwechsel

> Die Stärke der Innovation ist wie ein Kunstwerk; sie wird lebendig, wenn visionäre Ideen und neuartige Werkzeuge zusammenfließen. An alle Entwickler dieser Welt: Lasst uns gemeinsam zu neuen Ufern aufbrechen.

Das **Collective Context**-Projekt dokumentiert, wie mehrere AI-Agenten einen **gemeinsamen Kontext teilen** — ohne proprietären Lock-in, ohne tmux-Magie, ohne manuelle Session-Verwaltung.

**Das Fundament ab 2026: ZED Editor + Agent Client Protocol (ACP)**

---

## Evolution statt Revolution

Wir haben den Stack gewechselt. Die Vision ist dieselbe geblieben.

**Vorher (2025):** tmux + Aider + OpenRouter + CCC Commander
**Jetzt (2026):** ZED Editor + ACP + Claude Code Tab + Gemini CLI + Ollama

Was sich nicht geändert hat:
- KAIZEN-Prinzip: Schrittweise Verbesserung, nicht Neuerfindung
- Pragmatismus über Purismus
- Hybrid: Cloud-LLMs + lokale Modelle
- Open Source: Apache 2.0 (ACP), MIT (unsere Docs)
- Privacy-First: Ollama für credential-sichere lokale Tasks

---

## Was ist ACP?

**Agent Client Protocol (ACP)** ist ein offener Standard von Zed Industries — das LSP für AI-Agenten.

```
ZED Editor (ACP Client)
├── Claude Code Tab   ← Claude Max, Flat Rate, Filesystem-Zugriff
├── Gemini CLI        ← Parallele Scan-Tasks
├── Codex             ← OpenAI's Coding Agent
└── Ollama Adapter    ← Lokal, Privacy-First
    ↕
    CLAUDE.md / AGENTS.md (Shared Context für alle)
```

Jeder Agent, der ACP spricht, kann in jedem ACP-kompatiblen Editor laufen. Einmal integriert — überall verfügbar.

---

## Der ZED Claude Code Tab

Der **ZED Claude Code Tab** ist die Referenz-Implementierung:

| Feature | Wert |
|---|---|
| **Kosten** | Claude Max Abo (Flat Rate — kein Token-Pricing) |
| **Modell** | Claude Sonnet 4.6 |
| **Filesystem** | Direkt auf lokale Workstation |
| **Diffs** | Inline im Editor (accept/reject per Hunk) |
| **CLAUDE.md** | Automatisch in jede Session geladen |
| **Playwright** | Lokal ausführbar |
| **Ollama** | Indirekt via Script-Ausführung |

```bash
# Setup in 30 Sekunden
# 1. ZED installieren: https://zed.dev/download
# 2. Agent Panel öffnen: Ctrl+?
# 3. + → Claude Agent (aus ACP Registry)
# 4. /login → OAuth mit claude.ai (Claude Max)
```

---

## CLAUDE.md als Collective Context

**CLAUDE.md ist das geteilte Gedächtnis aller Agenten im Projekt.**

```
projekt/
├── CLAUDE.md        ← Automatisch in JEDE Session aller Claude-Instanzen
├── AGENTS.md        ← Kompatibel: Gemini CLI, Codex, OpenCode
└── postbox/
    ├── todo.md      ← Offene Tasks (Shared State)
    └── done.md      ← Erledigte Tasks
```

> "Anytime we see Claude do something incorrectly we add it to the CLAUDE.md, so Claude knows not to do it next time. Every mistake becomes a rule." — Boris Cherny, Creator of Claude Code

---

## Dual-Agent Pattern

```
Gemini CLI (Scanner)          Claude Code Tab (Fixer)
─────────────────────         ─────────────────────────
Scannt Codebase               Monitort postbox/todo.md
↓                             ↓
Schreibt in todo.md           Fixiert Code + committed
↓                             ↓
Weiter scannen                Verschiebt Task → done.md
```

Zwei Agenten, ein gemeinsames Dateisystem, kein API-Overhead.

---

## Kosten-Vergleich

| Setup | Monatlich | Modell-Optionen | Privacy |
|---|---|---|---|
| Nur Cloud (proprietär) | ~$150 | 1 Provider | Nein |
| CC 2.0 Hybrid | ~$80 | Unbegrenzt | Ja |
| CC 2.0 Full Local | ~$30 | 300+ via Ollama | Ja |

Claude Max Abo (~€90+/M) deckt Claude Code Tab + Claude Code Web + Claude Pro ab — Flat Rate.

---

## Roadmap

- ZED ACP-Fundament (Claude Code Tab) — abgeschlossen
- CLAUDE.md Collective Context Spec — abgeschlossen
- Dual-Agent Pattern dokumentiert — abgeschlossen
- MCP Server Integration Guide — geplant
- Ollama ACP Adapter — geplant
- Community Forum — geplant

[Zur vollständigen Roadmap](/roadmap/)

---

## Dokumentation

- [ZED ACP Setup Guide](/zed/acp)
- [Claude Code Tab im Detail](/zed/claude-code-tab)
- [CLAUDE.md schreiben — Best Practices](/cc/claude-md)
- [Dual-Agent Pattern](/patterns/dual-agent)
- [Case Studies](/case-studies/)

---

## Pragmatische Philosophie

**KAIZEN-Prinzip in Action:**
- **Evolution > Revolution**: Schrittweise Verbesserung
- **Data > Ideology**: Was in der Praxis funktioniert, gewinnt
- **Pragmatism > Purism**: Hybrid aus Cloud + Local ist optimal
- **Open Standard > Proprietary**: ACP ist Apache 2.0

[GitHub](https://github.com/collective-context) · Community Forum: Coming soon
