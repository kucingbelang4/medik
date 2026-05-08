# Medik — Product Requirements Document (PRD)

**Version:** 1.0  
**Date:** May 8, 2026  
**Status:** Draft  
**Owner:** Product Team  
**Repository:** kucingbelang4/medik

---

## 1. Problem Statement

### 1.1 Background

In Indonesia, consumers frequently self-medicate without reliable access to verified drug information. While international databases like openFDA exist, they lack coverage of locally-registered brands (e.g., Panadol, Bodrex, OBH Combi). Conversely, Indonesian regulatory databases (BPOM) provide registration data but not clinical information such as dosage, warnings, or drug interactions.

This information gap leads to:

- **Incorrect dosing**: Users unable to identify generic equivalents across brands
- **Drug interaction risks**: No unified view of contraindications before combining medications
- **Brand confusion**: Search fails when users know only local brand names
- **Reduced healthcare professional efficiency**: Patients arrive uninformed, extending consultation times

### 1.2 Opportunity

Indonesian internet users are predominantly mobile-first with high smartphone penetration. A brand-aware, bilingual (Bahasa Indonesia / English) drug search tool that bridges local registration data with international clinical databases addresses a clear market gap.

### 1.3 Success Definition

Medik will provide accurate, source-attributed drug information through a search-first interface that handles both symptom-based and brand-name queries, delivering unified results regardless of the original data source.

---

## 1.4 Technology Stack (Confirmed)

Based on stakeholder discussions, the following technology stack has been selected for the MVP:

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Framework** | Next.js (React) with Server-Side Rendering (SSR) and TypeScript | Enables server-side API processing, type safety, and SEO-friendly rendering |
| **Backend** | Next.js Server (API routes / getServerSideProps) | No separate backend needed; server-side logic handles third-party API requests and caching |
| **Caching** | Redis (Upstash) + Cloudflare Edge Cache | Two-tier caching: Redis for data persistence (24h TTL), Cloudflare for edge delivery |
| **Hosting** | Cloudflare Pages (Free Tier) | Global CDN, generous free tier, seamless Next.js integration |
| **Language** | TypeScript (frontend and server-side) | Catch errors early, improve developer experience and code maintainability |
| **Data Flow** | Client → Next.js SSR → Third-party APIs (openFDA, RxNorm, BPOM) → Normalize & Redis Cache → Return | Centralizes API logic, secures credentials, enables unified data model |

This stack leverages Next.js SSR as the primary backend for API orchestration, eliminating the need for a separate server while providing security, caching, and performance benefits.

---

## 1.5 Design System — Clinical Minimalism

Medik employs the **Clinical Minimalism** design system defined in `STITCH/clinical_minimalism/DESIGN.md`, prioritizing clarity, efficiency, and emotional calm for both patients and healthcare providers. Key characteristics:

- **Less Lines**: Replaces borders with ambient shadows; uses whitespace over visual dividers
- **Clinical Clarity**: Medical-grade legibility (Inter font); WCAG AA/AAA compliance  
- **Emotional Calm**: Soft geometry, muted tones, breathable layouts
- **Professional Trust**: Authority without being cold or institutional

**Core Elements:**
- **Color Palette**: Medik Blue (#004ac6) primary, Care Teal (#006a61) secondary, Hospital White (#faf8ff) surface, Clinical Slate (#191b23) text
- **Typography**: Inter font family with hierarchical scaling (H1: 40px/700, Body: 16px/400)
- **Spacing**: 4px baseline grid; generous margins to focus user attention
- **Components**: Borderless cards with Level 1 shadow; Compound component pattern for reusability
- **Accessibility**: Mandatory focus rings, WCAG contrast compliance, touch targets ≥44x44px

This design system ensures Medik feels trustworthy, approachable, and clinically accurate while minimizing cognitive load during health information consumption.

---

## 2. User Personas

### 2.1 Persona A: "The Cautious Self-Medicator"

**Name:** Sari, 32  
**Occupation:** Office administrator  
**Location:** Jakarta  
**Tech Savviness:** Moderate — uses WhatsApp, Instagram, Gojek daily

**Goals:**
- Quickly verify if a drug she heard about is appropriate for her symptoms
- Confirm dosage before taking medication
- Check if new medication conflicts with her current prescriptions

**Pain Points:**
- Googling returns pharmaceutical marketing content, not neutral information
- Doesn't know "Panadol" is paracetamol
- Cannot assess drug interactions without visiting a pharmacy

**Behavior:**
- Searches primarily on mobile during lunch breaks or before sleep
- Values speed and clarity over depth
- Will abandon if results are confusing or require multiple taps

**Medik Use Case:** Search "sakit kepala" → see Panadol, Paracetamol, Aspirin options with dosages and warnings in Bahasa Indonesia.

---

### 2.2 Persona B: "The Informed Patient"

**Name:** Budi, 45  
**Occupation:** Middle management  
**Location:** Surabaya  
**Tech Savviness:** High — uses smartphone for banking, email, research

**Goals:**
- Research medications prescribed by their doctor before taking them
- Understand side effects and long-term implications
- Compare treatment options

**Pain Points:**
- openFDA data is US-centric and uses unfamiliar brand names
- BPOM registration data lacks clinical context
- No tool combines local and international sources

**Behavior:**
- Conducts research in the evening on tablet or desktop
- Reads carefully and cross-references multiple sources
- Will share useful tools with family members

**Medik Use Case:** Search "Metformin" → see generic name, all Indonesian brand equivalents, clinical indications, and openFDA-sourced warnings.

---

### 2.3 Persona C: "The Healthcare Helper"

**Name:** Dr. Wati, 38  
**Occupation:** General practitioner at primary care clinic  
**Location:** Bandung  
**Tech Savviness:** Moderate — uses EMR systems, WhatsApp

**Goals:**
- Quickly show patients the generic name when they mention only a brand
- Provide printed or shared information to patients about their medications
- Verify patient-provided medication history

**Pain Points:**
- Patients arrive knowing only brand names, not active ingredients
- No quick reference tool during consultations
- Cannot hand out reliable printed materials in Bahasa Indonesia

**Behavior:**
- Uses tool during consultations, often with patient present
- Needs results on mobile or tablet
- Values source attribution for professional credibility

**Medik Use Case:** Patient says "saya minum obat maag yang merah" → search shows generic names and clinical data to confirm, then share summary.

---

## 3. Functional Requirements

### 3.1 Search Functionality

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-001 | **Symptom Search**: Users can search by symptom or illness (e.g., "headache," "sakit kepala," "maag") and receive ranked drug results | Must Have |
| FR-002 | **Brand Name Search**: Users can search by brand name (e.g., "Panadol," "Aspirin," "Bodrex") and receive drug information | Must Have |
| FR-003 | **Generic Name Search**: Users can search by generic/active ingredient (e.g., "Paracetamol," "Ibuprofen") | Must Have |
| FR-004 | **Brand-to-Generic Mapping**: Searching an Indonesian brand returns unified results including generic name, all equivalent brands, and clinical data from international sources | Must Have |
| FR-005 | **Search Suggestions**: Autocomplete suggestions as user types, covering symptoms, brand names, and generic names | Should Have |
| FR-006 | **Search History**: Store recent searches in localStorage for quick re-access (user-initiated, privacy-preserving) | Could Have |

### 3.2 Results Display

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-007 | **Unified Results List**: Search results display combined data from all available sources in a single, normalized format | Must Have |
| FR-008 | **Source Attribution**: Each result clearly indicates the source(s) providing the information (e.g., "openFDA," "BPOM," "RxNorm") | Must Have |
| FR-009 | **Relevance Ranking**: Results ranked by relevance score combining indication match, name match, and source credibility | Must Have |
| FR-010 | **Result Preview**: In list view, show key info: generic name, top 3 brand names, primary indication, and top warning | Must Have |
| FR-011 | **Empty State Handling**: When no results found, provide helpful suggestions (spelling variants, alternative terms) | Should Have |

### 3.3 Drug Detail View

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-012 | **Complete Drug Profile**: Detail page shows all available fields: generic name, brand names, indications, dosage, warnings, interactions, source, last updated | Must Have |
| FR-013 | **Source Toggle**: Allow users to view data grouped by source (BPOM-only, openFDA-only, or combined) | Should Have |
| FR-014 | **Share Functionality**: Generate shareable link or text summary with mandatory disclaimer | Could Have |

### 3.4 Disclaimer & Compliance

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-015 | **Mandatory Disclaimer**: Every page (search, results, detail) displays disclaimer: "This is not medical advice. Always consult a healthcare professional." | Must Have |
| FR-016 | **Disclaimer Prominence**: Disclaimer is visually distinct, cannot be dismissed, and appears in Bahasa Indonesia and English | Must Have |
| FR-017 | **No Diagnosis**: App never suggests diagnoses or treatments; it only provides information about medications | Must Have |

### 3.5 Localization

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-018 | **Bahasa Indonesia Primary**: Default language is Bahasa Indonesia | Must Have |
| FR-019 | **English Toggle**: Users can switch to English | Should Have |
| FR-020 | **Local Brand Coverage**: Database includes major Indonesian drug brands not found in international databases | Must Have |

---

## 4. Non-Functional Requirements

### 4.1 Performance

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-001 | **Search Response Time** | < 2 seconds for results to appear (excluding network latency) |
| NFR-002 | **Page Load Time** | < 3 seconds for initial page load |
| NFR-003 | **API Rate Limit Handling** | Graceful degradation when external APIs are unavailable (show cached data or partial results) |
| NFR-004 | **Caching Strategy** | Redis cache (Upstash) with 24h TTL for search results and drug details; Cloudflare Edge Cache serves rendered pages globally; cache invalidation via Redis DEL on API errors or manual refresh |
| NFR-005 | **Offline Fallback** | Core search functionality works on cached data when network unavailable |

### 4.2 Security

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-006 | **No Personal Data Storage** | App does not store user identities, search history, or health information on servers |
| NFR-007 | **HTTPS Only** | All traffic encrypted via HTTPS |
| NFR-008 | **Input Sanitization** | All user inputs sanitized to prevent injection attacks |
| NFR-009 | **External API Security** | API keys stored server-side (if required); never exposed in client code |
| NFR-010 | **Third-Party Scripts** | No third-party analytics or tracking scripts without user consent |

### 4.3 Reliability

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-011 | **API Failure Handling** | System continues to function with partial data when one or more APIs are unavailable |
| NFR-012 | **Data Freshness** | Users can see when data was last updated; stale data (>30 days) triggers visual indicator |
| NFR-013 | **Uptime** | 99% uptime target for API proxy layer |

### 4.4 Accessibility

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-014 | **WCAG 2.1 AA Compliance** | Interface accessible to users with visual impairments |
| NFR-015 | **Mobile-First Design** | Optimized for mobile screens (320px minimum width) |
| NFR-016 | **Touch-Friendly Targets** | All interactive elements minimum 44x44px |

### 4.5 Scalability

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-017 | **Initial Load** | Support 10,000 monthly active users in Phase 1 |
| NFR-018 | **Horizontal Scaling** | Architecture supports scaling without major redesign |

---

## 5. Success Metrics

### 5.1 Primary Metrics (North Star)

| Metric | Definition | Target (Month 3) |
|--------|------------|------------------|
| **Monthly Active Users (MAU)** | Unique users who perform at least one search per month | 2,500 |
| **Search-to-Detail Rate** | Percentage of searches that result in viewing a drug detail | > 40% |
| **Return User Rate** | Percentage of users who return within 30 days | > 25% |

### 5.2 Engagement Metrics

| Metric | Definition | Target (Month 3) |
|--------|------------|------------------|
| **Searches per Session** | Average number of searches in a single user session | > 2.0 |
| **Time on Detail Page** | Average time spent on drug detail pages | > 45 seconds |
| **Share Rate** | Number of shares / total sessions | > 5% |

### 5.3 Technical Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| **Search Latency (P95)** | 95th percentile search response time | < 3 seconds |
| **Error Rate** | Percentage of searches returning errors | < 2% |
| **Cache Hit Rate** | Percentage of searches served from cache | > 70% |

### 5.4 Trust & Quality Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| **Source Attribution Click-Through** | Rate at which users click through to original source | > 10% |
| **Disclaimer Recall** | User survey: percentage who recall seeing disclaimer | > 80% |
| **Data Completeness** | Percentage of results with data from 2+ sources | > 50% |

### 5.5 Business Metrics (Phase 2+)

| Metric | Definition | Target |
|--------|------------|--------|
| **User-Reported Accuracy** | Survey: percentage rating information as "accurate" or "very accurate" | > 85% |
| **NPS (Net Promoter Score)** | "How likely are you to recommend Medik to a friend?" | > 40 |

---

## 6. Out of Scope (MVP)

The following are explicitly excluded from Phase 1:

- User accounts and authentication
- Drug interaction checker (comparing multiple drugs simultaneously)
- Prescription management or reminders
- Drug price comparison
- Pharmacy locator
- Social features (reviews, ratings, comments)
- Advertising or monetization
- API access for third-party developers

---

## 7. Assumptions & Dependencies

| Item | Assumption/Dependency |
|------|----------------------|
| **openFDA API** | Remains free and accessible at current rate limits |
| **BPOM Data** | Official CekBPOM API is accessible, or manual dataset can be obtained |
| **RxNorm** | NIH continues providing free API access |
| **Indonesian Drug Brands** | Sufficient coverage of major brands (minimum 500 brands) |
| **No Healthcare License Required** | App qualifies as "health information" rather than "medical advice" |

---

## 8. Appendix

### A. Glossary

| Term | Definition |
|------|------------|
| **Generic Name** | The active pharmaceutical ingredient (e.g., Paracetamol) |
| **Brand Name** | Marketing name for a specific manufacturer's product (e.g., Panadol) |
| **Indication** | The symptom or condition a drug is used to treat |
| **Contraindication** | A condition that makes a particular treatment inadvisable |
| **Drug Interaction** | Effect when one drug affects the activity of another drug |

### B. Related Documents

- [Technical Architecture Document](./architecture.md)
- [API Integration Specification](./api-spec.md)
- [Design System](./design-system.md)
- [User Research Findings](./research-findings.md)

### C. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | May 8, 2026 | Product Team | Initial draft |

---

*This document is for internal planning purposes. Questions? Open an issue on GitHub.*
