---
title: ZED Editor Overview
description: ZED als Fundament für Collective Context 2.0
---

## Was ist ZED?

ZED ist ein moderner, hochperformanter Code-Editor (Rust-basiert), entwickelt von Zed Industries. Er ist kostenlos, Open Source (GPL) und auf Linux, macOS und Windows verfügbar.

Download: https://zed.dev/download

## Warum ZED für Collective Context?

ZED ist die **Referenz-Implementierung für ACP** (Agent Client Protocol). Das bedeutet:

- Alle ACP-Agenten werden primär für ZED entwickelt und getestet
- ZED hat das umfangreichste ACP-Ökosystem (mehr Agenten als jeder andere Editor)
- Das Agent Panel ist tief in den Editor-Workflow integriert (keine Browser-Tabs, keine Copy-Paste)

## Das Agent Panel

Das Agent Panel ist der zentrale Ort für alle AI-Interaktionen in ZED:

```
Ctrl+?    → Agent Panel öffnen/schließen
+         → Neuen Agenten hinzufügen (aus ACP Registry)
/login    → Agent-Authentifizierung
@Datei    → Datei explizit in Kontext ziehen
```

**Was das Agent Panel bietet:**
- Mehrere Agenten gleichzeitig aktiv (jeder in eigenem Tab)
- Inline Diffs mit accept/reject per Hunk
- CLAUDE.md wird automatisch geladen (kein manueller Upload)
- Tool-Calls sichtbar und nachvollziehbar

## ZED vs. Claude Code Web — Vergleich

| Feature | Claude Code Web | ZED Claude Code Tab |
|---|---|---|
| Modell | Sonnet 4.6 (Max) | Sonnet 4.6 (Max) |
| Kosten | Flat Rate | Flat Rate |
| Filesystem-Zugriff | Nein (copy-paste) | Ja (direkt) |
| Inline Diffs | Im Browser | Im Editor |
| @file Kontext | Nein | Ja |
| Playwright lokal | Nein | Ja |
| Ollama (indirekt) | Nein | Ja via Script |
| Session History | Ja (Sidebar) | Nein (pro Session) |
| CLAUDE.md auto-load | Ja | Ja |

## Bekannte Limitierungen (Stand Februar 2026)

- Kein Context-Window-Indicator im ZED ACP Agent Panel (GitHub Discussion #49472, 18. Feb 2026)
- `/compact` noch nicht als Slash-Command im ZED Tab verfügbar — Workaround: Handover-Dokument manuell schreiben
- Keine gemeinsame Session-History zwischen Claude Code Web und ZED Claude Code Tab
- Agent Teams (mehrere Claude-Instanzen in einer Session) noch nicht im ZED Tab unterstützt

## Erste Schritte

1. [ZED installieren](https://zed.dev/download)
2. [Claude Code Tab einrichten](/zed/claude-code-tab)
3. [Gemini CLI hinzufügen](/zed/gemini-cli) (für Dual-Agent Workflow)
