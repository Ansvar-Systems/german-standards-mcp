// scripts/ingest-bsi-ics.ts
// Ingests BSI ICS Security Kompendium — Industrial Control System security requirements.

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'data', 'extracted');
const OUTPUT_FILE = join(DATA_DIR, 'bsi-ics.json');

const controls = [
  // ICS-Risikomanagement
  { control_number: 'ICS-01', title_nl: 'ICS-Risikoanalyse', title: 'ICS risk analysis', description_nl: 'Fuer alle ICS-Komponenten MUSS eine Risikoanalyse durchgefuehrt werden, die OT-spezifische Bedrohungen und Schwachstellen beruecksichtigt.', description: 'A risk analysis MUST be performed for all ICS components considering OT-specific threats and vulnerabilities.', category: 'Risikomanagement', subcategory: 'Risikoanalyse', level: 'Verpflichtend', iso_mapping: 'A.5.7', implementation_guidance: 'ICS-spezifische Risikoanalyse mit Safety/Security-Integration. STRIDE fuer OT anpassen.', verification_guidance: 'ICS-Risikoanalyse auf OT-spezifische Bedrohungen pruefen.', source_url: 'https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/Empfehlungen-nach-Angriffszielen/Industrielle-Steuerungs-und-Automatisierungssysteme/industrielle-steuerungs-und-automatisierungssysteme_node.html' },

  // Netzwerksegmentierung
  { control_number: 'ICS-02', title_nl: 'IT/OT-Segmentierung', title: 'IT/OT segmentation', description_nl: 'OT-Netzwerke MUESSEN strikt von IT-Netzwerken getrennt werden. Eine DMZ zwischen IT und OT MUSS eingerichtet werden. Direkte Verbindungen zwischen IT und OT DUERFEN NICHT bestehen.', description: 'OT networks MUST be strictly separated from IT networks. A DMZ between IT and OT MUST be established. Direct connections between IT and OT MUST NOT exist.', category: 'Netzwerksicherheit', subcategory: 'IT/OT-Segmentierung', level: 'Verpflichtend', iso_mapping: 'A.8.22', implementation_guidance: 'Purdue-Modell oder IEC 62443 Zonen/Conduits. DMZ fuer Datenaustausch. Unidirektionale Gateways.', verification_guidance: 'IT/OT-Netzwerktopologie und Segmentierung pruefen.', source_url: null },
  { control_number: 'ICS-03', title_nl: 'Fernzugriff auf ICS-Systeme', title: 'Remote access to ICS systems', description_nl: 'Fernzugriff auf ICS-Systeme MUSS stark eingeschraenkt werden. Wenn Fernzugriff erforderlich ist, MUSS dieser ueber eine gesicherte VPN-Verbindung mit MFA erfolgen.', description: 'Remote access to ICS systems MUST be strictly limited. If remote access is required, it MUST be through a secured VPN connection with MFA.', category: 'Netzwerksicherheit', subcategory: 'Fernzugriff', level: 'Verpflichtend', iso_mapping: 'A.8.20', implementation_guidance: 'VPN mit MFA fuer OT-Fernzugriff. Jump-Server in DMZ. Zeitlich begrenzte Zugaenge.', verification_guidance: 'Fernzugriffskonfiguration und MFA-Einsatz pruefen.', source_url: null },

  // Zugriffskontrolle
  { control_number: 'ICS-04', title_nl: 'ICS-Zugriffskontrolle', title: 'ICS access control', description_nl: 'Der Zugriff auf ICS-Komponenten MUSS durch angemessene Authentisierung und Autorisierung geschuetzt werden. Standardpasswoerter MUESSEN geaendert werden.', description: 'Access to ICS components MUST be protected by appropriate authentication and authorization. Default passwords MUST be changed.', category: 'Zugriffskontrolle', subcategory: 'Authentisierung', level: 'Verpflichtend', iso_mapping: 'A.8.5', implementation_guidance: 'Individuelle Konten fuer ICS-Zugriff. Standardpasswoerter aendern. MFA wo technisch moeglich.', verification_guidance: 'Zugriffskontrolle und Standardpasswoerter auf ICS-Komponenten pruefen.', source_url: null },

  // Haertung
  { control_number: 'ICS-05', title_nl: 'Haertung von ICS-Komponenten', title: 'Hardening of ICS components', description_nl: 'ICS-Komponenten MUESSEN so weit wie moeglich gehaertet werden. Nicht benoetigte Dienste, Ports und Protokolle MUESSEN deaktiviert werden.', description: 'ICS components MUST be hardened as much as possible. Unnecessary services, ports, and protocols MUST be disabled.', category: 'Systemhaertung', subcategory: 'ICS-Haertung', level: 'Verpflichtend', iso_mapping: 'A.8.9', implementation_guidance: 'Unnoetige Dienste deaktivieren. USB-Ports sperren. Firmware-Versionen dokumentieren.', verification_guidance: 'Haertungsstatus der ICS-Komponenten pruefen.', source_url: null },
  { control_number: 'ICS-06', title_nl: 'Patch-Management fuer ICS', title: 'Patch management for ICS', description_nl: 'Patches fuer ICS-Komponenten MUESSEN vor dem Einspielen in einer Testumgebung validiert werden. Die Auswirkungen auf den Betrieb und die Safety MUESSEN bewertet werden.', description: 'Patches for ICS components MUST be validated in a test environment before deployment. Impact on operations and safety MUST be assessed.', category: 'Systemhaertung', subcategory: 'Patch-Management', level: 'Verpflichtend', iso_mapping: 'A.8.8', implementation_guidance: 'OT-spezifischer Patch-Prozess mit Herstellerfreigabe und Testumgebung. Kompensatorische Massnahmen bei ungepatchten Systemen.', verification_guidance: 'Patch-Prozess und Patch-Stand der ICS-Komponenten pruefen.', source_url: null },

  // Protokollierung und Ueberwachung
  { control_number: 'ICS-07', title_nl: 'ICS-Protokollierung', title: 'ICS logging', description_nl: 'Sicherheitsrelevante Ereignisse in ICS-Systemen MUESSEN protokolliert werden. Die Protokolldaten SOLLTEN an ein zentrales SIEM weitergeleitet werden.', description: 'Security-relevant events in ICS systems MUST be logged. Log data SHOULD be forwarded to a central SIEM.', category: 'Ueberwachung', subcategory: 'Protokollierung', level: 'Verpflichtend', iso_mapping: 'A.8.15', implementation_guidance: 'OT-faehige Log-Sammlung. Passive Netzwerkueberwachung fuer ICS-Protokolle (Modbus, OPC UA).', verification_guidance: 'ICS-Protokollierung und SIEM-Integration pruefen.', source_url: null },
  { control_number: 'ICS-08', title_nl: 'Anomalieerkennung in ICS-Netzwerken', title: 'Anomaly detection in ICS networks', description_nl: 'ICS-Netzwerke SOLLTEN durch Anomalieerkennungssysteme ueberwacht werden, die unuebliches Verhalten in industriellen Protokollen identifizieren koennen.', description: 'ICS networks SHOULD be monitored by anomaly detection systems that can identify unusual behavior in industrial protocols.', category: 'Ueberwachung', subcategory: 'Anomalieerkennung', level: 'Empfohlen', iso_mapping: 'A.8.16', implementation_guidance: 'OT-IDS/IPS (z.B. Nozomi, Claroty). Baseline-Verhalten der ICS-Kommunikation erfassen.', verification_guidance: 'Anomalieerkennungsfaehigkeit und Konfiguration pruefen.', source_url: null },

  // Notfallmanagement
  { control_number: 'ICS-09', title_nl: 'ICS-Notfallplanung', title: 'ICS emergency planning', description_nl: 'Fuer ICS-Systeme MUESSEN spezifische Notfallplaene vorhanden sein, die den sicheren Zustand der Anlage bei IT-Ausfaellen gewaehrleisten. Safety-Funktionen MUESSEN auch ohne IT funktionsfaehig bleiben.', description: 'Specific emergency plans MUST exist for ICS systems ensuring the safe state of the plant during IT failures. Safety functions MUST remain operational without IT.', category: 'Notfallmanagement', subcategory: 'ICS-Notfall', level: 'Verpflichtend', iso_mapping: 'A.5.29', implementation_guidance: 'ICS-Notfallplan mit sicherem Anlagenzustand. Safety-Systeme unabhaengig von IT. Regelmaessige Uebungen.', verification_guidance: 'ICS-Notfallplaene und Unabhaengigkeit der Safety-Systeme pruefen.', source_url: null },

  // Physische Sicherheit
  { control_number: 'ICS-10', title_nl: 'Physischer Schutz von ICS-Komponenten', title: 'Physical protection of ICS components', description_nl: 'ICS-Komponenten (SPS, HMI, Schaltschraenke) MUESSEN physisch vor unbefugtem Zugriff geschuetzt werden. Schaltschraenke MUESSEN abschliessbar sein.', description: 'ICS components (PLC, HMI, control cabinets) MUST be physically protected against unauthorized access. Control cabinets MUST be lockable.', category: 'Physische Sicherheit', subcategory: 'Schutz', level: 'Verpflichtend', iso_mapping: 'A.7.2', implementation_guidance: 'Schaltschraenke abschliessen. Zugangskontrolle fuer Leittechnik-Raeume. Manipulationssichere Siegel.', verification_guidance: 'Physischen Schutz der ICS-Komponenten pruefen.', source_url: null },
];

const output = {
  framework: {
    id: 'bsi-ics',
    name: 'BSI ICS Security Compendium',
    name_nl: 'BSI ICS-Security-Kompendium',
    issuing_body: 'Bundesamt fuer Sicherheit in der Informationstechnik (BSI)',
    version: '2024',
    effective_date: '2024-01-01',
    scope: 'Security requirements for Industrial Control Systems (ICS), SCADA, and operational technology (OT) environments',
    scope_sectors: ['energy', 'water', 'manufacturing', 'transport'],
    structure_description: 'Covers ICS risk management, IT/OT segmentation, access control, system hardening, patch management, logging, anomaly detection, emergency planning, and physical security for OT environments.',
    source_url: 'https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/Empfehlungen-nach-Angriffszielen/Industrielle-Steuerungs-und-Automatisierungssysteme/industrielle-steuerungs-und-automatisierungssysteme_node.html',
    license: 'Public document',
    language: 'de+en',
  },
  controls,
  metadata: { ingested_at: new Date().toISOString(), total_controls: controls.length },
};

mkdirSync(DATA_DIR, { recursive: true });
writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf-8');
console.log(`BSI ICS: ${controls.length} controls written to ${OUTPUT_FILE}`);
