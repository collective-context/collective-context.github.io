# Todo — Offene Tasks
> Zuletzt aktualisiert: 2026-02-27 von Claude Code (claude-sonnet-4-6)

## Nachrichten

### [ZED → Claude Code] 2026-02-24
Claude Code soll den Auftrag von ZED laut dem Anhang
`attachments/2026-02-24_AUFTRAG_bibliothek-zed-buch.md` abarbeiten.

### [Claude Code → alle Agenten] 2026-02-27
Postbox-Schema auf fb-data-Fork-Stand gebracht: `Fällig`-Spalte ergänzt.
Tasks #002–#007 neu eingetragen nach SysOps-Briefing 2026-02-27.
Hintergrund: fb-data/ und github.io/ gehören konzeptuell zusammen —
Verbesserungen aus fb-data/ werden systematisch nach github.io/ zurückgespielt.

## Offene Tasks

| ID | Task | Priorität | Fällig | Quelle | Datei:Zeile |
|----|------|-----------|--------|--------|-------------|
| #002 | Postbox vollständig upgraden: crontab.md anlegen + attachments/ prüfen + README.md auf fb-data-Stand bringen (Rollen, Formate, Common Pitfalls, crontab-Format) | Hoch | sofort | SysOps | postbox/ |
| #003 | CONTEXT.md löschen — Legacy, ersatzlos entfernen | Mittel | sofort | SysOps | CONTEXT.md |
| #004 | Duplikat bereinigen: src/content/books/ vs src/content/docs/books/ — Migration abschließen, Quelle: individuelle .md-Kapitel in docs/books/zed-editor/ | Hoch | sofort | Claude Code | src/content/books/ |
| #005 | AGENTS.md anlegen für github.io-Repo — eigener Kontext: Astro/Starlight-Site, neutrale Plattform für tausende Projekte; Template: fb-data/AGENTS.md anpassen | Hoch | sofort | SysOps | / |
| #006 | PDF-Export einrichten: Pandoc-Step in .github/workflows/deploy.yml, generiert zed-editor.pdf aus chapters; Download-Link in ganzes-buch.md + index.md | Mittel | 2026-03-15 | SysOps | .github/workflows/deploy.yml |
| #007 | Zed-Buch inhaltlich erweitern: Erkenntnisse aus fb-data/ einfließen lassen — "Wie orchestriere ich AI Agents professionell im Zed Editor mit ACP-Techniken" (AGENTS.md, Postbox-Pattern, Jail-Regel, Multi-Repo-Koordination) | Hoch | 2026-03-15 | SysOps | src/content/docs/books/zed-editor/ |

## In Bearbeitung

| ID | Task | Agent | Seit |
|----|------|-------|------|
