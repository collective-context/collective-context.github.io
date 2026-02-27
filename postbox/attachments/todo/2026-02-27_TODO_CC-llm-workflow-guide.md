# WorkFlow-LLMs — Entwickler-Guide
> LLM-Auswahl, Kosten und Workflow-Strategie für unser Entwickler-Setup
> Zuletzt aktualisiert: 24. Februar 2026 — Neustrukturierung · Grok 4.1 Fast ZED-Standard · SWE-bench Vals AI (unabhängig) · LiveCodeBench

---

## Teil 1: Alltagsanleitung — Wann verwende ich welches Modell?

### Kurzregel

**Komplexe Aufgaben, Architektur, Greenfield → Claude Code.**
**Alles lokale, interaktive Arbeiten auf der Workstation → ZED.**

```
Claude Code                           ZED Editor (lokale Workstation)
──────────────────────────────────    ────────────────────────────────────
Architektur & Strategie               Code lesen & verstehen
Komplexe Algorithmen & Regex          Gezielte Fixes auf bestehendem Code
Greenfield-Entwicklung                Tests ausführen & interpretieren
Testsuiten schreiben                  Git Commits, DevOps-Tipps
Multi-File Refactoring                Quick-Feedback im Edit-Zyklus
```

### ZED: Wann welches Modell?

| Aufgabe | Modell |
|---|---|
| Repo oder große Codebasis einlesen & erklären | **Grok 4.1 Fast (Reasoning)** |
| Bestehenden Code debuggen oder Regex anpassen | **Grok 4.1 Fast (Reasoning)** |
| pytest ausführen und Ergebnis interpretieren | **Grok 4.1 Fast (Reasoning)** |
| Fix auf vorhandenem Code, Commit-Message, DevOps-Tipp | **Grok 4.1 Fast (Reasoning)** |
| Neue Test-Suite schreiben | **Gemini 3 Flash** |
| Komplexen Regex neu entwickeln (ohne Vorlage) | **Gemini 3 Flash** |
| Größerer Refactor ohne Vorlage aus Claude Code | **Gemini 3 Flash** |
| Höchste Coding-Qualität nötig, Kontext <200K | **Claude Sonnet 4.6 Thinking** |

### Entscheidungsbaum

```
Überwiegt Lesen/Verstehen den Output?
(Code lesen, Repo, Tests interpretieren)
    ↓ JA                                   ↓ NEIN (Code schreiben überwiegt)
Grok 4.1 Fast (Reasoning)             Gemini 3 Flash
  → $0.22/$0.55, 2M Kontext              → $0.55/$3.30, 75.8% SWE-bench
  → ZED-Standard                         → wenn ZED selbst Code designt

Brauche ich >1M Kontext?              Höchste Qualität & Kontext <200K?
    ↓ JA                                  ↓ JA
Grok 4.1 Fast (einziges 2M-Modell)   Claude Sonnet 4.6 Thinking
```

### Modelle ignorieren

| Modell | Grund |
|---|---|
| **Grok 4.1 Fast Non-Reasoning** | Gleicher Preis wie Reasoning, aber schwächere Coding- und Tool-Qualität |
| **Grok 4 Fast** (alt, Sep 2025) | Vollständig durch Grok 4.1 Fast ersetzt — gleicher Preis, schlechtere Qualität |
| **GPT-5 nano** | Kein veröffentlichter Coding-Benchmark, minimales Reasoning |
| **Claude Opus 4.6** | Nur 1.2 PP SWE-bench über Sonnet 4.6, aber 5–9× teurer |

---

## Teil 2: Warum haben wir uns so entschieden?

### Grok 4.1 Fast als ZED-Standard: die Begründung

ZED schreibt in unserem Setup **keinen komplexen Greenfield-Code** — das passiert in Claude Code. ZED liest viel, schreibt wenig und zielgerichtet (Fix-Snippet, Tipp, Befehl). Für dieses Profil gewinnt Grok 4.1 Fast klar:

```
                         Grok 4.1 Fast (Reasoning)    Gemini 3 Flash
─────────────────────────────────────────────────────────────────────
Input-Preis (ZED)        $0.22/1M                     $0.55/1M
Output-Preis (ZED)       $0.55/1M                     $3.30/1M  ← 6× teurer
Kontext-Fenster          2.000.000 Tokens             1.000.000 Tokens
SWE-bench Verified       ~51% (Vals AI) / 72–75%*     75.8% (Feb 2026)
LiveCodeBench Thinking   82.2%                        90.8%
Reasoning                Ja (~117 t/s)                Ja (konfigurierbar)
Halluzinierungen         Halbiert ggü. Grok 4 Fast    Gut
Stärke                   Lesen, Verstehen, Agentic    Code schreiben
─────────────────────────────────────────────────────────────────────
*SWE-bench Diskrepanz: xAI-Self-Report ~72–75% mit eigenem Scaffold;
 Vals AI unabhängig (Feb 2026) ~51%. Scaffold macht 20–30 PP Unterschied.
```

**Warum Grok 4.1 Fast für unseren ZED-Alltag gewinnt:**
- **2M Kontext:** ganzes Repo auf einmal einlesen, langer Gesprächsverlauf — kein anderes Modell in dieser Preisklasse bietet das
- **6× günstigerer Output:** ZED-Antworten sind meist kurz (Fix-Snippet, Befehl, Tipp) — der teurere Output von Gemini 3 Flash fällt bei unseren Workloads kaum positiv ins Gewicht
- **Halluzinierungen halbiert** gegenüber dem Vorgänger (Grok 4 Fast) — verlässlichere Code-Analyse

**Wann Gemini 3 Flash trotzdem besser ist:** Wenn ZED hauptsächlich *schreibt* statt *liest* — neue Test-Suiten, komplexe Regex von Grund auf, Refactor ohne Vorlage. Dort sind 8.6 PP Vorsprung auf LiveCodeBench (90.8% vs. 82.2%) und der SWE-bench-Abstand messbar und relevant.

### ZED-Abrechnung

ZED Pro kostet **$20/Monat** und enthält:
- **$5 Guthaben** pro Monat für Hosted-Modelle
- Danach: API-Listenpreis **+10% Aufschlag**
- **Default-Cap:** $10 zusätzlich → max. $30/Monat ohne manuelle Erhöhung
- **BYOK (Free-Tier):** eigener API-Key, kein Aufschlag, kein Inklusiv-Guthaben

**ZED-Preis = Anbieter-Listenpreis × 1,10**

### Kosten pro Session

Basis: 8.000 Input + 2.000 Output-Tokens (Datei lesen → editieren → Test → commit)

| Modell | Kosten/Session | 50 Sessions/Monat | Im $5-Guthaben? |
|---|---|---|---|
| **Grok 4.1 Fast (Reasoning)** | $0.003 | $0.17 | ✓ mühelos |
| GPT-5 nano | $0.005 | $0.25 | ✓ mühelos |
| **Gemini 3 Flash** | $0.011 | $0.55 | ✓ mühelos |
| Claude Haiku 4.5 | $0.019 | $0.95 | ✓ |
| Gemini 3.1 Pro | $0.044 | $2.20 | ✓ |
| GPT-5.2-Codex | $0.047 | $2.35 | ✓ |
| Claude Sonnet 4.6 | $0.059 | $2.95 | ✓ |
| Claude Opus 4.6 | $0.099 | $4.95 | ✓ knapp |

Alle relevanten Modelle passen bei normalem Nutzungsvolumen ins $5-Monatsguthaben.

### BYOK: Wann lohnt es sich?

BYOK eliminiert den ZED-Aufschlag von 10%. Bei ~50 Sessions/Monat ist die reine Kostenersparnis unter **$0.50/Monat** — kein überzeugender Grund für sich allein.

| Modell | ZED Hosted | BYOK (Listenpreis) | Ersparnis/50 Sessions |
|---|---|---|---|
| Grok 4.1 Fast | $0.22 / $0.55 | $0.20 / $0.50 | ~$0.015 |
| Gemini 3 Flash | $0.55 / $3.30 | $0.50 / $3.00 | ~$0.05 |
| Claude Sonnet 4.6 | $3.30 / $16.50 | $3.00 / $15.00 | ~$0.27 |
| Claude Haiku 4.5 | $1.10 / $5.50 | $1.00 / $5.00 | ~$0.10 |

**Der eigentliche BYOK-Vorteil: Modell-Zugang.** BYOK gibt Zugang zu Modellen, die ZED noch nicht als Hosted-Option listet.

| Szenario | BYOK sinnvoll? |
|---|---|
| Grok 4.1 Fast in ZED Hosted verfügbar | **Nein** — Aufwand übersteigt Ersparnis |
| Grok 4.1 Fast noch nicht in ZED Hosted | **Ja** — xAI BYOK als Überbrückung |
| Neue Modelle sofort nach Release nutzen | **Ja** — Anthropic/xAI BYOK als Default |
| Claude intensiv genutzt (>200 Sessions/Monat) | **Ja** — >$2/Monat Ersparnis bei Sonnet |

---

## Teil 3: Technische Analyse & Benchmark-Recherche

### Vollständige Preistabelle (Stand: Feb 2026)

#### Anthropic

| Modell | ZED Input $/1M | ZED Output $/1M | Kontext | SWE-bench | Thinking |
|---|---|---|---|---|---|
| **Claude Opus 4.6** | $5.50 | $27.50 | 200K (1M beta) | **80.8%** | Ja (Adaptive) |
| **Claude Opus 4.6 Thinking** | $5.50–$33 | $27.50 | 200K (1M beta) | 80.8% | Ja (max effort) |
| **Claude Sonnet 4.6** | $3.30 | $16.50 | 200K (1M beta) | **79.6%** | Optional |
| **Claude Sonnet 4.6 Thinking** | $3.30 | $16.50 | 200K (1M beta) | 79.6% | **Ja** (Adaptive Thinking) |
| **Claude Haiku 4.5** | $1.10 | $5.50 | 200K | **73.3%** | Ja (Extended Thinking) |

#### OpenAI

| Modell | ZED Input $/1M | ZED Output $/1M | Kontext | SWE-bench | Thinking |
|---|---|---|---|---|---|
| **GPT-5.2-Codex** | $1.93 | $15.40 | 400K | **~80%** | Ja (nativ) |
| **GPT-5.2-Codex Thinking** | $1.93 | $15.40 | 400K | ~80% | **Ja** (xhigh effort) |
| **GPT-5.2** | $1.93 | $15.40 | 400K | ~80% | Ja |
| **GPT-5** | $1.38 | $11.00 | 256K | 74.9% | Optional |
| **GPT-5 mini** | $0.28 | $2.20 | 256K | ~60% | Optional |
| **GPT-5 nano** | $0.055 | $0.44 | 400K | — | Minimal |

#### Google

| Modell | ZED Input $/1M | ZED Output $/1M | Kontext | SWE-bench | Thinking |
|---|---|---|---|---|---|
| **Gemini 3.1 Pro** | $2.20 / $4.40* | $13.20 / $19.80* | **1M** | **80.6%** | **Ja** (adaptiv) |
| **Gemini 3 Pro** | $2.20 / $4.40* | $13.20 / $19.80* | **1M** | ~76% | Ja |
| **Gemini 3 Flash** | $0.55 | $3.30 | **1M** | **75.8%** | Ja (konfigurierbar) |

*Doppelpreis über 200K Tokens, Standard-Preis bis 200K.

#### xAI

| Modell | ZED Input $/1M | ZED Output $/1M | Kontext | SWE-bench | Thinking |
|---|---|---|---|---|---|
| **Grok 4** | $3.30 | $16.50 | 260K | ~75% (xAI) / ~59% (unabh.)* | Ja (Pflicht) |
| **Grok 4.1 Fast (Reasoning)** | $0.22 | $0.55 | **2M** | ~51% (Vals AI, unabh.)** | **Ja** (~117 t/s) |
| **Grok 4.1 Fast (Non-Reasoning)** | $0.22 | $0.55 | 2M | Deutlich schwächer | Nein |
| ~~Grok 4 Fast (Reasoning)~~ | $0.22 | $0.55 | 2M | ersetzt | Ja |
| ~~Grok 4 Fast (Non-Reasoning)~~ | $0.22 | $0.55 | 2M | ersetzt | Nein |

*Grok 4: xAI meldet ~75%; unabhängige Tests (vals.ai/SWE-agent) ergeben ~58.6%.
**Grok 4.1 Fast: xAI-Self-Report ~72–75% mit eigenem Scaffold; Vals AI unabhängig (Feb 2026): ~51% (34/54 Subset). Stärke liegt bei Agentic/Tool-Use, nicht bei isoliertem Patch-Schreiben. Scaffold macht 20–30 PP Unterschied — der Self-Report ist nicht direkt mit unabhängigen Messungen vergleichbar.
Grok 4 Fast (Sep 2025) ist durch Grok 4.1 Fast vollständig ersetzt — gleicher Preis, schlechtere Qualität in allen Dimensionen.

### Benchmark-Detail: Grok 4.1 Fast vs. Gemini 3 Flash

| Benchmark | Grok 4.1 Fast (Thinking) | Gemini 3 Flash (Thinking) | Gewinner |
|---|---|---|---|
| **SWE-bench Verified** | ~51% (Vals AI) / 72–75% (xAI)* | **75.8%** (Feb 2026) | Gemini klar |
| **LiveCodeBench** | 82.2% | **90.8%** | Gemini klar |
| **HumanEval / MBPP** | ~94–96% | ~95–97% | Gleichstand† |

*SWE-bench Diskrepanz: xAI-Self-Report mit eigenem Scaffold; Vals AI unabhängig ohne proprietären Scaffold. Scaffold allein macht 20–30 PP aus.
†HumanEval und MBPP sind seit 2023 praktisch gesättigt (>90% bei beiden) — kein echter Differenziator mehr. LiveCodeBench nutzt frische Contest-Probleme und zeigt den echten Abstand.

**Interpretation:** Gemini 3 Flash ist bei reiner Code-Generierung das stärkere Modell (8.6 PP Vorsprung LiveCodeBench, klarer SWE-bench-Abstand). Grok 4.1 Fast ist das stärkere Modell für Agentic-Aufgaben mit Tool-Use und langen Kontexten — genau unser ZED-Profil.

### Grok 4.1 Fast: Reasoning vs. Non-Reasoning

Gleicher Preis, **zwei separate Modell-IDs** in ZED, stark unterschiedliche Qualität:

| | Reasoning (`grok-4-1-fast-reasoning`) | Non-Reasoning (`grok-4-1-fast`) |
|---|---|---|
| **Preis** | $0.22 / $0.55 | $0.22 / $0.55 |
| **Geschwindigkeit** | ~117 t/s | ~117 t/s |
| **Coding-Qualität** | ~51–75% SWE-bench | Deutlich darunter |
| **Tool-Calling** | Frontier-Level | Schwächer |
| **Empfehlung** | ✓ Standard | ✗ Ignorieren |

Änderung gegenüber Grok 4 Fast: Damals war Reasoning/Non-Reasoning ein Prompt-Flag im selben Modell (214 t/s). Bei 4.1 Fast sind es zwei separate Modell-IDs. Die Reasoning-Geschwindigkeit sank von 214 auf ~117 t/s — dafür stieg die Tool-Calling-Qualität erheblich.

---

## Referenzen

- [ZED Docs: AI Models & Pricing](https://zed.dev/docs/ai/models)
- [ZED Blog: Token-based Pricing](https://zed.dev/blog/pricing-change-llm-usage-is-now-token-based)
- [Anthropic Claude Pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- [Grok 4.1 Fast (xAI)](https://x.ai/news/grok-4-1-fast)
- [Grok 4 Fast (xAI)](https://x.ai/news/grok-4-fast)
- [Gemini 3 Flash (Google)](https://blog.google/products/gemini/gemini-3-flash/)
- [SWE-bench Leaderboard](https://llm-stats.com/benchmarks/swe-bench-verified)
- [Vals AI — Grok 4.1 Fast (unabhängig, Feb 2026)](https://vals.ai)
- [Artificial Analysis Intelligence Index (Feb 2026)](https://artificialanalysis.ai)
