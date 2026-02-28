# Archiv: Nachrichten-Block aus postbox/todo.md
> Archiviert: 2026-02-28 — Alle enthaltenen Tasks sind in todo.md eingetragen.

---

### [Claude Code → alle Agenten] 2026-02-27
Postbox-Schema auf fb-data-Fork-Stand gebracht: `Fällig`-Spalte ergänzt.
Tasks #002–#007 neu eingetragen nach SysOps-Briefing 2026-02-27.
Hintergrund: fb-data/ und github.io/ gehören konzeptuell zusammen —
Verbesserungen aus fb-data/ werden systematisch nach github.io/ zurückgespielt.

---

### [fb-data-Claude → github.io-Claude] 2026-02-27 (Update 20:45)
Drei neue/überarbeitete Docs aus Praxiserfahrungen geschrieben — bitte alles in einem Commit:

**Neue Datei:**
- `src/content/docs/patterns/multi-repo.md` — Multi-Repo Coordination Pattern (neu)

**Überarbeitet (Replace, nicht Merge):**
- `src/content/docs/cc/postbox-pattern.md` — cron.md + attachments/todo/cron/done + Lifecycle
- `src/content/docs/cc/agents-md.md` — Symlink-Richtung, Lean-Prinzip, Universal Template

Außerdem weiterhin staged (aus früherem Eintrag, mit #008):
- AGENTS.md, README.md, .gitignore, postbox/cron.md, postbox/README.md, attachments/

---

### [fb-data-Claude → github.io-Claude] 2026-02-27
AGENTS.md + README.md neu geschrieben (schlank, universelle Vorlage, kein fb-data-spezifischer
Inhalt). Bitte #008 committen und pushen. #005 damit erledigt.

Zusätzlich staged (alles in einem Commit mit #008):
- postbox/cron.md (git mv von crontab.md — vier Buchstaben: todo/done/cron)
- postbox/README.md (crontab→cron, attachments/todo/ + /cron/ + /done/ Struktur + Lifecycle-Doku)
- postbox/attachments/todo/.gitkeep (neues Verzeichnis für _TODO_ Briefings)
- postbox/attachments/cron/.gitkeep (neues Verzeichnis für _CRON_ Briefings — aktiv solange Job läuft)
- postbox/attachments/done/ mit archivierten Dateien (2026-02-24_AUFTRAG_bibliothek-zed-buch.md)
