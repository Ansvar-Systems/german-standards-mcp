# Coverage -- German Standards MCP

> Last verified: 2026-03-12 | Database version: 0.1.0

This document declares exactly what data the German Standards MCP contains, what it does not contain, and the limitations of each source. It is the contract with users.

---

## What's Included

| Source | Authority | Items | Version / Date | Completeness | Refresh |
|--------|-----------|-------|----------------|-------------|---------|
| BSI IT-Grundschutz Kompendium | BSI | 58 controls | Edition 2023 (2023-02-01) | Partial | Annual |
| BSI C5 Cloud Computing Compliance Criteria Catalogue | BSI | 46 controls | C5:2020 | Partial | Annual |
| BSI Technische Richtlinien | BSI | 13 controls | Various (2023) | Partial | Annual |
| KRITIS Requirements (IT-SiG 2.0) | BSI | 15 controls | IT-SiG 2.0 (2021-05-28) | Full | Annual |
| IT-Grundschutz Profil Bundesbehoerden | BSI | 15 controls | 2023 | Partial | Annual |
| BfDI Technisch-Organisatorische Massnahmen | BfDI | 20 controls | 2023 | Full | Annual |

**Total:** 11 tools, 167 controls, database built from 6 authoritative German sources.

### BSI IT-Grundschutz Coverage Note

The full IT-Grundschutz Kompendium contains approximately 1,500 requirements across all Bausteine. This database includes 58 key requirements from the most important process and system layer Bausteine (ISMS, ORP, CON, OPS, DER, APP, SYS, NET). Full normative text is copyright BSI. Reference data (control identifiers, titles, requirement descriptions) is extracted from publicly available BSI publications.

### BSI C5 Coverage Note

The full C5:2020 catalogue contains 121 controls. This database includes 46 key controls covering all 17 domains. The full catalogue text is copyright BSI.

---

## What's NOT Included

| Gap | Reason | Planned? |
|-----|--------|----------|
| Full BSI IT-Grundschutz Kompendium (~1,500 requirements) | Partial extract -- key Bausteine included | Yes -- v0.2 expansion |
| Full BSI C5 catalogue (~121 controls) | Partial extract -- key controls from all 17 domains | Yes -- v0.2 expansion |
| NIS2UmsuCG (NIS2 Umsetzungs- und Cybersicherheitsstaerkungsgesetz) | German NIS2 transposition -- not yet fully in force | Yes -- planned once law enters force |
| BSIG full text (BSI-Gesetz) | Covered indirectly via KRITIS requirements | No |
| IT-Grundschutz Kompendium full normative text | Copyright BSI -- reference data extracted | No |
| ISO/IEC 27001:2022 full text | Commercial ISO standard -- reference mappings included via `iso_mapping` field, full text excluded | No |
| BSI TR-03161 (Mobile Application Security) | Not yet ingested | Yes -- v0.2 |
| TISAX (automotive) | VDA/ENX framework -- separate procurement | No |
| BSI SiSyPHuS Win10 | Specific Windows 10 security analysis -- methodology, not a control catalog | No |
| Landesdatenschutz state DPA guidance | 16 state DPAs, not consolidated | No |
| BaFin BAIT/VAIT/KAIT/ZAIT | Financial sector IT requirements -- planned for separate MCP | No |

---

## Limitations

- **BSI Grundschutz is a partial extract.** The database includes 58 of approximately 1,500 requirements. It covers the most frequently referenced Bausteine but is not a complete implementation of the Kompendium. Use `list_controls({ framework_id: "bsi-grundschutz" })` to see exactly what is available.
- **ISO mapping is partial.** Not all controls have `iso_mapping` populated. BSI Grundschutz has the most complete ISO 27001:2022 mapping; other frameworks have varying coverage. `get_iso_mapping` only returns controls with an explicit mapping.
- **Snapshot data, not live.** The database is a point-in-time extract. Standards may be updated between database rebuilds. The `check_data_freshness` tool reports the last-fetched date for each source.
- **German as primary language.** All controls have German titles and descriptions (`title_nl`, `description_nl` columns). English translations are provided where available but may not be present for all controls.
- **No case law or enforcement decisions.** The database contains normative controls only, not BfDI decisions, BSI warnings, or court rulings.
- **Sector metadata may be incomplete.** Frameworks are tagged with `scope_sectors` values during ingestion. If a framework's sector coverage is broader than what's tagged, `search_by_sector` may not surface it.
- **Not a legal opinion.** Compliance with these standards is not verified by this tool. The tool provides structured access to control text -- whether a specific system or process meets a control is a judgment that requires qualified assessment.

---

## Data Freshness Schedule

| Source | Refresh Schedule | Last Refresh | Next Expected |
|--------|-----------------|-------------|---------------|
| BSI IT-Grundschutz | Annual | 2026-03-12 | 2027-02-01 |
| BSI C5 | Annual | 2026-03-12 | 2027-01-01 |
| BSI Technische Richtlinien | Annual | 2026-03-12 | 2027-01-01 |
| KRITIS (IT-SiG 2.0) | Annual | 2026-03-12 | 2027-01-01 |
| Grundschutz Bund | Annual | 2026-03-12 | 2027-01-01 |
| BfDI TOM | Annual | 2026-03-12 | 2027-01-01 |

To check current freshness status programmatically, call the `check_data_freshness` tool.

The ingestion pipeline (`ingest.yml`) runs on the annual refresh schedule. The `check-updates.yml` workflow runs daily and creates a GitHub issue if any source is overdue.

---

## Regulatory Mapping

This table maps German regulations and laws to the frameworks in this MCP that implement or operationalize them.

| Regulation / Law | Relevant Frameworks | Notes |
|-----------------|---------------------|-------|
| IT-Sicherheitsgesetz 2.0 (IT-SiG 2.0) | bsi-kritis | Mandatory for KRITIS operators -- reporting obligations, SzA, ISMS |
| DSGVO / GDPR Art. 32 | bfdi-tom | Technical and organizational measures for personal data protection |
| BSI-Gesetz (BSIG) | bsi-grundschutz, bsi-kritis | BSI authority and KRITIS operator obligations |
| IT-Grundschutz (UP Bund) | bsi-grundschutz, grundschutz-bund | Mandatory for federal agencies (Bundesbehoerden) |
| Cloud usage in government | bsi-c5 | C5 attestation required for government cloud procurement |
| Technische Richtlinien | bsi-tr | BSI TR requirements for crypto, TLS, electronic identity |
| NIS2UmsuCG (future) | bsi-kritis (extends) | Will expand KRITIS categories and obligations |

---

## Sector-Specific Coverage

### Government (Bundesbehoerden)

- **Included:** bsi-grundschutz (full ISMS + technical), grundschutz-bund (federal profile), bsi-tr (crypto/identity)
- **Gap:** Full Kompendium -- only key Bausteine included
- **Gap:** State-level (Laender) IT security requirements not included

### Critical Infrastructure (KRITIS -- Energy, Water, Healthcare, Transport, Telecom, Finance)

- **Included:** bsi-kritis (15 core requirements including SzA, Meldepflicht)
- **Gap:** Sector-specific branchenspezifische Sicherheitsstandards (B3S) not included
- **Gap:** KRITIS-DachG (physical security) not included

### Cloud Service Providers

- **Included:** bsi-c5 (46 controls across all 17 domains)
- **Gap:** Full C5 catalogue (~121 controls) -- key controls included, not exhaustive

### Data Protection

- **Included:** bfdi-tom (20 TOM measures covering all eight traditional categories)
- **Gap:** State DPA (Landesdatenschutz) specific guidance not included
- **Gap:** BfDI enforcement decisions and guidance letters not included
