# TopTuna B2B Portal - Benutzeranleitung

## 🐟 **Willkommen bei TopTuna B2B Portal**

Das TopTuna B2B Portal ist eine professionelle Plattform für Fischgroßhandel, speziell entwickelt für vietnamesische Restaurants in Deutschland. Die Anwendung unterstützt **Deutsch, Englisch und Vietnamesisch**.

## 🚀 **Schnellstart**

### **1. Anwendung starten**
```bash
# Komplettes System starten
./scripts/start.sh

# Frontend öffnen: http://localhost:4200
```

### **2. Anmeldung**
Das System bietet verschiedene Demo-Benutzer:

| Benutzer | Passwort | Rolle | Beschreibung |
|----------|----------|-------|--------------|
| `admin` | `admin` | Administrator | Vollzugriff auf alle Funktionen |
| `saigon_sushi` | `test` | Restaurantbesitzer | Sushi-Restaurant in Berlin |
| `driver_duc` | `test` | Fahrer | Lieferfahrer mit HACCP-Zugang |
| `dispo_mai` | `test` | Disponent | Tourenplanung und Kommissionierung |

## 📱 **Benutzeroberfläche**

### **Dashboard (Hauptseite)**
Nach der Anmeldung sehen Sie 6 Service-Karten:

#### **🔐 Authentifizierung**
- **Funktion**: Benutzerverwaltung und Rollenzuordnung
- **Test**: Klicken Sie auf "Login testen" für Demo-Anmeldungen
- **Daten**: Zeigt alle verfügbaren Benutzer und Rollen

#### **🐟 Produktkatalog**
- **Funktion**: 30 Premium-Fischprodukte mit deutschen und vietnamesischen Namen
- **Test**: "Produkte suchen" - sucht nach Lachs-Produkten
- **Besonderheit**: Alle Produkte haben vietnamesische Übersetzungen

#### **📦 Bestellmanagement**
- **Funktion**: Bestellungen vietnamesischer Restaurants
- **Test**: "Aktuelle Bestellungen" zeigt laufende Bestellungen
- **Details**: Bestellwerte, Status und Liefertermine

#### **🚚 Logistik & HACCP**
- **Funktion**: Tourenplanung mit Kühlkette-Überwachung
- **Test**: "Heutige Touren" zeigt aktuelle Lieferrouten
- **HACCP**: Temperaturüberwachung und Dokumentation

#### **👥 Kundenmanagement (CRM)**
- **Funktion**: Kundensegmente für verschiedene Restaurant-Typen
- **Segmente**: Sushi, Chinesisch, Thailändisch
- **Test**: "Kundensegmente" zeigt vietnamesische Restaurantbesitzer

#### **📊 Export & Reporting**
- **Funktion**: DATEV-Export für deutsche Buchhaltung
- **Test**: "Admin Dashboard" zeigt Geschäftskennzahlen
- **Export**: Rechnungen und Debitorenstamm für DATEV

## 🌍 **Mehrsprachigkeit**

### **Sprache wechseln**
Oben rechts finden Sie den Sprachschalter:
- **DE** - Deutsch (Standard)
- **EN** - English
- **VI** - Tiếng Việt (Vietnamesisch)

### **Vietnamesische Inhalte**
- Alle Produktnamen sind auf Vietnamesisch verfügbar
- Benutzeroberfläche vollständig lokalisiert
- Geschäftsbegriffe kulturell angepasst

## 🧪 **Demo-Funktionen testen**

### **Service-Karten interaktiv nutzen**
1. **Klicken Sie auf eine Service-Karte** → Zeigt Demo-Daten
2. **"Test"-Buttons** → Führt spezifische API-Aufrufe aus
3. **"Daten anzeigen"** → Zeigt Rohdaten und Test-Anweisungen

### **Beispiel-Workflows**

#### **Als Restaurantbesitzer (saigon_sushi)**
1. Anmelden mit `saigon_sushi / test`
2. Produktkatalog durchsuchen
3. Bestellhistorie einsehen
4. Lieferstatus verfolgen

#### **Als Administrator (admin)**
1. Anmelden mit `admin / admin`
2. Admin-Dashboard öffnen
3. Alle Services überwachen
4. Geschäftskennzahlen einsehen

#### **Als Fahrer (driver_duc)**
1. Anmelden mit `driver_duc / test`
2. Heutige Touren einsehen
3. HACCP-Daten erfassen
4. Lieferungen bestätigen

## 📊 **Geschäftsdaten verstehen**

### **Realistische Demo-Daten**
- **91 Kunden** - Vietnamesische Restaurantbesitzer
- **30 Produkte** - Premium-Fischsortiment
- **Regionen**: Berlin (45), Heidelberg (28), München (18)
- **Monatswachstum**: +28%

### **Restaurant-Segmente**
- **Sushi-Restaurants**: Premium-Kunden mit hohem Bestellwert
- **Chinesische Restaurants**: Standard-Segment
- **Thai-Restaurants**: Wachstumsmarkt

### **HACCP-Compliance**
- Temperaturüberwachung bei 2°C
- Kühlkette-Dokumentation
- Lieferbestätigungen mit Unterschrift

## 🔧 **Technische Funktionen**

### **API-Tests durchführen**
```bash
# Kompletter API-Test
./scripts/test-api.sh

# Live-Demo
./scripts/demo.sh

# Service-Status prüfen
./scripts/dev.sh status
```

### **Entwickler-Tools**
- **Health-Checks**: Alle Services überwachen
- **Demo-Daten**: Realistische Geschäftsdaten
- **API-Dokumentation**: Über Test-Scripts

## 🎯 **Geschäftsziele**

### **Für TopTuna**
- **Digitalisierung** des B2B-Vertriebs
- **Effizienz** in Bestellung und Logistik
- **Expansion** in neue Märkte (München)

### **Für vietnamesische Restaurants**
- **Einfache Bestellung** in gewohnter Sprache
- **Transparente Preise** und Lieferzeiten
- **HACCP-konforme** Dokumentation

### **Für die Logistik**
- **Optimierte Touren** mit GPS-Planung
- **Kühlkette-Überwachung** in Echtzeit
- **Digitale Lieferbestätigung**

## 📞 **Support & Hilfe**

### **Demo-Probleme**
- Alle Services sollten "Aktiv" (grün) anzeigen
- Bei Problemen: `./scripts/dev.sh logs`
- Neustart: `./scripts/stop.sh && ./scripts/start.sh`

### **Funktions-Tests**
- Jede Service-Karte ist klickbar
- Test-Buttons führen echte API-Aufrufe aus
- Demo-Daten sind realistisch und konsistent

### **Mehrsprachigkeit**
- Sprachschalter oben rechts
- Alle Texte sind übersetzt
- Vietnamesische Produktnamen verfügbar

---

**TopTuna B2B Portal** - Professioneller Fischgroßhandel für vietnamesische Restaurants in Deutschland 🐟🇩🇪🇻🇳
