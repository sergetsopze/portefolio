const KEYWORD_ROMES: Array<{ match: RegExp; codes: string[] }> = [
  {
    match: /syst[eè]me|r[eé]seau|administrateur|sysadmin|windows|linux|infrastructure|support n2|mco|active directory|vlan|pare-?feu|siem|rssi/i,
    codes: ["M1801", "M1802", "I1401"],
  },
  {
    match: /cyber|securite|sécurité|pentester|soc /i,
    codes: ["M1802", "M1801"],
  },
  {
    match: /data|analyste|analytics|bi |machine learning|ia |intelligence artificielle/i,
    codes: ["M1403", "M1805", "M1801"],
  },
  {
    match: /design|ux|ui|product design|figma/i,
    codes: ["E1205", "E1104"],
  },
  {
    match: /product|chef de projet|scrum|agile/i,
    codes: ["M1806", "M1402"],
  },
  {
    match: /market|communication|community|seo|growth/i,
    codes: ["M1705", "E1103", "E1101"],
  },
  {
    match: /rh|ressources humaines|recrut/i,
    codes: ["M1502", "M1503"],
  },
  {
    match: /finance|compta|audit|controle de gestion/i,
    codes: ["M1203", "M1204", "M1202"],
  },
  {
    match: /commerce|vente|business developer|account/i,
    codes: ["D1407", "D1402"],
  },
];

const DEFAULT_ROMES = ["M1801", "M1802", "I1401"];

export function romesForKeywords(keywords: string) {
  const hits = KEYWORD_ROMES.filter((entry) => entry.match.test(keywords)).flatMap(
    (entry) => entry.codes,
  );
  return [...new Set(hits.length ? hits : DEFAULT_ROMES)].slice(0, 5);
}
