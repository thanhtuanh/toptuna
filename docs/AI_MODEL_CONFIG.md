# 🤖 AI Model Konfiguration

## Übersicht

Das TopTuna System nutzt OpenAI GPT-Modelle für:
- Automatische Produktbeschreibungen
- Übersetzungen ins Vietnamesische
- Marketing-Texte
- Produktnamen-Optimierung

## Konfiguration

### Environment Variables

```bash
# OpenAI API Konfiguration
OPENAI_API_KEY=your-api-key-here
OPENAI_API_URL=https://api.openai.com/v1/chat/completions
OPENAI_API_MODEL=gpt-4o-mini
```

### Verfügbare Modelle

#### 🚀 Empfohlen für Production

| Modell | Kosten | Geschwindigkeit | Qualität | Anwendungsfall |
|--------|--------|----------------|----------|----------------|
| `gpt-4o-mini` | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | **EMPFOHLEN** - Beste Balance |
| `gpt-4o` | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Hohe Qualität benötigt |

#### 💰 Kostenoptimiert

| Modell | Kosten | Geschwindigkeit | Qualität | Anwendungsfall |
|--------|--------|----------------|----------|----------------|
| `gpt-3.5-turbo` | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | Einfache Texte, Budget-bewusst |
| `gpt-3.5-turbo-16k` | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | Längere Texte, Budget-bewusst |

#### 🎯 Premium Qualität

| Modell | Kosten | Geschwindigkeit | Qualität | Anwendungsfall |
|--------|--------|----------------|----------|----------------|
| `gpt-4` | ⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | Höchste Qualität |
| `gpt-4-turbo` | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Schneller als GPT-4 |

#### 🔬 Experimentell

| Modell | Kosten | Geschwindigkeit | Qualität | Anwendungsfall |
|--------|--------|----------------|----------|----------------|
| `gpt-4-vision-preview` | ⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | Bildanalyse (zukünftig) |
| `gpt-4-1106-preview` | ⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Neueste Features |

## Umgebungsspezifische Konfiguration

### Development (.env)
```bash
# Für Entwicklung - günstig und schnell
OPENAI_API_MODEL=gpt-4o-mini
```

### Production (.env.prod)
```bash
# Für Production - je nach Anforderung
OPENAI_API_MODEL=gpt-4o-mini  # Empfohlen: Balance aus Kosten/Qualität
# OPENAI_API_MODEL=gpt-4o     # Für höhere Qualität
# OPENAI_API_MODEL=gpt-4      # Für beste Qualität
```

## Kosten-Schätzung (Stand 2024)

| Modell | Input (pro 1K tokens) | Output (pro 1K tokens) | Typische Kosten/Monat* |
|--------|----------------------|------------------------|------------------------|
| gpt-4o-mini | $0.00015 | $0.0006 | $5-15 |
| gpt-4o | $0.005 | $0.015 | $50-150 |
| gpt-3.5-turbo | $0.001 | $0.002 | $10-30 |
| gpt-4 | $0.03 | $0.06 | $300-900 |

*Bei ca. 1000 Produktbeschreibungen/Monat

## Fallback-Verhalten

Wenn kein API-Key konfiguriert ist, verwendet das System automatische Fallback-Texte:
- Deutsche Standardbeschreibungen
- Einfache vietnamesische Übersetzungen
- Standard Marketing-Texte

## Monitoring

Die AI-Service Logs zeigen:
- Erfolgreiche API-Aufrufe
- Fallback-Verwendung bei Fehlern
- Performance-Metriken

## Sicherheit

⚠️ **WICHTIG**: 
- API-Keys niemals in Git committen
- In Production über Render Secrets setzen
- Regelmäßig API-Keys rotieren
