---
title: ZED Pricing & BYOK
description: ZED Pro Abrechnung, Token-Preise, BYOK-Kalkulation und Kosten pro Session — alle relevanten Modelle auf einen Blick.
---

> Stand: Februar 2026. ZED berechnet Token-basiert mit 10% Aufschlag auf den Anbieter-Listenpreis.

## ZED Pro Abrechnung

ZED Pro kostet **$20/Monat** und enthält:

- **$5 Guthaben** pro Monat für Hosted-Modelle (Token-basiert)
- Danach: Anbieter-Listenpreis **+10% Aufschlag**
- **Default-Cap:** $10 zusätzlich → max. $30/Monat ohne manuelle Erhöhung
- **BYOK (Free-Tier):** eigener API-Key, kein ZED-Aufschlag, kein Inklusiv-Guthaben

```
ZED-Preis = Anbieter-Listenpreis × 1.10
```

## Kosten pro Session

Basis: 8.000 Input + 2.000 Output-Tokens — typische ZED-Session (Datei lesen → editieren → Test → commit).

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

## BYOK: Wann lohnt es sich?

BYOK eliminiert den 10%-Aufschlag. Bei ~50 Sessions/Monat ist die reine Kostenersparnis unter **$0.50/Monat** — kein überzeugender Grund für sich allein.

| Modell | ZED Hosted | BYOK (Listenpreis) | Ersparnis/50 Sessions |
|---|---|---|---|
| Grok 4.1 Fast | $0.22 / $0.55 | $0.20 / $0.50 | ~$0.015 |
| Gemini 3 Flash | $0.55 / $3.30 | $0.50 / $3.00 | ~$0.05 |
| Claude Sonnet 4.6 | $3.30 / $16.50 | $3.00 / $15.00 | ~$0.27 |
| Claude Haiku 4.5 | $1.10 / $5.50 | $1.00 / $5.00 | ~$0.10 |

**Der eigentliche BYOK-Vorteil: Modell-Zugang** — nicht Kostenersparnis.

| Szenario | BYOK sinnvoll? |
|---|---|
| Gewünschtes Modell in ZED Hosted verfügbar | **Nein** — Aufwand übersteigt Ersparnis |
| Modell noch nicht in ZED Hosted gelistet | **Ja** — BYOK als Überbrückung |
| Neue Modelle sofort nach Release nutzen | **Ja** — direkt über Provider-API |
| Claude intensiv genutzt (>200 Sessions/Monat) | **Ja** — >$2/Monat Ersparnis bei Sonnet |

## ZED First-Party Agent vs. Claude Code Tab

| | ZED First-Party Agent | Claude Code Tab |
|---|---|---|
| **Abrechnung** | Token-basiert (+10%) | Flat Rate (Claude Max) |
| **Modell-Wahl** | Beliebig (75+ Modelle) | Claude Sonnet/Opus |
| **Kosten bei intensiver Nutzung** | Steigen linear | Flat Rate, keine Überraschungen |
| **Kosten bei geringer Nutzung** | Sehr günstig ($0.003–$0.06/Session) | $100+/Monat auch bei wenig Nutzung |
| **Empfehlung** | Gezielte Tasks, günstiger Einstieg | Professioneller Alltag, viele Sessions |

**Faustregel:** Wer ZED hauptsächlich für interaktive Entwicklung mit vielen Sessions nutzt, amortisiert Claude Max schnell. Wer ZED selektiv für spezifische Tasks einsetzt, bleibt mit Token-basierter Abrechnung günstiger.

---

*Vollständige Modell-Preistabellen und Benchmark-Daten: [Benchmark-Referenz](/reference/benchmarks)*

*Routing-Entscheidungen: [LLM Routing Strategie](/cc/llm-routing)*

*Quelle: [ZED Docs: AI Models & Pricing](https://zed.dev/docs/ai/models) · [ZED Blog: Token-based Pricing](https://zed.dev/blog/pricing-change-llm-usage-is-now-token-based)*
