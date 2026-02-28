---
title: LLM Routing Strategie
description: Welches Modell für welchen Task — pragmatisches Routing im CC-Stack mit ZED, Claude Code und Ollama.
---

> Ziel ist nicht ideologische Reinheit, sondern **optimaler Output pro Dollar** — unter Berücksichtigung von Privacy, Kontext-Größe und Task-Typ.

## Kurzregel

```
Komplexe Aufgaben, Architektur, Greenfield  →  Claude Code (Tab)
Lokales, interaktives Arbeiten in ZED       →  ZED First-Party Agent
Privacy-kritische Analyse, Offline          →  Ollama lokal
```

---

## Tier-Modell

```
Tier A — Komplexe Tasks (Claude Code Tab)
├── Architektur-Entscheidungen
├── Komplexes Debugging, Greenfield-Entwicklung
├── Multi-File Refactoring, Testsuiten schreiben
└── Modell: Claude Sonnet 4.6 / Gemini 3.1 Pro

Tier B — Standard-Entwicklung (ZED First-Party Agent)
├── Code lesen & verstehen, gezielte Fixes
├── Tests ausführen & interpretieren
├── Git Commits, DevOps-Tipps
└── Modell: Grok 4.1 Fast (Reasoning) oder Gemini 3 Flash

Tier C — Privacy & Repetitiv (Ollama lokal)
├── Credentials-nahe Analyse
├── Interne Dokumentation
├── Massendaten-Extraktion, Bulk-Scans
└── Modell: qwen3:14b, llama3.3, gemma3
```

---

## ZED: Wann welches Modell?

| Aufgabe | Modell |
|---|---|
| Repo oder große Codebasis einlesen & erklären | **Grok 4.1 Fast (Reasoning)** |
| Bestehenden Code debuggen oder Regex anpassen | **Grok 4.1 Fast (Reasoning)** |
| Tests ausführen und Ergebnis interpretieren | **Grok 4.1 Fast (Reasoning)** |
| Fix auf vorhandenem Code, Commit-Message, DevOps-Tipp | **Grok 4.1 Fast (Reasoning)** |
| Neue Test-Suite schreiben | **Gemini 3 Flash** |
| Komplexen Regex neu entwickeln (ohne Vorlage) | **Gemini 3 Flash** |
| Größerer Refactor ohne Vorlage aus Claude Code | **Gemini 3 Flash** |
| Höchste Coding-Qualität, Kontext <200K | **Claude Sonnet 4.6 Thinking** |

**Faustregel:** Überwiegt Lesen/Verstehen → Grok 4.1 Fast. Überwiegt Schreiben → Gemini 3 Flash.

---

## Entscheidungsbaum

```
Task eingehend
│
├── Enthält Credentials / interne Daten?
│   └── Ja → Ollama lokal (Tier C)
│
├── Architektur, Greenfield, Multi-File-Refactoring?
│   └── Ja → Claude Code Tab (Tier A, Max Flat Rate)
│
├── ZED-Standard-Task?
│   ├── Überwiegt Lesen/Verstehen?
│   │   └── Ja → Grok 4.1 Fast (Reasoning) — 2M Kontext, $0.22/$0.55
│   └── Überwiegt Schreiben?
│       └── Ja → Gemini 3 Flash — 75.8% SWE-bench, 1M Kontext
│
└── Batch-Scan / gesamte Codebase analysieren?
    └── Gemini CLI (kostenlos, 1M Token Context Window)
```

---

## Modell-Vergleich (ZED First-Party Agent)

| Modell | Input $/1M | Output $/1M | Kontext | SWE-bench | Stärke |
|---|---|---|---|---|---|
| **Grok 4.1 Fast (Reasoning)** | $0.22 | $0.55 | **2M** | ~51–75%* | Lesen, Tool-Use, Agentic |
| **Gemini 3 Flash** | $0.55 | $3.30 | 1M | **75.8%** | Code schreiben, Tests |
| **Gemini 3.1 Pro** | $2.20 | $13.20 | 1M | **80.6%** | Höchste Google-Qualität |
| **Claude Sonnet 4.6** | $3.30 | $16.50 | 200K | **79.6%** | Höchste Qualität gesamt |
| **Claude Code Tab** | Flat Rate | Flat Rate | 200K | 79.6% | Komplexe Aufgaben |
| **Ollama lokal** | $0 | $0 | Modellabhängig | — | Privacy, offline |

*Grok 4.1 Fast SWE-bench: xAI-Self-Report ~72–75% mit eigenem Scaffold; Vals AI unabhängig Feb 2026: ~51%. Scaffold macht 20–30 PP Unterschied. Details: [Benchmarks](/reference/benchmarks)

---

## Warum Grok 4.1 Fast als ZED-Standard?

ZED schreibt in unserem Setup **keinen komplexen Greenfield-Code** — das ist Claude Code. ZED liest viel, schreibt wenig und zielgerichtet (Fix-Snippet, Befehl, Commit-Message). Für dieses Profil gewinnt Grok 4.1 Fast:

```
                         Grok 4.1 Fast      Gemini 3 Flash
─────────────────────────────────────────────────────────────
Input-Preis (ZED)        $0.22/1M           $0.55/1M
Output-Preis (ZED)       $0.55/1M           $3.30/1M  ← 6× teurer
Kontext-Fenster          2.000.000 Tokens   1.000.000 Tokens
SWE-bench Verified       ~51% (unabh.)      75.8%
LiveCodeBench (Thinking) 82.2%              90.8%
Stärke                   Lesen, Agentic     Code schreiben
```

- **2M Kontext:** ganzes Repo einlesen, langer Gesprächsverlauf — kein anderes Modell in dieser Preisklasse
- **6× günstigerer Output:** ZED-Antworten sind meist kurz (Snippet, Befehl, Tipp) — teurer Output von Gemini 3 Flash fällt kaum positiv ins Gewicht
- **Halluzinierungen halbiert** gegenüber Grok 4 Fast (Vorgänger)

**Wann Gemini 3 Flash trotzdem besser ist:** Wenn ZED hauptsächlich *schreibt* — neue Test-Suiten, komplexe Regex von Grund auf, Refactor ohne Vorlage. Dort sind 8.6 PP Vorsprung auf LiveCodeBench (90.8% vs. 82.2%) messbar relevant.

---

## Kosten-Vergleich Gesamtsetup

| Setup | Monatlich | Modell-Optionen | Privacy |
|---|---|---|---|
| Nur Cloud (proprietär) | ~$150 | 1 Provider | Nein |
| CC 2.0 Hybrid | ~$80 | Unbegrenzt | Ja |
| CC 2.0 Full Local | ~$30 | 300+ via Ollama | Ja |

**Claude Max Abo (~€90+/M)** deckt Claude Code Tab + Claude Code Web + Claude Pro ab — Flat Rate, kein Token-Pricing für den Tab.

---

## Pragmatismus-Prinzip

Das Routing ist **nicht dogmatisch**. Wenn ein Modell heute besser für einen Task ist — nutzen wir es. Wenn es morgen ein besseres gibt — wechseln wir.

**Data > Ideology:** Was in der Praxis funktioniert, gewinnt.

---

*Preistabellen & Benchmarks: [Modell-Benchmarks 2026](/reference/benchmarks)*

*ZED-Abrechnung & BYOK: [ZED Pricing](/zed/pricing)*

*[Dual-Agent Pattern](/patterns/dual-agent) · [Postbox Pattern](/cc/postbox-pattern)*
