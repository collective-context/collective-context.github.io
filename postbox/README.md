# Postbox Pattern — collective-context.org
> Asynchrone Koordination zwischen AI-Agenten (ZED, Claude CODE, Gemini) via Dateisystem.
> Vollständige Dokumentation: https://collective-context.org/cc/postbox-pattern/#das-postbox-konzept

## Konzept

Dateibasiertes Task- und Scheduler-Board für alle Agenten im github.io-Projekt:

```
postbox/
├── todo.md              ← Offene Tasks (alle Agenten lesen/schreiben)
├── done.md              ← Erledigte Tasks (Audit-Log mit Commit-Hashes)
├── cron.md              ← Termingebundene & wiederkehrende Erinnerungen
├── attachments/
│   ├── todo/            ← Aktive Briefings (_TODO_ Dateien)
│   ├── cron/            ← Aktive Cron-Briefings (_CRON_ Dateien)
│   └── done/            ← Archivierte Briefings (erledigte Tasks)
└── README.md            ← Diese Datei (Rollen, Formate, Regeln)
```

- **Kein API/Code nötig**: Normale File-Read/Write.
- **Git-natürlich**: Committe Änderungen in `postbox/`.
- **Debuggbar**: Humans können einsehen.
- **AGENTS.md-konform**: JAIL gilt für fb-data/ + github.io/, Freigaben für Terminal.

---

## Rollen

**Scanner-Agent** (z.B. Gemini CLI):
- Scannt Inhalte/Struktur nach Issues (z.B. veraltete Docs, tote Links, fehlende Kapitel).
- Schreibt Tasks in `todo.md`.
- **Löst keine Tasks** — nur melden.

**Fixer-Agent** (z.B. Claude Code):
- Liest `todo.md`, wählt höchste Priorität mit `Fällig: sofort`.
- Markiert als "In Bearbeitung".
- Schreibt/editiert Docs, committet.
- Trägt Commit-Hash in `done.md`.

**ZED-Agent** (Grok):
- Allrounder: Scannt bei Bedarf, fixt kleine Tasks, koordiniert.
- Wartet auf SysOps-Freigaben (AGENTS.md Regel 3).
- Prüft `cron.md` auf fällige Einträge → überträgt in `todo.md` (Status: `übertragen`).

**Human/SysOps**:
- Überwacht `todo.md`/`done.md`.
- Gibt Freigaben (z.B. "Führe git push aus.").
- Setzt Prioritäten, filtert False Positives.

---

## Format: postbox/todo.md

```
# Todo — Offene Tasks
> Zuletzt aktualisiert: [DATUM] von [AGENT]

## Offene Tasks
| ID | Task | Priorität | Fällig | Quelle | Datei:Zeile |
|----|------|-----------|--------|--------|-------------|
| #001 | Beschreibung | Hoch | sofort | Scanner | src/file.md:L42 |
| #002 | Beschreibung | Mittel | 2026-05-20 | cron.md #R001 | src/file.md:L56 |

## In Bearbeitung
| ID | Task | Agent | Seit |
|----|------|-------|------|
| #001 | ... | Claude Code | 2026-02-27 |
```

**Fällig-Werte:**
- `sofort` — sofort aktionierbar, Fixer wählt nach Priorität
- `YYYY-MM-DD` — nicht vor diesem Datum bearbeiten (aus `cron.md` übertragen)

---

## Format: postbox/done.md

```
# Done — Erledigte Tasks
> Audit-Log. Nie löschen, nie editieren — nur anhängen.

| ID | Task | Agent | Commit | Datum |
|----|------|-------|--------|-------|
| #001 | Zed-Buch angelegt | Claude Code | 0a0286c | 2026-02-24 |
```

---

## Format: postbox/cron.md

```
| ID | Schedule | Aktion | Priorität | Datei:Zeile | Attachment | Status |
|----|----------|--------|-----------|-------------|------------|--------|
| #R001 | 2026-05-20  | Einmalig: Review Zed-Buch Kapitel  | Hoch   | src/.../index.md | attachments/… | offen |
| #R002 | 0 0 1 * *   | Wiederkehrend: Tote Links prüfen   | Mittel | —                | —             | aktiv |
```

- `Schedule`: `YYYY-MM-DD` (einmalig) oder Cron-Ausdruck `Min Std Tag Monat Wochentag`.
- IDs mit `#R`-Prefix (getrennt von Task-IDs `#001`, `#002`, …).
- **Status einmalig**: `offen` → `übertragen` → `erledigt`.
- **Status wiederkehrend**: `aktiv` | `pausiert`.
- Einträge **nie löschen** — Status anpassen.
- ~30 Tage vor Fälligkeit → Status `übertragen`, Task in `todo.md` eintragen.

---

## Attachments

Für komplexe Tasks und Cron-Einträge: `postbox/attachments/DATUM_TYP_beschreibung.md`

```
postbox/attachments/
├── todo/
│   └── 2026-02-27_TODO_001_kapitel-neubau.md        ← Aktiv: Briefing zu offenem Task
├── cron/
│   └── 2026-02-27_CRON_jahres-review.md             ← Aktiv: Arbeitsanweisung zu cron-Eintrag
└── done/
    └── 2026-02-24_AUFTRAG_bibliothek-zed-buch.md    ← Erledigt: nicht löschen, archivieren
```

**Lifecycle:**
- `_TODO_`: Attachment erstellen → in `attachments/todo/` ablegen, in `todo.md` verlinken → Task erledigt → `git mv` nach `attachments/done/`
- `_CRON_`: Attachment erstellen → in `attachments/cron/` ablegen, in `cron.md` verlinken → liegt dort so lange wie der Cron-Job `aktiv` ist bzw. bis ein Termin-Job nach `todo.md` übertragen wurde → dann `git mv` nach `attachments/done/`
- Nie löschen — `done/` ist Archiv

---

## Regeln

1. **IDs sequentiell** (`#001`, `#002`, … und `#R001`, `#R002`, …), nie wiederverwenden.
2. **Commit-Hash immer** in `done.md` (`git show <hash>` für Details).
3. **Freigaben einholen**: Terminal (git, npm etc.) nur mit "Führe X aus." (AGENTS.md Regel 3).
4. **Kein Konflikt**: Schreibe atomar; bei Race: Human-Check.
5. **JAIL**: Ausschließlich fb-data/ + github.io/ (AGENTS.md Regel 1).

---

## Häufige Fehler (Common Pitfalls)

1. **Scanner löst Tasks selbst** — Scanner schreibt nur in `todo.md`. Dateien anfassen ist Fixer-Aufgabe.
2. **Commit-Hash fehlt in done.md** — Kein Hash = kein Done.
3. **Task-Rückstau** — Human setzt Prioritäten, filtert False Positives, bevor Claude weiterarbeitet.
4. **cron.md ignorieren** — ZED/Scanner prüft bei jedem Lauf: fällige `#R`-Einträge → in `todo.md` übertragen.
5. **Fällig-Datum vergessen** — Aus `cron.md` übertragene Tasks tragen das Original-Datum als `Fällig`-Wert.

---

## Human-in-Loop Priorisierung

1. Scanner befüllt `todo.md`
2. **SysOps reviewed** — setzt Prioritäten, entfernt False Positives
3. Fixer (Claude) arbeitet kuratierte Liste ab (`Fällig: sofort` zuerst)
