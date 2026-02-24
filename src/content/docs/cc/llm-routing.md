---
title: LLM Routing Strategie
description: Welches Modell für welchen Task — pragmatisches Routing im CC-Stack
---

## Das Routing-Prinzip

Im Collective Context Stack sind mehrere Modelle gleichzeitig verfügbar. Die Frage ist: **Welches Modell für welchen Task?**

Das Ziel ist nicht ideologische Reinheit, sondern **optimaler Output pro Dollar** — unter Berücksichtigung von Privacy-Anforderungen.

## Drei-Ebenen-Modell

```
Tier A — Komplexe Tasks
├── Architektur-Entscheidungen
├── Komplexes Debugging
├── Codebase-Redesign
└── Modell: Claude Sonnet 4.6 / Gemini 2.5 Pro

Tier B — Standard-Entwicklung
├── Code schreiben und refactorn
├── Tests implementieren
├── Git-Operationen
└── Modell: Grok 4.1 Fast / Gemini Flash

Tier C — Privacy & Repetitiv
├── Credentials-nahe Analyse
├── Interne Dokumentation
├── Massendaten-Extraktion
└── Modell: Ollama lokal (qwen3:14b, llama3.3)
```

## Modell-Vergleich im ZED Zed First-Party Agent

| Modell | Input | Output | Stärke |
|---|---|---|---|
| **Grok 4.1 Fast** | $0.22/M | $0.55/M | Code lesen, Fixes, Git |
| **Gemini 3 Flash** | $0.55/M | $3.30/M | Code schreiben, Tests |
| **Claude Sonnet 4.6** | $3.30/M | $16.50/M | Höchste Qualität |
| **Claude Code Tab** | Flat Rate | Flat Rate | Komplexe Aufgaben (Max-Abo) |
| **Ollama lokal** | $0 | $0 | Privacy, unlimitiert |

## Entscheidungsbaum

```
Task eingehend
│
├── Enthält Credentials / interne Daten?
│   └── Ja → Ollama lokal
│
├── Benötigt höchste Qualität / Architektur?
│   └── Ja → Claude Code Tab (Max) oder Claude Sonnet
│
├── Standard Code-Task?
│   ├── Code lesen, Fixes → Grok 4.1 Fast
│   └── Code schreiben → Gemini Flash
│
└── Batch-Scan / Codebase-Analyse?
    └── Gemini CLI (großes Context Window)
```

## Kosten-Vergleich Gesamtsetup

| Setup | Monatlich | Modell-Optionen | Privacy |
|---|---|---|---|
| Nur Cloud (proprietär) | ~$150 | 1 Provider | Nein |
| CC 2.0 Hybrid | ~$80 | Unbegrenzt | Ja |
| CC 2.0 Full Local | ~$30 | 300+ via Ollama | Ja |

Claude Max Abo (~€90+/M) deckt Claude Code Tab + Claude Code Web + Claude Pro ab — Flat Rate, kein Token-Pricing für den Tab.

## Pragmatismus-Prinzip

Das Routing ist **nicht dogmatisch**. Wenn Grok eines Tages besser ist als Gemini für Code-Schreiben — wechseln wir. Wenn ein neues Ollama-Modell Tier-B-Qualität erreicht — verschieben wir Tasks dorthin.

**Data > Ideology**: Was in der Praxis funktioniert, gewinnt.

[Weiter: Dual-Agent Pattern](/patterns/dual-agent)
