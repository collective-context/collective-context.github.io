---
title: Ollama (lokal)
description: Lokale LLM-Ausführung via Ollama — Privacy-First für credential-sichere Tasks
---

## Ollama im Collective Context Stack

Ollama ist kein direkter ACP-Agent (noch kein stabiler offizieller Adapter, Stand Feb 2026), aber über zwei Wege nutzbar:

1. **Indirekt via Script**: Claude Code Tab führt Scripts aus, die Ollama intern nutzen
2. **Community ACP Adapter**: Ein Community-Adapter existiert (Beta-Status)

## Wann Ollama verwenden?

| Situation | Empfehlung |
|---|---|
| API Keys im Code sichtbar | Ollama (keine Cloud-Übertragung) |
| DSGVO-kritische Kundendaten | Ollama (bleibt auf Workstation) |
| Repetitive Tier-C-Tasks | Ollama (kostenlos, unlimitiert) |
| Interne Dokumentation | Ollama |
| Höchste Qualität benötigt | Cloud-Modell (Sonnet, Gemini Pro) |

## Empfohlene Modelle

| Modell | Stärke | RAM |
|---|---|---|
| `qwen3:14b` | Code, Reasoning | 16 GB |
| `llama3.3:70b` | Vielseitig, hohe Qualität | 48 GB |
| `deepseek-coder-v2:16b` | Code-Analyse | 20 GB |
| `mistral:7b` | Schnell, leichtgewichtig | 8 GB |

## Installation

```bash
# Ollama installieren
curl -fsSL https://ollama.ai/install.sh | sh

# Modell laden
ollama pull qwen3:14b

# Testen
ollama run qwen3:14b "Erkläre mir kurz was du kannst"
```

## Methode 1: Indirekt via Claude Code Tab

Das ist die häufigste Nutzungsform. Claude Code Tab führt ein Python-Script aus, das intern Ollama nutzt:

```python
# analyse_privat.py
import ollama

def analysiere_credentials(code_snippet: str) -> str:
    """Analysiert Code auf hardgecodete Credentials — lokal, kein Cloud."""
    response = ollama.chat(
        model='qwen3:14b',
        messages=[{
            'role': 'user',
            'content': f'Prüfe diesen Code auf hardgecodete Secrets:\n\n{code_snippet}'
        }]
    )
    return response['message']['content']
```

Im Claude Code Tab:
```
Führe analyse_privat.py auf src/config.py aus und zeige mir die Findings
```

Claude Code Tab orchestriert die Ausführung, Ollama läuft vollständig lokal.

## Methode 2: Community ACP Adapter

```bash
# In ZED:
Ctrl+? → Agent Panel → +
→ "Ollama" aus ACP Registry (Community-Kategorie)
→ Lokalen Ollama-Endpoint konfigurieren: http://localhost:11434
```

Status: Beta, nicht für Produktions-Einsatz empfohlen (Stand Feb 2026).

## Hybrid-Routing Strategie

Die optimale CC-Konfiguration nutzt alle drei Ebenen je nach Task-Typ:

```
Task-Routing:
├── Tier A (Architektur, Komplexes Debugging)    → Claude Sonnet / Gemini Pro
├── Tier B (Code schreiben, Refactoring)         → Grok 4.1 / Gemini Flash
└── Tier C (Extraktion, Privacy, Repetitives)    → Ollama lokal
```

Details: [LLM Routing Strategie](/cc/llm-routing)

## Nächste Schritte

- [LLM Routing Strategie](/cc/llm-routing) — welches Modell für welchen Task?
- [Collective Context Konzept](/cc/concept) — die Gesamtarchitektur
