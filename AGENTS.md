# AGENTS.md — collective-context.org (Single Source of Truth für alle AI-Agenten)
> Pflichtlektüre für alle Agenten: Claude Code, ZED/Grok, Gemini CLI, etc.
> Claude Code lädt diese Datei automatisch via Symlink `CLAUDE.md → AGENTS.md`.
> Stand: 27. Feb 2026
>
> Details & Referenzen: `README.md` | Standard: https://agents.md (Linux Foundation)

---

## PROJEKT

**collective-context.org** — Dokumentationsplattform für professionelle AI-Agent-Orchestrierung.
Kernprinzip: *Verifikation statt Spekulation* — nur bestätigte Patterns, praxiserprobte Techniken.

Zielgruppe: DevOps-Teams die AI-Agenten professionell orchestrieren wollen.
Diese AGENTS.md ist selbst eine **Vorlage** — kopierbar für tausende neue Projekte.

---

## REGELN (nicht verhandelbar — jede Verletzung ist ein kritischer Fehler)

**Universelle CC-Regeln (für jedes Projekt gültig):**

1. **JAIL:** Nur innerhalb dieses Repos — absolut kein Ausbruch.
2. **KEIN SUDO.** Niemals. Punkt.
3. **NULL TERMINAL-COMMANDS OHNE EXPLIZITE FREIGABE.**
   Erlaubt ohne Freigabe: Dateien lesen (Read) + schreiben (Write). Sonst nichts.
3a. **KEIN EIGENMÄCHTIGER PLAN-B.**
   Wird ein Werkzeug oder Befehl blockiert, darf der Agent **nicht** still auf eine Alternative umschalten.
   Pflicht: STOPP → Alternative dem SysOps vorschlagen → explizite Freigabe abwarten → dann umsetzen.
   Beispiel: Terminal-Command blockiert? → „Darf ich das stattdessen mit Read+Write lösen?" — warten.
   Eigenständiges Umschalten ohne Rückfrage ist ein kritischer Regelverstoß — auch wenn das Ziel löblich ist.
4. **KEINE CREDENTIALS IM CODE.** Nur Umgebungsvariablen. Niemals Keys hardcoden.
4a. **KEINE CREDENTIALS IM CHAT.** Credentials-Inhalt nie ausgeben — nur melden.
5. **WARTEN:** Nach jeder Frage auf Antwort warten. Niemals vorausarbeiten.
6. **Bei Unsicherheit: STOPP. Fragen. Warten.**

**Projektspezifisch (github.io):**

7. **KEIN `npm run build` OHNE FREIGABE** — Build erzeugt `pagefind/`-Index.
8. **`_archive/`-Verzeichnisse sind eingefroren** — kein Zugriff ohne explizite SysOps-Freigabe.
9. **Git-Workflow:** → Lies `README.md#git-workflow` bevor du einen git-Befehl ausführst.

---

## ROLLEN IM MULTI-AGENTEN-SYSTEM

**Scanner-Agent (Gemini CLI / ZED):** Scannt Inhalte/Links → schreibt Tasks in `postbox/todo.md` → löst **nie** selbst.
**Fixer-Agent (Claude Code):** Liest `todo.md` (Fällig: sofort) → editiert Docs → committed → Hash in `done.md`.
**ZED-Agent (Grok):** Koordiniert, prüft `postbox/cron.md` auf fällige Einträge → überträgt in `todo.md`.
**SysOps:** Gibt Freigaben: „Führe X aus." — setzt Prioritäten, reviewed Merges.

Details & Common Pitfalls: `postbox/README.md`

---

## MULTI-REPO-WORKFLOW

Eine einzige Claude Code Instanz kann mehrere Repos verwalten —
getrennte `.git/`-Verzeichnisse isolieren sie sauber voneinander.

```
Claude Code (eine Instanz)
──────────────────────────────────────────────────────────────
✓ Read/Write + git commit/push in Repo A
✓ Read/Write + git commit/push in Repo B
```

Git-Operationen werden mit `git -C /absoluter/pfad/zum/repo/` gezielt.
Postbox bleibt für async-Koordination mit anderen Agenten (ZED/Gemini) gültig.

---

## OFFENE PUNKTE (nächste Session zuerst!)

Vollständige Liste: `postbox/todo.md`

- **#004** Duplikat bereinigen: `src/content/books/` vs `src/content/docs/books/`
- **#005** AGENTS.md in github.io fertigstellen (diese Datei)
- **#006** PDF-Export via Pandoc in CI/CD (Fälligkeit 2026-03-15)
- **#007** Zed-Buch erweitern: ACP-Patterns, professionelle Agent-Orchestrierung

---

*Technische Details: `README.md` · Postbox-Regeln: `postbox/README.md`*
*Dokumentation: https://collective-context.org · Standard: https://agents.md*
