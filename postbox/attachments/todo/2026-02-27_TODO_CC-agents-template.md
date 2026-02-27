# AGENTS.md — [PROJEKTNAME]
> Collective Context · Single Source of Truth für alle AI-Agenten
> Claude Code: auto-geladen via Symlink `CLAUDE.md → AGENTS.md`
> Andere Agenten: direkt `AGENTS.md` lesen
> Stand: [DATUM]
>
> Setup: https://collective-context.org/quickstart/setup

---

## PROJEKT

[1–3 Sätze: Was ist dieses Projekt? Für wen? Warum?]

---

## REGELN (nicht verhandelbar)

**Universelle CC-Regeln:**

1. **JAIL:** Ausschließlich innerhalb `[PROJEKTVERZEICHNIS]/`. Kein Ausbruch.
2. **KEIN SUDO.** Niemals.
3. **NULL TERMINAL-COMMANDS OHNE EXPLIZITE FREIGABE.**
   Erlaubt ohne Freigabe: Dateien lesen, Dateien schreiben.
   Alles andere — KEIN git, python, npm, curl — nur mit „Führe X aus." vom SysOps.
4. **WARTEN:** Nach jeder Frage auf Antwort warten. Nie vorausarbeiten.
5. **KEINE CREDENTIALS IM CODE.** Ausschließlich Umgebungsvariablen (`os.environ`, `process.env`).
6. **Bei Unsicherheit: STOPP. Fragen. Warten.**

**Projektspezifische Regeln:** *(hier ergänzen — z.B. VENV-Policy, DB-Zugang, Deployment-Restrictions)*

7. [Regel]
8. [Regel]

---

## STACK & ARCHITEKTUR-ENTSCHEIDUNGEN

| Komponente | Entscheidung | Begründung |
|---|---|---|
| [Komponente] | [X] statt [Y] | [Weil Z] |
| [Komponente] | [X] statt [Y] | [Weil Z] |

> Regel: Jede Entscheidung im Format „X statt Y, weil Z" — nie nur Fakten auflisten.

---

## REPO-STRUKTUR

```
[projektverzeichnis]/
├── AGENTS.md                   ← Diese Datei (Single Source of Truth)
├── CLAUDE.md                   → Symlink auf AGENTS.md
├── postbox/
│   ├── todo.md                 ← Offene Tasks (Scanner schreibt, Fixer liest)
│   ├── done.md                 ← Erledigte Tasks (Audit-Log mit Commit-Hashes)
│   ├── attachments/            ← Ausführliche Briefings zu komplexen Tasks
│   └── README.md               ← Rollen, Formate, Regeln
└── [weitere Verzeichnisse]
```

---

## ROLLEN IM MULTI-AGENTEN-SYSTEM

**Scanner-Agent** (z.B. Gemini CLI):
- Scannt Code/Logs nach Issues · Schreibt Tasks in `postbox/todo.md` · **Fixt nie selbst**

**Fixer-Agent** (z.B. Claude Code):
- Liest `postbox/todo.md` · Wählt höchste Priorität · Fixt · Committed · Trägt Hash in `postbox/done.md`

**Koordinator** (z.B. ZED/Grok):
- Allrounder: scannt bei Bedarf, fixt kleine Tasks, koordiniert zwischen Agenten

**Human/SysOps:**
- Gibt Terminal-Freigaben · Setzt Prioritäten in `postbox/todo.md` · Reviewed Merges

---

## POSTBOX — FORMATE

**postbox/todo.md:**
```
# Todo — Offene Tasks
> Zuletzt aktualisiert: [DATUM] von [AGENT]

## Offene Tasks
| ID | Task | Priorität | Quelle | Datei:Zeile |
|----|------|-----------|--------|-------------|

## In Bearbeitung
| ID | Task | Agent | Seit |
|----|------|-------|------|
```

**postbox/done.md:**
```
# Done — Erledigte Tasks
> Audit-Log. Nie löschen, nie editieren — nur anhängen.

| ID | Task | Agent | Commit | Datum |
|----|------|-------|--------|-------|
```

Regeln: IDs sequentiell (#001, #002, ...) · nie wiederverwenden · Commit-Hash immer eintragen.

---

## COMMIT-KONVENTION

Format: `type(scope): beschreibung` (Conventional Commits)
Typen: `feat` · `fix` · `docs` · `refactor` · `test` · `chore`

---

## BRANCH-STRATEGIE

- `main` — stabiler Stand, kein direkter Agent-Commit
- `claude/[feature]-[session-id]` — Claude Code Branches
- Kein Merge ohne Review durch SysOps

---

## TOOL-SPEZIFISCHE KONFIGURATION (optional)

*Nur ausfüllen wenn ZED + Claude Code Tab im Einsatz ist. Andere Agenten überlesen diesen Abschnitt.*

**ACP Permission Mode** (ZED `settings.json` → `ACP_PERMISSION_MODE`):
- `default` — Bestätigung für jede Aktion
- `acceptEdits` — Datei-Edits automatisch akzeptiert *(empfohlen)*
- `bypassPermissions` — Vollautonomen, nur für Sandboxes

Empfehlung für dieses Projekt: `[acceptEdits / default]`

**@file Kontext** (Dateien direkt im Prompt referenzieren):
```
@AGENTS.md          ← Kontext prüfen
@postbox/todo.md    ← Nächsten Task lesen
@[pfad/zur/datei]   ← Datei im Fokus
```

**Kontext-Management** (`/compact` im ZED Tab nicht verfügbar):
- Bei vollem Kontext: Handover-Dokument anfordern → neue Session mit `@handover-file`

---

## BEKANNTE FEHLER / NIE WIEDER (Self-Correction Cycle)

> Nach jeder Session aktualisieren wenn ein Agent einen Fehler gemacht hat.
> Ziel: Das System korrigiert sich selbst — jeder Fehler wird zur Regel.

- [Noch keine Einträge — beim ersten Fehler hier dokumentieren]

---

## OFFENE PUNKTE

1. [Nächste Aufgabe]
2. [Übernächste Aufgabe]

---

## SETUP-CHECKLISTE (einmalig, nach dem Kopieren dieser Datei)

- [ ] `[PLATZHALTER]` in dieser Datei ausfüllen
- [ ] `ln -s AGENTS.md CLAUDE.md` ausführen
- [ ] `echo "CLAUDE.md" >> .gitignore` ausführen
- [ ] `mkdir -p postbox/attachments` ausführen
- [ ] `postbox/todo.md` und `postbox/done.md` mit den Tabellen-Headers anlegen
- [ ] `postbox/README.md` anlegen (Vorlage: https://collective-context.org/cc/postbox-pattern)
- [ ] Ersten Commit: `git add AGENTS.md postbox/ .gitignore && git commit -m "feat: collective context setup"`

---

*Dokumentation: https://collective-context.org · Standard: https://agents.md (Linux Foundation)*
