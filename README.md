# collective-context.org — Technische Referenz

> **Pflichtlektüre vor jeder Session:** `AGENTS.md` (Regeln, Rollen, Workflow)
> Diese Datei enthält die technischen Details auf die `AGENTS.md` verweist.
>
> 🌐 Live: https://collective-context.org

---

## Schnellnavigation

| Bereich | Datei | Zweck |
|---------|-------|-------|
| **Regeln & Rollen** | `AGENTS.md` | Single Source of Truth — Pflichtlektüre |
| **Postbox / Task-Board** | [`postbox/README.md`](postbox/README.md) | Agenten-Koordination, Formate, Pitfalls |
| **Quickstart** | `src/content/docs/quickstart/` | Setup-Guide, ACP-Erklärung |
| **Collective Context** | `src/content/docs/cc/` | AGENTS.md, Postbox-Pattern, LLM-Routing |
| **Zed-Editor** | `src/content/docs/zed/` | ACP, Claude Code Tab, Gemini CLI, Ollama |
| **Patterns** | `src/content/docs/patterns/` | Dual-Agent, Pipeline, Orchestra |
| **Bücher** | `src/content/docs/books/` | Zed-Editor Buch (7 Kapitel) |
| **Archiv** | `src/content/docs/_archive/` | ⛔ EINGEFROREN — kein Zugriff ohne SysOps |

---

## Stack & Architektur-Entscheidungen

| Komponente | Entscheidung | Begründung |
|---|---|---|
| Framework | Astro 5 + Starlight | Docs-optimiert; MDX, Pagefind, Navigation out-of-the-box |
| Content | Markdown + MDX in `src/content/docs/` | Git-natürlich; von AI-Agenten les- und schreibbar |
| Deploy | GitHub Pages via `deploy.yml` | Automatisch bei push auf `main`; kein manueller Build |
| Suche | Pagefind (generiert) | Static search ohne Server; `pagefind/` nie manuell committen |
| Buchformat | Einzelne `.md`-Kapitel als Source of Truth | Agenten editieren Kapitel ohne Konflikte im Gesamtdokument |
| PDF-Export | Pandoc im CI/CD (geplant, Task #006) | Generiertes Artefakt — nie manuell gepflegt |

---

## Repo-Struktur

```
github.io/
├── AGENTS.md                              ← Pflichtlektüre (Regeln, Rollen)
├── CLAUDE.md                              → Symlink auf AGENTS.md
├── README.md                              ← Diese Datei (technische Details)
├── src/
│   └── content/
│       └── docs/                          ← Einzige Schreibzone für Inhalte
│           ├── index.md                   ← Homepage
│           ├── quickstart/
│           ├── cc/                        ← Collective Context Konzepte
│           ├── zed/                       ← Zed-Editor Guides
│           ├── patterns/                  ← Multi-Agenten-Muster
│           ├── case-studies/
│           ├── books/zed-editor/          ← 7 Kapitel + ganzes-buch.md
│           └── _archive/v1-2025/          ← ⛔ EINGEFROREN
├── postbox/                               ← Multi-Agenten Task-Board
├── public/                                ← Statische Assets
├── pagefind/                              ← ⛔ GENERIERT — nie manuell editieren
└── .github/workflows/deploy.yml           ← CI/CD → GitHub Pages
```

---

## Git-Workflow {#git-workflow}

### Commit-Konvention (Conventional Commits)

| Typ | Wann |
|---|---|
| `feat` | Neues Kapitel, neue Seite |
| `fix` | Korrektur in bestehendem Content |
| `docs` | AGENTS.md, README, Metadaten |
| `refactor` | Umstrukturierung (z.B. Duplikat-Bereinigung) |
| `chore` | Build, Dependencies, Konfiguration, Postbox |

Beispiele:
- `feat(zed-buch): Kapitel 08 ACP-Workflow hinzugefügt`
- `fix(quickstart): Setup-Link korrigiert`
- `chore(postbox): done.md #004 eingetragen`

### Branch-Strategie

- `main` — direkter Agent-Commit erlaubt (Docs-Repo, kein Produktiv-Code)
- Feature-Branches nur bei größeren Umstrukturierungen oder auf SysOps-Anweisung

---

## Build & Deploy

```bash
npm install          # Dependencies installieren
npm run dev          # Dev-Server auf localhost:4321
npm run build        # Produktions-Build nach ./dist/
npm run preview      # Build lokal prüfen
```

Deploy läuft automatisch via `.github/workflows/deploy.yml` bei jedem Push auf `main`.
`pagefind/` wird im Build generiert — **nie** manuell committen.

---

## Bekannte Fehler / Nie wieder

- **pagefind/ manuell committen:** Wird vom Build generiert. Nie anfassen.
- **`_archive/` lesen ohne Freigabe:** Eingefroren = kein Zugriff ohne SysOps-Auftrag.
- **URLs erfinden:** Nie aus Beschreibungen ableiten — immer per WebFetch prüfen.
- **Projekt-spezifische Patterns in AGENTS.md:** AGENTS.md ist universelle Vorlage.
  Projekt-spezifische Workflows (z.B. Multi-Repo-Koordination) gehören in `docs/patterns/`.

---

## Setup-Checkliste (einmalig)

- [x] `AGENTS.md` als Single Source of Truth angelegt
- [x] `ln -s AGENTS.md CLAUDE.md` — Symlink gesetzt
- [x] `CLAUDE.md` in `.gitignore` eingetragen
- [x] `postbox/` mit todo/done/crontab/README/attachments initialisiert
- [ ] `src/content/books/` Duplikat bereinigen (Task #004)
- [ ] PDF-Export via Pandoc in CI/CD (Task #006)

---

*Letzte Aktualisierung: 27. Februar 2026*
