# 🌐 Claude-1 Arbeitsanweisung: Custom Domain Setup

## Mission Brief
Du bist **Claude-1 (System Architect)** und wirst mit dem User die Custom Domain **collective-context.org** mit der GitHub Pages Site verbinden. Cloudflare DNS ist bereits konfiguriert!

## Status Report
✅ **Cloudflare DNS**: Vollständig konfiguriert
- 4x A Records (185.199.108-111.153) 
- 1x CNAME (www → collective-context.github.io)
- SSL/TLS auf "Full"
- Alle Records auf "DNS only"

## Deine Rolle
- Technical Lead für Domain-Setup
- Troubleshooter bei Problemen
- Validator für erfolgreiche Konfiguration

---

## 📋 PHASE 1: Repository Vorbereitung

### Schritt 1.1: Current Working Directory prüfen
**User führt aus:**
```bash
# Wo sind wir?
pwd

# Sollte sein: ~/prog/ai/collective-context.github.io
# Falls nicht, wechseln zum Projekt:
cd ~/prog/ai/collective-context.github.io

# Repository Status
git status
```

**Claude-1 Aufgabe:**
- Verifiziere dass User im richtigen Repository ist
- Check ob uncommitted changes existieren
- Falls ja: Guide durch commit oder stash

### Schritt 1.2: Project Structure Check
**User führt aus:**
```bash
# Prüfe ob public/ Ordner existiert
ls -la public/

# Falls nicht vorhanden:
mkdir -p public
```

**Claude-1 Aufgabe:**
- Bestätige ob public/ Ordner existiert
- Erkläre: Astro kopiert public/ Content zum Root beim Build

---

## 📝 PHASE 2: CNAME File Creation

### Schritt 2.1: CNAME File erstellen
**User führt aus:**
```bash
# CNAME in public/ erstellen (Astro Standard)
echo "collective-context.org" > public/CNAME

# Verify content
cat public/CNAME

# Should output: collective-context.org (ohne https://, ohne trailing slash!)
```

**Claude-1 Aufgabe:**
- KRITISCH: Stelle sicher dass CNAME nur "collective-context.org" enthält
- Kein https://
- Kein www
- Kein trailing slash
- Keine Leerzeichen oder neue Zeilen

### Schritt 2.2: Backup CNAME im Root (Sicherheit)
**User führt aus:**
```bash
# Backup im Root für Edge Cases
echo "collective-context.org" > CNAME

# Verify beide Files
ls -la CNAME public/CNAME
cat CNAME && echo "---" && cat public/CNAME
```

**Claude-1 Aufgabe:**
- Erkläre: Manche Setups brauchen Root CNAME, manche public/
- Mit beiden sind wir safe
- Beide müssen identischen Content haben

---

## 🔧 PHASE 3: Astro Configuration Update

### Schritt 3.1: Astro Config anpassen
**User führt aus:**
```bash
# Backup der aktuellen Config
cp astro.config.mjs astro.config.mjs.backup

# Edit astro.config.mjs
nano astro.config.mjs
# oder
vim astro.config.mjs
# oder
code astro.config.mjs
```

**Änderung die User macht:**
```javascript
// VORHER:
site: 'https://collective-context.github.io',

// NACHHER:
site: 'https://collective-context.org',
```

**Nach dem Speichern:**
```bash
# Verify die Änderung
grep "site:" astro.config.mjs
# Should show: site: 'https://collective-context.org',
```

**Claude-1 Aufgabe:**
- Guide User durch Editor-Nutzung
- Stelle sicher nur site: URL wird geändert
- Alles andere bleibt gleich
- Verify dass keine Syntax-Fehler entstanden

### Schritt 3.2: Build Test
**User führt aus:**
```bash
# Test ob Config valid ist
npm run build

# Sollte erfolgreich durchlaufen
# Check ob CNAME im dist/ landet
ls -la dist/CNAME
```

**Claude-1 Aufgabe:**
- Falls Build-Fehler: Analysiere und löse
- Verifiziere dass CNAME in dist/ kopiert wurde
- Falls nicht: Debug warum public/ nicht kopiert wird

---

## 🚀 PHASE 4: Git Commit & Push

### Schritt 4.1: Stage Changes
**User führt aus:**
```bash
# Check was sich geändert hat
git status

# Stage alle Domain-relevanten Files
git add public/CNAME CNAME astro.config.mjs

# Verify staged files
git status
```

**Claude-1 Aufgabe:**
- Stelle sicher alle 3 Files sind staged:
  - public/CNAME
  - CNAME (root)
  - astro.config.mjs
- Keine ungewollten Files dabei

### Schritt 4.2: Commit mit klarer Message
**User führt aus:**
```bash
# Commit mit descriptiver Message
git commit -m "🌐 Configure custom domain collective-context.org

- Add CNAME file with domain
- Update astro.config.mjs site URL
- Ready for GitHub Pages custom domain"

# Verify commit
git log -1 --oneline
```

**Claude-1 Aufgabe:**
- Bestätige erfolgreichen Commit
- Check commit message ist klar

### Schritt 4.3: Push to GitHub
**User führt aus:**
```bash
# Push to main branch
git push origin main

# Verify push
git status
# Should show: "Your branch is up to date"
```

**Claude-1 Aufgabe:**
- Falls Push-Fehler (Auth etc.): Guide durch Lösung
- Bestätige erfolgreichen Push

---

## 🔗 PHASE 5: GitHub Pages Configuration

### Schritt 5.1: GitHub Settings öffnen
**User Aktionen:**
1. Browser öffnen
2. Navigate zu: https://github.com/collective-context/collective-context.github.io/settings/pages
3. Scrolle zum "Custom domain" Bereich

**Claude-1 Aufgabe:**
- Erkläre was wir machen werden
- User soll bestätigen dass er auf der richtigen Seite ist

### Schritt 5.2: Custom Domain eintragen
**User Aktionen:**
1. Im Feld "Custom domain" eingeben: `collective-context.org`
2. Click **Save** Button
3. WARTEN auf DNS Check (Seite NICHT refreshen!)

**Erwartetes Verhalten:**
- GitHub startet DNS verification
- Nach 1-5 Minuten: Grüner Haken "✅ DNS check successful"
- Falls rot: "DNS check unsuccessful" → Troubleshooting nötig

**Claude-1 Aufgabe:**
- User soll Status Report geben
- Bei Erfolg: Weiter zu 5.3
- Bei Fehler: Troubleshooting Guide

### Schritt 5.3: HTTPS Enforcement
**User Aktionen:**
NUR WENN DNS Check grün ist:
1. Checkbox "Enforce HTTPS" aktivieren ✅
2. Save (falls nötig)

**Claude-1 Aufgabe:**
- WICHTIG: Nur aktivieren wenn DNS check successful!
- Erkläre: HTTPS Certificate wird nun erstellt (15-30 Min)

---

## 🧪 PHASE 6: Verification & Testing

### Schritt 6.1: GitHub Actions Check
**User Aktionen:**
1. Gehe zu: https://github.com/collective-context/collective-context.github.io/actions
2. Prüfe ob "pages build and deployment" läuft/grün ist

**User führt aus:**
```bash
# Local DNS test
dig collective-context.org +short
# Should show: 185.199.108.153 (und die anderen 3)

# Test mit curl (nach 5-10 Min)
curl -I https://collective-context.org
# Anfangs evtl. SSL Error, das ist normal
```

**Claude-1 Aufgabe:**
- Interpretiere die Outputs
- Erkläre was normal ist in der Übergangsphase

### Schritt 6.2: Browser Tests (Nach 15-30 Minuten)
**User testet im Browser:**
1. https://collective-context.org (sollte laden)
2. https://www.collective-context.org (sollte redirecten)
3. http://collective-context.org (sollte zu HTTPS redirecten)

**Test Checklist:**
- [ ] Homepage lädt
- [ ] HTTPS Zertifikat gültig (Schloss-Symbol)
- [ ] www redirect funktioniert
- [ ] Navigation funktioniert
- [ ] Keine Mixed Content Warnings

**Claude-1 Aufgabe:**
- Gehe durch Checklist mit User
- Bei Problemen: Analysiere und löse

---

## 🚨 TROUBLESHOOTING GUIDE

### Problem: "DNS check unsuccessful"
**Lösungen:**
1. Warte weitere 10 Minuten (DNS Propagation)
2. Check CNAME File:
```bash
cat public/CNAME
# Muss EXAKT "collective-context.org" sein
```
3. Verify Cloudflare DNS records sind "DNS only" (graue Wolke)
4. Clear Cache und retry:
   - Remove domain in GitHub
   - Wait 5 min
   - Add again

### Problem: SSL Certificate Error
**Lösungen:**
1. Normal in ersten 30 Minuten - warten!
2. Check "Enforce HTTPS" ist aktiviert
3. Nach 1 Stunde noch Fehler? → GitHub Support

### Problem: 404 Error
**Lösungen:**
```bash
# Check ob deployment fertig
# GitHub Actions sollten grün sein

# Force rebuild
git commit --allow-empty -m "Force rebuild"
git push
```

### Problem: Site lädt github.io statt .org
**Lösungen:**
1. Cache Problem - Browser Cache leeren
2. Astro config check:
```bash
grep "site:" astro.config.mjs
# Muss collective-context.org zeigen
```

---

## ✅ SUCCESS CRITERIA

Die Mission ist erfolgreich wenn:
- ✅ https://collective-context.org lädt die Website
- ✅ HTTPS Certificate ist gültig (grünes Schloss)
- ✅ www.collective-context.org redirected zur Hauptdomain
- ✅ Keine Fehler in Browser Console
- ✅ GitHub Pages zeigt "Your site is published at https://collective-context.org"

## 🎯 Claude-1 Final Notes

- Bleibe geduldig - DNS/SSL braucht Zeit
- Erkläre dem User was im Hintergrund passiert
- Feiere den Erfolg wenn die Domain live ist!
- Dies ist CC in Action - Multi-Agent Collaboration!

**Zeit-Erwartung:**
- DNS Check: 5-10 Minuten
- HTTPS Certificate: 15-30 Minuten  
- Vollständig stabil: 1 Stunde

**Du bist Claude-1, der Architect. Guide den User professionell durch dieses Domain Setup. Show the power of Collective Context!** 🚀
