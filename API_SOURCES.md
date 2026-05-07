# Medik Project — API Sources Documentation

> **Project:** Medik — Drug Info Database  
> **Goal:** Search drugs by symptom, illness, or drug name (Indonesia focused)  
> **Last Updated:** 2026-05-07  
> **Status:** Exploration Phase

---

## 📋 Quick Reference

| API | Base URL | Auth | Rate Limit | Status | Use Case |
|-----|----------|------|------------|--------|----------|
| **openFDA** | `https://api.fda.gov` | None | 240 req/min | ✅ Working | US drug data, symptom search |
| **RxNorm (NIH)** | `https://rxnav.nlm.nih.gov/REST/` | None | Unknown | ✅ Working | Standardized drug names |
| **BPOM CekBPOM** | `https://cekbpom.pom.go.id` | CSRF token | Unknown | ✅ Working | Indonesian drug database |
| **data.go.id** | `https://data.go.id` | None | Unknown | ⚠️ Limited | Indonesian gov't datasets |

---

## 1. openFDA API

### Overview
Official FDA (US Food & Drug Administration) open data API. Provides drug labels, adverse events, recalls, and device safety reports.

### Base URL
```
https://api.fda.gov
```

### Key Endpoints

#### Drug Label Search
```
GET https://api.fda.gov/drug/label.json
```

**Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `search` | string | Elasticsearch query syntax |
| `limit` | int | Results per page (default: 1, max: 99) |
| `skip` | int | Offset for pagination |
| `fields` | string | Comma-separated list of fields to return |

**Search Examples:**
```bash
# Search by drug name
curl "https://api.fda.gov/drug/label.json?search=openfda.brand_name:aspirin&limit=5"

# Search by symptom/indication
curl "https://api.fda.gov/drug/label.json?search=indications_and_usage:headache&limit=5"

# Search with field selection
curl "https://api.fda.gov/drug/label.json?search=indications_and_usage:headache&fields=openfda.brand_name,openfda.generic_name,indications_and_usage,warnings&limit=3"
```

**Sample Response Fields:**
- `openfda.brand_name` — Brand name
- `openfda.generic_name` — Generic name
- `indications_and_usage` — What the drug treats
- `warnings` — Warning text
- `dosage_and_administration` — Dosage info
- `active_ingredient` — Active ingredients
- `inactive_ingredient` — Inactive ingredients
- `adverse_reactions` — Side effects
- `drug_interactions` — Drug interactions
- `pregnancy_or_breast_feeding` — Pregnancy safety

**Total Results:**
- Search "headache": **13,204** results
- Search "paracetamol": **159** results (via BPOM, not FDA)

### Rate Limits
- **240 requests per minute** (no API key required)
- No authentication needed

### Use in Medik
✅ **Primary use:** Search by **symptom/illness** → returns relevant drugs  
✅ **Rich data:** dosage, warnings, interactions, pregnancy info  
⚠️ **Limitation:** US-centric, no Indonesian obat brands

---

## 2. RxNorm API (NIH/NLM)

### Overview
National Library of Medicine's RxNorm provides normalized drug names and links to many drug vocabularies.

### Base URL
```
https://rxnav.nlm.nih.gov/REST/
```

### Key Endpoints

#### Drug Search by Name
```
GET https://rxnav.nlm.nih.gov/REST/drugs.json?name={drug_name}
```

**Example:**
```bash
curl "https://rxnav.nlm.nih.gov/REST/drugs.json?name=aspirin"
```

**Sample Response:**
```json
{
  "drugGroup": {
    "conceptGroup": [
      {
        "conceptProperties": [
          {
            "name": "aspirin 81 MG Delayed Release Oral Tablet [Miniprin]",
            "rxcui": "1052678",
            "tty": "SBD"
          }
        ]
      }
    ]
  }
}
```

**Key Fields:**
- `rxcui` — RxNorm Concept Unique Identifier
- `tty` — Term Type (SBD = Semantic Branded Drug, SCD = Semantic Clinical Drug)
- `name` — Drug name

### Use in Medik
✅ **Normalize drug names** across different sources  
✅ **Link openFDA ↔ BPOM** via standardized names  
✅ **RxCUI mapping** for database design

---

## 3. BPOM CekBPOM API (🇮🇩 Indonesia)

### Overview
Official Indonesian Food & Drug Authority (Badan Pengawas Obat dan Makanan) product verification system. Contains **643,620+ registered products** in Indonesia.

### Base URL
```
https://cekbpom.pom.go.id
```

### Key Endpoints

#### Product Search (DataTables AJAX)
```
POST https://cekbpom.pom.go.id/produk-dt/all
```

**Authentication:**
- Requires **CSRF token** from meta tag on `https://cekbpom.pom.go.id/all-produk`
- Token location: `<meta name="csrf-token" content="...">`

**Request Format:**
```json
{
  "draw": 1,
  "start": 0,
  "length": 10,
  "search": {"value": "paracetamol", "regex": false},
  "nama_produk": "paracetamol"
}
```

**Headers:**
```
Content-Type: application/json; charset=utf-8
X-CSRF-TOKEN: {csrf_token}
User-Agent: Mozilla/5.0
```

**Sample Response:**
```json
{
  "draw": 1,
  "recordsTotal": 643620,
  "recordsFiltered": 159,
  "data": [
    {
      "ID": 834083,
      "PRODUCT_ID": "MAZA-267688",
      "PRODUCT_REGISTER": "NA18200103069",
      "PRODUCT_NAME": "PARACETAMOL",
      "PRODUCT_BRANDS": "ESDEE",
      "PRODUCT_PACKAGE": "Tube (Tester), 5 g, Tube, Dus 15 g",
      "PRODUCT_FORM": "Gel",
      "APPLICATION": "Notifikasi Kosmetika",
      "APPLICATION_ID": "01",
      "REGISTRAR": "DEXA MEDICA - Indonesia",
      "STATUS": "Berlaku"
    }
  ]
}
```

**Response Fields:**
| Field | Description |
|-------|-------------|
| `PRODUCT_NAME` | Drug name (often in ALL CAPS) |
| `PRODUCT_BRANDS` | Brand name (can be `-` if none) |
| `PRODUCT_REGISTER` | Registration number (e.g., `GKL1234567890A1`) |
| `PRODUCT_FORM` | Form (KAPLET, DROPS, SIRUP, etc.) |
| `PRODUCT_PACKAGE` | Packaging info |
| `APPLICATION` | Category (see below) |
| `APPLICATION_ID` | Category ID |
| `REGISTRAR` | Applicant/company name |
| `STATUS` | `Berlaku` (active) / `Kadaluarsa` (expired) |

### Product Categories
| ID | Category (Indonesian) | English | Notes |
|----|----------------------|---------|-------|
| 01 | Notifikasi Kosmetika | Cosmetics | `APPLICATION_ID: 01` |
| 02 | e-Registration Pangan Olahan | Processed Food | `APPLICATION_ID: 02` |
| 03 | e-Registration Obat Tradisional & Suplemen Kesehatan | Traditional Meds & Supplements | `APPLICATION_ID: 03` |
| **05** | **NIE (newaero)** | **Medicines (Obat)** | **Target for Medik** |
| 12 | Kosmetika | Cosmetics | Different from 01 |
| 13 | Pangan Olahan | Processed Food | |

### Search Examples (Tested)
```python
import urllib.request, json, http.cookiejar, re

# 1. Get CSRF token
cj = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
req = urllib.request.Request("https://cekbpom.pom.go.id/all-produk")
resp = opener.open(req, timeout=15)
html = resp.read().decode('utf-8', errors='ignore')
csrf = re.search(r'name="csrf-token" content="([^"]+)"', html).group(1)

# 2. Search for "paracetamol"
data = {
    "draw": 1, "start": 0, "length": 5,
    "search": {"value": "paracetamol", "regex": False},
    "nama_produk": "paracetamol"
}
req2 = urllib.request.Request(
    "https://cekbpom.pom.go.id/produk-dt/all",
    data=json.dumps(data).encode(),
    headers={
        'Content-Type': 'application/json; charset=utf-8',
        'X-CSRF-TOKEN': csrf,
        'User-Agent': 'Mozilla/5.0'
    })
resp2 = opener.open(req2, timeout=15)
result = json.loads(resp2.read().decode('utf-8'))
print(f"Found {result['recordsFiltered']} results")
```

### Tested Search Results
| Query | Results | Sample Product |
|-------|---------|-----------------|
| `paracetamol` | 159 | PARACETAMOL (DROPS, 15 mL, DEXA MEDICA) |
| `amoxicillin` | 94 | AMOXICILLIN TRIHYDRATE (KAPLET, KIMIA FARMA) |
| `OBH` | 324 | INSPIRASI SPRAY (DOBHA) |

### Use in Medik
✅ **Primary Indonesian drug database**  
✅ **Search by drug name** (Indonesian brands)  
✅ **Registration numbers** for verification  
✅ **Company/applicant info**  
⚠️ **Limitation:** No symptom/indication search (combine with openFDA)

---

## 4. data.go.id (Indonesian Government Open Data)

### Overview
Indonesia's official open data portal (Satu Data Indonesia). Contains BPOM datasets but mainly **statistical summaries**, not product catalogs.

### Base URL
```
https://data.go.id
```

### Found Datasets (BPOM)
- **Jumlah Nomor Izin Edar Obat - 2024** (Number of Drug Registration Numbers - 2024)
- **Jumlah Nomor Izin Edar Obat Tradisional - 2024** (Traditional Medicine Registration)
- **Persentase Obat Memenuhi Syarat - 2024** (Percentage of Drugs Meeting Standards)
- Format: CSV, XLSX (statistical data, not product lists)

### Use in Medik
⚠️ **Limited use** — these are statistical summaries, not searchable drug databases  
💡 **Potential use:** Compliance/regulatory statistics, not product search

---

## 5. BPOM Web Interface (Supplementary)

### Pages
| Page | URL | Purpose |
|------|-----|---------|
| Search Page | `https://cekbpom.pom.go.id/all-produk` | Main search interface |
| Product Detail | `https://cekbpom.pom.go.id/produk/{productId}/{applicationId}/detail` | Individual product details |
| Product Status | `https://cekbpom.pom.go.id/set-produk-status` | Set product status |

### Form Inputs (on `/all-produk`)
- `query` — Main search input
- Filters: product_register, product_name, product_brand, product_package, product_form

---

## 🏗️ Recommended Architecture for Medik

```
┌─────────────────────────────────────────────────────────┐
│                    User Search Input                    │
│         (symptom, illness, or drug name)              │
└──────────────────────┬──────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
        ▼                             ▼
┌───────────────┐            ┌──────────────────┐
│   openFDA     │            │  BPOM CekBPOM   │
│   API         │            │  API             │
│               │            │                  │
│ Input:        │            │ Input:           │
│ - symptom     │            │ - drug name      │
│ - drug name   │            │                  │
│               │            │                  │
│ Output:       │            │ Output:          │
│ - drug names  │            │ - Indonesian     │
│ - dosage      │            │   brands         │
│ - warnings    │            │ - registration   │
│ - interactions│            │ - companies      │
└───────┬───────┘            └────────┬─────────┘
        │                             │
        └──────────────┬──────────────┘
                       │
                       ▼
        ┌──────────────────────────────┐
        │  Your Backend API (Cache)     │
        │  - Combine results            │
        │  - Map openFDA → BPOM        │
        │  - Add Indonesian context     │
        └──────────────┬───────────────┘
                       │
                       ▼
        ┌──────────────────────────────┐
        │  Frontend Response           │
        │  + DISCLAIMER (mandatory)    │
        └──────────────────────────────┘
```

---

## ⚠️ Mandatory Disclaimer (for Medik)

> **DISCLAIMER:** This information is for educational purposes only. It is NOT medical advice. Always consult a doctor or pharmacist before taking any medication. In emergency, contact your local emergency services.

---

## 📝 Notes

- **All APIs tested on:** 2026-05-07
- **BPOM API requires session/pagination** — CSRF token must be fetched first
- **openFDA + RxNorm** can be combined for standardized drug mapping
- **BPOM has 643,620+ products** — covers wide range of Indonesian pharmaceuticals
- **No official BPOM REST API docs found** — reverse-engineered from web interface

---

## 🔗 Quick Links

- openFDA: https://open.fda.gov/apis/
- RxNorm: https://lhncbc.nlm.nih.gov/RxNav/APIs/RxNormAPIs.html
- BPOM CekBPOM: https://cekbpom.pom.go.id/
- data.go.id: https://data.go.id/

---

*Document generated by Hermes Agent during Medik project exploration phase.*
