// scripts/seed-test-db.ts
// Builds a minimal test database at data/standards.db for development and testing.
// Uses @ansvar/mcp-sqlite (WASM-based, CommonJS loaded via createRequire).

import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, '..', 'data', 'standards.db');

// Ensure the data directory exists
mkdirSync(join(__dirname, '..', 'data'), { recursive: true });

const require = createRequire(import.meta.url);
const { Database } = require('@ansvar/mcp-sqlite');
const db = new Database(DB_PATH);

db.exec(`
CREATE TABLE IF NOT EXISTS frameworks (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_nl TEXT,
  issuing_body TEXT NOT NULL,
  version TEXT NOT NULL,
  effective_date TEXT,
  scope TEXT,
  scope_sectors TEXT,
  structure_description TEXT,
  source_url TEXT,
  license TEXT,
  language TEXT NOT NULL DEFAULT 'de'
);

CREATE TABLE IF NOT EXISTS controls (
  id TEXT PRIMARY KEY,
  framework_id TEXT NOT NULL REFERENCES frameworks(id),
  control_number TEXT NOT NULL,
  title TEXT,
  title_nl TEXT NOT NULL,
  description TEXT,
  description_nl TEXT NOT NULL,
  category TEXT,
  subcategory TEXT,
  level TEXT,
  iso_mapping TEXT,
  implementation_guidance TEXT,
  verification_guidance TEXT,
  source_url TEXT
);

CREATE VIRTUAL TABLE IF NOT EXISTS controls_fts USING fts5(
  id,
  title,
  title_nl,
  description,
  description_nl,
  category,
  content='controls',
  content_rowid='rowid'
);

CREATE TABLE IF NOT EXISTS db_metadata (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
`);

const insertFramework = db.prepare(
  'INSERT OR REPLACE INTO frameworks (id, name, name_nl, issuing_body, version, effective_date, scope, scope_sectors, structure_description, source_url, license, language) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
);

insertFramework.run('bsi-grundschutz', 'IT-Grundschutz Compendium', 'IT-Grundschutz Kompendium', 'Bundesamt fuer Sicherheit in der Informationstechnik (BSI)', 'Edition 2023', '2023-02-01', 'Information security standard for German government and organizations', '["government","all"]', 'Organized into process layers (ISMS, ORP, CON, OPS, DER) and system layers (APP, SYS, NET, INF, IND)', 'https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/IT-Grundschutz-Kompendium/it-grundschutz-kompendium_node.html', 'Public document', 'de+en');

insertFramework.run('bsi-c5', 'Cloud Computing Compliance Criteria Catalogue', 'Cloud Computing Compliance Criteria Catalogue (C5)', 'Bundesamt fuer Sicherheit in der Informationstechnik (BSI)', '2020', '2020-01-01', 'Cloud security standard for cloud service providers operating in Germany', '["cloud","digital_infrastructure","all"]', '17 control domains covering organizational, technical, and operational security for cloud services', 'https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/Empfehlungen-nach-Angriffszielen/Cloud-Computing/Kriterienkatalog-C5/kriterienkatalog-c5_node.html', 'Public document', 'de+en');

insertFramework.run('bsi-kritis', 'KRITIS Requirements (IT Security Act)', 'KRITIS-Anforderungen (IT-Sicherheitsgesetz)', 'Bundesamt fuer Sicherheit in der Informationstechnik (BSI)', 'IT-SiG 2.0 (2021)', '2021-05-28', 'Requirements for operators of critical infrastructure in Germany', '["energy","healthcare","transport","water","finance","telecom","digital_infrastructure"]', 'Requirements from BSI-KritisV and IT-Sicherheitsgesetz 2.0', 'https://www.bsi.bund.de/DE/Themen/KRITIS-und-regulierte-Unternehmen/Kritische-Infrastrukturen/kritis_node.html', 'Public document', 'de+en');

const insertControl = db.prepare(
  'INSERT OR REPLACE INTO controls (id, framework_id, control_number, title, title_nl, description, description_nl, category, subcategory, level, iso_mapping, implementation_guidance, verification_guidance, source_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
);

// BSI Grundschutz controls
insertControl.run('bsi-grundschutz:ISMS.1.A1', 'bsi-grundschutz', 'ISMS.1.A1', 'Assumption of overall responsibility for information security', 'Uebernahme der Gesamtverantwortung fuer Informationssicherheit', 'Senior management MUST assume overall responsibility for information security and ensure it is integrated into all relevant business processes.', 'Die Leitungsebene MUSS die Gesamtverantwortung fuer Informationssicherheit uebernehmen, sodass diese in alle relevanten Geschaeftsprozesse integriert und umgesetzt wird.', 'ISMS', 'Sicherheitsmanagement', 'Basis', 'A.5.1', 'Die Leitungsebene muss eine Leitlinie zur Informationssicherheit verabschieden und die notwendigen Ressourcen bereitstellen.', 'Pruefen, ob ein dokumentierter Beschluss der Leitungsebene zur Informationssicherheit vorliegt.', 'https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/Grundschutz/IT-GS-Kompendium_Einzel_PDFs_2023/01_ISMS_Bausteine/ISMS_1_Sicherheitsmanagement.html');

insertControl.run('bsi-grundschutz:ORP.4.A1', 'bsi-grundschutz', 'ORP.4.A1', 'Regulation for creating and deleting user accounts', 'Regelung fuer die Einrichtung und Loeschung von Benutzerkennungen', 'It MUST be regulated how user accounts are created and deleted. Each user account MUST be uniquely assignable to a user.', 'Es MUSS geregelt werden, wie Benutzerkennungen eingerichtet und geloescht werden. Jede Benutzerkennung MUSS eindeutig einem Benutzer zugeordnet werden koennen.', 'ORP', 'Identitaets- und Berechtigungsmanagement', 'Basis', 'A.5.16', 'Prozess fuer Account-Lifecycle-Management einrichten.', 'Account-Erstellungs- und Loeschungsprozesse pruefen.', null);

// BSI C5 control
insertControl.run('bsi-c5:OIS-01', 'bsi-c5', 'OIS-01', 'Information security management system', 'Informationssicherheitsmanagementsystem', 'The cloud provider operates an ISMS that considers all relevant legal, regulatory, and contractual requirements for the cloud service.', 'Der Cloud-Anbieter betreibt ein Informationssicherheitsmanagementsystem (ISMS), das die fuer den Cloud-Dienst relevanten gesetzlichen, regulatorischen und vertraglichen Anforderungen beruecksichtigt.', 'OIS', 'Organisation der Informationssicherheit', 'Basis', 'A.5.1', 'ISMS nach ISO 27001 oder BSI IT-Grundschutz aufbauen und zertifizieren lassen.', 'ISMS-Zertifikat oder Auditbericht pruefen.', null);

// KRITIS control
insertControl.run('bsi-kritis:KRITIS-04', 'bsi-kritis', 'KRITIS-04', 'Obligation to report IT security incidents', 'Meldepflicht fuer IT-Sicherheitsvorfaelle', 'KRITIS operators MUST immediately report significant disruptions to the availability, integrity, authenticity, and confidentiality of their IT systems to BSI.', 'KRITIS-Betreiber MUESSEN erhebliche Stoerungen der Verfuegbarkeit, Integritaet, Authentizitaet und Vertraulichkeit ihrer IT-Systeme unverzueglich an das BSI melden.', 'Meldepflichten', 'Vorfallsmeldung', 'Verpflichtend', 'A.5.26', 'Meldeweg zum BSI einrichten.', 'Meldeprozess pruefen.', null);

db.exec("INSERT INTO controls_fts(controls_fts) VALUES('rebuild')");

const insertMeta = db.prepare('INSERT OR REPLACE INTO db_metadata (key, value) VALUES (?, ?)');
insertMeta.run('schema_version', '1.0');
insertMeta.run('category', 'domain_intelligence');
insertMeta.run('mcp_name', 'German Standards MCP');
insertMeta.run('database_built', new Date().toISOString().split('T')[0]);
insertMeta.run('database_version', '0.1.0');

db.pragma('journal_mode=DELETE');
db.exec('VACUUM');
db.close();

console.log('Test database seeded at data/standards.db');
