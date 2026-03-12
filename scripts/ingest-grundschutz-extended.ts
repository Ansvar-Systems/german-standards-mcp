// scripts/ingest-grundschutz-extended.ts
// Extends BSI IT-Grundschutz Kompendium with additional Bausteine not covered
// in the base ingest-grundschutz.ts. The base covers ISMS.1, ORP.1-4, OPS.1.1-1.2,
// DER.1-2, APP.1.1, SYS.1.1, SYS.2.1, NET.1.1-1.2, CON.2.
// This script adds: CON.1, CON.3, CON.6-10, OPS.1.3-1.5, OPS.2.1-2.2, DER.3-4,
// APP.1.2, APP.2.1-2.2, APP.3.1-3.2, APP.5.3, SYS.1.2-1.8, SYS.2.2-2.3,
// SYS.3.1-3.2, SYS.4.1, NET.2.1-2.2, NET.3.1-3.2, INF.1-2, INF.5, IND.1-2.
//
// These controls are merged at build time by reading both JSON files.

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'data', 'extracted');
const OUTPUT_FILE = join(DATA_DIR, 'bsi-grundschutz-extended.json');

interface GrundschutzControl {
  control_number: string;
  title: string | null;
  title_nl: string;
  description: string | null;
  description_nl: string;
  category: string;
  subcategory: string;
  level: string;
  iso_mapping: string | null;
  implementation_guidance: string | null;
  verification_guidance: string | null;
  source_url: string | null;
}

const controls: GrundschutzControl[] = [

  // =====================================================================
  // CON.1 — Kryptokonzept (Cryptographic Concept)
  // =====================================================================
  {
    control_number: 'CON.1.A1',
    title_nl: 'Auswahl geeigneter kryptographischer Verfahren',
    title: 'Selection of suitable cryptographic methods',
    description_nl: 'Es MUESSEN geeignete kryptographische Verfahren ausgewaehlt werden. Dabei MUSS sichergestellt sein, dass etablierte Algorithmen verwendet werden, die von der Fachwelt intensiv untersucht wurden und keine bekannten Schwaechen aufweisen.',
    description: 'Suitable cryptographic methods MUST be selected. It MUST be ensured that established algorithms are used that have been intensively studied by experts and have no known weaknesses.',
    category: 'CON', subcategory: 'Kryptokonzept', level: 'Basis', iso_mapping: 'A.8.24',
    implementation_guidance: 'Kryptokonzept erstellen. Nur BSI TR-02102-empfohlene Algorithmen einsetzen.',
    verification_guidance: 'Eingesetzte Algorithmen gegen aktuelle BSI-Empfehlungen pruefen.',
    source_url: 'https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/Grundschutz/IT-GS-Kompendium_Einzel_PDFs_2023/03_CON_Bausteine/CON_1_Kryptokonzept.html',
  },
  {
    control_number: 'CON.1.A2',
    title_nl: 'Datensicherung bei Einsatz kryptographischer Verfahren',
    title: 'Data backup when using cryptographic methods',
    description_nl: 'In Datensicherungen MUESSEN kryptographische Schluessel vom gesicherten Datenbestand getrennt aufbewahrt werden. Bei verschluesselten Daten MUESSEN auch die verwendeten kryptographischen Schluessel gesichert werden.',
    description: 'In data backups, cryptographic keys MUST be stored separately from the backed-up data. For encrypted data, the cryptographic keys used MUST also be backed up.',
    category: 'CON', subcategory: 'Kryptokonzept', level: 'Basis', iso_mapping: 'A.8.24',
    implementation_guidance: 'Schluessel-Backup-Verfahren separat vom Daten-Backup etablieren. Escrow-Mechanismen pruefen.',
    verification_guidance: 'Schluessel-Backup-Verfahren und Wiederherstellbarkeit testen.',
    source_url: 'https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/Grundschutz/IT-GS-Kompendium_Einzel_PDFs_2023/03_CON_Bausteine/CON_1_Kryptokonzept.html',
  },
  {
    control_number: 'CON.1.A3',
    title_nl: 'Verschluesselung der Kommunikationsverbindungen',
    title: 'Encryption of communication connections',
    description_nl: 'Es SOLLTE entschieden und dokumentiert werden, fuer welche Kommunikationsverbindungen eine Verschluesselung eingesetzt werden soll. Grundsaetzlich SOLLTE fuer die Kommunikation eine Transport- und/oder Inhaltsverschluesselung eingesetzt werden.',
    description: 'It SHOULD be decided and documented for which communication connections encryption should be used. In principle, transport and/or content encryption SHOULD be used for communication.',
    category: 'CON', subcategory: 'Kryptokonzept', level: 'Standard', iso_mapping: 'A.8.24',
    implementation_guidance: 'Kommunikationsmatrix erstellen. TLS fuer alle externen Verbindungen erzwingen.',
    verification_guidance: 'Kommunikationsmatrix auf Verschluesselungsabdeckung pruefen.',
    source_url: null,
  },
  {
    control_number: 'CON.1.A4',
    title_nl: 'Geeignetes Schluesselmanagement',
    title: 'Suitable key management',
    description_nl: 'Kryptographische Schluessel SOLLTEN immer mit geeigneten Schluesselgeneratoren und in einer sicheren Umgebung erzeugt werden. Ein Schluessel SOLLTE moeglichst nur fuer einen Einsatzzweck dienen. Schluesselmanagement-Prozesse MUESSEN den gesamten Lebenszyklus abdecken.',
    description: 'Cryptographic keys SHOULD always be generated with suitable key generators in a secure environment. A key SHOULD ideally serve only one purpose. Key management processes MUST cover the entire lifecycle.',
    category: 'CON', subcategory: 'Kryptokonzept', level: 'Standard', iso_mapping: 'A.8.24',
    implementation_guidance: 'KMS einsetzen. Schluessel-Lifecycle (Erzeugung, Verteilung, Speicherung, Rotation, Vernichtung) dokumentieren.',
    verification_guidance: 'Schluesselmanagement-Prozess und KMS-Konfiguration pruefen.',
    source_url: null,
  },
  {
    control_number: 'CON.1.A5',
    title_nl: 'Sicheres Loeschen und Vernichten von kryptographischen Schluesseln',
    title: 'Secure deletion and destruction of cryptographic keys',
    description_nl: 'Nicht mehr benoetigte private Schluessel MUESSEN sicher geloescht oder vernichtet werden. Die Vernichtung MUSS so erfolgen, dass keine Rueckgewinnung moeglich ist.',
    description: 'Private keys that are no longer needed MUST be securely deleted or destroyed. Destruction MUST be done in a way that prevents recovery.',
    category: 'CON', subcategory: 'Kryptokonzept', level: 'Basis', iso_mapping: 'A.8.10',
    implementation_guidance: 'Schluesselvernichtungsverfahren definieren. Bei HSMs Zeroize-Funktion nutzen.',
    verification_guidance: 'Vernichtungsnachweise und -verfahren pruefen.',
    source_url: null,
  },

  // =====================================================================
  // CON.3 — Datensicherungskonzept (Backup Concept)
  // =====================================================================
  {
    control_number: 'CON.3.A1',
    title_nl: 'Erhebung der Einflussfaktoren fuer Datensicherungen',
    title: 'Assessment of influencing factors for data backups',
    description_nl: 'Es MUESSEN die Einflussfaktoren ermittelt werden, die die Anforderungen an die Datensicherung bestimmen. Dabei MUESSEN die Verfuegbarkeitsanforderungen, die Datenmenge, die Aenderungsfrequenz und die Aufbewahrungsfristen beruecksichtigt werden.',
    description: 'The influencing factors determining backup requirements MUST be assessed. Availability requirements, data volume, change frequency, and retention periods MUST be considered.',
    category: 'CON', subcategory: 'Datensicherungskonzept', level: 'Basis', iso_mapping: 'A.8.13',
    implementation_guidance: 'Datensicherungskonzept mit RTO/RPO pro System erstellen. Datenklassifizierung beruecksichtigen.',
    verification_guidance: 'Datensicherungskonzept auf Vollstaendigkeit und Aktualitaet pruefen.',
    source_url: null,
  },
  {
    control_number: 'CON.3.A2',
    title_nl: 'Festlegung der Verfahrensweise fuer die Datensicherung',
    title: 'Definition of data backup procedures',
    description_nl: 'Fuer die Datensicherung MUESSEN Verfahren festgelegt werden, die Sicherungsintervall, Sicherungsmedien, Aufbewahrungsort und Wiederherstellungsverfahren umfassen.',
    description: 'Procedures MUST be defined for data backups covering backup intervals, media, storage location, and recovery procedures.',
    category: 'CON', subcategory: 'Datensicherungskonzept', level: 'Basis', iso_mapping: 'A.8.13',
    implementation_guidance: '3-2-1-Backup-Regel anwenden (3 Kopien, 2 Medientypen, 1 Offsite). Sicherungsintervalle nach RPO.',
    verification_guidance: 'Backup-Konfiguration und Offsite-Speicherung pruefen.',
    source_url: null,
  },
  {
    control_number: 'CON.3.A3',
    title_nl: 'Ueberpruefung und Wiederherstellungstests',
    title: 'Verification and recovery tests',
    description_nl: 'Die Datensicherungen MUESSEN regelmaessig auf Integritaet und Wiederherstellbarkeit getestet werden. Die Wiederherstellungstests SOLLTEN unter realistischen Bedingungen durchgefuehrt werden.',
    description: 'Data backups MUST be regularly tested for integrity and restorability. Recovery tests SHOULD be performed under realistic conditions.',
    category: 'CON', subcategory: 'Datensicherungskonzept', level: 'Basis', iso_mapping: 'A.8.13',
    implementation_guidance: 'Quartalsweise Restore-Tests durchfuehren. Ergebnisse dokumentieren.',
    verification_guidance: 'Restore-Test-Protokolle und Erfolgsraten pruefen.',
    source_url: null,
  },
  {
    control_number: 'CON.3.A4',
    title_nl: 'Schutz der Datensicherungen',
    title: 'Protection of data backups',
    description_nl: 'Datensicherungen MUESSEN vor unberechtigtem Zugriff geschuetzt werden. Der Zugriff auf Datensicherungsmedien MUSS auf befugte Personen eingeschraenkt sein. Datensicherungen SOLLTEN verschluesselt werden.',
    description: 'Data backups MUST be protected against unauthorized access. Access to backup media MUST be restricted to authorized persons. Backups SHOULD be encrypted.',
    category: 'CON', subcategory: 'Datensicherungskonzept', level: 'Basis', iso_mapping: 'A.8.13',
    implementation_guidance: 'Backup-Verschluesselung aktivieren. Zugriff auf Backup-Systeme durch PAM kontrollieren.',
    verification_guidance: 'Verschluesselung und Zugriffskontrolle der Backup-Systeme pruefen.',
    source_url: null,
  },

  // =====================================================================
  // CON.6 — Loeschen und Vernichten (Deletion and Destruction)
  // =====================================================================
  {
    control_number: 'CON.6.A1',
    title_nl: 'Regelung fuer die Loeschung und Vernichtung von Informationen',
    title: 'Regulation for deletion and destruction of information',
    description_nl: 'Es MUESSEN Regelungen fuer das Loeschen und Vernichten von Informationen festgelegt werden. Es MUSS festgelegt werden, welche Informationen wann geloescht oder vernichtet werden muessen.',
    description: 'Regulations for deletion and destruction of information MUST be established. It MUST be defined which information must be deleted or destroyed and when.',
    category: 'CON', subcategory: 'Loeschen und Vernichten', level: 'Basis', iso_mapping: 'A.8.10',
    implementation_guidance: 'Loeschkonzept mit Aufbewahrungsfristen und Loeschmethoden pro Datenklasse erstellen.',
    verification_guidance: 'Loeschkonzept auf Vollstaendigkeit und Umsetzung pruefen.',
    source_url: null,
  },
  {
    control_number: 'CON.6.A2',
    title_nl: 'Ordnungsgemaeße Entsorgung von Datentraegern und Dokumenten',
    title: 'Proper disposal of data carriers and documents',
    description_nl: 'Datentraeger und Dokumente MUESSEN so entsorgt werden, dass keine Rueckschluesse auf die enthaltenen Informationen moeglich sind. Die Entsorgung MUSS nach DIN 66399 oder vergleichbarem Standard erfolgen.',
    description: 'Data carriers and documents MUST be disposed of so that no conclusions about contained information are possible. Disposal MUST follow DIN 66399 or comparable standard.',
    category: 'CON', subcategory: 'Loeschen und Vernichten', level: 'Basis', iso_mapping: 'A.7.14',
    implementation_guidance: 'Datentraegervernichtung nach DIN 66399 Sicherheitsstufe 3+ fuer vertrauliche Daten. Aktenvernichter Stufe P-4+.',
    verification_guidance: 'Vernichtungsnachweise und eingesetzte Sicherheitsstufen pruefen.',
    source_url: null,
  },

  // =====================================================================
  // CON.7 — Informationssicherheit auf Reisen (Information Security While Travelling)
  // =====================================================================
  {
    control_number: 'CON.7.A1',
    title_nl: 'Sicherheitsrichtlinie fuer mobile Arbeit',
    title: 'Security policy for mobile work',
    description_nl: 'Es MUSS eine Sicherheitsrichtlinie fuer mobiles Arbeiten und Reisen geben. Diese MUSS Regelungen fuer den Umgang mit mobilen IT-Geraeten, Datentraegern und vertraulichen Dokumenten auf Reisen enthalten.',
    description: 'There MUST be a security policy for mobile work and travel. This MUST contain regulations for handling mobile IT devices, data carriers, and confidential documents while travelling.',
    category: 'CON', subcategory: 'Informationssicherheit auf Reisen', level: 'Basis', iso_mapping: 'A.6.7',
    implementation_guidance: 'Mobile-Work-Policy erstellen. Sichtschutzfolie, VPN-Pflicht, Geraeteverschluesselung vorschreiben.',
    verification_guidance: 'Mobile-Work-Policy und deren Bekanntheit bei Mitarbeitern pruefen.',
    source_url: null,
  },
  {
    control_number: 'CON.7.A2',
    title_nl: 'Nutzung oeffentlicher WLANs',
    title: 'Use of public WLANs',
    description_nl: 'Es MUSS geregelt sein, ob und unter welchen Bedingungen oeffentliche WLANs genutzt werden duerfen. Wenn oeffentliche WLANs erlaubt sind, MUSS ein VPN fuer alle Verbindungen zum Institutionsnetz verwendet werden.',
    description: 'It MUST be regulated whether and under what conditions public WLANs may be used. If public WLANs are permitted, a VPN MUST be used for all connections to the institutional network.',
    category: 'CON', subcategory: 'Informationssicherheit auf Reisen', level: 'Basis', iso_mapping: 'A.8.20',
    implementation_guidance: 'VPN-Zwang fuer alle Verbindungen ueber oeffentliche Netze konfigurieren.',
    verification_guidance: 'VPN-Konfiguration und Durchsetzung auf mobilen Geraeten pruefen.',
    source_url: null,
  },

  // =====================================================================
  // CON.8 — Software-Entwicklung (Software Development)
  // =====================================================================
  {
    control_number: 'CON.8.A1',
    title_nl: 'Definition von Rollen und Verantwortlichkeiten in der Software-Entwicklung',
    title: 'Definition of roles and responsibilities in software development',
    description_nl: 'Fuer den Software-Entwicklungsprozess MUESSEN alle Rollen und Zustaendigkeiten festgelegt werden. Fuer die entwickelte Software MUSS ein Verantwortlicher benannt werden.',
    description: 'All roles and responsibilities MUST be defined for the software development process. A responsible person MUST be designated for the developed software.',
    category: 'CON', subcategory: 'Software-Entwicklung', level: 'Basis', iso_mapping: 'A.8.25',
    implementation_guidance: 'SDLC-Rollen definieren: Product Owner, Developer, Security Champion, Tester.',
    verification_guidance: 'Rollenverteilung und Verantwortlichkeiten im SDLC pruefen.',
    source_url: null,
  },
  {
    control_number: 'CON.8.A2',
    title_nl: 'Auswahl eines Vorgehensmodells fuer die Software-Entwicklung',
    title: 'Selection of a process model for software development',
    description_nl: 'Es MUSS ein geeignetes Vorgehensmodell fuer die Software-Entwicklung ausgewaehlt werden. Anhand des Vorgehensmodells MUSS ein Entwicklungsprozess fuer die Software festgelegt werden.',
    description: 'A suitable process model for software development MUST be selected. Based on the process model, a development process MUST be defined for the software.',
    category: 'CON', subcategory: 'Software-Entwicklung', level: 'Basis', iso_mapping: 'A.8.25',
    implementation_guidance: 'Agiles oder V-Modell-basiertes Vorgehensmodell waehlen. Security-Gates einbauen.',
    verification_guidance: 'Dokumentiertes Vorgehensmodell und Security-Integration pruefen.',
    source_url: null,
  },
  {
    control_number: 'CON.8.A3',
    title_nl: 'Sichere Beschaffung und Nutzung von Bibliotheken und Frameworks',
    title: 'Secure procurement and use of libraries and frameworks',
    description_nl: 'Werden externe Bibliotheken oder Frameworks genutzt, MUESSEN diese auf bekannte Schwachstellen geprueft werden. Es MUSS sichergestellt sein, dass nur vertrauenswuerdige und gewartete Bibliotheken eingesetzt werden.',
    description: 'When external libraries or frameworks are used, they MUST be checked for known vulnerabilities. It MUST be ensured that only trusted and maintained libraries are used.',
    category: 'CON', subcategory: 'Software-Entwicklung', level: 'Basis', iso_mapping: 'A.8.28',
    implementation_guidance: 'Software Composition Analysis (SCA) in CI/CD-Pipeline integrieren. Dependency-Updates automatisieren.',
    verification_guidance: 'SCA-Konfiguration und Ergebnisbehandlung pruefen.',
    source_url: null,
  },
  {
    control_number: 'CON.8.A4',
    title_nl: 'Durchfuehrung von Sicherheitstests',
    title: 'Execution of security tests',
    description_nl: 'Es MUESSEN Sicherheitstests waehrend und nach der Software-Entwicklung durchgefuehrt werden. Dazu SOLLTEN statische und dynamische Codeanalysen sowie Penetrationstests gehoeren.',
    description: 'Security tests MUST be performed during and after software development. This SHOULD include static and dynamic code analysis as well as penetration tests.',
    category: 'CON', subcategory: 'Software-Entwicklung', level: 'Basis', iso_mapping: 'A.8.29',
    implementation_guidance: 'SAST in CI-Pipeline. DAST vor Releases. Jaehrliche Penetrationstests durch Externe.',
    verification_guidance: 'Security-Testing-Ergebnisse und Behebungsraten pruefen.',
    source_url: null,
  },

  // =====================================================================
  // CON.10 — Entwicklung von Webanwendungen
  // =====================================================================
  {
    control_number: 'CON.10.A1',
    title_nl: 'Authentisierung bei Webanwendungen',
    title: 'Authentication in web applications',
    description_nl: 'Die Webanwendung MUSS geeignete Authentisierungsmechanismen implementieren. Passwort-basierte Authentisierung MUSS sichere Speicherverfahren (z.B. bcrypt, Argon2) verwenden.',
    description: 'The web application MUST implement suitable authentication mechanisms. Password-based authentication MUST use secure storage methods (e.g., bcrypt, Argon2).',
    category: 'CON', subcategory: 'Entwicklung von Webanwendungen', level: 'Basis', iso_mapping: 'A.8.5',
    implementation_guidance: 'Argon2id oder bcrypt fuer Passwort-Hashing. MFA implementieren. Session-Management haerten.',
    verification_guidance: 'Authentisierungsmechanismen und Passwort-Hashing-Verfahren pruefen.',
    source_url: null,
  },
  {
    control_number: 'CON.10.A2',
    title_nl: 'Zugriffskontrolle in Webanwendungen',
    title: 'Access control in web applications',
    description_nl: 'Die Webanwendung MUSS fuer jeden Zugriff pruefen, ob der Benutzer die noetige Berechtigung hat. Serverseitige Autorisierungspruefungen MUESSEN fuer alle schuetzenswerten Ressourcen durchgefuehrt werden.',
    description: 'The web application MUST verify for each access whether the user has the required authorization. Server-side authorization checks MUST be performed for all resources worth protecting.',
    category: 'CON', subcategory: 'Entwicklung von Webanwendungen', level: 'Basis', iso_mapping: 'A.8.3',
    implementation_guidance: 'Serverseitige Autorisierung fuer alle Endpoints. IDOR-Schutzmassnahmen implementieren.',
    verification_guidance: 'Autorisierungsmechanismen durch Security-Tests pruefen.',
    source_url: null,
  },
  {
    control_number: 'CON.10.A3',
    title_nl: 'Eingabevalidierung und Ausgabekodierung',
    title: 'Input validation and output encoding',
    description_nl: 'Alle Eingabedaten MUESSEN serverseitig validiert werden. Ausgabedaten MUESSEN kontextabhaengig kodiert werden, um Injection-Angriffe wie XSS und SQL-Injection zu verhindern.',
    description: 'All input data MUST be validated server-side. Output data MUST be context-dependently encoded to prevent injection attacks like XSS and SQL injection.',
    category: 'CON', subcategory: 'Entwicklung von Webanwendungen', level: 'Basis', iso_mapping: 'A.8.28',
    implementation_guidance: 'Input-Validation-Whitelist-Ansatz. Prepared Statements fuer SQL. Context-aware Output-Encoding.',
    verification_guidance: 'OWASP-Top-10-Tests auf Injection-Schwachstellen durchfuehren.',
    source_url: null,
  },

  // =====================================================================
  // OPS.1.1.3 — Patch- und Aenderungsmanagement
  // =====================================================================
  {
    control_number: 'OPS.1.1.3.A1',
    title_nl: 'Konzept fuer das Patch- und Aenderungsmanagement',
    title: 'Concept for patch and change management',
    description_nl: 'Es MUSS ein Konzept fuer das Patch- und Aenderungsmanagement erstellt und umgesetzt werden. Darin MUESSEN die Zustaendigkeiten fuer Patches und Aenderungen definiert sein.',
    description: 'A concept for patch and change management MUST be created and implemented. Responsibilities for patches and changes MUST be defined therein.',
    category: 'OPS', subcategory: 'Patch- und Aenderungsmanagement', level: 'Basis', iso_mapping: 'A.8.32',
    implementation_guidance: 'Patch-Management-Prozess mit Risikoklassifizierung, Test- und Rollback-Verfahren definieren.',
    verification_guidance: 'Patch-Management-Konzept und Umsetzung pruefen.',
    source_url: null,
  },
  {
    control_number: 'OPS.1.1.3.A2',
    title_nl: 'Festlegung der Verantwortlichkeiten fuer das Patch-Management',
    title: 'Definition of responsibilities for patch management',
    description_nl: 'Es MUESSEN die Rollen und Verantwortlichkeiten fuer das Patch-Management festgelegt werden. Fuer alle eingesetzten IT-Systeme und Software MUSS klar definiert sein, wer fuer deren Aktualisierung zustaendig ist.',
    description: 'Roles and responsibilities for patch management MUST be defined. For all IT systems and software in use, it MUST be clearly defined who is responsible for their updates.',
    category: 'OPS', subcategory: 'Patch- und Aenderungsmanagement', level: 'Basis', iso_mapping: 'A.8.32',
    implementation_guidance: 'Patch-Verantwortliche pro Systemgruppe benennen. RACI-Matrix erstellen.',
    verification_guidance: 'Verantwortlichkeitsmatrix und Stellvertreterregelungen pruefen.',
    source_url: null,
  },
  {
    control_number: 'OPS.1.1.3.A3',
    title_nl: 'Zeitnahe Beschaffung und Installation von Patches',
    title: 'Timely procurement and installation of patches',
    description_nl: 'Sicherheitsrelevante Patches und Updates MUESSEN zeitnah nach Veroeffentlichung eingespielt werden. Fuer kritische Schwachstellen MUESSEN beschleunigte Verfahren definiert sein.',
    description: 'Security-relevant patches and updates MUST be applied promptly after release. Accelerated procedures MUST be defined for critical vulnerabilities.',
    category: 'OPS', subcategory: 'Patch- und Aenderungsmanagement', level: 'Basis', iso_mapping: 'A.8.8',
    implementation_guidance: 'Kritische Patches innerhalb 72h. Hohe Patches innerhalb 7 Tage. Automatisierte Patch-Verteilung einsetzen.',
    verification_guidance: 'Patch-Compliance-Raten und Zeitnachweise pruefen.',
    source_url: null,
  },

  // =====================================================================
  // OPS.1.1.4 — Schutz vor Schadprogrammen
  // =====================================================================
  {
    control_number: 'OPS.1.1.4.A1',
    title_nl: 'Erstellung eines Konzepts fuer den Schutz vor Schadprogrammen',
    title: 'Creation of a concept for malware protection',
    description_nl: 'Es MUSS ein Konzept erstellt werden, das beschreibt, welche IT-Systeme vor Schadprogrammen geschuetzt werden muessen. Es MUESSEN geeignete Anti-Malware-Loesungen fuer alle relevanten IT-Systeme ausgewaehlt und eingesetzt werden.',
    description: 'A concept MUST be created describing which IT systems need to be protected against malware. Suitable anti-malware solutions MUST be selected and deployed for all relevant IT systems.',
    category: 'OPS', subcategory: 'Schutz vor Schadprogrammen', level: 'Basis', iso_mapping: 'A.8.7',
    implementation_guidance: 'Anti-Malware auf allen Endpoints, Servern und Mail-Gateways. Signatur-Updates automatisieren.',
    verification_guidance: 'Anti-Malware-Abdeckung und Signaturaktualitaet pruefen.',
    source_url: null,
  },
  {
    control_number: 'OPS.1.1.4.A2',
    title_nl: 'Nutzung systemspezifischer Schutzmechanismen',
    title: 'Use of system-specific protection mechanisms',
    description_nl: 'Es SOLLTEN die auf den eingesetzten Systemen vorhandenen Schutzmechanismen gegen Schadprogramme aktiviert und konfiguriert werden (z.B. Windows Defender, AppArmor, SELinux).',
    description: 'Protection mechanisms against malware available on the deployed systems SHOULD be activated and configured (e.g., Windows Defender, AppArmor, SELinux).',
    category: 'OPS', subcategory: 'Schutz vor Schadprogrammen', level: 'Standard', iso_mapping: 'A.8.7',
    implementation_guidance: 'Betriebssystemeigene Schutzmechanismen (ASLR, DEP, AppArmor, SELinux) aktivieren.',
    verification_guidance: 'Konfiguration der Schutzmechanismen auf den Systemen pruefen.',
    source_url: null,
  },

  // =====================================================================
  // OPS.1.1.5 — Protokollierung
  // =====================================================================
  {
    control_number: 'OPS.1.1.5.A1',
    title_nl: 'Erstellung einer Sicherheitsrichtlinie fuer die Protokollierung',
    title: 'Creation of a security policy for logging',
    description_nl: 'Es MUSS eine Sicherheitsrichtlinie fuer die Protokollierung erstellt werden. Darin MUESSEN Verantwortlichkeiten, zu protokollierende Ereignisse, Speicherfristen und Schutzmassnahmen fuer Protokolldaten definiert werden.',
    description: 'A security policy for logging MUST be created. It MUST define responsibilities, events to be logged, retention periods, and protection measures for log data.',
    category: 'OPS', subcategory: 'Protokollierung', level: 'Basis', iso_mapping: 'A.8.15',
    implementation_guidance: 'Logging-Richtlinie mit Mindest-Aufbewahrung (6 Monate), Integritaetsschutz und Zugriffskontrolle.',
    verification_guidance: 'Logging-Richtlinie und deren Umsetzung pruefen.',
    source_url: null,
  },
  {
    control_number: 'OPS.1.1.5.A2',
    title_nl: 'Konfiguration der Protokollierung auf System- und Netzebene',
    title: 'Configuration of logging at system and network level',
    description_nl: 'Es MUSS festgelegt werden, welche sicherheitsrelevanten Ereignisse auf welchen Systemen protokolliert werden muessen. Alle sicherheitsrelevanten Systemereignisse MUESSEN protokolliert werden.',
    description: 'It MUST be determined which security-relevant events must be logged on which systems. All security-relevant system events MUST be logged.',
    category: 'OPS', subcategory: 'Protokollierung', level: 'Basis', iso_mapping: 'A.8.15',
    implementation_guidance: 'Zentrale Log-Aggregation (SIEM). Mindest-Events: Login, Logout, Fehlversuche, Berechtigungsaenderungen, Systemfehler.',
    verification_guidance: 'Log-Abdeckung und SIEM-Regeln pruefen.',
    source_url: null,
  },
  {
    control_number: 'OPS.1.1.5.A3',
    title_nl: 'Zeitsynchronisation der IT-Systeme',
    title: 'Time synchronization of IT systems',
    description_nl: 'Alle IT-Systeme, die Protokolldaten erzeugen, MUESSEN zeitsynchron sein. Dafuer MUSS eine zuverlaessige Zeitquelle verwendet werden.',
    description: 'All IT systems generating log data MUST be time-synchronized. A reliable time source MUST be used.',
    category: 'OPS', subcategory: 'Protokollierung', level: 'Basis', iso_mapping: 'A.8.17',
    implementation_guidance: 'NTP-Infrastruktur mit mindestens zwei unabhaengigen Zeitquellen aufbauen.',
    verification_guidance: 'NTP-Konfiguration und Zeitabweichungen der Systeme pruefen.',
    source_url: null,
  },

  // =====================================================================
  // OPS.2.1 — Outsourcing-Nutzung
  // =====================================================================
  {
    control_number: 'OPS.2.1.A1',
    title_nl: 'Definition der Sicherheitsanforderungen fuer Outsourcing',
    title: 'Definition of security requirements for outsourcing',
    description_nl: 'Die Sicherheitsanforderungen an Outsourcing-Dienstleister MUESSEN vor Vertragsabschluss definiert und dokumentiert werden. Diese MUESSEN die eigenen Sicherheitsanforderungen widerspiegeln.',
    description: 'Security requirements for outsourcing providers MUST be defined and documented before contract conclusion. These MUST reflect the organization own security requirements.',
    category: 'OPS', subcategory: 'Outsourcing', level: 'Basis', iso_mapping: 'A.5.19',
    implementation_guidance: 'Sicherheitsanforderungskatalog fuer Dienstleister erstellen. In Ausschreibungen integrieren.',
    verification_guidance: 'Vertraege auf enthaltene Sicherheitsanforderungen pruefen.',
    source_url: null,
  },
  {
    control_number: 'OPS.2.1.A2',
    title_nl: 'Regelmaessige Kontrolle des Outsourcing-Dienstleisters',
    title: 'Regular control of the outsourcing provider',
    description_nl: 'Die Einhaltung der vereinbarten Sicherheitsanforderungen MUSS regelmaessig ueberprueft werden. Audit-Rechte MUESSEN vertraglich vereinbart sein.',
    description: 'Compliance with agreed security requirements MUST be regularly verified. Audit rights MUST be contractually agreed.',
    category: 'OPS', subcategory: 'Outsourcing', level: 'Basis', iso_mapping: 'A.5.22',
    implementation_guidance: 'Jaehrliche Audits des Dienstleisters. KPIs fuer Sicherheitsperformance vereinbaren.',
    verification_guidance: 'Audit-Berichte und KPI-Erreichung pruefen.',
    source_url: null,
  },

  // =====================================================================
  // OPS.2.2 — Cloud-Nutzung
  // =====================================================================
  {
    control_number: 'OPS.2.2.A1',
    title_nl: 'Erstellung einer Cloud-Nutzungsstrategie',
    title: 'Creation of a cloud usage strategy',
    description_nl: 'Es MUSS eine Cloud-Nutzungsstrategie erstellt werden. Darin MUSS festgelegt werden, fuer welche Einsatzzwecke Cloud-Dienste genutzt werden duerfen und welche Sicherheitsanforderungen dabei gelten.',
    description: 'A cloud usage strategy MUST be created. It MUST define for which purposes cloud services may be used and what security requirements apply.',
    category: 'OPS', subcategory: 'Cloud-Nutzung', level: 'Basis', iso_mapping: 'A.5.23',
    implementation_guidance: 'Cloud-Strategie mit Datenklassifizierung, Anbieterauswahl-Kriterien und Exit-Strategie erstellen.',
    verification_guidance: 'Cloud-Strategie und Umsetzung pruefen.',
    source_url: null,
  },
  {
    control_number: 'OPS.2.2.A2',
    title_nl: 'Sicherheitsanforderungen an Cloud-Dienste',
    title: 'Security requirements for cloud services',
    description_nl: 'Es MUESSEN Sicherheitsanforderungen fuer Cloud-Dienste definiert werden. Vor der Nutzung MUSS geprueft werden, ob der Cloud-Dienst die definierten Anforderungen erfuellt (z.B. C5-Testat).',
    description: 'Security requirements for cloud services MUST be defined. Before use, it MUST be verified whether the cloud service meets the defined requirements (e.g., C5 attestation).',
    category: 'OPS', subcategory: 'Cloud-Nutzung', level: 'Basis', iso_mapping: 'A.5.23',
    implementation_guidance: 'Cloud-Security-Anforderungskatalog erstellen. C5-Testat oder ISO 27001 als Mindestanforderung.',
    verification_guidance: 'Zertifizierungen und Testierungen der genutzten Cloud-Dienste pruefen.',
    source_url: null,
  },

  // =====================================================================
  // DER.3 — Sicherheitspruefungen (Security Audits)
  // =====================================================================
  {
    control_number: 'DER.3.A1',
    title_nl: 'Definition von Pruefungszielen und -umfang',
    title: 'Definition of audit objectives and scope',
    description_nl: 'Fuer jede Sicherheitspruefung MUESSEN die Pruefungsziele und der Pruefungsumfang festgelegt werden. Der Geltungsbereich MUSS definiert sein.',
    description: 'For each security audit, the audit objectives and scope MUST be defined. The scope MUST be defined.',
    category: 'DER', subcategory: 'Sicherheitspruefungen', level: 'Basis', iso_mapping: 'A.5.35',
    implementation_guidance: 'Audit-Plan mit Zielen, Umfang, Methoden und Zeitrahmen erstellen.',
    verification_guidance: 'Audit-Plaene und -Durchfuehrung pruefen.',
    source_url: null,
  },
  {
    control_number: 'DER.3.A2',
    title_nl: 'Planung und Durchfuehrung von Penetrationstests',
    title: 'Planning and execution of penetration tests',
    description_nl: 'Penetrationstests SOLLTEN regelmaessig durchgefuehrt werden. Die Tests SOLLTEN durch qualifizierte externe Dienstleister erfolgen. Ergebnisse MUESSEN dokumentiert und Massnahmen abgeleitet werden.',
    description: 'Penetration tests SHOULD be performed regularly. Tests SHOULD be conducted by qualified external service providers. Results MUST be documented and measures derived.',
    category: 'DER', subcategory: 'Sicherheitspruefungen', level: 'Standard', iso_mapping: 'A.8.34',
    implementation_guidance: 'Jaehrliche Penetrationstests durch zertifizierte Dienstleister. Re-Tests nach Behebung.',
    verification_guidance: 'Penetrationstest-Berichte und Nachbesserungsnachweise pruefen.',
    source_url: null,
  },

  // =====================================================================
  // DER.4 — Notfallmanagement (Emergency Management)
  // =====================================================================
  {
    control_number: 'DER.4.A1',
    title_nl: 'Erstellung eines Notfallhandbuchs',
    title: 'Creation of an emergency manual',
    description_nl: 'Ein Notfallhandbuch MUSS erstellt werden, das alle Informationen enthaelt, die fuer die Bewaeltigung eines Notfalls benoetigt werden. Es MUSS regelmaessig aktualisiert und zugaenglich aufbewahrt werden.',
    description: 'An emergency manual MUST be created containing all information needed for managing an emergency. It MUST be regularly updated and stored accessibly.',
    category: 'DER', subcategory: 'Notfallmanagement', level: 'Basis', iso_mapping: 'A.5.29',
    implementation_guidance: 'Notfallhandbuch mit Kontaktlisten, Wiederanlaufplaenen und Sofortmassnahmen erstellen.',
    verification_guidance: 'Notfallhandbuch auf Aktualitaet und Zugaenglichkeit pruefen.',
    source_url: null,
  },
  {
    control_number: 'DER.4.A2',
    title_nl: 'Integration in den Sicherheitsprozess',
    title: 'Integration into the security process',
    description_nl: 'Notfallmanagement MUSS in den IS-Prozess integriert sein. Es MUESSEN regelmaessige Notfalluebungen durchgefuehrt werden.',
    description: 'Emergency management MUST be integrated into the IS process. Regular emergency exercises MUST be conducted.',
    category: 'DER', subcategory: 'Notfallmanagement', level: 'Basis', iso_mapping: 'A.5.30',
    implementation_guidance: 'Jaehrliche Notfalluebungen (Tabletop und Simulation). Ergebnisse in ISMS-Review einfliessen lassen.',
    verification_guidance: 'Uebungsprotokolle und Lessons-Learned-Dokumentation pruefen.',
    source_url: null,
  },
  {
    control_number: 'DER.4.A3',
    title_nl: 'Business Impact Analyse',
    title: 'Business impact analysis',
    description_nl: 'Es SOLLTE eine Business Impact Analyse (BIA) durchgefuehrt werden, um die Kritikalitaet der Geschaeftsprozesse und die Abhaengigkeiten von IT-Systemen zu ermitteln.',
    description: 'A Business Impact Analysis (BIA) SHOULD be performed to determine the criticality of business processes and dependencies on IT systems.',
    category: 'DER', subcategory: 'Notfallmanagement', level: 'Standard', iso_mapping: 'A.5.29',
    implementation_guidance: 'BIA fuer alle Kernprozesse. RTO/RPO ableiten. Ergebnisse in Notfallplanung einfliessen lassen.',
    verification_guidance: 'BIA-Ergebnisse und Aktualitaet pruefen.',
    source_url: null,
  },

  // =====================================================================
  // APP.1.2 — Webbrowser
  // =====================================================================
  {
    control_number: 'APP.1.2.A1',
    title_nl: 'Einsatz von Webbrowsern',
    title: 'Use of web browsers',
    description_nl: 'Es MUSS festgelegt werden, welche Webbrowser und -versionen in der Institution zugelassen sind. Die zugelassenen Webbrowser MUESSEN zentral konfiguriert und gehaertet werden.',
    description: 'It MUST be determined which web browsers and versions are authorized in the institution. Authorized web browsers MUST be centrally configured and hardened.',
    category: 'APP', subcategory: 'Webbrowser', level: 'Basis', iso_mapping: 'A.8.9',
    implementation_guidance: 'Browser-Whitelist definieren. Zentrale Browser-Konfiguration ueber Group Policy oder MDM.',
    verification_guidance: 'Browser-Konfiguration und Haertungsmassnahmen pruefen.',
    source_url: null,
  },
  {
    control_number: 'APP.1.2.A2',
    title_nl: 'Verwendung von TLS',
    title: 'Use of TLS',
    description_nl: 'Es MUSS sichergestellt werden, dass der Browser TLS in einer sicheren Version nutzt. Unsichere Versionen und Cipher-Suites MUESSEN deaktiviert werden.',
    description: 'It MUST be ensured that the browser uses TLS in a secure version. Insecure versions and cipher suites MUST be disabled.',
    category: 'APP', subcategory: 'Webbrowser', level: 'Basis', iso_mapping: 'A.8.24',
    implementation_guidance: 'TLS 1.2+ erzwingen. Unsichere Cipher-Suites im Browser deaktivieren.',
    verification_guidance: 'Browser-TLS-Konfiguration pruefen.',
    source_url: null,
  },

  // =====================================================================
  // APP.3.1 — Webanwendungen und Webservices
  // =====================================================================
  {
    control_number: 'APP.3.1.A1',
    title_nl: 'Authentisierung',
    title: 'Authentication',
    description_nl: 'Die Webanwendung oder der Webservice MUSS angemessene Authentisierungsmechanismen implementieren. Standardpasswoerter MUESSEN geaendert werden.',
    description: 'The web application or web service MUST implement appropriate authentication mechanisms. Default passwords MUST be changed.',
    category: 'APP', subcategory: 'Webanwendungen und Webservices', level: 'Basis', iso_mapping: 'A.8.5',
    implementation_guidance: 'Sichere Authentisierung implementieren. Standardpasswoerter bei Inbetriebnahme aendern.',
    verification_guidance: 'Authentisierungsmechanismen und Standardpasswoerter pruefen.',
    source_url: null,
  },
  {
    control_number: 'APP.3.1.A2',
    title_nl: 'Kontrolliertes Einbinden von Dateien und Inhalten',
    title: 'Controlled inclusion of files and content',
    description_nl: 'Falls eine Webanwendung oder ein Webservice Dateien hochladen laesst, MUESSEN die hochgeladenen Dateien auf Schadcode geprueft werden. Es MUSS sichergestellt sein, dass Dateien nicht an unbeabsichtigten Orten gespeichert werden.',
    description: 'If a web application or service allows file uploads, uploaded files MUST be checked for malicious code. It MUST be ensured that files are not stored in unintended locations.',
    category: 'APP', subcategory: 'Webanwendungen und Webservices', level: 'Basis', iso_mapping: 'A.8.28',
    implementation_guidance: 'Dateiupload-Validierung (Typ, Groesse, Inhalt). Virenscanner fuer Uploads. Sichere Speicherpfade.',
    verification_guidance: 'Upload-Validierung und Malware-Scanning pruefen.',
    source_url: null,
  },
  {
    control_number: 'APP.3.1.A3',
    title_nl: 'Schutz vor SQL-Injection',
    title: 'Protection against SQL injection',
    description_nl: 'Die Webanwendung MUSS Prepared Statements oder Stored Procedures verwenden, um SQL-Injection zu verhindern. Direkte String-Konkatenation in SQL-Abfragen DARF NICHT erfolgen.',
    description: 'The web application MUST use prepared statements or stored procedures to prevent SQL injection. Direct string concatenation in SQL queries MUST NOT be done.',
    category: 'APP', subcategory: 'Webanwendungen und Webservices', level: 'Basis', iso_mapping: 'A.8.28',
    implementation_guidance: 'Prepared Statements oder ORM fuer alle Datenbankzugriffe. SAST fuer SQL-Injection-Erkennung.',
    verification_guidance: 'Code-Review und SAST-Ergebnisse auf SQL-Injection pruefen.',
    source_url: null,
  },

  // =====================================================================
  // APP.5.3 — Fileserver
  // =====================================================================
  {
    control_number: 'APP.5.3.A1',
    title_nl: 'Planung des Fileservers',
    title: 'Planning of the file server',
    description_nl: 'Es MUSS ein Konzept fuer den Einsatz des Fileservers erstellt werden. Darin MUESSEN Verzeichnisstruktur, Berechtigungskonzept und Datensicherung festgelegt werden.',
    description: 'A concept for the use of the file server MUST be created. It MUST define directory structure, authorization concept, and data backup.',
    category: 'APP', subcategory: 'Fileserver', level: 'Basis', iso_mapping: 'A.8.9',
    implementation_guidance: 'Verzeichnisstruktur nach Organisationseinheiten und Schutzbedarfsklassen aufbauen.',
    verification_guidance: 'Fileserver-Konzept und Berechtigungsstruktur pruefen.',
    source_url: null,
  },

  // =====================================================================
  // SYS.1.2 — Windows Server
  // =====================================================================
  {
    control_number: 'SYS.1.2.A1',
    title_nl: 'Planung von Windows Server',
    title: 'Planning of Windows Server',
    description_nl: 'Es MUSS eine Planung fuer den Einsatz von Windows Server durchgefuehrt werden. Die Planung MUSS die zu nutzende Edition, Patchstrategie und Haertungsmassnahmen umfassen.',
    description: 'Planning for the use of Windows Server MUST be performed. Planning MUST include the edition to be used, patch strategy, and hardening measures.',
    category: 'SYS', subcategory: 'Windows Server', level: 'Basis', iso_mapping: 'A.8.9',
    implementation_guidance: 'Windows Server Standard-Image mit CIS Benchmark-Haertung erstellen.',
    verification_guidance: 'Haertungskonfiguration gegen CIS Benchmark pruefen.',
    source_url: null,
  },
  {
    control_number: 'SYS.1.2.A2',
    title_nl: 'Sichere Active Directory Administration',
    title: 'Secure Active Directory administration',
    description_nl: 'Active Directory MUSS sicher konfiguriert und administriert werden. Fuer die Administration MUESSEN dedizierte Administrationskonten und -arbeitsstationen (PAW) eingesetzt werden.',
    description: 'Active Directory MUST be securely configured and administered. Dedicated administrative accounts and privileged access workstations (PAW) MUST be used for administration.',
    category: 'SYS', subcategory: 'Windows Server', level: 'Basis', iso_mapping: 'A.8.2',
    implementation_guidance: 'Tiered Administration Model. PAWs fuer Tier-0. MFA fuer alle Admin-Konten.',
    verification_guidance: 'AD-Konfiguration und Tier-Modell pruefen.',
    source_url: null,
  },

  // =====================================================================
  // SYS.1.3 — Linux/Unix Server
  // =====================================================================
  {
    control_number: 'SYS.1.3.A1',
    title_nl: 'Sichere Installation von Linux-Servern',
    title: 'Secure installation of Linux servers',
    description_nl: 'Es MUSS eine Minimalinstallation durchgefuehrt werden. Nicht benoetigte Software-Pakete DUERFEN NICHT installiert werden. Die Installationsquelle MUSS vertrauenswuerdig sein.',
    description: 'A minimal installation MUST be performed. Unnecessary software packages MUST NOT be installed. The installation source MUST be trustworthy.',
    category: 'SYS', subcategory: 'Linux/Unix Server', level: 'Basis', iso_mapping: 'A.8.9',
    implementation_guidance: 'Minimalinstallation. Haertung nach CIS Benchmark oder BSI SiSyPHuS. Package-Signing pruefen.',
    verification_guidance: 'Installierte Pakete gegen Minimalinstallation pruefen.',
    source_url: null,
  },
  {
    control_number: 'SYS.1.3.A2',
    title_nl: 'Sichere Konfiguration von Linux-Servern',
    title: 'Secure configuration of Linux servers',
    description_nl: 'Linux-Server MUESSEN gehaertet werden. Unnoetige Dienste und Zugaenge MUESSEN deaktiviert werden. SELinux oder AppArmor SOLLTEN im Enforcing-Modus betrieben werden.',
    description: 'Linux servers MUST be hardened. Unnecessary services and access points MUST be disabled. SELinux or AppArmor SHOULD be operated in enforcing mode.',
    category: 'SYS', subcategory: 'Linux/Unix Server', level: 'Basis', iso_mapping: 'A.8.9',
    implementation_guidance: 'Systemhaertung: unnoetige Dienste deaktivieren, SSH haerten, Firewall konfigurieren, MAC aktivieren.',
    verification_guidance: 'Haertungskonfiguration und MAC-Status pruefen.',
    source_url: null,
  },

  // =====================================================================
  // SYS.1.5 — Virtualisierung
  // =====================================================================
  {
    control_number: 'SYS.1.5.A1',
    title_nl: 'Planung der Virtualisierung',
    title: 'Planning of virtualization',
    description_nl: 'Die Virtualisierung MUSS geplant werden. Dabei MUESSEN die Sicherheitsanforderungen an den Hypervisor, die Gastsysteme und die Netzwerk-Virtualisierung festgelegt werden.',
    description: 'Virtualization MUST be planned. Security requirements for the hypervisor, guest systems, and network virtualization MUST be defined.',
    category: 'SYS', subcategory: 'Virtualisierung', level: 'Basis', iso_mapping: 'A.8.9',
    implementation_guidance: 'Virtualisierungskonzept mit Hypervisor-Haertung und Netztrennung erstellen.',
    verification_guidance: 'Virtualisierungskonzept und Hypervisor-Konfiguration pruefen.',
    source_url: null,
  },
  {
    control_number: 'SYS.1.5.A2',
    title_nl: 'Sicherung der Administrationsschnittstellen',
    title: 'Securing of administration interfaces',
    description_nl: 'Administrationsschnittstellen der Virtualisierungsinfrastruktur MUESSEN durch geeignete Authentisierung und Zugriffskontrolle geschuetzt werden.',
    description: 'Administration interfaces of the virtualization infrastructure MUST be protected by suitable authentication and access control.',
    category: 'SYS', subcategory: 'Virtualisierung', level: 'Basis', iso_mapping: 'A.8.2',
    implementation_guidance: 'MFA fuer Hypervisor-Management. Dediziertes Management-Netz. Zugriffe protokollieren.',
    verification_guidance: 'Zugriffskontrolle und Protokollierung fuer Virtualisierungsmanagement pruefen.',
    source_url: null,
  },

  // =====================================================================
  // SYS.1.6 — Containerisierung
  // =====================================================================
  {
    control_number: 'SYS.1.6.A1',
    title_nl: 'Planung des Container-Einsatzes',
    title: 'Planning of container deployment',
    description_nl: 'Es MUSS geplant werden, wie Container-Technologie in der Institution eingesetzt werden soll. Sicherheitsanforderungen an Container-Images, Runtime und Orchestrierung MUESSEN festgelegt werden.',
    description: 'It MUST be planned how container technology should be used in the institution. Security requirements for container images, runtime, and orchestration MUST be defined.',
    category: 'SYS', subcategory: 'Containerisierung', level: 'Basis', iso_mapping: 'A.8.9',
    implementation_guidance: 'Container-Security-Policy erstellen. Trusted Registries definieren. Image-Scanning einrichten.',
    verification_guidance: 'Container-Security-Policy und Image-Scanning-Ergebnisse pruefen.',
    source_url: null,
  },
  {
    control_number: 'SYS.1.6.A2',
    title_nl: 'Sichere Konfiguration von Container-Runtimes',
    title: 'Secure configuration of container runtimes',
    description_nl: 'Container-Runtimes MUESSEN sicher konfiguriert werden. Container DUERFEN NICHT mit Root-Rechten ausgefuehrt werden, sofern dies nicht zwingend erforderlich ist.',
    description: 'Container runtimes MUST be securely configured. Containers MUST NOT be run with root privileges unless strictly required.',
    category: 'SYS', subcategory: 'Containerisierung', level: 'Basis', iso_mapping: 'A.8.9',
    implementation_guidance: 'Non-root Container. Read-only Filesystems. Seccomp/AppArmor-Profile anwenden.',
    verification_guidance: 'Container-Runtime-Konfiguration gegen CIS Docker Benchmark pruefen.',
    source_url: null,
  },

  // =====================================================================
  // SYS.1.8 — Speicherloesungen
  // =====================================================================
  {
    control_number: 'SYS.1.8.A1',
    title_nl: 'Sichere Konfiguration von Speicherloesungen',
    title: 'Secure configuration of storage solutions',
    description_nl: 'Speicherloesungen (SAN, NAS) MUESSEN sicher konfiguriert werden. Der Zugriff auf Speicherbereiche MUSS auf autorisierte Systeme beschraenkt sein.',
    description: 'Storage solutions (SAN, NAS) MUST be securely configured. Access to storage areas MUST be restricted to authorized systems.',
    category: 'SYS', subcategory: 'Speicherloesungen', level: 'Basis', iso_mapping: 'A.8.9',
    implementation_guidance: 'Zoning (SAN) oder ACLs (NAS). Verschluesselung at-rest fuer sensible Daten.',
    verification_guidance: 'Speicherkonfiguration und Zugriffsbeschraenkungen pruefen.',
    source_url: null,
  },

  // =====================================================================
  // SYS.2.2 — Windows Clients
  // =====================================================================
  {
    control_number: 'SYS.2.2.A1',
    title_nl: 'Planung des Einsatzes von Windows-Clients',
    title: 'Planning of Windows client deployment',
    description_nl: 'Es MUSS geplant werden, welche Windows-Version eingesetzt und wie diese konfiguriert werden soll. Telemetrie- und Datenerfassungsfunktionen MUESSEN bewertet und ggf. deaktiviert werden.',
    description: 'It MUST be planned which Windows version should be used and how it should be configured. Telemetry and data collection features MUST be evaluated and if necessary disabled.',
    category: 'SYS', subcategory: 'Windows Clients', level: 'Basis', iso_mapping: 'A.8.9',
    implementation_guidance: 'Windows Enterprise mit Haertung nach BSI SiSyPHuS. Telemetrie auf Minimum reduzieren.',
    verification_guidance: 'Client-Konfiguration und Telemetrie-Einstellungen pruefen.',
    source_url: null,
  },

  // =====================================================================
  // SYS.2.3 — Clients unter Linux und Unix
  // =====================================================================
  {
    control_number: 'SYS.2.3.A1',
    title_nl: 'Sichere Installation und Konfiguration von Linux-Clients',
    title: 'Secure installation and configuration of Linux clients',
    description_nl: 'Linux-Clients MUESSEN mit einer Minimalinstallation eingerichtet und nach einem Haertungskonzept konfiguriert werden.',
    description: 'Linux clients MUST be set up with a minimal installation and configured according to a hardening concept.',
    category: 'SYS', subcategory: 'Linux/Unix Clients', level: 'Basis', iso_mapping: 'A.8.9',
    implementation_guidance: 'Standard-Image mit CIS-Haertung. Festplattenverschluesselung (LUKS). Automatische Updates.',
    verification_guidance: 'Client-Image und Haertungskonfiguration pruefen.',
    source_url: null,
  },

  // =====================================================================
  // SYS.3.1 — Laptops
  // =====================================================================
  {
    control_number: 'SYS.3.1.A1',
    title_nl: 'Regelungen fuer die mobile Nutzung von Laptops',
    title: 'Regulations for mobile use of laptops',
    description_nl: 'Es MUESSEN Regelungen fuer die mobile Nutzung von Laptops definiert werden. Die Regelungen MUESSEN Vorgaben zur Verschluesselung, VPN-Nutzung und physischen Sicherung enthalten.',
    description: 'Regulations for mobile use of laptops MUST be defined. Regulations MUST contain requirements for encryption, VPN use, and physical security.',
    category: 'SYS', subcategory: 'Laptops', level: 'Basis', iso_mapping: 'A.8.1',
    implementation_guidance: 'Festplattenverschluesselung (BitLocker/LUKS). VPN-Pflicht. Sichtschutzfolie. Diebstahlschutz.',
    verification_guidance: 'Laptop-Richtlinie und technische Umsetzung pruefen.',
    source_url: null,
  },

  // =====================================================================
  // SYS.3.2 — Tablet und Smartphone
  // =====================================================================
  {
    control_number: 'SYS.3.2.A1',
    title_nl: 'Festlegung einer Strategie fuer die Nutzung mobiler Endgeraete',
    title: 'Definition of a strategy for mobile device usage',
    description_nl: 'Es MUSS eine Strategie fuer den Einsatz mobiler Endgeraete definiert werden. Erlaubte Geraetetypen, Betriebssysteme und Nutzungsszenarien MUESSEN festgelegt werden.',
    description: 'A strategy for mobile device usage MUST be defined. Permitted device types, operating systems, and usage scenarios MUST be determined.',
    category: 'SYS', subcategory: 'Tablet und Smartphone', level: 'Basis', iso_mapping: 'A.8.1',
    implementation_guidance: 'MDM-Loesung einsetzen. Geraeteverschluesselung, PIN-Pflicht, Fernloeschung konfigurieren.',
    verification_guidance: 'MDM-Policy und Geraete-Compliance-Rate pruefen.',
    source_url: null,
  },
  {
    control_number: 'SYS.3.2.A2',
    title_nl: 'Mobile Device Management',
    title: 'Mobile device management',
    description_nl: 'Mobile Endgeraete MUESSEN durch ein MDM-System verwaltet werden. Das MDM MUSS die Durchsetzung von Sicherheitsrichtlinien, Fernloeschung und App-Management ermoeglichen.',
    description: 'Mobile devices MUST be managed by an MDM system. The MDM MUST enable enforcement of security policies, remote wipe, and app management.',
    category: 'SYS', subcategory: 'Tablet und Smartphone', level: 'Basis', iso_mapping: 'A.8.1',
    implementation_guidance: 'Enterprise MDM mit Compliance-Checks, App-Whitelisting und automatischen Updates.',
    verification_guidance: 'MDM-Konfiguration und Geraete-Compliance pruefen.',
    source_url: null,
  },

  // =====================================================================
  // SYS.4.1 — Drucker, Kopierer und Multifunktionsgeraete
  // =====================================================================
  {
    control_number: 'SYS.4.1.A1',
    title_nl: 'Planung des Druckereinsatzes',
    title: 'Planning of printer deployment',
    description_nl: 'Der Einsatz von Druckern, Kopierern und Multifunktionsgeraeten MUSS geplant werden. Es MUSS festgelegt werden, welche Geraete wo aufgestellt werden duerfen.',
    description: 'The deployment of printers, copiers, and multifunction devices MUST be planned. It MUST be determined which devices may be placed where.',
    category: 'SYS', subcategory: 'Drucker und Multifunktionsgeraete', level: 'Basis', iso_mapping: 'A.8.9',
    implementation_guidance: 'Netzwerkdrucker in eigenes VLAN. Standardpasswoerter aendern. Firmware aktuell halten.',
    verification_guidance: 'Drucker-Konfiguration und Netzwerksegmentierung pruefen.',
    source_url: null,
  },

  // =====================================================================
  // NET.2.1 — WLAN-Betrieb
  // =====================================================================
  {
    control_number: 'NET.2.1.A1',
    title_nl: 'Erstellung einer WLAN-Richtlinie',
    title: 'Creation of a WLAN policy',
    description_nl: 'Es MUSS eine Richtlinie fuer den WLAN-Betrieb erstellt werden. Die Richtlinie MUSS Regelungen zu zugelassenen Standards, Verschluesselung und Authentisierung enthalten.',
    description: 'A policy for WLAN operation MUST be created. The policy MUST contain regulations on permitted standards, encryption, and authentication.',
    category: 'NET', subcategory: 'WLAN', level: 'Basis', iso_mapping: 'A.8.20',
    implementation_guidance: 'WPA3-Enterprise oder WPA2-Enterprise mit RADIUS. Gaeste-WLAN getrennt. WPS deaktivieren.',
    verification_guidance: 'WLAN-Konfiguration und Verschluesselungsstandards pruefen.',
    source_url: null,
  },
  {
    control_number: 'NET.2.1.A2',
    title_nl: 'Sichere WLAN-Konfiguration',
    title: 'Secure WLAN configuration',
    description_nl: 'WLANs MUESSEN mit WPA2/WPA3-Enterprise verschluesselt sein. Standard-SSIDs und -Passwoerter MUESSEN geaendert werden. Management-Interfaces MUESSEN geschuetzt sein.',
    description: 'WLANs MUST be encrypted with WPA2/WPA3-Enterprise. Default SSIDs and passwords MUST be changed. Management interfaces MUST be protected.',
    category: 'NET', subcategory: 'WLAN', level: 'Basis', iso_mapping: 'A.8.20',
    implementation_guidance: 'WPA2/WPA3-Enterprise mit 802.1X. SSID-Namenskonvention. Management ueber separates Netz.',
    verification_guidance: 'WLAN-Konfiguration aller Access Points pruefen.',
    source_url: null,
  },

  // =====================================================================
  // NET.2.2 — VPN
  // =====================================================================
  {
    control_number: 'NET.2.2.A1',
    title_nl: 'Planung des VPN-Einsatzes',
    title: 'Planning of VPN deployment',
    description_nl: 'Es MUSS geplant werden, fuer welche Kommunikationsbeziehungen VPN eingesetzt werden soll. Dabei MUESSEN die kryptographischen Anforderungen nach BSI TR-02102 beruecksichtigt werden.',
    description: 'It MUST be planned for which communication relationships VPN should be used. Cryptographic requirements per BSI TR-02102 MUST be considered.',
    category: 'NET', subcategory: 'VPN', level: 'Basis', iso_mapping: 'A.8.20',
    implementation_guidance: 'VPN-Konzept mit IKEv2/IPsec oder WireGuard. BSI-konforme Cipher-Suites.',
    verification_guidance: 'VPN-Konfiguration und Verschluesselungsparameter pruefen.',
    source_url: null,
  },

  // =====================================================================
  // NET.3.1 — Router und Switches
  // =====================================================================
  {
    control_number: 'NET.3.1.A1',
    title_nl: 'Sichere Grundkonfiguration eines Routers oder Switches',
    title: 'Secure base configuration of a router or switch',
    description_nl: 'Router und Switches MUESSEN sicher konfiguriert werden. Nicht benoetigte Dienste und Protokolle MUESSEN deaktiviert werden. Standardpasswoerter MUESSEN geaendert werden.',
    description: 'Routers and switches MUST be securely configured. Unnecessary services and protocols MUST be disabled. Default passwords MUST be changed.',
    category: 'NET', subcategory: 'Router und Switches', level: 'Basis', iso_mapping: 'A.8.20',
    implementation_guidance: 'Haertung nach CIS Benchmark. Unnoetige Dienste (CDP, HTTP-Server) deaktivieren. SSH statt Telnet.',
    verification_guidance: 'Router/Switch-Konfiguration gegen Haertungsvorgaben pruefen.',
    source_url: null,
  },
  {
    control_number: 'NET.3.1.A2',
    title_nl: 'Einspielen von Updates und Patches',
    title: 'Installation of updates and patches',
    description_nl: 'Firmware-Updates fuer Router und Switches MUESSEN zeitnah eingespielt werden. Ein Prozess fuer das Patch-Management von Netzwerkkomponenten MUSS etabliert sein.',
    description: 'Firmware updates for routers and switches MUST be applied promptly. A process for patch management of network components MUST be established.',
    category: 'NET', subcategory: 'Router und Switches', level: 'Basis', iso_mapping: 'A.8.8',
    implementation_guidance: 'Firmware-Update-Prozess mit Test und Rollback. Automatische Benachrichtigung ueber neue Firmware.',
    verification_guidance: 'Firmware-Versionen und Patch-Stand aller Netzwerkkomponenten pruefen.',
    source_url: null,
  },

  // =====================================================================
  // NET.3.2 — Firewall
  // =====================================================================
  {
    control_number: 'NET.3.2.A1',
    title_nl: 'Erstellung einer Firewall-Richtlinie',
    title: 'Creation of a firewall policy',
    description_nl: 'Es MUSS eine Firewall-Richtlinie erstellt werden, die den Datenverkehr zwischen den verschiedenen Netzwerksegmenten regelt. Grundsaetzlich MUSS ein Whitelist-Ansatz verfolgt werden.',
    description: 'A firewall policy MUST be created that regulates traffic between different network segments. A whitelist approach MUST be followed.',
    category: 'NET', subcategory: 'Firewall', level: 'Basis', iso_mapping: 'A.8.22',
    implementation_guidance: 'Default-Deny-Regel. Nur explizit benoetigte Verbindungen zulassen. Regeln dokumentieren.',
    verification_guidance: 'Firewall-Regelwerk auf Whitelist-Ansatz und Dokumentation pruefen.',
    source_url: null,
  },
  {
    control_number: 'NET.3.2.A2',
    title_nl: 'Regelmaessige Ueberpruefung der Firewall-Regeln',
    title: 'Regular review of firewall rules',
    description_nl: 'Die Firewall-Regeln MUESSEN regelmaessig ueberprueft werden. Nicht mehr benoetigte Regeln MUESSEN entfernt werden.',
    description: 'Firewall rules MUST be regularly reviewed. Rules no longer needed MUST be removed.',
    category: 'NET', subcategory: 'Firewall', level: 'Basis', iso_mapping: 'A.8.22',
    implementation_guidance: 'Quartalsweise Firewall-Rule-Review. Verwaiste und redundante Regeln identifizieren.',
    verification_guidance: 'Review-Protokolle und Regelbereinigung pruefen.',
    source_url: null,
  },

  // =====================================================================
  // INF.1 — Allgemeines Gebaeude (General Building)
  // =====================================================================
  {
    control_number: 'INF.1.A1',
    title_nl: 'Planung der Gebaeude-Absicherung',
    title: 'Planning of building security',
    description_nl: 'Es MUSS ein Sicherheitskonzept fuer die Gebaeude-Absicherung erstellt werden. Dabei MUESSEN physische Zutrittskontrolle, Perimeterschutz und Umgebungsschutz beruecksichtigt werden.',
    description: 'A security concept for building security MUST be created. Physical access control, perimeter protection, and environmental protection MUST be considered.',
    category: 'INF', subcategory: 'Allgemeines Gebaeude', level: 'Basis', iso_mapping: 'A.7.1',
    implementation_guidance: 'Gebaeude-Sicherheitskonzept mit Zonenmodell, Zutrittskontrolle und Umgebungsschutz erstellen.',
    verification_guidance: 'Gebaeude-Sicherheitskonzept und physische Schutzmassnahmen pruefen.',
    source_url: null,
  },
  {
    control_number: 'INF.1.A2',
    title_nl: 'Angepasste Nutzung von Raeumlichkeiten',
    title: 'Appropriate use of premises',
    description_nl: 'Raeumlichkeiten MUESSEN ihrer Schutzbedarfskategorie entsprechend genutzt und ausgestattet werden. Serverraeume MUESSEN besonders geschuetzt werden.',
    description: 'Premises MUST be used and equipped according to their protection needs category. Server rooms MUST be specially protected.',
    category: 'INF', subcategory: 'Allgemeines Gebaeude', level: 'Basis', iso_mapping: 'A.7.3',
    implementation_guidance: 'Raumkategorisierung nach Schutzbedarf. Serverraum mit Zutrittskontrolle, Klimatisierung, Brandschutz.',
    verification_guidance: 'Raumzuordnung und Schutzmassnahmen pruefen.',
    source_url: null,
  },

  // =====================================================================
  // INF.2 — Rechenzentrum (Data Center)
  // =====================================================================
  {
    control_number: 'INF.2.A1',
    title_nl: 'Planung des Rechenzentrums',
    title: 'Planning of the data center',
    description_nl: 'Die Planung des Rechenzentrums MUSS die physische Sicherheit, Stromversorgung, Klimatisierung, Brandschutz und Zutrittskontrolle umfassen.',
    description: 'Planning of the data center MUST include physical security, power supply, climate control, fire protection, and access control.',
    category: 'INF', subcategory: 'Rechenzentrum', level: 'Basis', iso_mapping: 'A.7.5',
    implementation_guidance: 'RZ-Planung nach EN 50600. Redundante Stromversorgung, USV, Klimatisierung, Brandmeldeanlage.',
    verification_guidance: 'RZ-Infrastruktur gegen Planungsvorgaben pruefen.',
    source_url: null,
  },
  {
    control_number: 'INF.2.A2',
    title_nl: 'Zutrittskontrolle zum Rechenzentrum',
    title: 'Access control to the data center',
    description_nl: 'Der Zutritt zum Rechenzentrum MUSS streng kontrolliert werden. Nur autorisierte Personen DUERFEN Zutritt erhalten. Alle Zutritte MUESSEN protokolliert werden.',
    description: 'Access to the data center MUST be strictly controlled. Only authorized persons may gain access. All access MUST be logged.',
    category: 'INF', subcategory: 'Rechenzentrum', level: 'Basis', iso_mapping: 'A.7.2',
    implementation_guidance: 'Mehrstufige Zutrittskontrolle (Karte + PIN/Biometrie). Lueckenlose Protokollierung.',
    verification_guidance: 'Zutrittskontrollsystem und Protokolle pruefen.',
    source_url: null,
  },

  // =====================================================================
  // INF.5 — Technikraum (Technical Room)
  // =====================================================================
  {
    control_number: 'INF.5.A1',
    title_nl: 'Planung der Raumabsicherung',
    title: 'Planning of room security',
    description_nl: 'Fuer IT-Technikraeume MUSS ein Sicherheitskonzept erstellt werden. Der Technikraum MUSS gegen unbefugten Zutritt, Feuer, Wasser und Stromausfall geschuetzt werden.',
    description: 'A security concept MUST be created for IT technical rooms. The technical room MUST be protected against unauthorized access, fire, water, and power failure.',
    category: 'INF', subcategory: 'Technikraum', level: 'Basis', iso_mapping: 'A.7.5',
    implementation_guidance: 'Zutrittskontrolle, Brandmelder, Wassermelder, USV fuer Technikraeume.',
    verification_guidance: 'Schutzmassnahmen fuer Technikraeume pruefen.',
    source_url: null,
  },

  // =====================================================================
  // IND.1 — Prozessleit- und Automatisierungstechnik (ICS)
  // =====================================================================
  {
    control_number: 'IND.1.A1',
    title_nl: 'Einschraenkung des Zugriffs auf ICS-Komponenten',
    title: 'Restriction of access to ICS components',
    description_nl: 'Der Zugriff auf ICS-Komponenten MUSS auf autorisierte Personen und Systeme beschraenkt werden. ICS-Netzwerke MUESSEN von Buero-IT-Netzwerken getrennt sein.',
    description: 'Access to ICS components MUST be restricted to authorized persons and systems. ICS networks MUST be separated from office IT networks.',
    category: 'IND', subcategory: 'Prozessleit- und Automatisierungstechnik', level: 'Basis', iso_mapping: 'A.8.22',
    implementation_guidance: 'IT/OT-Segmentierung mit DMZ. Spezielle Zugangskontrollen fuer OT-Systeme.',
    verification_guidance: 'IT/OT-Segmentierung und Zugriffskontrolle pruefen.',
    source_url: null,
  },
  {
    control_number: 'IND.1.A2',
    title_nl: 'Schutz vor Manipulation der ICS-Umgebung',
    title: 'Protection against manipulation of the ICS environment',
    description_nl: 'ICS-Komponenten MUESSEN vor unbefugter physischer und logischer Manipulation geschuetzt werden. Aenderungen an ICS-Konfigurationen MUESSEN durch ein Change-Management gesteuert werden.',
    description: 'ICS components MUST be protected against unauthorized physical and logical manipulation. Changes to ICS configurations MUST be managed through change management.',
    category: 'IND', subcategory: 'Prozessleit- und Automatisierungstechnik', level: 'Basis', iso_mapping: 'A.8.9',
    implementation_guidance: 'Physischer Zugriffsschutz fuer SPS/HMI. Change-Management fuer OT-Aenderungen.',
    verification_guidance: 'Manipulationsschutz und OT-Change-Management pruefen.',
    source_url: null,
  },

  // =====================================================================
  // IND.2 — Sensoren und Aktoren (Sensors and Actuators)
  // =====================================================================
  {
    control_number: 'IND.2.A1',
    title_nl: 'Sichere Inbetriebnahme von Sensoren und Aktoren',
    title: 'Secure commissioning of sensors and actuators',
    description_nl: 'Sensoren und Aktoren MUESSEN vor Inbetriebnahme auf ihre Integritaet geprueft werden. Standardzugangsdaten MUESSEN geaendert werden.',
    description: 'Sensors and actuators MUST be checked for integrity before commissioning. Default credentials MUST be changed.',
    category: 'IND', subcategory: 'Sensoren und Aktoren', level: 'Basis', iso_mapping: 'A.8.9',
    implementation_guidance: 'Integritaetspruefung bei Lieferung. Standardpasswoerter aendern. Firmware-Version dokumentieren.',
    verification_guidance: 'Inbetriebnahme-Checkliste und Konfiguration pruefen.',
    source_url: null,
  },

  // =====================================================================
  // ORP.2 — Personal (HR Security)
  // =====================================================================
  {
    control_number: 'ORP.2.A1',
    title_nl: 'Geregelte Einarbeitung neuer Mitarbeiter',
    title: 'Regulated onboarding of new employees',
    description_nl: 'Neue Mitarbeiter MUESSEN in die vorhandenen Regelungen und Informationssicherheitsprozesse eingearbeitet werden. Ihnen MUESSEN die notwendigen Sicherheitsrichtlinien ausgehaendigt werden.',
    description: 'New employees MUST be familiarized with existing regulations and information security processes. They MUST be provided with necessary security policies.',
    category: 'ORP', subcategory: 'Personal', level: 'Basis', iso_mapping: 'A.6.2',
    implementation_guidance: 'Onboarding-Checkliste mit IS-Schulung, Richtlinienunterschrift und Zugangseinrichtung.',
    verification_guidance: 'Onboarding-Checklisten und Schulungsnachweise pruefen.',
    source_url: null,
  },
  {
    control_number: 'ORP.2.A2',
    title_nl: 'Geregelte Verfahrensweise beim Weggang von Mitarbeitern',
    title: 'Regulated procedure when employees leave',
    description_nl: 'Bei Austritt von Mitarbeitern MUESSEN alle Zugaenge gesperrt und Assets zurueckgegeben werden. Es MUSS ein geregelter Offboarding-Prozess etabliert sein.',
    description: 'When employees leave, all access MUST be revoked and assets returned. A regulated offboarding process MUST be established.',
    category: 'ORP', subcategory: 'Personal', level: 'Basis', iso_mapping: 'A.6.5',
    implementation_guidance: 'Offboarding-Checkliste mit Zugangssperrung am letzten Arbeitstag, Asset-Rueckgabe, Geheimhaltungserinnerung.',
    verification_guidance: 'Offboarding-Prozess und zeitnahe Zugangssperrung pruefen.',
    source_url: null,
  },
  {
    control_number: 'ORP.2.A3',
    title_nl: 'Vertretungsregelungen',
    title: 'Deputy regulations',
    description_nl: 'Fuer alle sicherheitskritischen Aufgaben MUESSEN Vertretungsregelungen definiert sein. Die Vertreter MUESSEN ausreichend qualifiziert und eingewiesen sein.',
    description: 'Deputy regulations MUST be defined for all security-critical tasks. Deputies MUST be sufficiently qualified and instructed.',
    category: 'ORP', subcategory: 'Personal', level: 'Basis', iso_mapping: 'A.6.2',
    implementation_guidance: 'Stellvertretermatrix fuer alle IS-kritischen Rollen. Regelmaessige Einweisung der Vertreter.',
    verification_guidance: 'Stellvertreterregelungen und Qualifizierungsnachweise pruefen.',
    source_url: null,
  },

  // =====================================================================
  // ORP.3 — Sensibilisierung und Schulung (Awareness and Training)
  // =====================================================================
  {
    control_number: 'ORP.3.A1',
    title_nl: 'Sensibilisierung der Institutsleitung fuer Informationssicherheit',
    title: 'Awareness of management for information security',
    description_nl: 'Die Institutionsleitung MUSS fuer Informationssicherheitsthemen ausreichend sensibilisiert werden. Die Sensibilisierung MUSS die spezifischen Gefaehrdungen und die Verantwortung der Leitung umfassen.',
    description: 'Management MUST be sufficiently sensitized for information security topics. Sensitization MUST include specific threats and management responsibility.',
    category: 'ORP', subcategory: 'Sensibilisierung und Schulung', level: 'Basis', iso_mapping: 'A.6.3',
    implementation_guidance: 'Jaehrliches Management-Briefing zu IS-Lage. Tabletop-Uebungen mit Leitungsebene.',
    verification_guidance: 'Management-Briefings und Teilnahmenachweise pruefen.',
    source_url: null,
  },
  {
    control_number: 'ORP.3.A2',
    title_nl: 'Einweisung des Personals in den sicheren Umgang mit IT',
    title: 'Instruction of personnel in secure use of IT',
    description_nl: 'Alle Mitarbeiter MUESSEN vor Nutzung von IT-Systemen in den sicheren Umgang eingewiesen werden. Die Einweisung MUSS Passwortsicherheit, Phishing-Erkennung und Meldewege umfassen.',
    description: 'All employees MUST be instructed in the secure use of IT before using IT systems. Instruction MUST cover password security, phishing recognition, and reporting channels.',
    category: 'ORP', subcategory: 'Sensibilisierung und Schulung', level: 'Basis', iso_mapping: 'A.6.3',
    implementation_guidance: 'Pflichtschulungen bei Eintritt und jaehrliche Auffrischung. E-Learning-Plattform einsetzen.',
    verification_guidance: 'Schulungsteilnahme und Abdeckungsrate pruefen.',
    source_url: null,
  },
  {
    control_number: 'ORP.3.A3',
    title_nl: 'Schulung des IS-Personals',
    title: 'Training of IS personnel',
    description_nl: 'IS-Personal SOLLTE regelmaessig geschult werden. Die Schulungen SOLLTEN aktuelle Themen, neue Bedrohungen und Best Practices umfassen.',
    description: 'IS personnel SHOULD be regularly trained. Training SHOULD cover current topics, new threats, and best practices.',
    category: 'ORP', subcategory: 'Sensibilisierung und Schulung', level: 'Standard', iso_mapping: 'A.6.3',
    implementation_guidance: 'Fachspezifische Schulungen fuer ISB, Admins, Entwickler. Budget fuer Konferenzen und Zertifizierungen.',
    verification_guidance: 'Schulungsplaene und Zertifizierungsnachweise des IS-Personals pruefen.',
    source_url: null,
  },

  // =====================================================================
  // ORP.5 — Compliance Management
  // =====================================================================
  {
    control_number: 'ORP.5.A1',
    title_nl: 'Identifikation der rechtlichen Rahmenbedingungen',
    title: 'Identification of legal requirements',
    description_nl: 'Es MUESSEN die fuer die Institution relevanten rechtlichen, vertraglichen und sonstigen Vorgaben fuer die Informationssicherheit identifiziert und dokumentiert werden.',
    description: 'The legal, contractual, and other requirements relevant to the institution for information security MUST be identified and documented.',
    category: 'ORP', subcategory: 'Compliance Management', level: 'Basis', iso_mapping: 'A.5.31',
    implementation_guidance: 'Rechtskataster fuer IS-relevante Gesetze und Vertraege erstellen und pflegen.',
    verification_guidance: 'Rechtskataster auf Vollstaendigkeit und Aktualitaet pruefen.',
    source_url: null,
  },
  {
    control_number: 'ORP.5.A2',
    title_nl: 'Ueberpruefung der Einhaltung von Richtlinien und Vorgaben',
    title: 'Verification of compliance with policies and requirements',
    description_nl: 'Die Einhaltung der identifizierten Vorgaben MUSS regelmaessig ueberprueft werden. Abweichungen MUESSEN dokumentiert und Massnahmen zur Behebung eingeleitet werden.',
    description: 'Compliance with identified requirements MUST be regularly verified. Deviations MUST be documented and corrective measures initiated.',
    category: 'ORP', subcategory: 'Compliance Management', level: 'Basis', iso_mapping: 'A.5.36',
    implementation_guidance: 'Compliance-Audit-Programm etablieren. Abweichungen in Massnahmentracking aufnehmen.',
    verification_guidance: 'Compliance-Audit-Ergebnisse und Massnahmenverfolgung pruefen.',
    source_url: null,
  },
];

// Build the output -- this is a SUPPLEMENTARY framework that shares the bsi-grundschutz ID
// It will be merged in the build step
const output = {
  framework: {
    id: 'bsi-grundschutz-extended',
    name: 'IT-Grundschutz Compendium (Extended Bausteine)',
    name_nl: 'IT-Grundschutz Kompendium (Erweiterte Bausteine)',
    issuing_body: 'Bundesamt fuer Sicherheit in der Informationstechnik (BSI)',
    version: 'Edition 2023',
    effective_date: '2023-02-01',
    scope: 'Extended Bausteine for IT-Grundschutz: CON (1,3,6-8,10), OPS (1.1.3-5, 2.1-2), DER (3-4), APP (1.2, 3.1, 5.3), SYS (1.2-1.8, 2.2-3, 3.1-2, 4.1), NET (2.1-2, 3.1-2), INF (1-2, 5), IND (1-2), ORP (2-3, 5)',
    scope_sectors: ['government', 'all'],
    structure_description: 'Extended set of IT-Grundschutz Bausteine covering additional process, system, network, infrastructure, and industrial layers.',
    source_url: 'https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/IT-Grundschutz-Kompendium/it-grundschutz-kompendium_node.html',
    license: 'Public document',
    language: 'de+en',
  },
  controls,
  metadata: {
    ingested_at: new Date().toISOString(),
    total_controls: controls.length,
    notes: [
      'Extended Bausteine beyond the base ingest. Covers CON, OPS, DER, APP, SYS, NET, INF, IND, ORP layers.',
      'Three requirement levels: Basis (MUSS), Standard (SOLLTE), Erhoeht (marked SOLLTE).',
      'ISO mappings based on official BSI Kreuzreferenztabelle (ISO 27001:2022).',
    ],
  },
};

mkdirSync(DATA_DIR, { recursive: true });
writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf-8');
console.log(`BSI IT-Grundschutz Extended: ${controls.length} controls written to ${OUTPUT_FILE}`);
