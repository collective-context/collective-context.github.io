---
title: Multi-Repo Coordination Pattern
description: Zwei AI-Agenten, zwei Repositories, kein git-Konflikt — koordiniert via postbox/
---

## Das Problem

Du hast zwei Repositories die zusammengehören: ein Backend-Repo und eine Dokumentations-Site, ein Harvester und ein Dashboard, ein Library-Repo und ein Consumer-Repo. Du willst beide mit AI-Agenten bearbeiten.

Die naheliegende Idee — ein Agent arbeitet in beiden Repos — führt in der Praxis zu diesem Moment:

```
$ git push
! [rejected] main -> main (fetch first)
hint: Updates were rejected because the remote contains work
hint: that you do not have locally.
```

Während du in Repo A committed hast, hat eine andere Agent-Instanz in Repo B committed und gepusht. Beim nächsten `git pull --rebase` entsteht ein Merge-Konflikt. Du löst ihn — oder eine dritte Agent-Instanz macht es — und plötzlich arbeitest du Konflikte statt Features.

**Das Multi-Repo Coordination Pattern löst das durch eine einzige Regel.**

---

## Die Regel

> **Jede Agent-Instanz führt git ausschließlich im eigenen Heimat-Repo aus.**
> Dateien lesen und schreiben darf sie in beiden. Git — nur zuhause.

```
fb-data-Agent                         github.io-Agent
──────────────────────────────────    ──────────────────────────────────
✓ Read/Write in fb-data/              ✓ Read/Write in github.io/
✓ Read/Write in github.io/            ✗ kein Zugriff auf fb-data/
✗ git commit/push in github.io/       ✓ git commit/push in github.io/
✓ git commit/push in fb-data/         ✗ git commit/push in fb-data/
```

Kein Agent-übergreifender git-Zugriff. Keine Race Conditions. Keine Merge-Konflikte.

---

## Wie die Koordination funktioniert

Der Schreibzugriff auf Dateien bleibt bewusst offen: fb-data-Agent kann Inhalte in `github.io/` schreiben — er soll es nur nicht committen. Das Medium für die Übergabe ist die **Postbox**.

```
fb-data-Agent                          github.io-Agent
──────────────────────────────────     ──────────────────────────────────
Schreibt neue Docs in github.io/src/   Liest postbox/todo.md
                                       ↓
Schreibt Task in                  →    Committet + pusht
github.io/postbox/todo.md              ↓
                                       Trägt Commit-Hash in done.md ein
```

**Konkret:**

1. fb-data-Agent schreibt Inhalt nach `github.io/src/content/docs/...`
2. fb-data-Agent schreibt Task in `github.io/postbox/todo.md`:
   ```
   | #011 | patterns/multi-repo.md committen und pushen | Hoch | sofort | fb-data-Agent | patterns/multi-repo.md |
   ```
3. github.io-Agent liest `postbox/todo.md`, committet alle Änderungen, pusht, trägt Hash in `done.md` ein

Kein direkter API-Call zwischen den Agenten. Keine geteilte Session. Nur Dateien.

---

## Setup

### Schritt 1: JAIL-Regel in AGENTS.md konfigurieren

Jedes Repo braucht eine klare JAIL-Regel. Für das Repo mit erweitertem Lesezugriff:

```markdown
## REGELN

1. **JAIL:** Read/Write in `repo-a/` und `repo-b/`.
   Git nur in `repo-a/`. Kein git-Befehl in `repo-b/`.
```

Für das reine Heimat-Repo:

```markdown
1. **JAIL:** Ausschließlich innerhalb `repo-b/`. Absolut kein Zugriff auf repo-a/.
```

### Schritt 2: Postbox im Koordinations-Repo anlegen

Das Repo das "committed und pusht" braucht eine Postbox:

```bash
mkdir -p postbox/attachments/{todo,cron,done}
touch postbox/todo.md postbox/done.md postbox/cron.md
git add postbox/
git commit -m "feat: postbox für multi-repo koordination"
```

### Schritt 3: Zwei-Instanzen-Workflow im AGENTS.md dokumentieren

Beide AGENTS.md-Dateien sollten den Workflow kennen. Im Koordinations-Repo:

```markdown
## Zwei-Instanzen-Workflow

repo-a-Agent schreibt Inhalte → trägt Task in postbox/todo.md ein →
repo-b-Agent committed + pusht → Hash in postbox/done.md.
```

---

## Warum kein gemeinsamer git-Zugriff?

Wenn zwei Agent-Instanzen unkoordiniert in dasselbe Remote pushen, passiert das:

```
Zeit →
Agent A: git commit ──────── git push ✓
Agent B: git commit ── git pull --rebase ── KONFLIKT ── (braucht Human) ── git push
```

Selbst wenn der Konflikt automatisch lösbar ist, verlierst du Zeit und Nerven.
Bei nicht-trivialem Inhalt (Markdown mit Tabellen, strukturierten Docs) ist ein
Auto-Merge fast nie korrekt.

Die Regel „git nur im Heimat-Repo" macht dieses Szenario strukturell unmöglich —
nicht durch Locks oder Koordinationsprotokoll, sondern durch Konvention.

---

## Variante: Drei Repos

Das Pattern skaliert auf beliebig viele Repos. Jeder Agent hat genau ein Heimat-Repo für git.
Ein zentrales Koordinations-Repo (oft die Docs-Site) hält die Postbox.

```
backend-Agent    →    schreibt in backend/ + docs/
frontend-Agent   →    schreibt in frontend/ + docs/
docs-Agent       →    committed + pusht docs/ (Heimat-Repo)
                      koordiniert via docs/postbox/todo.md
```

---

## Häufige Fehler

**Agent pusht ins fremde Repo** → Sofort `git rebase --abort`, Änderungen verwerfen, Konvention neu kommunizieren.

**Postbox-Task bleibt liegen** → github.io-Agent wurde nicht gestartet. Lösung: SysOps prüft `postbox/todo.md` am Session-Start — offene Tasks mit Fällig `sofort` werden zuerst abgearbeitet.

**Zu viele unkommittete Dateien** → fb-data-Agent schreibt viel, github.io-Agent committed selten → Stau. Lösung: fb-data-Agent schreibt einen Task pro inhaltlichem Block, nicht einen Task für alles.

---

*Verwandte Patterns: [Dual-Agent Pattern](/patterns/dual-agent) · [Postbox Pattern](/cc/postbox-pattern)*
