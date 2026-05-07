# Medik 💊

> **Drug Information Database** — Search medicines by symptom, illness, or drug name.  
> Focused on Indonesian market with global drug reference.

---

## 📋 Overview

Medik is a drug information system that helps users:
- 🔍 **Search by symptom/illness** (e.g., "headache", "cough")
- 💊 **Search by drug name** (e.g., "paracetamol", "amoxicillin")
- 📍 **Find Indonesian brands** with BPOM registration numbers
- ⚠️ **Access dosage, warnings, and interactions**

---

## ✨ Features

| Feature | Status | Source |
|---------|--------|--------|
| Search by drug name | ✅ Prototype | BPOM API |
| Search by symptom | 🚧 Planned | openFDA API |
| Indonesian drug brands | ✅ Working | BPOM CekBPOM |
| Dosage & warnings | 🚧 Planned | openFDA API |
| Drug interactions | 🚧 Planned | openFDA API |
| Registration verification | ✅ Working | BPOM API |

---

## 🏗️ Architecture

```
User Input (symptom/drug name)
         │
         ▼
┌────────────────────────────────┐
│      Medik Backend API          │
│  - Query processing            │
│  - Result aggregation         │
│  - Cache layer (Redis/DB)    │
└─────────┬──────────┬─────────┘
          │          │
    ┌─────▼─────┐  ┌────▼──────┐
    │  openFDA  │  │  BPOM     │
    │  API      │  │  CekBPOM  │
    │           │  │  API       │
    │ - Symptom │  │ - ID drug │
    │ - Dosage  │  │   brands  │
    │ - Warnings│  │ - Reg #   │
    └───────────┘  └──────────┘
          │          │
          └──────┬──────┘
                 ▼
         ┌───────────────┐
         │  Frontend UI  │
         │  + DISCLAIMER │
         └───────────────┘
```

---

## 🔌 API Integrations

### 1. BPOM CekBPOM API (Indonesia)
- **Endpoint**: `https://cekbpom.pom.go.id/produk-dt/all` (POST)
- **Data**: 643,620+ registered products
- **Search**: Drug name → Indonesian brands, registration numbers, applicants
- **Status**: ✅ Working (reverse-engineered)

### 2. openFDA API (USA)
- **Endpoint**: `https://api.fda.gov/drug/label.json`
- **Data**: Drug labels, adverse events, recalls
- **Search**: Symptom → relevant drugs, dosage, warnings
- **Status**: ✅ Working (no API key needed)

### 3. RxNorm API (NIH)
- **Endpoint**: `https://rxnav.nlm.nih.gov/REST/`
- **Purpose**: Standardize drug names across sources
- **Status**: ✅ Working

📖 **Full API documentation**: See [`API_SOURCES.md`](./API_SOURCES.md)

---

## 🚀 Quick Start

### Prerequisites
- Python 3.7+
- `urllib` (standard library)
- Internet connection

### Test BPOM Search
```bash
cd /tmp/medik
python3 bpom_search.py paracetamol 5
```

**Output:**
```
============================================================
BPOM Drug Search Results
============================================================
Total products in BPOM: 643,627
Results found: 159

1. PARACETAMOL
   Registration No: GBL2605069636B1
   Form: DROPS
   Package: DUS, 1 BOTOL @ 15 ML
   Applicant: DEXA MEDICA - Indonesia
   Status: Berlaku
...
```

---

## ⚠️ Mandatory Disclaimer

> **DISCLAIMER**: This information is for educational purposes only.  
> It is **NOT medical advice**. Always consult a doctor or pharmacist  
> before taking any medication. In emergency, contact your local  
> emergency services.

*(This disclaimer must appear on every search result page and API response.)*

---

## 📊 Current Status

**Phase**: 🔍 Exploration & Prototyping

- ✅ API sources identified and tested
- ✅ BPOM API integration working
- ✅ openFDA API tested
- ✅ Prototype script created (`bpom_search.py`)
- ✅ API documentation written (`API_SOURCES.md`)
- 🚧 Backend API design (next)
- 🚧 Frontend UI (planned)
- 🚧 Symptom search integration (planned)

---

## 🤝 Contributing

### Agent Collaboration Rules
See [`AGENTS.md`](./AGENTS.md) for:
- Branching strategy (`agent/` prefix)
- Commit standards (Conventional Commits)
- Code quality guidelines
- PR submission process

### Quick Guide
```bash
# 1. Create feature branch
git checkout -b agent/your-feature-name

# 2. Make changes
# ... edit files ...

# 3. Commit with conventional format
git commit -m "feat: add symptom search endpoint"

# 4. Push and create PR
git push -u origin agent/your-feature-name
```

---

## 📁 Project Structure

```
medik/
├── AGENTS.md              # Collaboration rules
├── API_SOURCES.md       # API documentation
├── README.md             # This file
├── LICENSE               # Project license
├── bpom_search.py       # BPOM search prototype
└── (more files coming...)
```

---

## 📮 Contact & Repository

- **Repository**: https://github.com/kucingbelang4/medik
- **Issues**: https://github.com/kucingbelang4/medik/issues
- **Pull Requests**: https://github.com/kucingbelang4/medik/pulls

---

## 📝 License

See [`LICENSE`](./LICENSE) file for details.

---

*Last updated: 2026-05-07*  
*Status: Exploration Phase*
