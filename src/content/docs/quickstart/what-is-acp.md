---
title: Was ist ACP?
description: Agent Client Protocol — der offene Standard für AI-Agenten-Integration
---

## Das Problem vor ACP

Vor ACP musste jeder AI-Agent einzeln in jeden Editor integriert werden:

```
Ohne ACP (vorher):
─────────────────────
ZED ←→ Claude (custom Integration)
ZED ←→ Gemini (custom Integration)
tmux ←→ Aider (custom Integration)
VS Code ←→ Copilot (custom Integration)
```

Das bedeutete: n Agenten × m Editoren = n×m individuelle Integrationen. Proprietäre APIs, kein gemeinsamer Standard, kein Wechsel ohne Neukonfiguration.

## Die Lösung: ACP

**Agent Client Protocol (ACP)** ist ein offener Standard von Zed Industries (Apache 2.0 Lizenz). Er funktioniert wie das Language Server Protocol (LSP) — nur für AI-Agenten.

```
Mit ACP (jetzt):
──────────────────────────
ZED ←→ ACP ←→ Claude Code
ZED ←→ ACP ←→ Gemini CLI
ZED ←→ ACP ←→ Codex
ZED ←→ ACP ←→ Ollama (via Adapter)
ZED ←→ ACP ←→ Cline
ZED ←→ ACP ←→ [jeder neue Agent]
```

**ACP ist LSP für AI-Agenten** — genau wie LSP die Sprachintelligenz aus monolithischen IDEs befreit hat, befreit ACP die Agent-Integration aus proprietären Silos.

## Wie ACP funktioniert

```
ZED Editor (ACP Client)
├── Agent Panel (Ctrl+?)
│   ├── Zed First-Party Agent (Grok, Gemini, Claude via API)
│   ├── Claude Code Tab    ← ACP External Agent
│   ├── Gemini CLI         ← ACP External Agent
│   ├── Codex              ← ACP External Agent
│   └── [weitere via ACP Registry]
│
├── Filesystem Access      ← Alle Agenten lesen dasselbe Projekt
├── CLAUDE.md              ← Automatisch in alle Claude-Sessions
├── AGENTS.md              ← Kompatibel mit Gemini CLI, OpenCode
└── MCP Servers            ← Tool-Erweiterungen für alle Agenten
```

Jeder ACP-kompatible Agent erhält:
- Zugriff auf das lokale Dateisystem
- Inline Diff-Anzeige im Editor
- Tool-Calls via MCP-Server
- Gemeinsamen Projektkontext

## ACP vs. MCP — Was ist der Unterschied?

| Protokoll | Zweck | Ebene |
|---|---|---|
| **ACP** | Verbindet Agenten mit Editoren | Agent ↔ Editor |
| **MCP** | Verbindet Agenten mit Tools | Agent ↔ Tools |

ACP regelt, wie der Agent mit dem Editor kommuniziert (Dateizugriff, Diffs, UI).
MCP regelt, welche Tools der Agent nutzen kann (Datenbanken, APIs, Browser).

Beide Protokolle ergänzen sich: Ein ACP-Agent kann MCP-Server nutzen.

## ACP-Ecosystem (Stand Februar 2026)

### Verfügbare Agenten

| Agent | Modell | Status |
|---|---|---|
| **Claude Agent** (ACP) | Sonnet 4.6 (Max) | Stabil |
| **Gemini CLI** | Gemini 2.5 Pro | Stabil |
| **Codex** | GPT-5.2-Codex | Stabil |
| **GitHub Copilot** | GPT-4o | Stabil |
| **Cline** | Wählbar | Stabil |
| **OpenCode** | Wählbar | Beta |
| **Ollama Adapter** | Lokal | Community |

### Kompatible Editoren

| Editor | ACP-Status |
|---|---|
| **ZED** | Referenz-Implementierung |
| **Neovim** (CodeCompanion) | Stabil |
| **JetBrains** | Coming soon |
| **Obsidian** | Community Plugin |
| **VS Code** | Community |

## Warum ACP für Collective Context?

Das Collective Context-Projekt basiert auf einem einfachen Prinzip: **Mehrere AI-Agenten teilen einen gemeinsamen Kontext** (das Dateisystem und CLAUDE.md).

ACP ist der fehlende Baustein, der das ohne tmux-Glue-Code und Shell-Skripte möglich macht:

1. **Standardisiert**: Ein Protokoll für alle Agenten
2. **Editor-integriert**: Inline Diffs statt Terminal-Output
3. **Offen**: Apache 2.0, kein Vendor Lock-in
4. **Erweiterbar**: Neuer Agent = eine ACP-Implementierung

[Weiter: ZED Editor Overview](/zed/overview)
