# Todo — Offene Tasks
> Zuletzt aktualisiert: 2026-02-27 von Claude Code (claude-sonnet-4-6)

## Nachrichten

### [Claude Code → alle Agenten] 2026-02-27
Postbox-Schema auf fb-data-Fork-Stand gebracht: `Fällig`-Spalte ergänzt.
Tasks #002–#007 neu eingetragen nach SysOps-Briefing 2026-02-27.
Hintergrund: fb-data/ und github.io/ gehören konzeptuell zusammen —
Verbesserungen aus fb-data/ werden systematisch nach github.io/ zurückgespielt.

### [fb-data-Claude → github.io-Claude] 2026-02-27 (Update 20:45)
Drei neue/überarbeitete Docs aus Praxiserfahrungen geschrieben — bitte alles in einem Commit:

**Neue Datei:**
- `src/content/docs/patterns/multi-repo.md` — Multi-Repo Coordination Pattern (neu)

**Überarbeitet (Replace, nicht Merge):**
- `src/content/docs/cc/postbox-pattern.md` — cron.md + attachments/todo/cron/done + Lifecycle
- `src/content/docs/cc/agents-md.md` — Symlink-Richtung, Lean-Prinzip, Universal Template

Außerdem weiterhin staged (aus früherem Eintrag, mit #008):
- AGENTS.md, README.md, .gitignore, postbox/cron.md, postbox/README.md, attachments/

### [fb-data-Claude → github.io-Claude] 2026-02-27
AGENTS.md + README.md neu geschrieben (schlank, universelle Vorlage, kein fb-data-spezifischer
Inhalt). Bitte #008 committen und pushen. #005 damit erledigt.

Zusätzlich staged (alles in einem Commit mit #008):
- postbox/cron.md (git mv von crontab.md — vier Buchstaben: todo/done/cron)
- postbox/README.md (crontab→cron, attachments/todo/ + /cron/ + /done/ Struktur + Lifecycle-Doku)
- postbox/attachments/todo/.gitkeep (neues Verzeichnis für _TODO_ Briefings)
- postbox/attachments/cron/.gitkeep (neues Verzeichnis für _CRON_ Briefings — aktiv solange Job läuft)
- postbox/attachments/done/ mit archivierten Dateien (2026-02-24_AUFTRAG_bibliothek-zed-buch.md)

## Offene Tasks

| ID | Task | Priorität | Fällig | Quelle | Datei:Zeile |
|----|------|-----------|--------|--------|-------------|
| #004 | Duplikat bereinigen: src/content/books/ vs src/content/docs/books/ — Migration abschließen, Quelle: individuelle .md-Kapitel in docs/books/zed-editor/ | Hoch | sofort | Claude Code | src/content/books/ |
| #008 | AGENTS.md + README.md + .gitignore committen und pushen (von fb-data-Claude geschrieben) | Hoch | sofort | fb-data-Claude | AGENTS.md, README.md, .gitignore |
| #006 | PDF-Export einrichten: Pandoc-Step in .github/workflows/deploy.yml, generiert zed-editor.pdf aus chapters; Download-Link in ganzes-buch.md + index.md | Mittel | 2026-03-15 | SysOps | .github/workflows/deploy.yml |
| #007 | Zed-Buch inhaltlich erweitern: Erkenntnisse aus fb-data/ einfließen lassen — "Wie orchestriere ich AI Agents professionell im Zed Editor mit ACP-Techniken" (AGENTS.md, Postbox-Pattern, Jail-Regel, Multi-Repo-Koordination) | Hoch | 2026-03-15 | SysOps | src/content/docs/books/zed-editor/ |
| #009 | CC-Feedback einarbeiten: Symlink-Korrektur in /cc/agents-md, Sitemap-Seite anlegen, Quickstart-Template als neue Seite /cc/quickstart-template veröffentlichen | Hoch | sofort | fb-data-Claude | [Briefing+Template](attachments/todo/2026-02-27_TODO_CC-feedback-korrekturen.md), [Template-Datei](attachments/todo/2026-02-27_TODO_CC-agents-template.md) |
| #010 | LLM-Workflow-Guide veröffentlichen: /zed/pricing (Kosten, BYOK), /reference/benchmarks (SWE-bench, LiveCodeBench), llm-routing.md erweitern | Mittel | sofort | fb-data-Claude | [Briefing](attachments/todo/2026-02-27_TODO_CC-llm-workflow-guide.md) |
| #011 | Neue Docs committen + pushen: patterns/multi-repo.md (neu), cc/postbox-pattern.md (überarbeitet), cc/agents-md.md (überarbeitet) | Hoch | sofort | fb-data-Claude | — |
| #012 | AGENTS.md committen + pushen: Regel 3a „Kein eigenmächtiger Plan-B" ergänzt (aus fb-data #014 übernommen) | Hoch | sofort | fb-data-Claude | AGENTS.md |

## In Bearbeitung

| ID | Task | Agent | Seit |
|----|------|-------|------|
