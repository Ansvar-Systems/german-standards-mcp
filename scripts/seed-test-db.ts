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

insertFramework.run('bafin-xait', 'BaFin IT Requirements (BAIT/VAIT/KAIT/ZAIT)', 'BaFin IT-Anforderungen (BAIT/VAIT/KAIT/ZAIT)', 'Bundesanstalt fuer Finanzdienstleistungsaufsicht (BaFin)', '2022', '2022-09-14', 'IT security requirements for financial sector', '["finance"]', 'Nine requirement domains for banks, insurers, capital managers, payment providers', 'https://www.bafin.de/SharedDocs/Veroeffentlichungen/DE/Rundschreiben/2022/rs_2022_10_ba_BAIT.html', 'Public document', 'de+en');

insertFramework.run('nis2umsucg', 'NIS2 Implementation and Cybersecurity Strengthening Act', 'NIS2-Umsetzungs- und Cybersicherheitsstarkungsgesetz (NIS2UmsuCG)', 'Bundesministerium des Innern und fuer Heimat (BMI)', '2024', '2024-10-17', 'German NIS2 implementation for important and particularly important entities', '["energy","transport","finance","healthcare","water","digital_infrastructure","telecom","government","all"]', 'Entity classification, risk management, incident reporting, management liability', 'https://www.bsi.bund.de/DE/Themen/KRITIS-und-regulierte-Unternehmen/NIS-2-Umsetzung/nis-2-umsetzung_node.html', 'Federal legislation', 'de+en');

insertFramework.run('vda-isa', 'VDA Information Security Assessment (TISAX)', 'VDA Informationssicherheitsbewertung (TISAX)', 'Verband der Automobilindustrie (VDA)', '6.0 (2024)', '2024-01-01', 'Automotive industry information security standard', '["automotive","manufacturing"]', 'Three assessment modules: IS, Prototype Protection, Data Protection', 'https://www.vda.de/de/themen/digitalisierung/daten/informationssicherheit', 'VDA copyright', 'de+en');

insertFramework.run('gematik', 'Healthcare IT Security (gematik / KBV / DKG)', 'Gesundheits-IT-Sicherheit (gematik / KBV / DKG)', 'gematik GmbH / KBV / DKG', '2024', '2024-01-01', 'Healthcare IT security for TI, medical practices, and hospitals', '["healthcare"]', 'TI security, KBV directive, DKG/B3S requirements', 'https://www.gematik.de/telematikinfrastruktur', 'Public document', 'de+en');

// Extended and additional frameworks
insertFramework.run('bsi-grundschutz-extended', 'IT-Grundschutz Compendium (Extended Bausteine)', 'IT-Grundschutz Kompendium (Erweiterte Bausteine)', 'Bundesamt fuer Sicherheit in der Informationstechnik (BSI)', 'Edition 2023', '2023-02-01', 'Extended Bausteine from IT-Grundschutz Kompendium', '["government","all"]', 'Extended Bausteine: CON, OPS, DER, APP, SYS, NET, INF, IND, ORP', null, 'Public document', 'de+en');
insertFramework.run('bsi-grundschutz-extended-2', 'IT-Grundschutz Compendium (Deep Extension)', 'IT-Grundschutz Kompendium (Tiefe Erweiterung)', 'Bundesamt fuer Sicherheit in der Informationstechnik (BSI)', 'Edition 2023', '2023-02-01', 'Deep extension of IT-Grundschutz', '["government","all"]', 'Deeper controls across all layers', null, 'Public document', 'de+en');
insertFramework.run('bsi-grundschutz-extended-3', 'IT-Grundschutz Compendium (Standard and Elevated)', 'IT-Grundschutz Kompendium (Standard- und Erhoehter Schutzbedarf)', 'Bundesamt fuer Sicherheit in der Informationstechnik (BSI)', 'Edition 2023', '2023-02-01', 'Standard and elevated protection level controls', '["government","all"]', 'Standard and Erhoehter Schutzbedarf controls', null, 'Public document', 'de+en');
insertFramework.run('grundschutz-profile', 'IT-Grundschutz Profiles (Local Gov, Healthcare, Water)', 'IT-Grundschutz Profile (Kommunen, Gesundheitswesen, Wasserversorgung)', 'Bundesamt fuer Sicherheit in der Informationstechnik (BSI)', '2023', '2023-01-01', 'Sector-specific Grundschutz profiles', '["government","healthcare","water"]', 'Three sector profiles', null, 'Public document', 'de+en');
insertFramework.run('bsi-c5-extended', 'BSI C5 Extended', 'Cloud Computing Compliance Criteria Katalog (C5) (Erweitert)', 'Bundesamt fuer Sicherheit in der Informationstechnik (BSI)', 'C5:2020 (Extended)', '2020-01-01', 'Extended C5 controls across all 17 domains', '["cloud","digital_infrastructure","all"]', 'Extended controls for all C5 domains', null, 'Public document', 'de+en');
insertFramework.run('bsi-tr-extended', 'BSI Technical Guidelines (Extended)', 'BSI Technische Richtlinien (Erweitert)', 'Bundesamt fuer Sicherheit in der Informationstechnik (BSI)', '2024', '2024-01-01', 'Extended technical guidelines', '["government","all"]', 'IPsec, SSH, eCard, Mobile Security, SBOM', null, 'Public document', 'de+en');
insertFramework.run('bsi-tr-extended-2', 'BSI Technical Guidelines (Extended 2)', 'BSI Technische Richtlinien (Erweitert 2: IoT, Smart Metering, eID, PQC)', 'Bundesamt fuer Sicherheit in der Informationstechnik (BSI)', '2024', '2024-01-01', 'Smart Metering, eID, FIDO2, PQC', '["energy","government","all"]', 'Smart metering, eID, FIDO2, PQC, IoT', null, 'Public document', 'de+en');
insertFramework.run('bsi-mindeststandards', 'BSI Minimum Standards', 'BSI Mindeststandards fuer die Bundesverwaltung', 'Bundesamt fuer Sicherheit in der Informationstechnik (BSI)', '2024', '2024-01-01', 'Mandatory minimum standards for federal agencies', '["government"]', 'TLS, Browser, Webserver, MDM, Email, Logging', null, 'Public document', 'de+en');
insertFramework.run('bsi-mindeststandards-extended', 'BSI Minimum Standards Extended', 'BSI Mindeststandards Erweitert (DNS, Cloud, EDR, IAM, VK)', 'Bundesamt fuer Sicherheit in der Informationstechnik (BSI)', '2024', '2024-01-01', 'Extended minimum standards', '["government"]', 'DNS, Cloud, VK, EDR, IAM, Patch, Backup, Awareness', null, 'Public document', 'de+en');
insertFramework.run('bsi-kritis-extended', 'KRITIS Extended Requirements', 'KRITIS Erweiterte Anforderungen (SzA, IT-SiG 2.0, UBI)', 'Bundesamt fuer Sicherheit in der Informationstechnik (BSI)', 'IT-SiG 2.0 (2023)', '2023-01-01', 'Extended KRITIS requirements', '["energy","healthcare","transport","water","finance","telecom","digital_infrastructure"]', 'SzA, reporting, registration, UBI', null, 'Public document', 'de+en');
insertFramework.run('bsi-b3s', 'Sector-Specific Security Standards (B3S)', 'Branchenspezifische Sicherheitsstandards (B3S)', 'Branchenverbaende unter Anerkennung des BSI', '2024', '2024-01-01', 'Sector-specific security for KRITIS', '["energy","healthcare","transport","finance","telecom","water","digital_infrastructure"]', 'Six KRITIS sector standards', null, 'Public document', 'de+en');
insertFramework.run('bsi-ics', 'BSI ICS Security Compendium', 'BSI ICS-Security-Kompendium', 'Bundesamt fuer Sicherheit in der Informationstechnik (BSI)', '2024', '2024-01-01', 'ICS/OT security requirements', '["energy","water","manufacturing","transport"]', 'OT segmentation, access control, monitoring', null, 'Public document', 'de+en');
insertFramework.run('bsi-ics-extended', 'BSI ICS Security Extended', 'BSI ICS-Security Erweitert (IEC 62443, Industrie 4.0, Safety)', 'Bundesamt fuer Sicherheit in der Informationstechnik (BSI)', '2024', '2024-01-01', 'Extended ICS/OT security', '["energy","water","manufacturing","transport"]', 'IEC 62443, Industrie 4.0, Safety', null, 'Public document', 'de+en');
insertFramework.run('dsk-sdm', 'Standard Data Protection Model (SDM)', 'Standard-Datenschutzmodell (SDM)', 'Konferenz der unabhaengigen Datenschutzaufsichtsbehoerden (DSK)', '3.0', '2022-11-01', 'GDPR implementation methodology', '["all"]', 'Seven guarantee objectives', 'https://www.datenschutz-mv.de/datenschutz/sdm/', 'Public document', 'de+en');
insertFramework.run('datenschutz-extended', 'Data Protection Extended', 'Datenschutz Erweitert (BDSG, TOM, DSK, VDA ISA)', 'BfDI / DSK / BaFin / VDA', '2024', '2024-01-01', 'Extended data protection requirements', '["all","automotive","manufacturing"]', 'BDSG, TOM details, DSK, VDA ISA DP', null, 'Public document', 'de+en');
insertFramework.run('nis2-extended', 'NIS2 Extended', 'NIS2UmsuCG Erweitert (Risikomanagement, Meldepflichten, Governance)', 'Bundesministerium des Innern und fuer Heimat (BMI)', '2024', '2024-10-17', 'Extended NIS2 implementation', '["energy","transport","finance","healthcare","water","digital_infrastructure","telecom","government","all"]', 'Art. 21 measures, tiered reporting, governance', null, 'Federal legislation', 'de+en');
insertFramework.run('bafin-extended', 'BaFin Extended', 'BaFin IT-Anforderungen Erweitert (BAIT/VAIT/KAIT/ZAIT/MaRisk)', 'Bundesanstalt fuer Finanzdienstleistungsaufsicht (BaFin)', '2024', '2024-01-01', 'Extended financial sector IT requirements', '["finance"]', 'Extended BAIT, VAIT, KAIT, ZAIT, MaRisk', null, 'Public document', 'de+en');
insertFramework.run('gematik-extended', 'Healthcare IT Extended', 'Gesundheits-IT-Sicherheit Erweitert (TI, KBV, DKG, DiGA)', 'gematik GmbH / KBV / DKG / BfArM', '2024', '2024-01-01', 'Extended healthcare IT security', '["healthcare"]', 'ePA, E-Rezept, Konnektoren, DiGA', null, 'Public document', 'de+en');
insertFramework.run('vda-isa-extended', 'VDA ISA Extended', 'VDA ISA Erweitert (TISAX, UNECE R155/R156, ISO/SAE 21434)', 'Verband der Automobilindustrie (VDA)', '6.0 Extended (2024)', '2024-01-01', 'Extended automotive security', '["automotive","manufacturing"]', 'Connected vehicle, ADAS, supply chain, PSIRT', null, 'VDA copyright', 'de+en');
insertFramework.run('ttdsg', 'TTDSG', 'Telekommunikation-Telemedien-Datenschutz-Gesetz (TTDSG)', 'Bundesregierung / Bundesnetzagentur (BNetzA)', '2021', '2021-12-01', 'Telecom and telemedia privacy', '["telecom","digital_infrastructure","all"]', 'Cookie consent, PIMS, Fernmeldegeheimnis', null, 'Federal legislation', 'de+en');
insertFramework.run('dora', 'DORA', 'Verordnung ueber die digitale operationale Resilienz (DORA)', 'Europaeisches Parlament und Rat / BaFin', 'Regulation (EU) 2022/2554', '2025-01-17', 'Digital operational resilience for financial entities', '["finance"]', 'Six DORA pillars', null, 'EU legislation', 'de+en');
insertFramework.run('dora-extended', 'DORA Extended', 'DORA Erweitert (RTS, TLPT, ICT-Konzentrationsrisiko)', 'Europaeische Kommission / BaFin', '2025', '2025-01-17', 'Extended DORA requirements', '["finance"]', 'TLPT, concentration risk, advanced reporting', null, 'EU legislation', 'de+en');
insertFramework.run('ozg', 'OZG Security', 'Onlinezugangsgesetz (OZG) Sicherheitsanforderungen', 'Bundesministerium des Innern und fuer Heimat (BMI) / FITKO', 'OZG 2.0 (2024)', '2024-01-01', 'Online government service security', '["government"]', 'Identity, encryption, pentesting, registers', null, 'Federal legislation', 'de+en');

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
