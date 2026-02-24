---
title: "#001: Claude Code Tab + Grok — Feature Development"
description: Architektur-Implementation mit Claude Code Tab und Code-Review via Grok 4.1 Fast im ZED Editor
---

## Kontext

**Setup**: ZED Editor, zwei ACP-Agenten im selben Projekt
**Agenten**:
- Claude Code Tab (Claude Max, Flat Rate) → Implementierung
- Grok 4.1 Fast (Zed First-Party Agent) → Code-Review

**Ziel**: Neues API-Feature implementieren mit eingebautem Review-Gate

## Ablauf

### Schritt 1: CLAUDE.md laden

Claude Code Tab liest beim Start automatisch CLAUDE.md:
- Architektur-Entscheidungen (REST vs. GraphQL → REST)
- Commit-Format (Conventional Commits)
- Anti-Patterns (keine direkten DB-Queries in Controllern)

Kein Onboarding-Prompt nötig — der Kontext ist sofort verfügbar.

### Schritt 2: Claude Code Tab implementiert

```
Prompt: "Implementiere einen neuen /api/users/search Endpunkt.
         Lies zuerst @src/api/users.py für den Kontext."
```

Claude Code Tab:
1. Liest `src/api/users.py` via @file
2. Implementiert den Endpunkt (weiß aus CLAUDE.md: kein direktes DB in Controller)
3. Zeigt Inline-Diff im ZED Editor
4. Wartet auf Freigabe (accept/reject per Hunk)

### Schritt 3: Grok 4.1 Fast reviewt

Nach accept des Diffs — Grok im ZED Agent Panel aktivieren:

```
Prompt: "Reviewe @src/api/users.py — fokus auf Security und Performance.
         Schreibe Findings direkt als Kommentare."
```

Grok 4.1 Fast (deutlich günstiger: $0.22/$0.55 vs. $3.30/$16.50):
- Prüft den Code auf Security-Issues
- Findet: fehlende Input-Validation
- Schreibt Inline-Kommentar im Editor

### Schritt 4: Claude Code Tab fixt

```
Prompt: "Schau dir die Kommentare von Grok an und fixe die Input-Validation"
```

Claude Code Tab liest die Kommentare, implementiert den Fix, neuer Inline-Diff.

### Ergebnis

```bash
git log --oneline -3
# abc1234 feat: /api/users/search Endpunkt mit Input-Validation
# def5678 fix: Input-Validation für search-Parameter
# ...
```

## Lernpunkte

**Was gut funktioniert hat:**
- CLAUDE.md-Kontext ersparte 10 Minuten Onboarding-Erklärungen
- Grok für Review ist signifikant günstiger als Claude für denselben Task
- Inline Diffs im Editor sind schneller als Browser-basiertes Copy-Paste

**Was wir in CLAUDE.md aufgenommen haben:**
- "Input-Validation immer vor Controller-Logik"
- "Grok für Code-Review bei Standard-Endpunkten (kostengünstiger)"

## Kosten

| Agent | Tokens | Kosten |
|---|---|---|
| Claude Code Tab | ~50k In / ~20k Out | Flat Rate |
| Grok 4.1 Fast | ~15k In / ~5k Out | ~$0.006 |

Für dieses Feature: praktisch kostenlos (Flat Rate dominiert).
