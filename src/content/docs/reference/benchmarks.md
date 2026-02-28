---
title: Modell-Benchmarks & Preise 2026
description: Vollständige Preistabellen und Benchmark-Vergleiche für alle relevanten LLMs im CC-Stack — Anthropic, OpenAI, Google, xAI. Stand Februar 2026.
---

> Stand: Februar 2026. Benchmarks und Preise ändern sich schnell — offizielle Docs als verbindliche Quelle prüfen.

## Vollständige Preistabelle (ZED-Preise inkl. 10% Aufschlag)

### Anthropic

| Modell | ZED Input $/1M | ZED Output $/1M | Kontext | SWE-bench | Thinking |
|---|---|---|---|---|---|
| **Claude Opus 4.6** | $5.50 | $27.50 | 200K (1M beta) | **80.8%** | Ja (Adaptive) |
| **Claude Sonnet 4.6** | $3.30 | $16.50 | 200K (1M beta) | **79.6%** | Optional |
| **Claude Sonnet 4.6 Thinking** | $3.30 | $16.50 | 200K (1M beta) | 79.6% | **Ja** (Adaptive) |
| **Claude Haiku 4.5** | $1.10 | $5.50 | 200K | **73.3%** | Ja (Extended) |

### OpenAI

| Modell | ZED Input $/1M | ZED Output $/1M | Kontext | SWE-bench | Thinking |
|---|---|---|---|---|---|
| **GPT-5.2-Codex** | $1.93 | $15.40 | 400K | **~80%** | Ja (nativ) |
| **GPT-5.2-Codex Thinking** | $1.93 | $15.40 | 400K | ~80% | **Ja** (xhigh) |
| **GPT-5.2** | $1.93 | $15.40 | 400K | ~80% | Ja |
| **GPT-5** | $1.38 | $11.00 | 256K | 74.9% | Optional |
| **GPT-5 mini** | $0.28 | $2.20 | 256K | ~60% | Optional |
| **GPT-5 nano** | $0.055 | $0.44 | 400K | — | Minimal |

### Google

| Modell | ZED Input $/1M | ZED Output $/1M | Kontext | SWE-bench | Thinking |
|---|---|---|---|---|---|
| **Gemini 3.1 Pro** | $2.20 / $4.40* | $13.20 / $19.80* | **1M** | **80.6%** | **Ja** (adaptiv) |
| **Gemini 3 Pro** | $2.20 / $4.40* | $13.20 / $19.80* | **1M** | ~76% | Ja |
| **Gemini 3 Flash** | $0.55 | $3.30 | **1M** | **75.8%** | Ja (konfigurierbar) |

*Doppelpreis über 200K Tokens, Standard-Preis bis 200K.

### xAI

| Modell | ZED Input $/1M | ZED Output $/1M | Kontext | SWE-bench | Thinking |
|---|---|---|---|---|---|
| **Grok 4** | $3.30 | $16.50 | 260K | ~75% (xAI) / ~59% (unabh.)* | Ja (Pflicht) |
| **Grok 4.1 Fast (Reasoning)** | $0.22 | $0.55 | **2M** | ~51% (Vals AI, unabh.)** | **Ja** (~117 t/s) |
| **Grok 4.1 Fast (Non-Reasoning)** | $0.22 | $0.55 | 2M | Deutlich schwächer | Nein |
| ~~Grok 4 Fast~~ | $0.22 | $0.55 | 2M | ersetzt durch 4.1 Fast | — |

*Grok 4: xAI meldet ~75%; unabhängige Tests (vals.ai/SWE-agent) ergeben ~58.6%.

**Grok 4.1 Fast: xAI-Self-Report ~72–75% mit eigenem Scaffold; Vals AI unabhängig (Feb 2026): ~51% (34/54 Subset). Scaffold macht 20–30 PP Unterschied — Self-Report ist nicht direkt mit unabhängigen Messungen vergleichbar. Stärke liegt bei Agentic/Tool-Use, nicht bei isoliertem Patch-Schreiben.

---

## Benchmark-Vergleich: Grok 4.1 Fast vs. Gemini 3 Flash

Unsere zwei Tier-B-Kandidaten im direkten Vergleich:

| Benchmark | Grok 4.1 Fast (Thinking) | Gemini 3 Flash (Thinking) | Gewinner |
|---|---|---|---|
| **SWE-bench Verified** | ~51% (Vals AI) / 72–75% (xAI)* | **75.8%** | Gemini klar |
| **LiveCodeBench** | 82.2% | **90.8%** | Gemini klar |
| **HumanEval / MBPP** | ~94–96% | ~95–97% | Gleichstand† |
| **Kontext-Fenster** | **2M** | 1M | Grok |
| **Input-Preis** | **$0.22/1M** | $0.55/1M | Grok (2.5× günstiger) |
| **Output-Preis** | **$0.55/1M** | $3.30/1M | Grok (6× günstiger) |

*SWE-bench Diskrepanz: xAI-Self-Report mit eigenem Scaffold; Vals AI unabhängig ohne proprietären Scaffold. Scaffold allein macht 20–30 PP aus.

†HumanEval und MBPP sind seit 2023 praktisch gesättigt (>90% bei allen Frontier-Modellen) — kein echter Differenziator mehr.

**Interpretation:**
- **Gemini 3 Flash** gewinnt bei reiner Code-Generierung (8.6 PP Vorsprung LiveCodeBench, klarer SWE-bench-Abstand)
- **Grok 4.1 Fast** gewinnt bei Agentic-Aufgaben mit Tool-Use, langen Kontexten und Lese-intensiven Workflows — bei 6× günstigerem Output

---

## Grok 4.1 Fast: Reasoning vs. Non-Reasoning

Gleicher Preis, zwei separate Modell-IDs in ZED, stark unterschiedliche Qualität:

| | Reasoning | Non-Reasoning |
|---|---|---|
| **Modell-ID** | `grok-4-1-fast-reasoning` | `grok-4-1-fast` |
| **Preis** | $0.22 / $0.55 | $0.22 / $0.55 |
| **Geschwindigkeit** | ~117 t/s | ~117 t/s |
| **Coding-Qualität** | ~51–75% SWE-bench | Deutlich schwächer |
| **Tool-Calling** | Frontier-Level | Schwächer |
| **Empfehlung** | ✓ Immer | ✗ Ignorieren |

> Änderung gegenüber Grok 4 Fast: Bei 4 Fast war Reasoning/Non-Reasoning ein Prompt-Flag im selben Modell (214 t/s). Bei 4.1 Fast sind es zwei separate Modell-IDs. Geschwindigkeit sank von 214 auf ~117 t/s — dafür stieg die Tool-Calling-Qualität erheblich.

---

## Modelle ignorieren

| Modell | Grund |
|---|---|
| **Grok 4.1 Fast Non-Reasoning** | Gleicher Preis wie Reasoning, aber schwächere Coding- und Tool-Qualität |
| **Grok 4 Fast** (Sep 2025) | Vollständig durch Grok 4.1 Fast ersetzt — gleicher Preis, schlechtere Qualität |
| **GPT-5 nano** | Kein veröffentlichter Coding-Benchmark, minimales Reasoning |
| **Claude Opus 4.6** | Nur 1.2 PP SWE-bench über Sonnet 4.6, aber 5–9× teurer |

---

## Quellen

- [ZED Docs: AI Models & Pricing](https://zed.dev/docs/ai/models)
- [Anthropic Claude Pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- [xAI: Grok 4.1 Fast](https://x.ai/news/grok-4-1-fast)
- [Google: Gemini 3 Flash](https://blog.google/products/gemini/gemini-3-flash/)
- [SWE-bench Leaderboard](https://llm-stats.com/benchmarks/swe-bench-verified)
- [Vals AI — Grok 4.1 Fast (unabhängig, Feb 2026)](https://vals.ai)
- [Artificial Analysis Intelligence Index](https://artificialanalysis.ai)
