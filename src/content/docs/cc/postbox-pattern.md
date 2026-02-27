---
title: Postbox Pattern
description: Shared Task State zwischen Agenten via postbox/ — todo, done, cron und Attachments
---

## Das Postbox-Konzept

Das Postbox Pattern ist der einfachste Mechanismus für **asynchrone Koordination zwischen mehreren AI-Agenten** ohne API-Overhead oder Message-Passing-Infrastruktur.

**Kernidee:** Drei Dateien und ein Attachments-Verzeichnis im Dateisystem fungieren als geteiltes Task-Board mit Scheduler.

```
postbox/
├── todo.md              ← Offene Tasks (alle Agenten lesen/schreiben)
├── done.md              ← Erledigte Tasks (Audit-Log mit Commit-Hashes)
├── cron.md              ← Termingebundene & wiederkehrende Erinnerungen
├── attachments/
│   ├── todo/            ← Aktive Briefings zu offenen Tasks (_TODO_ Dateien)
│   ├── cron/            ← Aktive Arbeitsanweisungen zu Cron-Einträgen (_CRON_ Dateien)
│   └── done/            ← Archivierte Briefings (nie löschen)
└── README.md            ← Rollen, Formate, Regeln für alle Agenten
```

## Warum Dateisystem statt API?

- **Kein Code nötig**: Agenten nutzen ihre normalen Datei-Lese/Schreib-Fähigkeiten
- **Kein Overhead**: Keine Nachrichtenwarteschlange, kein State-Management-Service
- **Git-natürlich**: Alle Postbox-Dateien werden committed — vollständige History
- **Debuggbar**: Menschen können jederzeit einsehen, was Agenten koordinieren
- **Tool-agnostisch**: Jeder Agent, der Dateien lesen kann, versteht das Format

---

## Format: postbox/todo.md

```markdown
# Todo — Offene Tasks
> Zuletzt aktualisiert: 2026-02-27 von Gemini CLI

## Offene Tasks

| ID | Task | Priorität | Fällig | Quelle | Briefing |
|----|------|-----------|--------|--------|---------|
| #T001 | **auth.py:** Fehlerbehandlung in login() | Hoch | sofort | Gemini-Scan | [T001](attachments/todo/2026-02-27_TODO_T001_login-fix.md) |
| #T002 | **users.py:** Deprecated API ersetzen | Mittel | sofort | Gemini-Scan | — |
| #T003 | **Jahres-Review** Abhängigkeiten prüfen | Mittel | 2026-06-01 | cron.md #R001 | [R001](attachments/cron/2026-02-27_CRON_jahres-review.md) |

## In Bearbeitung

| ID | Task | Agent | Seit |
|----|------|-------|------|
| #T001 | auth.py Fehlerbehandlung | Claude Code Tab | 2026-02-27 |
```

**Fällig-Werte:**
- `sofort` — Fixer wählt nach Priorität, sofort aktionierbar
- `YYYY-MM-DD` — nicht vor diesem Datum bearbeiten (aus `cron.md` übertragen)

**Briefing-Spalte:** Für komplexe Tasks — Link zur Attachment-Datei mit Kontext, Ansatz, Testbarkeit. Kurze Tasks brauchen kein Briefing (`—`).

---

## Format: postbox/done.md

```markdown
# Done — Erledigte Tasks
> Audit-Log. Nie löschen, nie editieren — nur anhängen.

| ID | Task | Agent | Commit | Datum |
|----|------|-------|--------|-------|
| #T001 | auth.py Fehlerbehandlung in login() | Claude Code Tab | abc1234 | 2026-02-27 |
```

**Regel:** Kein Commit-Hash = kein Done. `git show abc1234` gibt alle Details zur Änderung.

---

## Format: postbox/cron.md

Für termingebundene und wiederkehrende Aufgaben — der Agenten-Kalender.

```markdown
| ID | Schedule | Aktion | Priorität | Attachment | Status |
|----|----------|--------|-----------|------------|--------|
| #R001 | 2026-06-01 | Einmalig: Abhängigkeiten prüfen | Mittel | [Briefing](attachments/cron/2026-02-27_CRON_jahres-review.md) | offen |
| #R002 | 0 0 1 * *  | Wiederkehrend: Tote Links prüfen | Mittel | — | aktiv |
```

**Schedule-Format:**
- `YYYY-MM-DD` — einmaliges Datum
- Cron-Ausdruck `Min Std Tag Monat Wochentag` — wiederkehrend

**Status einmalig:** `offen` → `übertragen` (in todo.md eingetragen) → `erledigt`
**Status wiederkehrend:** `aktiv` | `pausiert`
**Regel:** Einträge nie löschen — Status anpassen. Etwa 30 Tage vor Fälligkeit in `todo.md` übertragen.

---

## Attachments

Für komplexe Tasks reicht eine Zeile in `todo.md` nicht aus. Das Attachment enthält den vollen Kontext.

**Namenskonvention:** `postbox/attachments/TYP/DATUM_TYP_beschreibung.md`

```
postbox/attachments/
├── todo/
│   └── 2026-02-27_TODO_T001_login-fix.md        ← Briefing zu offenem Task
├── cron/
│   └── 2026-02-27_CRON_jahres-review.md          ← Arbeitsanweisung zu Cron-Eintrag
└── done/
    └── 2026-02-24_TODO_T000_setup.md             ← Archiviert: nicht löschen
```

**Lifecycle:**
- `_TODO_`: Attachment anlegen → `attachments/todo/` → in `todo.md` verlinken → Task erledigt → `git mv` nach `attachments/done/`
- `_CRON_`: Attachment anlegen → `attachments/cron/` → in `cron.md` verlinken → liegt dort solange der Job `aktiv` ist oder bis der Termin nach `todo.md` übertragen wurde → dann `git mv` nach `attachments/done/`
- `done/` ist Archiv — nie löschen

---

## Workflow-Rollen

### Scanner-Agent (z.B. Gemini CLI)
```
Du bist der Scanner. Deine einzige Aufgabe:
1. Scanne src/ nach [Problemen]
2. Schreibe jeden Fund in postbox/todo.md
3. Löse niemals selbst einen Task
4. Beginne sofort nach dem Schreiben mit dem nächsten Scan
```

### Fixer-Agent (z.B. Claude Code Tab)
```
Du bist der Fixer. Deine Aufgabe:
1. Lies postbox/todo.md — wähle höchste Priorität mit Fällig: sofort
2. Markiere als "In Bearbeitung"
3. Fixe den Code, committe
4. Trage Commit-Hash in postbox/done.md ein
5. Beginne mit dem nächsten Task
```

### ZED-Agent / Koordinator
```
Prüfe postbox/cron.md auf fällige Einträge (Datum erreicht oder < 30 Tage):
→ Übertrage in postbox/todo.md (Status: übertragen)
→ Delegiere komplexe Tasks an Fixer via todo.md
```

---

## Human-in-the-Loop Priorisierung

Das Pattern funktioniert am besten mit einem Menschen in der Schleife — nicht als Flaschenhals, sondern als Qualitätsfilter:

```
Scanner befüllt todo.md
        ↓
SysOps reviewed — setzt Prioritäten, löscht False Positives
        ↓
Fixer arbeitet kuratierte Liste ab (Fällig: sofort, höchste Priorität zuerst)
```

**Praktischer Tipp:** Ein Task pro Projekt oder Datei in `todo.md` — nicht ein Task pro Bug. Lange Task-Listen verursachen Rückstau. Komplexe Tasks bekommen ein Attachment mit der Aufschlüsselung.

---

## Initialisierung

```bash
mkdir -p postbox/attachments/{todo,cron,done}

cat > postbox/todo.md << 'EOF'
# Todo — Offene Tasks

| ID | Task | Priorität | Fällig | Quelle | Briefing |
|----|------|-----------|--------|--------|---------|

## In Bearbeitung

| ID | Task | Agent | Seit |
|----|------|-------|------|
EOF

cat > postbox/done.md << 'EOF'
# Done — Erledigte Tasks
> Audit-Log. Nie löschen, nie editieren — nur anhängen.

| ID | Task | Agent | Commit | Datum |
|----|------|-------|--------|-------|
EOF

cat > postbox/cron.md << 'EOF'
# Cron — Termingebundene & Wiederkehrende Erinnerungen

| ID | Schedule | Aktion | Priorität | Attachment | Status |
|----|----------|--------|-----------|------------|--------|
EOF

touch postbox/attachments/todo/.gitkeep
touch postbox/attachments/cron/.gitkeep
touch postbox/attachments/done/.gitkeep

git add postbox/
git commit -m "feat: postbox pattern initialisiert"
```

---

## Häufige Fehler

**Scanner löst Tasks selbst** → Scanner schreibt nur in `todo.md`. Code anfassen ist ausschließlich Fixer-Aufgabe.

**Commit-Hash fehlt in done.md** → Kein Hash = kein Done. Ohne Hash ist die Audit-History wertlos.

**cron.md ignorieren** → ZED/Scanner prüft bei jedem Lauf: fällige `#R`-Einträge → in `todo.md` übertragen.

**Lange Task-Beschreibungen in der Tabelle** → Prosa gehört ins Attachment. Die Tabelle bleibt scanbar.

**Task-Rückstau** → SysOps reviewed todo.md, filtert False Positives — dann erst Fixer loslassen.

---

*Verwandte Patterns: [Dual-Agent Pattern](/patterns/dual-agent) · [Multi-Repo Coordination](/patterns/multi-repo)*
