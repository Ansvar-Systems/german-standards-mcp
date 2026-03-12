# Coverage -- German Standards MCP

> Last verified: 2026-03-12 | Database version: 0.2.0

This document declares exactly what data the German Standards MCP contains, what it does not contain, and the limitations of each source. It is the contract with users.

---

## What's Included

| Source | Authority | Items | Version / Date | Completeness | Refresh |
|--------|-----------|-------|----------------|-------------|---------|
| BSI IT-Grundschutz Kompendium | BSI | 58 controls | Edition 2023 (2023-02-01) | Partial (core Bausteine) | Annual |
| BSI IT-Grundschutz Kompendium (Extended) | BSI | 228 controls | Edition 2023 | Partial (all 10 Baustein layers) | Annual |
| BSI IT-Grundschutz Profil Bundesbehoerden | BSI | 15 controls | 2023 | Partial | Annual |
| BSI IT-Grundschutz Profile (Kommunen, Gesundheit, Wasser) | BSI | 16 controls | 2024 | Partial | Annual |
| BSI C5 Cloud Computing Compliance Criteria Catalogue | BSI | 46 controls | C5:2020 | Partial (all 17 domains) | Annual |
| BSI C5 Extended | BSI | 23 controls | C5:2020 (Extended) | Extended coverage of all 17 domains | Annual |
| BSI Technische Richtlinien | BSI | 13 controls | Various (2023) | Partial | Annual |
| BSI Technische Richtlinien (Extended) | BSI | 13 controls | 2024 | IPsec, SSH, eCard, Mobile, SBOM | Annual |
| BSI Technische Richtlinien (Extended 2) | BSI | 23 controls | 2024 | Smart Metering, eID, FIDO2, PQC, IoT | Annual |
| BSI Mindeststandards | BSI | 15 controls | 2024 | TLS, Browser, Webserver, MDM, Email, Logging | Annual |
| BSI Mindeststandards (Extended) | BSI | 25 controls | 2024 | DNS, Cloud, VK, EDR, IAM, Patch, Backup | Annual |
| KRITIS Requirements (IT-SiG 2.0) | BSI | 15 controls | IT-SiG 2.0 (2021-05-28) | Core requirements | Annual |
| KRITIS Extended (SzA, UBI) | BSI | 12 controls | IT-SiG 2.0 (2023) | SzA, reporting, registration | Annual |
| BSI B3S (Branchenspezifische Sicherheitsstandards) | Branchenverbaende/BSI | 19 controls | 2024 | Six KRITIS sectors | Annual |
| BSI ICS-Security-Kompendium | BSI | 10 controls | 2024 | Core OT security | Annual |
| BSI ICS-Security Extended | BSI | 21 controls | 2024 | IEC 62443, Industrie 4.0, Safety | Annual |
| BfDI Technisch-Organisatorische Massnahmen | BfDI | 20 controls | 2023 | Full (all 8 TOM categories) | Annual |
| Datenschutz Extended (BDSG, TOM, DSK, VDA ISA) | BfDI/DSK/VDA | 25 controls | 2024 | BDSG, TOM details, DSK, VDA ISA DP | Annual |
| DSK Standard-Datenschutzmodell (SDM) | DSK | 10 controls | SDM 3.0 | Core guarantee objectives | Annual |
| NIS2UmsuCG | BMI | 17 controls | 2024 | Entity classification, risk mgmt, reporting | Annual |
| NIS2UmsuCG Extended | BMI | 14 controls | 2024 | Art. 21 measures, tiered reporting, governance | Annual |
| TTDSG | BMJ | 12 controls | 2021 | Cookie consent, PIMS, Fernmeldegeheimnis | Annual |
| BaFin IT-Anforderungen (BAIT/VAIT/KAIT/ZAIT) | BaFin | 17 controls | 2022 | Core BAIT domains | Annual |
| BaFin Extended (BAIT/VAIT/KAIT/ZAIT/MaRisk) | BaFin | 14 controls | 2024 | Extended BAIT, VAIT, KAIT, ZAIT, MaRisk | Annual |
| DORA (Digital Operational Resilience Act) | EU/BaFin | 17 controls | 2025 | Six DORA pillars | Annual |
| DORA Extended (RTS, TLPT) | EU/BaFin | 18 controls | 2025 | TLPT, concentration risk, advanced reporting | Annual |
| Healthcare IT Security (gematik/KBV/DKG) | gematik/KBV/DKG | 12 controls | 2024 | TI, KBV, DKG | Annual |
| Healthcare IT Extended (TI, KBV, DKG, DiGA) | gematik/KBV/DKG/BfArM | 14 controls | 2024 | ePA, E-Rezept, Konnektoren, DiGA | Annual |
| VDA ISA (TISAX) | VDA | 17 controls | ISA 6.0 (2024) | Core TISAX domains | Annual |
| VDA ISA Extended (UNECE R155/R156, ISO/SAE 21434) | VDA | 30 controls | ISA 6.0 Extended (2024) | Connected vehicle, ADAS, supply chain, PSIRT | Annual |
| OZG Sicherheitsanforderungen | BMI/FITKO | 11 controls | OZG 2.0 (2024) | Identity, encryption, pentesting, registers | Annual |

**Total:** 11 tools, 800 controls, database built from 33 authoritative German sources.

### BSI IT-Grundschutz Coverage Note

The full IT-Grundschutz Kompendium contains approximately 1,500 requirements across all Bausteine. This database includes 319 requirements covering all 10 Baustein layers (ISMS, ORP, CON, OPS, DER, APP, SYS, NET, INF, IND) at Basis, Standard, and Erhoehter Schutzbedarf levels. Full normative text is copyright BSI. Reference data (control identifiers, titles, requirement descriptions) is extracted from publicly available BSI publications.

### BSI C5 Coverage Note

The full C5:2020 catalogue contains 121 controls. This database includes 69 controls covering all 17 domains with extended detail. The full catalogue text is copyright BSI.

---

## What's NOT Included

| Gap | Reason | Planned? |
|-----|--------|----------|
| Full BSI IT-Grundschutz Kompendium (~1,500 requirements) | Partial extract -- 319 of ~1,500, covering all layers | Incremental expansion |
| Full BSI C5 catalogue (~121 controls) | 69 of 121 included across all domains | Incremental expansion |
| KRITIS-DachG (physical security) | Physical critical infrastructure protection -- separate scope | No |
| ISO/IEC 27001:2022 full text | Commercial ISO standard -- reference mappings included via `iso_mapping` field, full text excluded | No |
| BSI SiSyPHuS Win10 | Specific Windows 10 security analysis -- methodology, not a control catalog | No |
| Landesdatenschutz state DPA guidance | 16 state DPAs, not consolidated | No |

---

## Limitations

- **BSI Grundschutz is a substantial extract.** The database includes 319 of approximately 1,500 requirements across all 10 Baustein layers at Basis, Standard, and Erhoehter Schutzbedarf levels. Use `list_controls({ framework_id: "bsi-grundschutz" })` and the extended framework IDs to see exactly what is available.
- **ISO mapping is partial.** Not all controls have `iso_mapping` populated. BSI Grundschutz has the most complete ISO 27001:2022 Annex A mapping; other frameworks have varying coverage. `get_iso_mapping` only returns controls with an explicit mapping.
- **Snapshot data, not live.** The database is a point-in-time extract. Standards may be updated between database rebuilds. The `check_data_freshness` tool reports the last-fetched date for each source.
- **German as primary language.** All controls have German titles and descriptions (`title_nl`, `description_nl` columns). English translations are provided for all controls.
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
| Grundschutz Bund/Profile | Annual | 2026-03-12 | 2027-01-01 |
| BfDI TOM / Datenschutz | Annual | 2026-03-12 | 2027-01-01 |
| BSI Mindeststandards | Annual | 2026-03-12 | 2027-01-01 |
| NIS2UmsuCG | Annual | 2026-03-12 | 2027-01-01 |
| BaFin xAIT | Annual | 2026-03-12 | 2027-01-01 |
| DORA | Annual | 2026-03-12 | 2027-01-01 |
| gematik/KBV/DKG | Annual | 2026-03-12 | 2027-01-01 |
| VDA ISA (TISAX) | Annual | 2026-03-12 | 2027-01-01 |
| DSK SDM | Annual | 2026-03-12 | 2027-01-01 |
| BSI ICS/OT | Annual | 2026-03-12 | 2027-01-01 |
| BSI B3S | Annual | 2026-03-12 | 2027-01-01 |
| TTDSG | Annual | 2026-03-12 | 2027-01-01 |
| OZG | Annual | 2026-03-12 | 2027-01-01 |

To check current freshness status programmatically, call the `check_data_freshness` tool.

The ingestion pipeline (`ingest.yml`) runs on the annual refresh schedule. The `check-updates.yml` workflow runs daily and creates a GitHub issue if any source is overdue.

---

## Regulatory Mapping

This table maps German regulations and laws to the frameworks in this MCP that implement or operationalize them.

| Regulation / Law | Relevant Frameworks | Notes |
|-----------------|---------------------|-------|
| IT-Sicherheitsgesetz 2.0 (IT-SiG 2.0) | bsi-kritis, bsi-kritis-extended, bsi-b3s | Mandatory for KRITIS operators -- reporting obligations, SzA, ISMS |
| NIS2UmsuCG | nis2umsucg, nis2-extended | German NIS2 transposition -- entity classification, risk management, reporting, governance |
| DSGVO / GDPR Art. 32 | bfdi-tom, datenschutz-extended, dsk-sdm | Technical and organizational measures for personal data protection |
| BDSG (Bundesdatenschutzgesetz) | datenschutz-extended | German federal data protection act specifics |
| TTDSG | ttdsg | Cookie consent, PIMS, Fernmeldegeheimnis, traffic data |
| BSI-Gesetz (BSIG) | bsi-grundschutz, bsi-kritis | BSI authority and KRITIS operator obligations |
| IT-Grundschutz (UP Bund) | bsi-grundschutz (all), grundschutz-bund, grundschutz-profile | Mandatory for federal agencies |
| Cloud usage in government | bsi-c5, bsi-c5-extended | C5 attestation required for government cloud procurement |
| Technische Richtlinien | bsi-tr, bsi-tr-extended, bsi-tr-extended-2 | BSI TR requirements for crypto, TLS, eID, smart metering, PQC |
| BSI Mindeststandards | bsi-mindeststandards, bsi-mindeststandards-extended | Mandatory for federal agencies |
| DORA (EU 2022/2554) | dora, dora-extended | Digital operational resilience for financial entities |
| BaFin BAIT/VAIT/KAIT/ZAIT | bafin-xait, bafin-extended | IT requirements for banks, insurers, capital managers, payment providers |
| MaRisk | bafin-extended | Risk management requirements for financial institutions |
| SGB V section 75c | gematik, gematik-extended | Hospital IT security, KBV practice IT, DiGA, TI |
| UNECE R155/R156 | vda-isa-extended | Automotive cybersecurity and software update management |
| OZG 2.0 | ozg | Online government service security requirements |
| IEC 62443 | bsi-ics-extended | Industrial automation and control system security |

---

## Sector-Specific Coverage

### Government (Bundesbehoerden)

- **Included:** bsi-grundschutz (319 controls across all layers), grundschutz-bund (15), grundschutz-profile (16), bsi-mindeststandards (40), bsi-tr (49), ozg (11)
- **Gap:** Full Kompendium -- 319 of ~1,500 requirements
- **Gap:** State-level (Laender) IT security requirements not included

### Critical Infrastructure (KRITIS -- Energy, Water, Healthcare, Transport, Telecom, Finance)

- **Included:** bsi-kritis (15), bsi-kritis-extended (12), bsi-b3s (19), nis2umsucg (17), nis2-extended (14)
- **Gap:** KRITIS-DachG (physical security) not included

### Finance

- **Included:** bafin-xait (17), bafin-extended (14), dora (17), dora-extended (18)
- **Coverage:** BAIT, VAIT, KAIT, ZAIT, MaRisk, full DORA with RTS/TLPT

### Healthcare

- **Included:** gematik (12), gematik-extended (14), grundschutz-profile (healthcare subset)
- **Coverage:** TI, ePA, E-Rezept, Konnektoren, KBV practice IT, DKG hospital IT, DiGA

### Automotive

- **Included:** vda-isa (17), vda-isa-extended (30), datenschutz-extended (VDA ISA DP subset)
- **Coverage:** TISAX domains, connected vehicle (UNECE R155/R156), ADAS, supply chain, PSIRT, ISO/SAE 21434

### Cloud Service Providers

- **Included:** bsi-c5 (46), bsi-c5-extended (23)
- **Coverage:** 69 controls across all 17 C5 domains

### Industrial Control Systems / OT

- **Included:** bsi-ics (10), bsi-ics-extended (21)
- **Coverage:** IEC 62443, Industrie 4.0, Safety-Security convergence, SIS protection

### Data Protection

- **Included:** bfdi-tom (20), datenschutz-extended (25), dsk-sdm (10), ttdsg (12)
- **Gap:** State DPA (Landesdatenschutz) specific guidance not included
