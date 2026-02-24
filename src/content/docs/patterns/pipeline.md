---
title: Pipeline Pattern
description: Sequenzielle Agenten-Kette — Output eines Agenten ist Input des nächsten
---

## Konzept

Das Pipeline Pattern ist ein sequenzielles Multi-Agent-Setup: Der Output von Agent A wird direkter Input für Agent B — wie eine Unix-Pipe, aber für AI-Agenten.

```
Anforderung
    ↓
Agent A (Planer)
→ schreibt Implementierungsplan in postbox/plan.md
    ↓
Agent B (Implementierer)
→ liest plan.md, schreibt Code
→ schreibt Ergebnisse in postbox/review-queue.md
    ↓
Agent C (Reviewer)
→ liest review-queue.md, prüft Code
→ schreibt Feedback oder gibt Freigabe
    ↓
Commit
```

## Implementierung via Postbox-Erweiterung

```
postbox/
├── todo.md          ← Eingehende Tasks
├── plan.md          ← Pläne (Agent A → Agent B)
├── review-queue.md  ← Zur Review (Agent B → Agent C)
└── done.md          ← Freigegeben
```

## Typischer Anwendungsfall: Feature-Entwicklung

```
Schritt 1: Claude Code Tab (Planer)
"Lies todo.md. Für Task #001 erstelle einen detaillierten
Implementierungsplan in postbox/plan.md. Kein Code schreiben."

Schritt 2: Gemini Flash (Implementierer)
"Lies postbox/plan.md. Implementiere den Plan.
Schreibe die geänderten Dateien in postbox/review-queue.md (Liste)."

Schritt 3: Claude Code Tab (Reviewer)
"Lies postbox/review-queue.md. Prüfe alle gelisteten Dateien
auf Korrektheit, Tests, Security. Gib Freigabe oder schreibe
Feedback in postbox/review-queue.md."
```

## Unterschied zu Dual-Agent und Orchestra

| Pattern | Koordination | Reihenfolge | Beste Nutzung |
|---|---|---|---|
| **Dual-Agent** | Asynchron | Beliebig | Kontinuierliche Scan+Fix-Zyklen |
| **Orchestra** | Asynchron | Beliebig | Mehrere parallele Spezialisierungen |
| **Pipeline** | Synchron | Streng sequenziell | Qualitätskontrolle, Review-Gates |

## Wann Pipeline verwenden?

- **Review-Gates**: Wenn Code-Review vor jedem Commit Pflicht ist
- **Qualitätspipelines**: Wenn jeder Step die Qualität des vorherigen prüft
- **Komplexe Features**: Wenn Planung vor Implementierung wichtig ist

**Nachteil**: Langsamer als Dual-Agent, da sequential. Für schnelle Iteration ist Dual-Agent besser.

[Zurück zur Pattern-Übersicht](/patterns/dual-agent)
