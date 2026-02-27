# Feedback & Vorschläge an Collective Context (collective-context.org)
> Von: who@/B2B Projekt (fb-data) · Datum: 25. Feb 2026
> Basis: Mehrere AI-Agent-Sessions mit euren Guides als Referenz

---

## 1. KORREKTUREN — Was auf eurer Website korrigiert werden sollte

### 1.1 Symlink-Richtung ist veraltet

**Was ihr aktuell schreibt** (auf `/cc/claude-md`):
> „AGENTS.md als Symlink auf CLAUDE.md"

**Was 2026 der Community-Standard ist:**
> `AGENTS.md` ist das Single Source of Truth. `CLAUDE.md` ist der Symlink.

```bash
# Richtig (Community-Standard 2026):
mv CLAUDE.md AGENTS.md
ln -s AGENTS.md CLAUDE.md
echo "CLAUDE.md" >> .gitignore

# Falsch (euer Guide):
ln -s CLAUDE.md AGENTS.md
```

**Begründung:** `AGENTS.md` ist seit 2025 ein offener Standard unter der **Linux Foundation**
(Agentic AI Foundation), unterstützt von Google, OpenAI, Sourcegraph und GitHub Copilot.
Claude Code ist eine der wenigen Ausnahmen, die `CLAUDE.md` bevorzugt — aber die
Community-Richtung ist eindeutig. Projekte die eurem Guide folgen, werden in absehbarer Zeit
zur Umstrukturierung gezwungen sein, sobald Claude Code `AGENTS.md` nativ unterstützt
(was auf GitHub bereits stark gefordert wird).

**Belege:**
- [AGENTS.md becomes the convention](https://pnote.eu/notes/agents-md/) — Community-Analyse der Verschiebung
- [The Rise of AGENTS.md — An Open Standard](https://tessl.io/blog/the-rise-of-agents-md-an-open-standard-and-single-source-of-truth-for-ai-coding-agents/) — Tessl Blog
- [One AGENTS.md to Rule Them All](https://plgah.medium.com/one-agents-md-to-rule-them-all-70e6dc87a05f) — Medium, Feb 2026
- [CLAUDE.md to AGENTS.md Migration Guide](https://solmaz.io/log/2025/09/08/claude-md-agents-md-migration-guide/) — Migrationsguide
- [agents.md](https://agents.md/) — Offizielle Linux Foundation Spec-Seite
- [Gemini CLI AGENTS.md Discussion](https://github.com/google-gemini/gemini-cli/discussions/1471) — GitHub, Google
- [Customize Gemini using AGENTS.md](https://developer.android.com/studio/gemini/agent-files) — Android Developers Docs

---

### 1.2 Navigation versteckt viele Seiten — AI-Agents raten URLs und treffen auf 404

Auf der Hauptseite (`/`) sind nur folgende Seiten verlinkt:
`/quickstart/setup` · `/zed/acp` · `/cc/claude-md` · `/patterns/dual-agent` · `/case-studies/`

Tatsächlich existieren viele weitere wichtige Seiten ohne Navigations-Link:
`/cc/agents-md` · `/cc/concept` · `/cc/llm-routing` · `/cc/postbox-pattern` ·
`/zed/gemini-cli` · `/zed/ollama` · `/zed/overview` · `/patterns/orchestra` · `/patterns/pipeline`

**Das Problem in der Praxis:** AI-Agents die eure Site lesen, erhalten vom WebFetch-Tool
eine Zusammenfassung *ohne* rohe href-Attribute. Sie leiten URL-Pfade aus Beschreibungen
ab — und treffen auf 404. Das haben wir selbst erlebt: Wir haben `/cc/zed-acp-setup/`,
`/cc/claude-code-tab/`, `/dual-agent-pattern/` geraten — alle 404. Die echten URLs
(`/zed/acp`, `/zed/claude-code-tab`, `/patterns/dual-agent`) waren nur durch explizites
Auslesen aller `href`-Attribute der Seite auffindbar.

**Empfehlung:** Sitemap-Seite anlegen (z.B. `/sitemap`) oder alle Unterseiten in der
Hauptnavigation sichtbar machen. Das hilft Menschen und AI-Agents gleichermassen.

---

### 1.3 Kein Quickstart-Template zum Sofort-Einsetzen

Euer `/quickstart/setup` erklärt den *Prozess*, liefert aber keine fertige Datei die man
direkt in ein Projekt kopieren kann. Neue Projekte müssen Regeln aus mehreren Seiten
zusammensuchen und selbst eine `AGENTS.md` aufbauen.

Ein kommentiertes Template würde den Onboarding-Aufwand erheblich reduzieren.

**Vorschlag:** Siehe Abschnitt 2 — wir haben ein solches Template entworfen.

---

## 2. VORSCHLAG — Eine einzige Datei um das CC-System rasch zu implementieren

Das Template soll als Download auf collective-context.org angeboten werden
(z.B. unter `/cc/quickstart-template` oder direkt als GitHub Raw-Download).

Ein Projekt kopiert die Datei, füllt die `[PLATZHALTER]` aus, führt die
Setup-Checkliste aus — und ist vollständig CC-konform aufgestellt.

**Template-Datei:** `todo_for_CC_template.md` (liegt diesem Dokument bei)

### Highlights des Templates

Das Template enthält alle Pflicht-Abschnitte:

| Abschnitt | Zweck |
|---|---|
| Header | CC-Link, Datum, Agenten-Hinweis |
| PROJEKT | 1–3 Sätze Projektbeschreibung |
| REGELN | Universelle CC-Regeln + Platzhalter für projektspezifische |
| STACK & ARCHITEKTUR-ENTSCHEIDUNGEN | „X statt Y, weil Z" — mit Erinnerungsregel |
| REPO-STRUKTUR | Standardstruktur mit `AGENTS.md` + Symlink |
| ROLLEN | Scanner / Fixer / Koordinator / SysOps |
| POSTBOX — FORMATE | Vollständige Tabellenvorlagen für `todo.md` und `done.md` |
| COMMIT-KONVENTION | Conventional Commits, alle Typen |
| BRANCH-STRATEGIE | main + claude/[feature]-[session-id] |
| TOOL-SPEZIFISCHE KONFIGURATION | *Optional* — ACP, @file, /compact für ZED/Claude Code Tab |
| BEKANNTE FEHLER / NIE WIEDER | Self-Correction Cycle — Platzhalter für ersten Eintrag |
| OFFENE PUNKTE | Platzhalter |
| SETUP-CHECKLISTE | 7 Schritte mit Bash-Befehlen, abhakbar |

**Neues Element gegenüber eurem aktuellen Guide:**
Der optionale Abschnitt `TOOL-SPEZIFISCHE KONFIGURATION` gibt ZED/Claude Code Tab
Nutzern einen klar bezeichneten Ort für ACP Permission Mode, `@file`-Syntax und
`/compact`-Workaround — ohne dass diese Abschnitte andere Agenten verwirren
(sie überlesen sie einfach).

---

## 3. ZUSAMMENFASSUNG DER EMPFEHLUNGEN

| Priorität | Was | Wo auf eurer Site |
|---|---|---|
| **Kritisch** | Symlink-Richtung korrigieren: `CLAUDE.md → AGENTS.md`, nicht umgekehrt | `/cc/claude-md`, `/cc/agents-md` |
| **Hoch** | Sitemap anlegen — alle Unterseiten auffindbar machen | Neue Seite `/sitemap` |
| **Hoch** | Quickstart-Template als Download anbieten (siehe Beilage) | `/quickstart/setup` oder eigene Seite |
| **Mittel** | `AGENTS.md` als Linux-Foundation-Standard benennen und belegen | `/cc/agents-md` |

---

*Dieses Dokument entstand durch praktische Erfahrung mit dem CC-System im who@/B2B Projekt
und eigene Recherche (Feb 2026). Alle Korrekturen basieren auf verifizierten Quellen —
Belege siehe Abschnitt 1.1.*
