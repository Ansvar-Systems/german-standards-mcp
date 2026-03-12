// src/tools/list-sources.ts
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { successResponse } from '../response-meta.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

interface SourceEntry {
  id: string;
  authority: string;
  name: string;
  retrieval_method: string;
  license: string;
  url?: string;
}

const FALLBACK_SOURCES: SourceEntry[] = [
  {
    id: 'BSI-Grundschutz',
    authority: 'Bundesamt fuer Sicherheit in der Informationstechnik (BSI)',
    name: 'IT-Grundschutz Kompendium',
    retrieval_method: 'Static download (PDF/HTML)',
    license: 'Public document',
    url: 'https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/IT-Grundschutz-Kompendium/it-grundschutz-kompendium_node.html',
  },
  {
    id: 'BSI-C5',
    authority: 'Bundesamt fuer Sicherheit in der Informationstechnik (BSI)',
    name: 'Cloud Computing Compliance Criteria Catalogue (C5:2020)',
    retrieval_method: 'Static download (PDF)',
    license: 'Public document',
    url: 'https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/Empfehlungen-nach-Angriffszielen/Cloud-Computing/Kriterienkatalog-C5/kriterienkatalog-c5_node.html',
  },
  {
    id: 'BSI-TR',
    authority: 'Bundesamt fuer Sicherheit in der Informationstechnik (BSI)',
    name: 'BSI Technische Richtlinien (TR-02102, TR-03116, TR-03107)',
    retrieval_method: 'Static download (PDF)',
    license: 'Public document',
    url: 'https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Technische-Richtlinien/technische-richtlinien_node.html',
  },
  {
    id: 'BSI-KRITIS',
    authority: 'Bundesamt fuer Sicherheit in der Informationstechnik (BSI)',
    name: 'KRITIS-Anforderungen (IT-Sicherheitsgesetz 2.0)',
    retrieval_method: 'Static download (PDF/HTML)',
    license: 'Public document',
    url: 'https://www.bsi.bund.de/DE/Themen/KRITIS-und-regulierte-Unternehmen/Kritische-Infrastrukturen/kritis_node.html',
  },
  {
    id: 'Grundschutz-Bund',
    authority: 'Bundesamt fuer Sicherheit in der Informationstechnik (BSI)',
    name: 'IT-Grundschutz Profil fuer Bundesbehoerden',
    retrieval_method: 'Static download (PDF)',
    license: 'Public document',
    url: 'https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/IT-Grundschutz-Profile/Profile/Bund/bund_node.html',
  },
  {
    id: 'BfDI-TOM',
    authority: 'Bundesbeauftragte fuer den Datenschutz und die Informationsfreiheit (BfDI)',
    name: 'DSGVO Art. 32 Technisch-Organisatorische Massnahmen (TOM)',
    retrieval_method: 'Static download (PDF/HTML)',
    license: 'Public document',
    url: 'https://www.bfdi.bund.de/DE/Datenschutz/datenschutz_node.html',
  },
];

export function handleListSources() {
  let sources: SourceEntry[] = FALLBACK_SOURCES;

  const sourcesPath = join(__dirname, '..', '..', 'sources.yml');
  if (existsSync(sourcesPath)) {
    try {
      const raw = readFileSync(sourcesPath, 'utf-8');
      void raw;
    } catch {
      // Ignore read errors — use fallback
    }
  }

  const lines: string[] = [];

  lines.push('## Data Sources');
  lines.push('');
  lines.push(
    'This MCP server aggregates German cybersecurity standards from the following authoritative sources:'
  );
  lines.push('');
  lines.push('| ID | Authority | Standard / Document | Retrieval method | License |');
  lines.push('|----|-----------|---------------------|-----------------|---------|');

  for (const src of sources) {
    const nameCell = src.url ? `[${src.name}](${src.url})` : src.name;
    lines.push(`| ${src.id} | ${src.authority} | ${nameCell} | ${src.retrieval_method} | ${src.license} |`);
  }

  lines.push('');
  lines.push(`**Total sources:** ${sources.length}`);
  lines.push('');
  lines.push(
    '> All data is extracted from public authoritative documents published by BSI and BfDI. ' +
    'This tool is a reference aid — verify critical compliance decisions against the originals.'
  );

  return successResponse(lines.join('\n'));
}
