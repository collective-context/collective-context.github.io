---
title: AGENTS.md Guide
description: Das CLAUDE.md-Äquivalent für Gemini CLI, Codex und andere ACP-Agenten — schlank, universell, kopierbar
---

## Was ist AGENTS.md?

AGENTS.md ist der offene Standard für Agent-Kontext-Dateien — analog zu CLAUDE.md, aber für alle ACP-Agenten außer Claude. Unterstützt von:

- **Gemini CLI** — liest AGENTS.md automatisch
- **Codex** (OpenAI) — liest AGENTS.md automatisch
- **OpenCode** — liest AGENTS.md automatisch
- Weitere ACP-Agenten, die den Standard implementieren

Standard-Spezifikation: [agents.md](https://agents.md/) (Linux Foundation / Agentic AI Foundation)

---

## AGENTS.md vs. CLAUDE.md — und der Symlink

| Datei | Zielgruppe | Auto-load |
|---|---|---|
| `CLAUDE.md` | Claude Code, Claude Code Web | Ja (alle Claude-Instanzen) |
| `AGENTS.md` | Gemini CLI, Codex, OpenCode, alle ACP-Agenten | Ja (kompatible Agenten) |

**Single Source of Truth:** Eine Datei pflegen, nicht zwei. Die empfohlene Konfiguration:

```bash
# AGENTS.md ist die Quelle — CLAUDE.md ist der Symlink
mv CLAUDE.md AGENTS.md          # oder direkt AGENTS.md anlegen
ln -s AGENTS.md CLAUDE.md       # Claude liest CLAUDE.md → landet bei AGENTS.md
echo "CLAUDE.md" >> .gitignore  # Symlink nicht versionieren
```

**Warum so und nicht umgekehrt?** `AGENTS.md` ist der offene Standard der Community (Linux Foundation, unterstützt von Google, OpenAI, Sourcegraph, GitHub Copilot). Claude ist eine der wenigen Ausnahmen die `CLAUDE.md` bevorzugt — aber die Entwicklungsrichtung ist eindeutig. Mit dem Symlink funktioniert heute Claude, und morgen jedes weitere Tool das `AGENTS.md` implementiert.

---

## Das Lean-Prinzip: ≤100 Zeilen

AGENTS.md ist **Pflichtlektüre für jeden Agenten** — bei jeder Session, ohne Ausnahme. Was nicht gelesen wird, kann nicht helfen. Was zu lang ist, wird überflogen.

**Faustregel:** AGENTS.md ≤100 Zeilen. Details in `README.md` auslagern.

```markdown
## Git-Workflow
→ Lies README.md#git-workflow vor jedem git-Befehl.
```

Agenten folgen Referenzen wenn sie klar labeled sind. Eine AGENTS.md mit 300 Zeilen
verliert Agenten auf Seite 2. Eine mit 80 Zeilen wird vollständig verarbeitet.

**Was gehört in AGENTS.md:**
- Projektbeschreibung (3 Sätze)
- Regeln (nicht verhandelbar, jede Verletzung ist kritisch)
- Rollen (je eine Zeile pro Agent)
- Offene Punkte (nächste Session zuerst!)
- Links zu README.md für technische Details

**Was gehört in README.md:**
- Stack & Architektur-Entscheidungen (X statt Y, weil Z)
- Repo-Struktur
- Git-Workflow mit Commit-Konvention und Branch-Strategie
- Bekannte Fehler / Nie wieder (Self-Correction Cycle)
- Setup-Checkliste

---

## Universal Template vs. Projektspezifisch

AGENTS.md hat zwei Ausprägungen — und es ist wichtig, sie nicht zu verwechseln:

**Universal Template** (z.B. auf collective-context.org):
- ≤60 Zeilen, englisch oder zweisprachig
- Enthält nur universelle Regeln (JAIL, kein sudo, keine Credentials)
- Keine projekt-spezifischen Workflows
- Kann von jedem neuen Projekt direkt kopiert werden

**Projektspezifisch** (z.B. in deinem Repo):
- Erweitert das Template mit konkreten Regeln (VENV-Pfad, DB-Zugang, Branch-Policy)
- Enthält offene Punkte und Architektur-Entscheidungen
- Verweist auf projekt-interne README.md

**Praktische Frage:** Kann dieses Kapitel in 1000 anderen Projekten sinnvoll sein? Ja → Universal Template. Nein → projektspezifisch.

Beispiel: `Zwei-Instanzen-Workflow für Multi-Repo-Koordination` → projektspezifisch oder eigener Pattern (`/patterns/multi-repo`), nicht ins Universal Template.

---

## Template: AGENTS.md (kopierbar)

```markdown
# AGENTS.md — [PROJEKTNAME]
> Single Source of Truth für alle AI-Agenten
> Claude Code: auto-geladen via Symlink `CLAUDE.md → AGENTS.md`
> Stand: [DATUM] · Setup: https://collective-context.org/quickstart/setup

---

## PROJEKT

[1–3 Sätze: Was ist dieses Projekt? Für wen? Warum?]

---

## REGELN (nicht verhandelbar)

1. **JAIL:** Ausschließlich innerhalb `[PROJEKTVERZEICHNIS]/`. Kein Ausbruch.
2. **KEIN SUDO.** Niemals.
3. **NULL TERMINAL-COMMANDS OHNE EXPLIZITE FREIGABE.**
   Erlaubt ohne Freigabe: Dateien lesen, Dateien schreiben.
4. **KEINE CREDENTIALS IM CODE.** Ausschließlich Umgebungsvariablen.
5. **WARTEN:** Nach jeder Frage auf Antwort warten. Nie vorausarbeiten.
6. **Bei Unsicherheit: STOPP. Fragen. Warten.**

**Projektspezifische Regeln:**
7. [z.B. VENV-Pfad, DB-Zugang, Deployment-Restrictions]

---

## ROLLEN

**Scanner** (z.B. Gemini CLI): Scannt → schreibt in `postbox/todo.md` → löst nie selbst.
**Fixer** (z.B. Claude Code): Liest `todo.md` → fixt → committed → Hash in `done.md`.
**Koordinator** (z.B. ZED/Grok): Allrounder, prüft `cron.md`, delegiert komplexe Tasks.
**SysOps**: Gibt Terminal-Freigaben · Setzt Prioritäten · Reviewed Merges.

Details & Common Pitfalls: `postbox/README.md`

---

## OFFENE PUNKTE (nächste Session zuerst!)

Vollständige Liste: `postbox/todo.md`

- [Nächste Aufgabe]

---

## SETUP-CHECKLISTE

- [ ] `[PLATZHALTER]` ausfüllen
- [ ] `ln -s AGENTS.md CLAUDE.md` ausführen
- [ ] `echo "CLAUDE.md" >> .gitignore`
- [ ] `mkdir -p postbox/attachments/{todo,cron,done}`
- [ ] `postbox/todo.md`, `done.md`, `cron.md` anlegen
- [ ] Ersten Commit: `git add AGENTS.md postbox/ .gitignore && git commit -m "feat: cc setup"`

---

*Dokumentation: https://collective-context.org · Standard: https://agents.md*
```

---

## Häufige Fehler

**Symlink falsch herum** → `ln -s CLAUDE.md AGENTS.md` ist falsch. AGENTS.md ist die Quelle, CLAUDE.md der Symlink.

**AGENTS.md zu lang** → Agenten überfliegen ab Seite 2. Ziel: ≤100 Zeilen. Technische Details in README.md auslagern, mit Anker: `→ Lies README.md#git-workflow`.

**Projekt-spezifische Workflows im Universal Template** → Templates müssen für jedes Projekt kopierbar bleiben. Workflows wie Multi-Repo-Koordination gehören in `docs/patterns/`, nicht ins Template.

**OFFENE PUNKTE nie aktualisiert** → Der Abschnitt verliert seinen Wert. Agenten erwarten hier die wichtigsten nächsten Schritte — nicht einen veralteten Stand von vor drei Wochen.

---

*Weiter: [Postbox Pattern](/cc/postbox-pattern) · [Multi-Repo Coordination](/patterns/multi-repo)*
