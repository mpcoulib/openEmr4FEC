# Friend's Eye Center (FEC) — OpenEMR

OpenEMR customized for **Friend's Eye Center**, an eye clinic operating across 3 locations in Ghana. This setup includes Ghana-specific patient demographics (regions, NHIS, ethnic groups, digital addresses) and eye clinic workflows built on top of OpenEMR.

---

## Requirements

Before you start, install the following on your machine:

| Tool | Version | Download |
|---|---|---|
| Docker Desktop | Latest | https://www.docker.com/products/docker-desktop/ |
| Git | Latest | https://git-scm.com/downloads |

> **Windows users:** Docker Desktop requires WSL 2 (Windows Subsystem for Linux). Docker will prompt you to install it if needed during setup.

---

## Installation

### 1. Clone the repository

**Mac (Terminal) / Windows (PowerShell or Git Bash):**
```bash
git clone https://github.com/mpcoulib/openEmr4FEC.git
cd openEmr4FEC
```

### 2. Start Docker Desktop

- **Mac:** Open Docker Desktop from your Applications folder. Wait until the whale icon in the menu bar is steady (not animating).
- **Windows:** Open Docker Desktop from the Start menu. Wait until it says "Docker Desktop is running" in the system tray.

### 3. Start the application

**Mac (Terminal):**
```bash
cd OpenEMR_for_FEC/docker/development-easy
docker compose up --detach --wait
```

**Windows (PowerShell or Git Bash):**
```powershell
cd OpenEMR_for_FEC\docker\development-easy
docker compose up --detach --wait
```

The first time you run this, Docker will download the required images. This can take **5–15 minutes** depending on your internet connection. Subsequent starts are much faster.

You will see this when it's ready:
```
✔ Container development-easy-mysql-1    Healthy
✔ Container development-easy-openemr-1  Healthy
```

### 4. Apply Ghana/FEC customizations

This step configures the patient form with Ghana-specific fields (regions, NHIS, ethnic groups, etc.). Run it once after the first start, and again any time you reset the database.

**Mac:**
```bash
# Run from the root of the cloned repo (openEmr4FEC/)
docker compose -f OpenEMR_for_FEC/docker/development-easy/docker-compose.yml exec -T mysql \
  mariadb -u openemr -popenemr openemr < sql/fec_ghana_customization.sql
```

**Windows (PowerShell):**
```powershell
# Run from the root of the cloned repo (openEmr4FEC/)
Get-Content sql\fec_ghana_customization.sql | `
  docker compose -f OpenEMR_for_FEC\docker\development-easy\docker-compose.yml exec -T mysql `
  mariadb -u openemr -popenemr openemr
```

**Windows (Git Bash):**
```bash
# Run from the root of the cloned repo (openEmr4FEC/)
docker compose -f OpenEMR_for_FEC/docker/development-easy/docker-compose.yml exec -T mysql \
  mariadb -u openemr -popenemr openemr < sql/fec_ghana_customization.sql
```

---

## Access the application

Once running, open your browser and go to:

| Service | URL | Credentials |
|---|---|---|
| OpenEMR (HTTP) | http://localhost:8300 | `admin` / `pass` |
| OpenEMR (HTTPS) | https://localhost:9300 | `admin` / `pass` |
| phpMyAdmin (database) | http://localhost:8310 | user: `openemr` / pass: `openemr` |

> Your browser may show a security warning for the HTTPS link because the certificate is self-signed. Click "Advanced" and proceed — this is normal for local development.

---

## Stopping the application

**Mac / Windows:**
```bash
cd OpenEMR_for_FEC/docker/development-easy
docker compose stop
```

This keeps your data intact. To start again later, run:
```bash
docker compose up --detach --wait
```

---

## Resetting everything (clean slate)

> **Warning:** This deletes all patient data and resets the database.

```bash
cd OpenEMR_for_FEC/docker/development-easy
docker compose down --volumes
docker compose up --detach --wait
```

Then re-apply the FEC customizations (Step 4 above).

---

## Troubleshooting

**Docker says "port is already in use"**
Something else on your computer is using port 8300 or 8310. Either stop that service, or edit `docker-compose.yml` and change the port numbers (left side of the colon).

**`docker compose` command not found**
Older versions of Docker use `docker-compose` (with a hyphen). Try that instead:
```bash
docker-compose up --detach
```

**The page won't load after startup**
Wait another 2–3 minutes — OpenEMR takes time to fully initialize on first run. If it still doesn't load:
```bash
# Check container logs
docker compose logs openemr --tail 50
```

**Windows: "cannot connect to Docker daemon"**
Make sure Docker Desktop is running. If you just installed it, restart your computer first.

**Mac Apple Silicon (M1/M2/M3) note**
The Docker image is configured with `platform: linux/amd64`. Docker Desktop on Apple Silicon runs this automatically via Rosetta emulation — no changes needed.

---

## Project structure

```
openEmr4FEC/
├── sql/
│   └── fec_ghana_customization.sql  # Ghana/FEC demographics patch (apply after first run)
├── OpenEMR_for_FEC/          # OpenEMR source code
│   ├── docker/
│   │   └── development-easy/ # Docker setup (start here)
│   │       └── docker-compose.yml
│   ├── interface/            # UI controllers and templates
│   └── src/                  # Modern PHP source (OpenEMR\ namespace)
└── README.md                 # This file
```

---

## FEC Customizations

The `sql/fec_ghana_customization.sql` file adapts OpenEMR for Ghana and eye clinic use:

- **Patient form** — Ghana Card No., Region (16 regions), District, Digital Address (GPS), NHIS Number, NHIS Category, NHIS Expiry Date, SSNIT Number
- **Social & Cultural** — Ethnic Group (Akan, Ewe, Ga-Adangbe, Dagomba, etc.), Religion, Preferred Language (Twi, Ga, Ewe, Dagbani, Hausa…), Nationality, Hometown, Community/Village, Educational Level
- **Clinic fields** — Payment Type (Cash/NHIS/Corporate/Waiver), Referred By, Occupation
- **Next of Kin** — Full structured block with Ghana regions and GPS address
- **Hidden** — All US-specific fields (SSN, HIPAA, state insurance portals, VFC, etc.)
