---
title: Agent Client Protocol (ACP)
description: Der offene Standard von Zed Industries — LSP für AI-Agenten
---

## Was ist ACP?

**Agent Client Protocol (ACP)** ist ein offener Standard von Zed Industries (Apache 2.0 Lizenz), der es ermöglicht, **jeden AI-Agenten mit jedem kompatiblen Editor zu verbinden** — ohne bespoke Integration für jedes Tool-Paar.

## Die Analogie: ACP ist LSP für AI-Agenten

Das Language Server Protocol (LSP) hat Sprachintelligenz aus monolithischen IDEs befreit:
- Vorher: jede IDE musste jeden Compiler selbst integrieren
- Nachher: ein LSP-Server, beliebig viele Editoren

ACP macht dasselbe für AI-Agenten:
- Vorher: jeder Agent brauchte eine eigene Editor-Integration
- Nachher: ein ACP-kompatibler Agent läuft in jedem ACP-kompatiblen Editor

## Technische Architektur

```
ZED Editor (ACP Client)
├── Agent Panel (Ctrl+?)
│   ├── Zed First-Party Agent (Grok, Gemini, Claude via API)
│   ├── Claude Code Tab    ← ACP External Agent, Claude Max Flat Rate
│   ├── Gemini CLI         ← ACP External Agent
│   ├── Codex              ← ACP External Agent
│   └── [beliebig viele weitere über ACP Registry]
│
├── Filesystem Access      ← Alle Agenten lesen dasselbe Projekt
├── CLAUDE.md              ← Automatisch in alle Claude-Sessions
├── AGENTS.md              ← Kompatibel mit Gemini CLI, OpenCode
└── MCP Servers            ← Tool-Erweiterungen für alle Agenten
```

## ACP Permission Modes

Der Claude Code Tab (und andere ACP External Agents) unterstützen Permission-Modi, konfigurierbar in `settings.json`:

```json
{
  "agent_servers": {
    "claude": {
      "env": {
        "ACP_PERMISSION_MODE": "acceptEdits"
      }
    }
  }
}
```

| Mode | Verhalten | Empfehlung |
|---|---|---|
| `default` | Fragt bei jeder Aktion nach | Für sensible Repos |
| `acceptEdits` | Akzeptiert Datei-Edits automatisch | Standard-Workflow |
| `bypassPermissions` | Vollständig autonom | Nur in Sandboxes |

Permission-Modus kann auch mid-session per Prompt-Marker gewechselt werden:
- `[ACP:PERMISSION:ACCEPT_EDITS]`
- `[ACP:PERMISSION:BYPASS]`
- `[ACP:PERMISSION:DEFAULT]`

## ACP vs. MCP

| Protokoll | Zweck | Ebene |
|---|---|---|
| **ACP** | Verbindet Agenten mit Editoren | Agent ↔ Editor |
| **MCP** | Verbindet Agenten mit Tools | Agent ↔ Tools |

ACP und MCP ergänzen sich: Ein ACP-Agent kann MCP-Server nutzen. ACP regelt die Editor-Integration, MCP regelt den Tool-Zugriff.

## ACP Registry

Die ACP Registry ist das zentrale Verzeichnis aller kompatiblen Agenten. In ZED über `+` im Agent Panel zugänglich:

| Agent | Typ | Modell | Status |
|---|---|---|---|
| **Claude Agent** | ACP External | Sonnet 4.6 (Max) | Stabil |
| **Gemini CLI** | ACP External | Gemini 2.5 Pro | Stabil |
| **Codex** | ACP External | GPT-5.2-Codex | Stabil |
| **GitHub Copilot** | ACP External | GPT-4o | Stabil |
| **Cline** | ACP External | Wählbar | Stabil |
| **OpenCode** | ACP External | Wählbar | Beta |
| **Ollama Adapter** | ACP External | Lokal | Community |

## ACP-kompatible Editoren (Stand Februar 2026)

| Editor | ACP-Status |
|---|---|
| **ZED** | Referenz-Implementierung |
| **Neovim** (CodeCompanion) | Stabil |
| **JetBrains** | Coming soon |
| **Obsidian** | Community Plugin |
| **VS Code** | Community |

## Warum ACP für Collective Context?

Das Collective Context-Prinzip — mehrere Agenten teilen einen gemeinsamen Kontext über das Dateisystem — wird durch ACP ohne tmux-Magie realisierbar:

1. Alle ACP-Agenten greifen auf dasselbe lokale Dateisystem zu
2. CLAUDE.md wird automatisch in jede Session geladen
3. Kein API-Overhead für Agenten-Koordination — nur das Dateisystem
4. Neuer Agent einbinden = eine ACP-Installation, kein Shell-Skript

[Weiter: Claude Code Tab einrichten](/zed/claude-code-tab)
