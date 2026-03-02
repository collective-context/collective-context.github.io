---
title: FAQ
description: Häufig gestellte Fragen zu Collective Context 2.0
---

## Allgemein

### Was ist Collective Context?

Collective Context ist ein Framework und eine Dokumentationssammlung für **Multi-Agent-Koordination im ZED Editor via ACP** (Agent Client Protocol). Das Ziel: Mehrere AI-Agenten teilen einen gemeinsamen Kontext über das Dateisystem — ohne proprietären Lock-in.

### Was hat sich gegenüber v1 (2025) geändert?

**v1 (2025)**: tmux + Aider + OpenRouter + CCC Commander — Shell-Skripte als Kleber, manuelle Session-Verwaltung.

**v2 (2026)**: ZED Editor + ACP — offener Standard, Editor-Integration, kein tmux mehr nötig.

Vision und KAIZEN-Philosophie sind unverändert geblieben.

---

## ACP & ZED

### Was ist der Unterschied zwischen ACP und MCP?

| Protokoll | Zweck | Ebene |
|---|---|---|
| **ACP** | Verbindet Agenten mit Editoren | Agent ↔ Editor |
| **MCP** | Verbindet Agenten mit Tools | Agent ↔ Tools |

ACP regelt, wie der Agent mit dem Editor kommuniziert (Dateizugriff, Diffs, UI).
MCP regelt, welche Tools der Agent nutzen kann (Datenbanken, APIs, Browser).

Beide ergänzen sich: Ein ACP-Agent kann MCP-Server nutzen.

### Brauche ich Claude Max für den ZED Claude Code Tab?

Ja — der ZED Claude Code Tab authentifiziert via claude.ai OAuth. Claude Max (~€90+/M) ist das günstigste Abo mit Flat Rate.

Alternativen:
- **Claude Pro** (ohne Code Tab, nur claude.ai Web) — kein Filesystem-Zugriff
- **API-Key** (Zed First-Party Agent, Claude Sonnet) — Token-basiertes Pricing ($3.30/$16.50 per M Token)
- **Gemini CLI** (ACP External, kein Claude Max nötig) — Google-Account

### Was ist der Unterschied zwischen Claude Code Web und dem ZED Claude Code Tab?

| Feature | Claude Code Web | ZED Claude Code Tab |
|---|---|---|
| Filesystem-Zugriff | Nein | Ja |
| Inline Diffs im Editor | Nein | Ja |
| @file Kontext | Nein | Ja |
| Session History | Ja (Web-Sidebar) | Ja (ZED History-Panel + Filesystem) |
| Playwright lokal | Nein | Ja |
| Ollama (indirekt) | Nein | Ja |

Beide nutzen Claude Max Flat Rate und laden CLAUDE.md automatisch.

:::note[Session History: ZED ist mehr als ein Editor]
ZED liest die Claude Code Sessions direkt aus `~/.claude/projects/` und zeigt
sie im **History-Panel** (rechte Sidebar) an — vollständig, mit Titeln und Timestamps.

Zusätzlich sind die Sessions als `.jsonl`-Dateien im Filesystem zugänglich.
Das ermöglicht Workflows die über jede Web-UI hinausgehen:

- Terminal-Browser (`claude_tui.py`): Sessions lesen, annotieren, umbenennen, löschen
- CLI (`claude_memory.py`): Scripting, Backup, Suche über alle Projekte
- Persistent Memory: `~/.claude/projects/.../memory/MEMORY.md` — auto-geladen beim nächsten Start
- Sub-Agenten-Transcripts: vollständige Audit-Trails für komplexe Workflows

**ZED 2026 ist kein Editor mit KI-Addon — es ist das professionelle Interface
mit dem Human SysOps ihre LLMs orchestrieren.**
:::

### Kann ich Ollama statt Claude Max verwenden?

Ja, aber mit Einschränkungen:
- **Community ACP Adapter**: Beta-Status (Stand Feb 2026), nicht für Produktions-Einsatz
- **Indirekt via Script**: Claude Code Tab führt Scripts aus, die intern Ollama nutzen — das funktioniert stabil
- **Qualität**: Ollama-Modelle sind gut für Tier-C-Tasks, für komplexe Implementierungen empfehlen wir Cloud-Modelle

Details: [Ollama Setup](/zed/ollama)

---

## CLAUDE.md & Shared Context

### Wie teile ich CLAUDE.md zwischen mehreren Repos?

Drei Ansätze:
1. **Kopieren**: Manuelle Synchronisation — einfach, aber aufwendig bei vielen Repos
2. **Symlink**: `ln -s ../shared/CLAUDE.md CLAUDE.md` — automatisch synchron, aber an Repo-Grenzen komplex
3. **Include-Convention**: CLAUDE.md verweist auf `@include: ../shared/base.md` — noch kein nativer Support, aber als Pre-Hook machbar

### Was gehört NICHT in CLAUDE.md?

- Code-Style-Guidelines (dafür gibt es Linter wie ESLint, Ruff, Black)
- How-To-Anleitungen (LLMs lesen Docs selbst)
- Alles was ein Agent per `grep` selbst findet
- Generelle Programmierprinzipien (SOLID, DRY — das weiß das Modell)

Nur das Nicht-Offensichtliche, Projektspezifische dokumentieren.

### Wie viele Regeln kann CLAUDE.md enthalten?

Frontier-Modelle (Sonnet, Gemini Pro) folgen ca. **150–200 Instruktionen** mit guter Konsistenz. Darüber nimmt die Einhaltung ab.

Empfehlung: Unter 100 Regeln bleiben, prägnant formulieren.

---

## Dual-Agent & Patterns

### Wie koordinieren sich Agenten ohne API?

Via Dateisystem: `postbox/todo.md` und `postbox/done.md` sind das geteilte Task-Board. Kein Message-Passing, keine Koordinations-API — nur Dateien lesen und schreiben.

Details: [Postbox Pattern](/cc/postbox-pattern)

### Können Scanner und Fixer gleichzeitig in dieselbe Datei schreiben?

In der Praxis sehr selten. Wenn es passiert: Die Datei wird kurz inkonsistent, aber beim nächsten Lesen ist der State klar. Bei sensiblen Projekten: Ein kurzer Human-in-the-loop-Check nach jeder Stunde löst das Problem.

### Welches Modell für welchen Task?

Kurzfassung:
- **Architektur, komplexe Implementierung** → Claude Code Tab (Max Flat Rate)
- **Code-Review, kleine Fixes** → Grok 4.1 Fast ($0.22/$0.55)
- **Tests schreiben** → Gemini Flash ($0.55/$3.30)
- **Codebase-Scans** → Gemini CLI (großes Context Window)
- **Privacy-Tasks, Credentials** → Ollama lokal

Details: [LLM Routing Strategie](/cc/llm-routing)

---

## Support

### Wo finde ich Hilfe?

- **GitHub Issues**: Bug Reports und Feature Requests
- **GitHub Discussions**: Community-Support und Ideen
- **Docs**: Diese Dokumentation

[GitHub — collective-context](https://github.com/collective-context)

### Wie kann ich beitragen?

- Verbesserungen dieser Docs als Pull Request
- Eigene Case Studies dokumentieren
- Bug Reports für Limitierungen (insbesondere ACP-Bugs)
