export type GeoHint = {
  label: string;
  department?: string;
  latitude: number;
  longitude: number;
};

const CITIES: Record<string, GeoHint> = {
  paris: { label: "Paris", department: "75", latitude: 48.8566, longitude: 2.3522 },
  lyon: { label: "Lyon", department: "69", latitude: 45.764, longitude: 4.8357 },
  marseille: { label: "Marseille", department: "13", latitude: 43.2965, longitude: 5.3698 },
  toulouse: { label: "Toulouse", department: "31", latitude: 43.6047, longitude: 1.4442 },
  nice: { label: "Nice", department: "06", latitude: 43.7102, longitude: 7.262 },
  nantes: { label: "Nantes", department: "44", latitude: 47.2184, longitude: -1.5536 },
  strasbourg: { label: "Strasbourg", department: "67", latitude: 48.5734, longitude: 7.7521 },
  montpellier: { label: "Montpellier", department: "34", latitude: 43.6108, longitude: 3.8767 },
  bordeaux: { label: "Bordeaux", department: "33", latitude: 44.8378, longitude: -0.5792 },
  lille: { label: "Lille", department: "59", latitude: 50.6292, longitude: 3.0573 },
  rennes: { label: "Rennes", department: "35", latitude: 48.1173, longitude: -1.6778 },
  reims: { label: "Reims", department: "51", latitude: 49.2583, longitude: 4.0317 },
  "le havre": { label: "Le Havre", department: "76", latitude: 49.4944, longitude: 0.1079 },
  "saint-etienne": { label: "Saint-Étienne", department: "42", latitude: 45.4397, longitude: 4.3872 },
  toulon: { label: "Toulon", department: "83", latitude: 43.1242, longitude: 5.928 },
  grenoble: { label: "Grenoble", department: "38", latitude: 45.1885, longitude: 5.7245 },
  dijon: { label: "Dijon", department: "21", latitude: 47.322, longitude: 5.0415 },
  angers: { label: "Angers", department: "49", latitude: 47.4784, longitude: -0.5632 },
  villeurbanne: { label: "Villeurbanne", department: "69", latitude: 45.7719, longitude: 4.8902 },
  "le mans": { label: "Le Mans", department: "72", latitude: 48.0061, longitude: 0.1996 },
  "aix-en-provence": { label: "Aix-en-Provence", department: "13", latitude: 43.5297, longitude: 5.4474 },
  brest: { label: "Brest", department: "29", latitude: 48.3904, longitude: -4.4861 },
  nimes: { label: "Nîmes", department: "30", latitude: 43.8367, longitude: 4.3601 },
  "clermont-ferrand": { label: "Clermont-Ferrand", department: "63", latitude: 45.7772, longitude: 3.087 },
  tours: { label: "Tours", department: "37", latitude: 47.3941, longitude: 0.6848 },
  amiens: { label: "Amiens", department: "80", latitude: 49.8941, longitude: 2.2958 },
  limoges: { label: "Limoges", department: "87", latitude: 45.8336, longitude: 1.2611 },
  annecy: { label: "Annecy", department: "74", latitude: 45.8992, longitude: 6.1294 },
  perpignan: { label: "Perpignan", department: "66", latitude: 42.6887, longitude: 2.8948 },
  metz: { label: "Metz", department: "57", latitude: 49.1193, longitude: 6.1757 },
  besancon: { label: "Besançon", department: "25", latitude: 47.2378, longitude: 6.0241 },
  orleans: { label: "Orléans", department: "45", latitude: 47.9029, longitude: 1.9093 },
  rouen: { label: "Rouen", department: "76", latitude: 49.4432, longitude: 1.0993 },
  caen: { label: "Caen", department: "14", latitude: 49.1829, longitude: -0.3707 },
  nancy: { label: "Nancy", department: "54", latitude: 48.6921, longitude: 6.1846 },
  avignon: { label: "Avignon", department: "84", latitude: 43.9493, longitude: 4.8055 },
  poitiers: { label: "Poitiers", department: "86", latitude: 46.5802, longitude: 0.3404 },
  pau: { label: "Pau", department: "64", latitude: 43.2951, longitude: -0.3708 },
  "la rochelle": { label: "La Rochelle", department: "17", latitude: 46.1603, longitude: -1.1511 },
};

export function resolveLocation(input: string): GeoHint | null {
  const raw = input.trim();
  if (!raw || /^france$/i.test(raw)) return null;

  if (/^\d{2,3}$/.test(raw)) {
    return {
      label: raw,
      department: raw.padStart(2, "0"),
      latitude: 46.2276,
      longitude: 2.2137,
    };
  }

  const key = raw
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return CITIES[key] ?? null;
}

export function isRelevantLocation(value: string) {
  const text = value.toLowerCase();
  return (
    !text ||
    text.includes("france") ||
    text.includes("europe") ||
    text.includes("worldwide") ||
    text.includes("anywhere") ||
    text.includes("remote") ||
    text.includes("télétravail") ||
    text.includes("teletravail") ||
    text.includes("emea")
  );
}
