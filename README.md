# German Standards MCP

[![npm version](https://img.shields.io/npm/v/@ansvar/german-standards-mcp)](https://www.npmjs.com/package/@ansvar/german-standards-mcp)
[![CI](https://github.com/Ansvar-Systems/german-standards-mcp/actions/workflows/ci.yml/badge.svg)](https://github.com/Ansvar-Systems/german-standards-mcp/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](LICENSE)
[![MCP Registry](https://img.shields.io/badge/MCP%20Registry-ansvar.ai%2Fmcp-blue)](https://ansvar.ai/mcp)

Structured access to German government cybersecurity standards: BSI IT-Grundschutz Kompendium, BSI C5 Cloud Computing Compliance Criteria Catalogue, BSI Technische Richtlinien, KRITIS requirements (IT-Sicherheitsgesetz 2.0), IT-Grundschutz Profil Bundesbehoerden, and BfDI Technisch-Organisatorische Massnahmen (DSGVO Art. 32). Bilingual German/English with FTS search, ISO 27001:2022 cross-references, and sector-based filtering.

Part of the [Ansvar MCP Network](https://ansvar.ai/mcp) -- specialist MCP servers for compliance and security intelligence.

---

## Quick Start

### Remote endpoint (no installation)

Add to your MCP client config:

```json
{
  "mcpServers": {
    "german-standards": {
      "url": "https://german-standards-mcp.vercel.app/mcp"
    }
  }
}
```

### Local (stdio via npx)

**Claude Desktop** -- edit `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "german-standards": {
      "command": "npx",
      "args": ["-y", "@ansvar/german-standards-mcp"]
    }
  }
}
```

**Cursor** -- edit `.cursor/mcp.json` in your project:

```json
{
  "mcpServers": {
    "german-standards": {
      "command": "npx",
      "args": ["-y", "@ansvar/german-standards-mcp"]
    }
  }
}
```

**VS Code / GitHub Copilot** -- add to `.vscode/mcp.json`:

```json
{
  "servers": {
    "german-standards": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@ansvar/german-standards-mcp"]
    }
  }
}
```

---

## What's Included

| Source | Authority | Items | Language | Refresh |
|--------|-----------|-------|----------|---------|
| BSI IT-Grundschutz Kompendium | BSI | 58 controls | DE+EN | Annual |
| BSI C5 Cloud Computing Compliance Criteria Catalogue | BSI | 46 controls | DE+EN | Annual |
| BSI Technische Richtlinien | BSI | 13 controls | DE+EN | Annual |
| KRITIS Requirements (IT-SiG 2.0) | BSI | 15 controls | DE+EN | Annual |
| IT-Grundschutz Profil Bundesbehoerden | BSI | 15 controls | DE+EN | Annual |
| BfDI Technisch-Organisatorische Massnahmen | BfDI | 20 controls | DE+EN | Annual |

**Total:** 167 controls across 6 frameworks.

For full coverage details, see [COVERAGE.md](COVERAGE.md).

---

## What's NOT Included

| Gap | Status |
|-----|--------|
| Full BSI IT-Grundschutz Kompendium (~1500 requirements) | Partial -- key Bausteine included, full compendium planned for v0.2 |
| Full BSI C5 catalogue (~121 controls) | Partial -- key controls from all 17 domains included |
| NIS2UmsuCG (German NIS2 implementation) | Planned -- law not yet fully in force |
| ISO/IEC 27001:2022 full text | Excluded -- commercial ISO license; ISO cross-references available via `get_iso_mapping` |
| BSI IT-Grundschutz full normative text | Excluded -- copyright BSI; reference data (IDs, titles, descriptions) included |

For the complete gap list, see [COVERAGE.md -- What's NOT Included](COVERAGE.md#whats-not-included).

---

## Available Tools

| Tool | Category | Description |
|------|----------|-------------|
| `search_controls` | Search | Full-text search across all 6 frameworks. Returns controls ranked by FTS5 relevance. |
| `search_by_sector` | Search | Returns frameworks for a sector (`government`, `healthcare`, `energy`, etc.), optionally filtered by keyword. |
| `get_control` | Lookup | Full record for a single control: bilingual description, implementation guidance, ISO mapping. |
| `get_framework` | Lookup | Metadata for a framework: issuing body, version, control count, category breakdown. |
| `list_controls` | Lookup | All controls in a framework, filterable by category and level. Paginated. |
| `compare_controls` | Comparison | Side-by-side comparison of the same topic across 2--4 frameworks. |
| `get_iso_mapping` | Comparison | All German controls mapped to a given ISO 27001:2022 control reference. |
| `list_frameworks` | Meta | Lists all frameworks in the database with summary stats. |
| `about` | Meta | Server version, build date, and coverage statistics. |
| `list_sources` | Meta | Data provenance: authority, standard name, retrieval method, license for each source. |
| `check_data_freshness` | Meta | Per-source freshness status against the expected refresh schedule. |

For full parameter documentation, return formats, and examples, see [TOOLS.md](TOOLS.md).

---

## Data Sources & Freshness

| Source | Last Refresh | Refresh Schedule |
|--------|-------------|-----------------|
| BSI IT-Grundschutz | 2026-03-12 | Annual |
| BSI C5 | 2026-03-12 | Annual |
| BSI Technische Richtlinien | 2026-03-12 | Annual |
| KRITIS (IT-SiG 2.0) | 2026-03-12 | Annual |
| Grundschutz Bund | 2026-03-12 | Annual |
| BfDI TOM | 2026-03-12 | Annual |

The `ingest.yml` workflow runs automatically on the annual refresh schedule. The `check-updates.yml` workflow runs daily and creates a GitHub issue if any source is overdue.

To check freshness at runtime, call `check_data_freshness`. Full source provenance and licenses: [sources.yml](sources.yml).

---

## Security

This repository runs 6-layer automated security scanning on every push and weekly:

| Layer | Tool | What it checks |
|-------|------|----------------|
| Static analysis | CodeQL | Code vulnerabilities |
| SAST | Semgrep | Security anti-patterns |
| Container / dependency scan | Trivy | Known CVEs in dependencies |
| Secret detection | Gitleaks | Leaked credentials |
| Supply chain | OSSF Scorecard | Repository security posture |
| Dependency updates | Dependabot | Automated dependency PRs |

---

## Disclaimer

**THIS TOOL IS NOT PROFESSIONAL ADVICE.**

This MCP provides structured access to German cybersecurity standards sourced from authoritative publications. It is provided for informational and research purposes only.

- Verify critical compliance decisions against the original standards
- Data is a snapshot -- sources update, and there may be a delay between upstream changes and database refresh
- BSI IT-Grundschutz content is a partial extract of the full compendium; full text is copyright BSI
- See [DISCLAIMER.md](DISCLAIMER.md) for the full disclaimer and no-warranty statement

---

## Ansvar MCP Network

This server is part of the [Ansvar MCP Network](https://ansvar.ai/mcp) -- 149 specialist MCP servers covering legislation, compliance frameworks, and cybersecurity standards.

| Category | Servers | Coverage |
|----------|---------|----------|
| Law MCPs | 108 | 119 countries, 668K+ laws |
| EU Regulations | 1 | 61 regulations, 4,054 articles |
| Security frameworks | 1 | 262 frameworks, 1,451 SCF controls |
| Domain-specific | ~48 | CVE, STRIDE, sanctions, OWASP, healthcare, financial, and more |

Browse the full directory at [ansvar.ai/mcp](https://ansvar.ai/mcp).

---

## Development

### Branch strategy

`feature-branch -> PR to dev -> verify on dev -> PR to main -> deploy`

Never push directly to `main`. `main` triggers npm publish and Vercel deployment.

### Setup

```bash
git clone https://github.com/Ansvar-Systems/german-standards-mcp.git
cd german-standards-mcp
npm install
npm run build
npm test
```

### Ingestion

```bash
# Build the database from extracted JSON files
npm run build:db

# Check freshness
npm run freshness:check
```

### Pre-deploy verification

```bash
npm run build            # Gate 1: build
npm run lint             # Gate 2: TypeScript strict
npm test                 # Gate 3: unit tests
npm run test:contract    # Gate 4: golden contract tests
sqlite3 data/standards.db "PRAGMA integrity_check;"   # Gate 5: DB integrity
npm run coverage:verify  # Gate 6: coverage consistency
```

---

## License & Data Licenses

**Code:** [Apache-2.0](LICENSE)

**Data licenses by source:**

| Source | License |
|--------|---------|
| BSI IT-Grundschutz | Public sector publication (copyright BSI -- reference data extracted) |
| BSI C5 | Public sector publication (copyright BSI) |
| BSI Technische Richtlinien | Public sector publication (copyright BSI) |
| KRITIS (IT-SiG 2.0) | Federal legislation -- free to reference |
| Grundschutz Bund | Public sector publication (copyright BSI) |
| BfDI TOM | Public sector publication |

All data is extracted from publicly available authoritative publications. Zero AI-generated content in the database. See [sources.yml](sources.yml) for complete provenance.
