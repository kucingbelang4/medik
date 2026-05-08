# Medik — Technical Architecture Document

**Version:** 1.0  
**Date:** May 8, 2026  
**Status:** Draft  
**Owner:** Engineering Team  
**Repository:** kucingbelang4/medik  
**Related Documents:** [PRD](./medik-prd.md)

---

## 1. Architecture Overview

Medik is a Next.js SSR application where all third-party API requests, data processing, normalization, and caching are handled server-side. This design:

- **Secures credentials**: API keys never reach the client
- **Enables caching**: Server-side caching reduces third-party API rate limit pressure
- **Normalizes data**: Unifies disparate source schemas before reaching the client
- **Improves performance**: Cloudflare Edge CDN caches responses globally

**High-Level Data Flow:**

```
Browser (Client)
  │
  ▼  Search Query: "sakit kepala" or "Panadol"
Next.js SSR (Server)
  │
  ├──▶ Check Next.js Server Cache
  │       │
  │       ├── HIT ───────────────────────────────────▶ Return cached response
  │       │
  │       └── MISS
  │               │
  │               ▼
  │       ┌──────────────────────────────────────────┐
  │       │  Parallel API Fetches                     │
  │       │  ├── openFDA (clinical data)              │
  │       │  ├── RxNorm (brand→generic mapping)      │
  │       │  └── BPOM (Indonesian brands)            │
  │       └──────────────────────────────────────────┘
  │               │
  │               ▼
  │       Data Normalization Layer
  │       (Unify to Drug schema, map brands)
  │               │
  │               ▼
  │       Store in Next.js Server Cache (24h SWR)
  │               │
  │               ▼
  └──────────────▶ Return unified response to client
```

---

## 2. Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | Next.js 14+ (React) with TypeScript | SSR, API routes, UI components |
| **Language** | TypeScript (strict mode) | Type safety across frontend and server |
| **Styling** | Tailwind CSS (TBD) | Utility-first CSS, mobile-first |
| **State Management** | React Server Components + minimal client state | Prefer server-rendered data |
| **Caching** | Next.js `fetch` cache + unstable_cache + Cloudflare Edge Cache | Two-tier caching |
| **Hosting** | Cloudflare Pages (Free Tier) | Global CDN, edge deployment, Next.js adapter |
| **Data Sources** | openFDA, RxNorm, BPOM CekBPOM API | Drug information |

---

## 3. Project Structure

```
medik/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout (disclaimer header/footer)
│   │   ├── page.tsx                 # Homepage (search bar)
│   │   ├── search/
│   │   │   └── page.tsx             # Search results (SSR)
│   │   └── drug/
│   │       └── [id]/
│   │           └── page.tsx         # Drug detail page (SSR)
│   │
│   ├── components/                   # React components
│   │   ├── SearchBar.tsx            # Search input + suggestions
│   │   ├── DrugCard.tsx             # Result list item
│   │   ├── DrugDetail.tsx           # Full drug profile
│   │   ├── SourceBadge.tsx         # Source attribution badge
│   │   ├── Disclaimer.tsx          # Mandatory disclaimer
│   │   └── ui/                      # Shared UI primitives
│   │
│   ├── lib/                         # Server-side logic
│   │   ├── api/
│   │   │   ├── openfda.ts           # openFDA API client
│   │   │   ├── rxnorm.ts            # RxNorm API client
│   │   │   └── bpom.ts              # BPOM API client
│   │   ├── cache.ts                 # Next.js cache utilities
│   │   ├── normalize.ts            # Data normalization → unified Drug schema
│   │   ├── rank.ts                  # Search result ranking algorithm
│   │   └── types.ts                 # Shared TypeScript interfaces
│   │
│   └── i18n/                        # Internationalization
│       ├── id.json                  # Bahasa Indonesia translations
│       └── en.json                  # English translations
│
├── public/                          # Static assets
│   └── icons/                       # App icons, favicon
│
├── tests/                           # Test files
│   ├── unit/
│   └── e2e/
│
├── documentation/                   # Project docs
│   ├── medik-prd.md                # Product Requirements Document
│   ├── architecture.md             # This document
│   └── api-spec.md                 # API integration spec (future)
│
├── next.config.ts                  # Next.js configuration
├── tailwind.config.ts              # Tailwind configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json
```

---

## 4. Data Architecture

### 4.1 Unified Drug Schema

All third-party data is normalized to this schema:

```typescript
interface Drug {
  // Identity
  id: string;                    // Generated: SHA256(source + source_id)
  genericName: string;           // e.g., "Paracetamol"
  brandNames: string[];          // e.g., ["Panadol", "Bodrex", "Sanmol"]
  sourceIds: Record<Source, string>; // Original IDs from each source

  // Clinical Data
  indications: string[];         // Symptoms/conditions treated
  dosage: string;                // Formatted dosage information
  warnings: string[];            // Warnings and precautions
  contraindications: string[];   // When NOT to use
  interactions: string[];        // Drug-drug interactions

  // Metadata
  sources: Source[];             // ["openFDA", "BPOM"]
  sourceUrls: Record<Source, string>; // Links to original records
  lastUpdated: string;          // ISO date of most recent data
  language: 'id' | 'en';        // Primary language of this entry
}

type Source = 'openFDA' | 'RxNorm' | 'BPOM';
```

### 4.2 Normalization Pipeline

```
Raw API Responses (openFDA JSON, RxNorm JSON, BPOM JSON)
    │
    ▼
RxNorm Mapping
    │
    ├── Brand search ("Panadol") → Generic name ("Paracetamol") via RxNorm
    │       └── Then search openFDA by generic name
    │
    ├── Generic search ("Paracetamol") → Brand names via RxNorm
    │       └── Also fetch BPOM for Indonesian brands
    │
    └── Symptom search ("sakit kepala") → Indications field in openFDA
            └── Search: indications:"headache" OR indications:"sakit kepala"
    │
    ▼
Schema Mapping
    │
    ├── openFDA fields → Drug.indications, .dosage, .warnings, .interactions
    ├── RxNorm fields → Drug.genericName, .brandNames (US)
    └── BPOM fields → Drug.brandNames (Indonesian), .sourceIds.BPOM
    │
    ▼
Merge & Dedupe
    │
    ├── Combine brand names across sources (dedupe)
    ├── Merge indications (union of all sources)
    └── Generate unified Drug.id
    │
    ▼
Unified Drug[]
```

---

## 5. API Integration

### 5.1 openFDA API

**Purpose**: Clinical data (dosage, warnings, indications, interactions)  
**Base URL**: `https://api.fda.gov/drug/label.json`  
**Auth**: None (free, rate-limited)  
**Rate Limit**: ~1,000 requests/day, 240/hour

**Search Strategies:**

```typescript
// By indication (symptom search)
GET /drug/label.json?search=indications_and_usage:"headache"+OR+indications_and_usage:"sakit+kepala"&limit=10

// By generic name (brand or generic search)
GET /drug/label.json?search=openfda.generic_name:"acetaminophen"&limit=10

// By brand name
GET /drug/label.json?search=openfda.brand_name:"panadol"&limit=10
```

**Field Mapping:**

| openFDA Field | Drug Field |
|--------------|------------|
| `indications_and_usage` | `indications` |
| `dosage_and_administration` | `dosage` |
| `warnings` | `warnings` |
| `contraindications` | `contraindications` |
| `drug_interactions` | `interactions` |
| `openfda.generic_name` | `genericName` |
| `openfda.brand_name` | `brandNames` |
| `openfda.product_ndc` | `sourceIds.openFDA` |

### 5.2 RxNorm API

**Purpose**: Normalize brand↔generic names across US and Indonesian brands  
**Base URL**: `https://rxnav.nlm.nih.gov/REST/`  
**Auth**: None (free, NIH)  
**Rate Limit**: No published limits

**Key Endpoints:**

```typescript
// Brand → Generic (primary mapping)
GET /drugs.json?name=Panadol
  → Extract: rxnormProperties.genericName

// Generic → Brands
GET /drugs.json?name=acetaminophen
  → Extract: all rxnormProperties.brandName values

// Spelling suggestions (for empty results)
GET /spellingsuggestions.json?name=panadol
```

**Role in Architecture**:
1. User searches "Panadol" → RxNorm returns generic "Acetaminophen"
2. Then openFDA searched by generic name
3. BPOM also searched for Indonesian brand equivalents
4. Results merged under unified schema

### 5.3 BPOM CekBPOM API

**Purpose**: Indonesian drug registration data, local brand coverage  
**Status**: Investigation needed — either official API or manual dataset

**Potential Approaches (TBD):**

| Approach | Pros | Cons |
|----------|------|------|
| **Official CekBPOM API** | Official source, real-time | May not exist or require official access |
| **data.go.id BPOM Dataset** | Free, downloadable CSV | Manual download, no API, may be stale |
| **Web Scraping** | Can get current data | Brittle, may violate ToS |
| **Community Curation** | Flexible | High maintenance burden |

**Minimum Requirement (MVP)**: Manual dataset of top 500 Indonesian drugs with NIE (Nomor Izin Edar) registration data. Can be expanded to API later.

### 5.4 API Failure Handling

All API calls wrapped in try/catch with graceful degradation:

```typescript
async function searchDrugs(query: string): Promise<Drug[]> {
  const results = await Promise.allSettled([
    openFDASearch(query),
    rxnormSearch(query),
    bpomSearch(query),
  ]);

  return results
    .filter(r => r.status === 'fulfilled')
    .flatMap(r => r.value)
    .filter(Boolean);
}
```

If one API fails → show results from available sources with a banner: "Some data sources are temporarily unavailable."

---

## 6. Caching Strategy

### 6.1 Two-Tier Caching

**Tier 1: Next.js Server Cache (Application Layer)**

```typescript
// Using Next.js unstable_cache
import { unstable_cache } from 'next/cache';

const getOpenFDAData = unstable_cache(
  async (query: string) => fetchOpenFDA(query),
  ['openfda-search'],
  { revalidate: 86400, tags: ['openfda'] } // 24 hours
);
```

**Tier 2: Cloudflare Edge Cache (CDN Layer)**

```
Cloudflare Pages Configuration:
├── Cache-Control: public, max-age=86400, stale-while-revalidate=3600
├── Edge Cache TTL: 24 hours
└── SWR TTL: 1 hour (serve stale while revalidating)
```

### 6.2 Cache Invalidation

| Trigger | Action |
|---------|--------|
| **24h TTL expiry** | Automatic revalidation |
| **API error detected** | Invalidate cache for that query |
| **Manual refresh** | Protected admin endpoint: `/api/cache/invalidate?tag=openfda` |
| **New BPOM dataset** | Full cache flush (rare event) |

---

## 7. Hosting & Deployment

### 7.1 Cloudflare Pages Setup

```
Build Configuration:
├── Framework preset: Next.js
├── Build command: npm run build
├── Build output directory: .next
└── Environment variables:
    ├── OPENFDA_API_KEY (optional, increases rate limit)
    ├── RXNAV_API_BASE (optional, custom endpoint)
    └── NEXT_PUBLIC_APP_URL (for metadata/SEO)
```

**Free Tier Limits:**
- Unlimited requests
- 500 builds/month
- 100 deployments
- 20 concurrent builds
- Global CDN (300+ locations)
- 25ms cold start (Workers)

### 7.2 CI/CD Pipeline

```
GitHub Actions (or Cloudflare auto-deploy):
1. Push to main → Cloudflare auto-deploys production
2. PR opened → Cloudflare creates preview deployment
3. PR merged → main auto-deploys
4. PR closed → preview deployment auto-deleted
```

---

## 8. Security

### 8.1 API Key Protection

- All third-party API keys stored as Cloudflare Pages Environment Variables (encrypted at rest)
- Keys only accessible in Cloudflare Workers / server-side code
- Client never receives raw API responses — only normalized data

### 8.2 Input Validation

```typescript
// Sanitize search queries
function sanitizeQuery(query: string): string {
  return query
    .trim()
    .slice(0, 200) // Max length
    .replace(/[<>\"\'`]/g, '') // Strip potentially dangerous chars
    .toLowerCase();
}

// URL parameter validation
const searchParams = new URL(request.url).searchParams;
const query = searchParams.get('q');
if (!query || query.length < 2) {
  return Response.json({ error: 'Query too short' }, { status: 400 });
}
```

### 8.3 Content Security

- **No user-generated content** (no comments, reviews, profiles) → minimal XSS surface
- **CSP headers**: Strict default policy
- **Rate limiting**: Cloudflare automatic DDoS protection + manual rate rules on API routes

---

## 9. Performance Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| **TTFB** | < 200ms | Cloudflare Edge Cache (cache hits) |
| **LCP** | < 2.5s | Static pages, optimized images, font preloading |
| **Search Latency (P95)** | < 3s | Server cache + parallel API fetches |
| **Cache Hit Rate** | > 70% | 24h TTL + SWR |
| **Error Rate** | < 2% | Graceful degradation, circuit breakers |
| **Build Time** | < 5 min | Incremental builds, parallel test execution |

---

## 10. Environment Configuration

```bash
# .env.local (development)
OPENFDA_API_KEY=           # Optional, for higher rate limits

# Cloudflare Pages (production) — set in dashboard
OPENFDA_API_KEY=           # Required for production (optional for MVP)
NEXT_PUBLIC_APP_URL=https://medik.pages.dev
```

---

## 11. Open Questions & Decisions Needed

| # | Question | Status | Priority |
|---|----------|--------|----------|
| 1 | BPOM API confirmed accessible? | Pending investigation | High |
| 2 | Tailwind CSS or vanilla CSS? | Decision needed | Medium |
| 3 | Internationalization library (next-intl, react-i18next)? | Decision needed | Medium |
| 4 | Auth for admin cache invalidation endpoint? | Decision needed | Low |
| 5 | Analytics tool (Plausible, Umami, none)? | Decision needed | Low |

---

## 12. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | May 8, 2026 | Engineering Team | Initial architecture draft |

---

*For implementation questions, open an issue on GitHub.*
