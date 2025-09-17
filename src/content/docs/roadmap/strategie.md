# CC Installation & Update Strategie - Ordnung im Tool-Chaos

## 🏛️ Support-Modell: Fokus auf Debian + LXC

### Core-Support (CC-Team)
**Offiziell unterstützt und getestet:**
- **Debian 12 (Bookworm)** - Hauptfokus
- **Debian 13 (Trixie)** - Next Generation
- **LXC Container** - Primäre Deployment-Umgebung
- **Docker in LXC** - Für spezielle Workloads
- **apt.collective-context.org** - Eigenes Repository

### Community-Support
**Von der Community getragen:**
- Ubuntu und Derivate (via PPA)
- RHEL/Fedora/Rocky (Community RPMs)
- Arch/Manjaro (AUR Packages)
- macOS (Homebrew Formulas)
- Windows (WSL2 empfohlen)

### Das Proxmox-Vorbild
Wie Proxmox mit ZFS-Kernels und neueren LXC-Versionen vorangeht, wird CC eigene optimierte Pakete bereitstellen:

```bash
# CC Repository einbinden (analog zu Proxmox)
wget https://apt.collective-context.org/debian/collective-context-bookworm.gpg \
  -O /etc/apt/trusted.gpg.d/collective-context-bookworm.gpg

# Repository hinzufügen
echo "deb https://apt.collective-context.org/debian bookworm cc-stable" | \
  sudo tee /etc/apt/sources.list.d/collective-context.list
```

## 📦 Das CC APT Repository - Mehr als nur CCC

### Was apt.collective-context.org bereitstellen wird:

```bash
# Optimierte Versionen kritischer Tools
ccc                    # Commander (immer aktuell)
ccc-lxc-templates      # Vorkonfigurierte LXC Templates
ccc-docker-images      # Optimierte Docker Base Images
aider-chat-cc          # Gepatchte Aider Version
tmux-cc                # Tmux mit CC-Patches
python3.12-optimized   # Performance-optimiertes Python

# Meta-Pakete für verschiedene Szenarien
ccc-minimal            # Nur Commander
ccc-standard           # Commander + empfohlene Tools
ccc-full              # Komplette Suite
ccc-enterprise        # Enterprise Features
ccc-dev               # Development Tools
```

### Repository-Struktur (wie Proxmox)

```
apt.collective-context.org/
├── debian/
│   ├── bookworm/        # Debian 12
│   │   ├── cc-stable/    # Stabile Releases
│   │   ├── cc-testing/   # Beta Versions
│   │   └── cc-dev/       # Bleeding Edge
│   └── trixie/          # Debian 13
│       └── ...
├── gpg-keys/            # Signing Keys
└── install.sh           # One-liner Installer
```

## 🐋 LXC + Docker Integration

### Warum LXC als Basis?

CC folgt Proxmox's Philosophie:
- **LXC für System-Container** - Persistent, zustandsbehaftet
- **Docker für App-Container** - Ephemeral, stateless
- **Beste Performance** - Native Linux Container
- **Resource-Effizienz** - Weniger Overhead als VMs

### CC-optimierte LXC Templates

```bash
# CC LXC Template installieren
apt install ccc-lxc-templates

# Container mit CC vorinstalliert erstellen
lxc-create -n cc-agent-1 -t cc-debian12

# Oder via Proxmox
pct create 100 local:vztmpl/cc-debian12.tar.gz \
  --hostname cc-agent-1 \
  --memory 4096 \
  --features nesting=1
```

### Docker in LXC (Best Practice)

```bash
# In LXC Container mit nesting=1
curl -fsSL https://apt.collective-context.org/docker-setup.sh | bash

# Installiert optimiertes Docker + CC Integration
# - Docker CE neueste Version
# - CC Docker Plugin
# - Vorkonfigurierte Networks
```

## 🎯 Das Problem: Installation & Update Chaos

Nach der Recherche auf recode.at zeigt sich das fundamentale Problem:
- **Node.js Tools** brauchen `npm update`
- **Python Tools** brauchen `pipx upgrade`
- **System Tools** brauchen `apt upgrade`
- **VS Code Extensions** brauchen eigene Updates

Jedes Tool hat seine eigene Update-Mechanik, niemand behält den Überblick!

## 💡 Die Lösung: CCC als Orchestrator

### Strategie: pipx als Basis für Entwickler, APT für Production

```bash
# Ein Command für alles
ccc update --all

# Was passiert im Hintergrund:
# 1. CCC updated sich selbst (pipx/apt je nach Installation)
# 2. Prüft und updated Aider
# 3. Prüft Node.js Tools (npm update -g)
# 4. Prüft System-Pakete (apt list --upgradable)
# 5. Zeigt VS Code Extensions Status
```

## 📦 Die 3-Schichten-Architektur

### Layer 1: Core (via pipx)
**Was**: CCC Commander selbst
**Warum pipx**: Isoliert, sauber, konfliktfrei
```bash
pipx install cccmd
```

### Layer 2: KI-Tools (gemischt)
Basierend auf der recode.at Recherche - die Top 3 Gewinner:

#### Aider (Open Source Champion - 35.200+ Stars)
```bash
# Via pipx - BESTE METHODE für Debian/Ubuntu
pipx install aider-chat

# Warum pipx für Aider perfekt ist:
# ✅ Isolierte Installation - keine Python-Konflikte
# ✅ Automatisches venv
# ✅ Global als 'aider' verfügbar
# ✅ Einfache Updates: pipx upgrade aider-chat
# ✅ Saubere Deinstallation
```

#### Claude Code CLI (Anthropic Official)
```bash
# Via npm - offizielles Anthropic Tool
npm install -g @anthropic-ai/claude-code@latest
```

#### Gemini CLI (Google Official)
```bash
# Via npm - offizielles Google Tool
npm install -g @google/gemini-cli
```

### Layer 3: System-Tools (via apt)
```bash
# Das cccmd Metapaket installiert:
sudo apt install cccmd
# - tmux (Session Management)
# - git (Version Control)
# - curl, wget, jq (Utilities)
# - pipx (Python App Management)
# - nodejs, npm (für Claude/Gemini CLI)
```

## 🔄 CCC Update Manager Konzept

### Implementation in CCC

```python
# ccc/update_manager.py

class UpdateManager:
    def __init__(self):
        self.tools = {
            'pipx': ['cccmd', 'aider-chat'],
            'npm': ['@anthropic-ai/claude-code', '@google/gemini-cli'],
            'apt': ['tmux', 'git', 'nodejs'],
            'code': ['cline.cline', 'continue.continue']
        }

    def check_updates(self):
        """Prüft alle Tools auf Updates"""
        updates = {}

        # pipx Tools
        for tool in self.tools['pipx']:
            if self.pipx_has_update(tool):
                updates[tool] = 'pipx'

        # npm Tools
        for tool in self.tools['npm']:
            if self.npm_has_update(tool):
                updates[tool] = 'npm'

        return updates

    def update_all(self):
        """Ein Command für alle Updates"""
        print("🔄 CCC Update Manager")
        print("=" * 40)

        # Selbst-Update zuerst
        self.update_self()

        # Dann alle anderen Tools
        self.update_pipx_tools()
        self.update_npm_tools()
        self.check_system_updates()
        self.show_vscode_status()
```

### Nutzer-Interface

```bash
# Status aller Tools
ccc status
╔════════════════════════════════════════╗
║         CC Tool Status Overview        ║
╠════════════════════════════════════════╣
║ Core:                                  ║
║   cccmd         0.3.2    ✅ current    ║
║                                        ║
║ AI Tools:                              ║
║   aider         0.58.1   ⚠️  update    ║
║   claude-code   1.2.0    ✅ current    ║
║   gemini-cli    0.9.1    ✅ current    ║
║                                        ║
║ System:                                ║
║   tmux          3.4      ✅ current    ║
║   nodejs        20.11    ✅ current    ║
╚════════════════════════════════════════╝

# Alle Updates auf einmal
ccc update --all

# Selektive Updates
ccc update aider
ccc update --category ai-tools
```

## 📋 Empfohlene Installation für neue Nutzer

### Schritt 1: System vorbereiten (einmalig)
```bash
# Ubuntu/Debian
sudo add-apt-repository ppa:collective-context/ccc
sudo apt update
sudo apt install cccmd  # Metapaket mit allen System-Tools

# Oder minimal
sudo apt install python3-pip
python3 -m pip install --user pipx
python3 -m pipx ensurepath
```

### Schritt 2: CCC installieren
```bash
# Empfohlen
pipx install cccmd
```

### Schritt 3: KI-Tools hinzufügen
```bash
# CCC's Wizard nutzen
ccc setup --recommended

# Was der Wizard macht:
# 1. Prüft System-Voraussetzungen
# 2. Installiert Aider via pipx
# 3. Installiert Claude/Gemini CLI via npm (optional)
# 4. Konfiguriert API Keys
# 5. Testet alle Installationen
```

## 🎯 Warum diese Strategie?

### pipx als Hauptstütze - JA!
✅ **Isolierung**: Jedes Tool in eigener venv
✅ **Keine Konflikte**: System-Python bleibt sauber
✅ **Einfache Updates**: `pipx upgrade` für alles
✅ **Cross-Platform**: Funktioniert überall gleich

### CCC als Meta-Orchestrator
✅ **Ein Interface**: Nutzer müssen nur CCC kennen
✅ **Konsistente Updates**: Alles mit einem Command
✅ **Dependency-Tracking**: CCC weiß was installiert ist
✅ **Version Pinning**: Getestete Kombinationen

### Klare Trennung
- **System** (apt): Basis-Tools die stabil bleiben
- **Python** (pipx): KI-Tools und CCC selbst
- **Node.js** (npm): Offizielle Vendor-Tools

## 📊 Vergleich: Chaos vs Ordnung

| Aspekt | Ohne CCC (Chaos) | Mit CCC (Ordnung) |
|--------|------------------|-------------------|
| Installation | 5+ verschiedene Commands | `ccc setup` |
| Updates | Jedes Tool einzeln | `ccc update --all` |
| Versionen | Inkompatibilitäten möglich | Getestete Kombinationen |
| Deinstallation | ??? | `ccc uninstall --all` |
| Überblick | Keine | `ccc status` |

## 🚀 Implementierungs-Roadmap

### Phase 1 (Sofort): Basis
- [x] pipx-basierte Installation für cccmd
- [x] Mode-System (pipx/dev/apt)
- [ ] Basic `ccc status` Command

### Phase 2 (Woche 1): APT Repository Setup
- [ ] apt.collective-context.org Domain
- [ ] Reprepro/Aptly Konfiguration
- [ ] GPG Signing Infrastructure
- [ ] Erste optimierte Pakete

### Phase 3 (Monat 1): LXC Integration
- [ ] CC-optimierte LXC Templates
- [ ] Docker-in-LXC Setup Scripts
- [ ] Proxmox Integration Guide
- [ ] Container Orchestration

### Phase 4 (Q4 2025): Enterprise Features
- [ ] Multi-Container Orchestration
- [ ] Backup/Restore für Container
- [ ] Monitoring Integration
- [ ] High Availability Setup

## 🏗️ Deployment-Szenarien

### Entwickler-Laptop (Quick Start)
```bash
# Via pipx für schnellen Start
pipx install cccmd
ccc setup --dev
```

### Production Server (Debian)
```bash
# Via APT für Production
wget https://apt.collective-context.org/install.sh -O - | bash
apt install ccc-standard
```

### Proxmox Cluster (Enterprise)
```bash
# LXC Template deployen
pct create 100 local:vztmpl/cc-debian12.tar.gz \
  --hostname cc-orchestrator \
  --memory 8192 \
  --features nesting=1 \
  --startup order=1

# In Container
apt install ccc-enterprise
ccc cluster init
```

### Docker Swarm/K8s (Cloud Native)
```yaml
# docker-compose.yml
version: '3.8'
services:
  cc-orchestrator:
    image: collectivecontext/ccc:stable
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - cc-data:/data
```

## 💡 Best Practices nach Umgebung

### Für lokale Entwicklung
```bash
# pipx für Isolation und Einfachheit
pipx install cccmd
pipx install aider-chat
ccc config mode set dev
```

### Für Production auf Debian
```bash
# APT für Stabilität und Updates
echo "deb https://apt.collective-context.org/debian bookworm cc-stable" | \
  sudo tee /etc/apt/sources.list.d/collective-context.list
apt update && apt install ccc-standard
```

### Für Container-Umgebungen
```bash
# LXC für System-Container
lxc-create -n cc-prod -t cc-debian12
lxc-start -n cc-prod
lxc-attach -n cc-prod -- ccc init

# Docker für App-Container
docker run -d collectivecontext/ccc:stable
```

## 📊 Vergleich: Installation nach Use-Case

| Use-Case | Methode | Warum | Support |
|----------|---------|--------|---------|
| Entwicklung lokal | pipx | Schnell, isoliert | Community |
| Production Debian | APT | Stabil, managed | CC-Team |
| Container/LXC | Template | Optimiert, skalierbar | CC-Team |
| Ubuntu Desktop | PPA | Native Integration | Community |
| macOS/Windows | pipx | Cross-Platform | Community |
| Cloud (AWS/GCP) | Docker | Cloud-Native | Community |

## 🎯 Warum diese Strategie?

### Debian + LXC als Kern
✅ **Stabilität**: Debian's legendäre Zuverlässigkeit
✅ **LXC Performance**: Native Container ohne Overhead
✅ **Proxmox-kompatibel**: Nahtlose Integration
✅ **Support-Fokus**: Team kann sich spezialisieren

### pipx für Flexibilität
✅ **Überall verfügbar**: Funktioniert auf allen Systemen
✅ **Entwickler-freundlich**: Schnelle Iteration
✅ **Keine Konflikte**: Isolierte Environments
✅ **Community-tauglich**: Einfach zu supporten

### APT Repository als Professionalisierung
✅ **Enterprise-ready**: Wie Proxmox, Docker, etc.
✅ **Kontrollierte Updates**: Getestete Kombinationen
✅ **Optimierte Pakete**: Performance-Tuning möglich
✅ **Dependencies managed**: Alles automatisch