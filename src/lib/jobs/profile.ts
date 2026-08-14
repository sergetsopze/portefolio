/** Profil calé sur le CV : alternance M2 administrateur systèmes & réseaux. */

export const jobProfile = {
  name: "Serge Tsopze",
  title: "Administrateur systèmes & réseaux",
  contract: "alternance" as const,
  location: "France",
  keywords: "administrateur systèmes réseaux",
  presets: [
    {
      id: "sysadmin",
      label: "Systèmes & réseaux",
      keywords: "administrateur systèmes réseaux",
    },
    {
      id: "rssi",
      label: "Assistant RSSI",
      keywords: "RSSI cybersécurité",
    },
    {
      id: "support",
      label: "Support N2 / N3",
      keywords: "support N2 N3 infrastructure",
    },
    {
      id: "windows-linux",
      label: "Windows / Linux",
      keywords: "administrateur Windows Linux",
    },
  ],
};
