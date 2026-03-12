# Tools -- German Standards MCP

> 11 tools across 4 categories: search, lookup, comparison, and meta

---

## Search Tools

### `search_controls`

Full-text search across all German cybersecurity controls using FTS5. Returns controls ranked by relevance from the combined BSI IT-Grundschutz, BSI C5, BSI TR, KRITIS, Grundschutz Bund, and BfDI TOM datasets. Use this when you need to find controls by keyword without knowing the framework.

**Parameters:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `query` | string | Yes | Search terms, e.g. `"Informationssicherheit"`, `"encryption"`, `"Zugangskontrolle"` |
| `framework_id` | string | No | Restrict results to one framework, e.g. `"bsi-grundschutz"`, `"bsi-c5"`, `"bsi-kritis"` |
| `category` | string | No | Filter by control category, e.g. `"ISMS"`, `"ORP"`, `"OIS"` |
| `language` | `"de"` \| `"en"` | No | Preferred display language for titles. Defaults to German (`"de"`). Controls without an English title always show German. |
| `limit` | integer | No | Maximum results to return. Default: `20`. |
| `offset` | integer | No | Pagination offset. Default: `0`. |

**Returns:** A Markdown table with columns `ID`, `Control`, `Title`, `Framework`, `Category`, `Level` plus a `total_results` count above the table.

**Example:**
```
"Which German controls address information security management?"
-> search_controls({ query: "Informationssicherheit", language: "de" })

"Find BSI Grundschutz controls on access control"
-> search_controls({ query: "Zugangskontrolle", framework_id: "bsi-grundschutz" })
```

**Data sources:** All 6 frameworks (bsi-grundschutz, bsi-c5, bsi-tr, bsi-kritis, grundschutz-bund, bfdi-tom)

**Limitations:**
- FTS5 phrase search: special characters (`"`, `^`, `*`, `-`, `:`) are stripped from the query before matching
- Searches bilingual content -- a German-only query may miss English-only descriptions in the same control
- Does not support wildcard or regex patterns
- Relevance ranking is FTS5 rank, not semantic similarity

---

### `search_by_sector`

Returns frameworks applicable to a specific sector, optionally filtered by a keyword query within those frameworks. Use this to scope a compliance review to a particular industry before drilling into controls.

**Parameters:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `sector` | string | Yes | One of: `government`, `healthcare`, `finance`, `energy`, `telecom`, `transport`, `water`, `digital_infrastructure`, `cloud`, `all` |
| `query` | string | No | Optional keyword search within the sector's frameworks |

**Returns:** A Markdown table of matching frameworks (ID, name, issuing body, version, control count, language). If `query` is provided, a second table lists matching controls within those frameworks (top 10 per framework, ranked by FTS5 relevance).

**Example:**
```
"What security frameworks apply to German government organizations?"
-> search_by_sector({ sector: "government" })

"Which KRITIS controls cover incident reporting?"
-> search_by_sector({ sector: "energy", query: "Meldepflicht" })
```

**Data sources:** Framework `scope_sectors` metadata + FTS5 on controls

**Limitations:**
- Sector taxonomy is fixed to the values listed above
- A framework appears only if it was ingested with sector metadata -- frameworks without `scope_sectors` are not returned
- Query within sector does not cross-search frameworks not assigned to that sector

---

## Lookup Tools

### `get_control`

Retrieves the full record for a single control by its database ID. Returns the complete bilingual description, implementation guidance, verification guidance, ISO 27001 mapping, and source URL. Use this after `search_controls` or `list_controls` to get the full text of a specific control.

**Parameters:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `control_id` | string | Yes | The control's database ID, e.g. `"bsi-grundschutz:ISMS.1.A1"`, `"bsi-c5:OIS-01"`, `"bsi-kritis:KRITIS-04"` |

**Returns:** A structured Markdown document with control number, German and English titles, framework and issuing body, category, level, ISO 27001 mapping, German description (`Beschreibung`), English description, implementation guidance, verification guidance, and source URL.

**Example:**
```
"Give me the full text of BSI Grundschutz ISMS.1.A1"
-> get_control({ control_id: "bsi-grundschutz:ISMS.1.A1" })
```

**Data sources:** `controls` table joined to `frameworks`

**Limitations:**
- Returns a `NO_MATCH` error if the ID does not exist -- use `search_controls` or `list_controls` to discover valid IDs
- Not all controls have English descriptions -- German is always present

---

### `get_framework`

Returns metadata for a single framework: issuing body, version, effective date, language, scope, control count, category breakdown, and source URL. Use this to understand what a framework covers before listing its controls.

**Parameters:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `framework_id` | string | Yes | Framework identifier, e.g. `"bsi-grundschutz"`, `"bsi-c5"`, `"bsi-kritis"`, `"bsi-tr"`, `"grundschutz-bund"`, `"bfdi-tom"` |

**Returns:** A Markdown document with framework name (German and English), issuing body, version, language, control count, effective date, sectors, scope description, structure description, license, and a category breakdown table.

**Example:**
```
"What is the BSI IT-Grundschutz framework and how many controls does it have?"
-> get_framework({ framework_id: "bsi-grundschutz" })
```

**Data sources:** `frameworks` table, `controls` aggregate

**Limitations:**
- Does not return the controls themselves -- use `list_controls` to enumerate them
- Sector and scope fields depend on ingestion quality; some frameworks may have incomplete metadata

---

## Comparison Tools

### `list_controls`

Lists all controls in a framework, with optional filtering by category and level. Returns a paginated table. Use this to browse a complete framework or to enumerate controls within a specific control category.

**Parameters:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `framework_id` | string | Yes | Framework identifier, e.g. `"bsi-grundschutz"`, `"bsi-c5"` |
| `category` | string | No | Filter to one category, e.g. `"ISMS"`, `"ORP"`, `"OIS"` |
| `level` | string | No | Filter by level: `"Basis"`, `"Standard"`, `"Erhoeht"` (Grundschutz), `"Basis"` (C5), `"Empfehlung"` / `"Verpflichtend"` (TR) |
| `language` | `"de"` \| `"en"` | No | Preferred display language for titles. Defaults to German. |
| `limit` | integer | No | Maximum results. Default: `50`. |
| `offset` | integer | No | Pagination offset. Default: `0`. |

**Returns:** A Markdown table with columns `ID`, `Control`, `Title`, `Category`, `Level` plus a `total_results` count.

**Example:**
```
"List all BSI Grundschutz ISMS controls"
-> list_controls({ framework_id: "bsi-grundschutz", category: "ISMS" })

"Show me all KRITIS controls"
-> list_controls({ framework_id: "bsi-kritis" })
```

**Data sources:** `controls` table

**Limitations:**
- Category and level values must match exactly as stored in the database -- use `get_framework` to see the available categories first
- Default limit of 50 may truncate large frameworks

---

### `compare_controls`

Searches the same keyword query across 2--4 frameworks simultaneously and shows the top 5 matching controls per framework side by side. Use this to compare how different German standards treat the same topic.

**Parameters:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `query` | string | Yes | Topic to compare, e.g. `"Informationssicherheit"`, `"Verschluesselung"`, `"Meldepflicht"` |
| `framework_ids` | string[] | Yes | 2 to 4 framework IDs, e.g. `["bsi-grundschutz", "bsi-c5"]` or `["bsi-grundschutz", "bsi-kritis", "bfdi-tom"]` |

**Returns:** A Markdown section per framework showing the control number, title, and a 150-character snippet of the German description for up to 5 matching controls.

**Example:**
```
"How do BSI Grundschutz and C5 differ in their approach to information security?"
-> compare_controls({ query: "Informationssicherheit", framework_ids: ["bsi-grundschutz", "bsi-c5"] })

"Compare incident handling across Grundschutz, KRITIS, and C5"
-> compare_controls({ query: "Sicherheitsvorfall", framework_ids: ["bsi-grundschutz", "bsi-kritis", "bsi-c5"] })
```

**Data sources:** FTS5 on `controls` filtered by `framework_id`

**Limitations:**
- Returns at most 5 controls per framework -- not a full comparison of all matching controls
- Snippets are truncated at 150 characters; use `get_control` for full text
- Both frameworks must be in the database; passing an unknown ID silently returns zero results for that framework

---

### `get_iso_mapping`

Returns all German controls that map to a specific ISO 27001:2022 control number. Use this to find which German standards implement a given ISO requirement, or to check German compliance coverage for an ISO audit.

**Parameters:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `iso_control` | string | Yes | ISO 27001:2022 control reference, e.g. `"A.5.1"`, `"A.8.24"`, `"A.6.1"` |

**Returns:** A Markdown table grouped by framework, listing each German control mapped to that ISO reference (ID, control number, title).

**Example:**
```
"Which German controls implement ISO 27001 Annex A.5.1 (Information security policies)?"
-> get_iso_mapping({ iso_control: "A.5.1" })

"Show me all German framework controls that map to ISO A.8.24"
-> get_iso_mapping({ iso_control: "A.8.24" })
```

**Data sources:** `controls.iso_mapping` field

**Limitations:**
- Only returns controls with an exact `iso_mapping` match -- controls without ISO mapping are not included
- ISO mapping coverage varies by framework: BSI Grundschutz has the most complete mapping
- Does not support partial matches or range queries (e.g. `"A.5.x"` will not match)

---

## Meta Tools

### `list_frameworks`

Returns a summary table of all frameworks in the database. No parameters required. Use this to discover which frameworks are available before calling `get_framework` or `list_controls`.

**Parameters:** None

**Returns:** A Markdown table listing framework ID, name, issuing body, version, control count, language, and sectors for each framework in the database.

**Example:**
```
"What German cybersecurity frameworks does this MCP cover?"
-> list_frameworks()
```

**Data sources:** `frameworks` table joined to control counts

**Limitations:**
- Lists only frameworks loaded in the current database build -- reflects ingestion coverage
- Sector data may be empty for frameworks ingested without sector metadata

---

### `about`

Returns server metadata: version, category, schema version, database build date, and coverage statistics (framework count, control count, database size). Use this to check the current version and data state of the MCP.

**Parameters:** None

**Returns:** A Markdown document with server name, version, category, schema version, database build date, and a coverage metrics table (frameworks, controls, database size in MB).

**Example:**
```
"What version of the German Standards MCP is running and when was it last updated?"
-> about()
```

**Data sources:** `db_metadata` table

**Limitations:**
- Database build date reflects when the SQLite database was compiled, not the publication date of the source standards
- Call `check_data_freshness` for per-source freshness status

---

### `list_sources`

Returns the data provenance table: for each source, the authority, standard name, retrieval method, and license. Use this to understand where the data comes from before relying on it in a compliance decision.

**Parameters:** None

**Returns:** A Markdown table with columns `ID`, `Authority`, `Standard / Document`, `Retrieval method`, `License`. Includes a disclaimer note about verifying against authoritative sources.

**Example:**
```
"Where does this MCP get its data from, and what are the licenses?"
-> list_sources()
```

**Data sources:** Hardcoded provenance list (sourced from `sources.yml`)

**Limitations:**
- The fallback list is hardcoded; full YAML parsing requires an optional dependency not included in the default build
- Does not show per-source item counts or last-refresh dates -- use `check_data_freshness` for that

---

### `check_data_freshness`

Reports how current each data source is against its expected refresh schedule. Returns a per-source status: `Current`, `Due in N days`, or `OVERDUE (N days)`. Use this to verify the database is not stale before using it for compliance decisions.

**Parameters:** None

**Returns:** A Markdown table with columns `Source`, `Last fetched`, `Refresh window`, `Status`. Includes a summary of any overdue or due-soon sources and instructions to trigger a data update.

**Example:**
```
"Is the German Standards MCP data up to date?"
-> check_data_freshness()
```

**Data sources:** `data/coverage.json` (generated by `npm run coverage:update`)

**Limitations:**
- Returns a "no coverage data" message if `coverage.json` has not been generated yet -- run `npm run coverage:update` after first build
- Status is based on the `last_fetched` date in `coverage.json`, not a live check of upstream sources
- `OVERDUE` status means the data is past its scheduled refresh window, not necessarily that the data has changed

---

## German Cybersecurity Glossary

This glossary covers terms used in German government cybersecurity standards that appear as parameters, category names, or framework identifiers in the tools above.

| Term | Expansion | Meaning |
|------|-----------|---------|
| **BSI** | Bundesamt fuer Sicherheit in der Informationstechnik | Federal Office for Information Security. Germany's national cybersecurity authority. Issues IT-Grundschutz, C5, and Technical Guidelines. |
| **IT-Grundschutz** | -- | BSI's IT baseline protection methodology. The Kompendium defines Bausteine (building blocks) with Anforderungen (requirements) across process and system layers. |
| **Baustein** | -- | Building block. A module in the IT-Grundschutz Kompendium covering a specific topic (e.g., ISMS.1 for security management, SYS.1.1 for general server). Each Baustein contains multiple Anforderungen. |
| **Anforderung** | -- | Requirement. An individual control within a Baustein. Classified as Basis (MUSS), Standard (SOLLTE), or Erhoeht (additional for high protection needs). |
| **C5** | Cloud Computing Compliance Criteria Catalogue | BSI's audit standard for cloud service providers. Covers 17 control domains from organization to physical security. |
| **KRITIS** | Kritische Infrastrukturen | Critical infrastructure. Operators in energy, water, healthcare, transport, telecom, finance, and digital infrastructure must meet BSI reporting and security requirements under IT-SiG 2.0. |
| **IT-SiG 2.0** | IT-Sicherheitsgesetz 2.0 | Second IT Security Act (2021). Expands KRITIS obligations, introduces mandatory attack detection (SzA), and extends reporting deadlines. |
| **SzA** | Systeme zur Angriffserkennung | Attack detection systems. Mandatory for KRITIS operators under IT-SiG 2.0. Must detect, log, and report anomalies. |
| **Meldepflicht** | -- | Reporting obligation. KRITIS operators must report significant incidents to BSI within 24 hours (initial) and 72 hours (detailed). |
| **TOM** | Technisch-Organisatorische Massnahmen | Technical and organizational measures. Required under DSGVO (GDPR) Art. 32 to protect personal data. The BfDI defines eight traditional categories. |
| **BfDI** | Bundesbeauftragte fuer den Datenschutz und die Informationsfreiheit | Federal Commissioner for Data Protection and Freedom of Information. Issues guidance on GDPR implementation including TOM requirements. |
| **DSGVO** | Datenschutz-Grundverordnung | German name for the GDPR (General Data Protection Regulation). |
| **Zutrittskontrolle** | -- | Physical access control. First of the eight traditional TOM categories -- preventing unauthorized physical access to data processing facilities. |
| **Zugangskontrolle** | -- | System access control. Preventing unauthorized use of data processing systems (authentication, authorization). |
| **Zugriffskontrolle** | -- | Data access control. Ensuring users can only access data they are authorized for (role-based access, least privilege). |
| **NdB** | Netze des Bundes | Federal government networks. Secure communication infrastructure for German federal agencies. |
| **VS-NfD** | Verschlusssache -- Nur fuer den Dienstgebrauch | Classified -- For official use only. Lowest German government classification level requiring specific handling procedures. |
