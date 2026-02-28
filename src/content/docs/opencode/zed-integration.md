---
title: OpenCode in ZED via ACP
description: OpenCode als ACP External Agent in ZED einrichten — Schritt für Schritt, mit Permission-Konfiguration und AGENTS.md-Integration.
---

> OpenCode ist offiziell in der ZED ACP Registry gelistet. Das bedeutet: ein einziger Click im Agent Panel — kein manuelles Konfigurieren.

## ACP: Warum OpenCode in ZED?

Der [ZED Agent Panel](/zed/acp) unterstützt mehrere gleichzeitig aktive Agenten. OpenCode ergänzt Claude Code Tab und Gemini CLI um:

- **Provider-Freiheit**: Dieselbe ZED-Oberfläche, jedes Modell (75+ Provider)
- **Offline-Option**: Ollama-Modelle direkt aus ZED — ohne Cloud
- **Kostensteuerung**: Tier-B-Tasks mit günstigeren Modellen lösen

```
ZED Agent Panel (gleichzeitig aktiv):
├── Claude Code Tab    ← Anthropic, Tier A (Architektur, komplexe Tasks)
├── Gemini CLI         ← Google, Scanner-Rolle (1M Context)
└── OpenCode           ← Flexibel: Claude/Gemini/Ollama per Task
```

## Setup in ZED

```
1. Agent Panel öffnen
   Ctrl+?

2. Neuen Agenten hinzufügen
   + → "OpenCode" aus der ACP Registry auswählen

3. ZED installiert automatisch:
   @opencode-ai/opencode-acp (ACP-Adapter)

4. Authentifizierung
   /login → API-Key für gewünschten Provider eingeben
   (oder: Ollama — kein API-Key nötig)
```

Alternativ direkt aus der ACP Registry-Seite:
- [zed.dev/acp/agent/opencode](https://zed.dev/acp/agent/opencode)

## Permission-Konfiguration

OpenCode unterstützt dieselben ACP-Permission-Modes wie Claude Code Tab. In ZED `settings.json` (`Ctrl+,` → JSON):

```json
{
  "agent_servers": {
    "opencode": {
      "env": {
        "ACP_PERMISSION_MODE": "acceptEdits",
        "OPENCODE_MODEL": "anthropic/claude-sonnet-4-6"
      }
    }
  }
}
```

| Mode | Verhalten |
|---|---|
| `default` | Fragt bei jeder Aktion nach |
| `acceptEdits` | Akzeptiert Datei-Edits automatisch |
| `bypassPermissions` | Vollständig autonom (nur Sandboxes) |

## Provider wählen — direkt aus ZED

OpenCode kann mid-session das Modell wechseln. Im Agent Panel:

```
/model anthropic/claude-sonnet-4-6    ← Tier A: Architektur
/model groq/llama-3.3-70b-versatile   ← Tier B: Code schreiben (schnell)
/model ollama/qwen3:14b               ← Tier C: Privacy, offline
```

Das ist der entscheidende Vorteil gegenüber dem Claude Code Tab: **Eine Oberfläche, alle Modelle** — ohne ZED neu zu öffnen.

## AGENTS.md Auto-Load in ZED

OpenCode liest AGENTS.md automatisch beim Start — identisch zu Claude Code:

```
projekt/
├── AGENTS.md          ← OpenCode liest automatisch
├── CLAUDE.md          ← Fallback (falls kein AGENTS.md)
└── src/
```

Im ZED-Workflow bedeutet das: AGENTS.md ist der gemeinsame Kontext für **alle** Agenten im Panel. Kein doppeltes Konfigurieren, kein Copy-Paste.

## Typischer ZED Multi-Agent Workflow

```
[ZED Agent Panel]
│
├── Tab 1: Claude Code Tab
│   → "Implementiere Auth-Modul mit JWT"
│   → Tier-A-Qualität, arbeitet autonom
│
├── Tab 2: OpenCode (mit Ollama)
│   → "Scanne src/ auf Code-Smells, schreibe in postbox/todo.md"
│   → Offline, kein API-Overhead, großer Kontext
│
└── Tab 3: Gemini CLI
    → "Lies postbox/todo.md, priorisiere nach Impact"
    → Free Tier, 1M Token Context
```

Alle drei Agenten teilen dasselbe Dateisystem, dieselbe AGENTS.md. Koordination ausschließlich via Postbox.

## Troubleshooting

**OpenCode findet AGENTS.md nicht:**
```bash
# Sicherstellen: opencode startet im Projektverzeichnis
# ZED öffnet automatisch das aktive Workspace-Root als CWD
```

**Ollama-Modell nicht gefunden:**
```bash
# Sicherstellen: Ollama läuft
ollama serve
# Modell vorhanden:
ollama list
```

**API-Key fehlt:**
```bash
# In ZED settings.json:
{
  "agent_servers": {
    "opencode": {
      "env": { "ANTHROPIC_API_KEY": "sk-ant-..." }
    }
  }
}
# Besser: über Shell-Profil setzen (.zshrc / .bashrc)
```

---

*Zurück: [OpenCode Overview](/opencode/overview) · Weiter: [Dual-Agent Patterns](/opencode/dual-agent)*

*Offizielle Docs: [opencode.ai/docs/acp](https://opencode.ai/docs/acp/) · [ZED ACP Registry](https://zed.dev/acp/agent/opencode)*
