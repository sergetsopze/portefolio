import type { ContractFilter } from "./types";

const SYSADMIN_RE =
  /admin|syst[eè]me|r[eé]seau|cyber|rssi|infra|windows|linux|support|n2|n3|siem|s[eé]curit|mco|active.?directory|vlan|firewall|pare-?feu|helpdesk|incident|informatique|\bit\b|digital et data|exploit|production|soc\b|iam\b|messagerie|intune|azure|virtualisation|vmware/i;

const ALTERNANCE_RE = /alternance|apprentissage|apprenti|professionalisation|contrat pro/i;
const STAGE_RE = /stage|internship|intern\b|stagiaire/i;

export function matchesSysadminProfile(text: string) {
  return SYSADMIN_RE.test(text);
}

export function matchesContractFilter(text: string, contract: ContractFilter) {
  if (contract === "alternance") return ALTERNANCE_RE.test(text);
  if (contract === "stage") return STAGE_RE.test(text);
  if (contract === "cdi") return /\bcdi\b|permanent|cdi /i.test(text);
  if (contract === "cdd") return /\bcdd\b|fixed.?term/i.test(text);
  return true;
}

/** Garde l’offre sauf si le contrat affiché contredit clairement le filtre. */
export function rejectsContract(text: string, contract: ContractFilter) {
  if (contract === "all" || !text.trim()) return false;
  if (matchesContractFilter(text, contract)) return false;
  if (contract === "alternance") {
    return (/\bcdi\b/i.test(text) || STAGE_RE.test(text)) && !ALTERNANCE_RE.test(text);
  }
  if (contract === "stage") {
    return ALTERNANCE_RE.test(text) || /\bcdi\b/i.test(text);
  }
  return false;
}

export function parseLooseDate(value: string | null | undefined) {
  if (!value) return null;
  const iso = Date.parse(value);
  if (!Number.isNaN(iso)) return new Date(iso).toISOString();

  const fr = value.match(/(\d{1,2})[/-](\d{1,2})[/-](\d{4})/);
  if (fr) {
    const [, day, month, year] = fr;
    const time = Date.parse(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T12:00:00Z`);
    if (!Number.isNaN(time)) return new Date(time).toISOString();
  }

  const posted = value.match(/posted\s+(\d+)\s+day/i);
  if (posted) {
    const days = Number(posted[1]);
    return new Date(Date.now() - days * 86_400_000).toISOString();
  }
  if (/posted\s+today|aujourd.?hui/i.test(value)) return new Date().toISOString();
  if (/posted\s+yesterday|hier/i.test(value)) {
    return new Date(Date.now() - 86_400_000).toISOString();
  }

  return null;
}
