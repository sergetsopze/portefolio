/**
 * Contenu éditable du portfolio — Serge TSOPZE
 * Modifie ce fichier pour mettre à jour textes, compétences, projets, etc.
 */

export const site = {
  name: "Serge TSOPZE",
  role: "Administrateur Systèmes & Réseaux",
  subtitle: "Alternant M2 · Cybersécurité & Cyberdéfense",
  tagline:
    "Étudiant en cybersécurité motivé par l’administration Windows/Linux et le support N2/N3, je recherche une alternance M2 dès septembre 2026 pour contribuer à l’exploitation et à la fiabilisation de votre parc.",
  availability:
    "Recherche d’alternance 12 mois · Rythme 3 semaines entreprise / 1 semaine école · Disponible dès septembre 2026",
  email: "tsopzeserge@gmail.com",
  phone: "+33 7 53 81 59 05",
  location: "92140 Clamart · Mobile sur toute la France",
  links: {
    linkedin: "https://www.linkedin.com/in/sergetsopze",
    github: "https://github.com/sergetsopze",
  },
  about: {
    title: "Profil",
    text: "Issu d’un parcours Administration Systèmes & Réseaux (IUT Douala) puis cycle ingénieur (CESI) et Master Cybersécurité (École Hexagone), j’interviens sur l’exploitation d’un SI hybride : Active Directory, réseaux segmentés, cloud Google Workspace, supervision SIEM et support N2/N3. Autonome, rigoureux et orienté service utilisateur.",
    highlights: [
      "Support N2/N3 & MCO",
      "Windows / Linux",
      "Réseaux & VLAN",
      "SIEM Wazuh",
    ],
  },
  skillDomains: [
    {
      id: "sys-reseau",
      title: "Administration systèmes & réseaux",
      summary:
        "Exploitation quotidienne d’infrastructures Windows/Linux et segmentation réseau.",
      skills: [
        "Active Directory & droits d’accès",
        "Windows Server / postes clients",
        "Linux (administration de base et durcissement)",
        "VLAN L2/L3 & isolation Wi-Fi",
        "Pare-feu & règles de filtrage",
        "Audits de vulnérabilités (Nmap)",
        "Patch management & durcissement OS",
        "VoIP (exploitation parc hybride)",
      ],
    },
    {
      id: "cloud",
      title: "Cloud & identités",
      summary:
        "Gestion des identités et des services collaboratifs en environnement cloud.",
      skills: [
        "Google Workspace (administration)",
        "IAM / gestion des identités",
        "PAM & coffre-forts (Passbolt)",
        "Droits d’accès et gouvernance des comptes",
      ],
    },
    {
      id: "support",
      title: "Support informatique & MCO",
      summary:
        "Maintien en conditions opérationnelles et assistance utilisateurs niveau N2/N3.",
      skills: [
        "Support N2/N3 (incidents complexes)",
        "Assistance physique et PMAD",
        "Gestion de parc & inventaire",
        "Cycle de vie matériel",
        "Rédaction de SOP / procédures N1-N2",
        "Qualité de service utilisateur",
      ],
    },
    {
      id: "dev",
      title: "Développement & automatisation",
      summary:
        "Scripts et outils pour automatiser l’exploitation et fiabiliser les process IT.",
      skills: [
        "Python",
        "PowerShell",
        "Bash",
        "Google Apps Script",
        "Automatisation de process support",
        "Outils d’inventaire / emprunt (développement interne)",
      ],
    },
    {
      id: "supervision",
      title: "Supervision & sécurité opérationnelle",
      summary:
        "Observabilité du SI et détection d’activités suspectes.",
      skills: [
        "Wazuh (SIEM) — déploiement & exploitation",
        "Corrélation de logs",
        "Détection d’activités suspectes",
        "Analyse et correctifs",
      ],
    },
  ],
  experiences: [
    {
      title: "Stage — Administration systèmes & réseaux",
      org: "IFFP",
      location: "Nanterre Préfecture",
      period: "Novembre 2025 – Avril 2026",
      bullets: [
        "Exploitation et support N2/N3 : MCO d’un parc hybride (Windows, Linux, VoIP) ; résolution d’incidents complexes et assistance utilisateurs (physique et PMAD).",
        "Administration et sécurité système : gestion des identités et droits d’accès (AD, Google Workspace) ; durcissement des serveurs et patch management.",
        "Infrastructure réseau : conception de VLAN (L2/L3), isolation des flux Wi-Fi, règles de pare-feu ; audits de vulnérabilités via Nmap.",
        "Supervision : déploiement de Wazuh (SIEM) pour la corrélation de logs et la détection d’activités suspectes.",
        "Gouvernance : rédaction de procédures (SOP) pour le support N1/N2 et automatisation via Apps Script.",
        "Gestion de parc : outils d’inventaire et d’emprunt avec suivi par émargements ; pilotage du cycle de vie matériel.",
      ],
    },
    {
      title: "Stage — Robotique & automatisation",
      org: "CESI",
      location: "Nanterre Ville",
      period: "Juin – Juillet 2025",
      bullets: [
        "Développement d’un système robotique avec bras Niryo, convoyeur et vision artificielle (Python, OpenCV, PyNiryo).",
        "Programmation d’un tri intelligent par reconnaissance de formes et couleurs, avec contrôle en temps réel.",
        "Coordination multi-robots via MQTT (paho-mqtt, Mosquitto).",
      ],
    },
  ],
  projects: [
    {
      title: "SIEM Wazuh — supervision & détection",
      type: "Professionnel",
      year: "2025–2026",
      context: "IFFP",
      description:
        "Déploiement et exploitation d’un SIEM Wazuh pour corréler les logs, suivre la santé des équipements et détecter des activités suspectes sur le parc.",
      stack: ["Wazuh", "SIEM", "Logs", "Supervision"],
      href: "",
    },
    {
      title: "Segmentation réseau & durcissement",
      type: "Professionnel",
      year: "2025–2026",
      context: "IFFP",
      description:
        "Conception de VLAN L2/L3, isolation des flux Wi-Fi, administration des règles de pare-feu et audits de vulnérabilités (Nmap) pour renforcer la sécurité du SI.",
      stack: ["VLAN", "Pare-feu", "Nmap", "Sécurité"],
      href: "",
    },
    {
      title: "Outils de gestion de parc IT",
      type: "Professionnel",
      year: "2025–2026",
      context: "IFFP",
      description:
        "Création d’outils d’inventaire et d’emprunt avec suivi par émargements, pour fiabiliser le cycle de vie matériel et le support.",
      stack: ["Apps Script", "Inventaire", "Process IT"],
      href: "",
    },
    {
      title: "Cellule robotique autonome",
      type: "Académique",
      year: "2025",
      context: "CESI",
      description:
        "Système de tri intelligent avec bras Niryo, vision artificielle et synchronisation multi-robots via MQTT.",
      stack: ["Python", "OpenCV", "MQTT", "PyNiryo"],
      href: "",
    },
    {
      title: "Projet personnel — à compléter",
      type: "Personnel",
      year: "2026",
      context: "Lab / GitHub",
      description:
        "Ajoute ici un projet perso (homelab, scripts d’admin, lab réseau, automation…). Remplace ce bloc dans src/data/site.ts.",
      stack: ["À définir"],
      href: "https://github.com/sergetsopze",
    },
  ],
  certifications: [
    {
      title: "Cyber Ops Associate — Cisco",
      status: "En cours",
      issuer: "Cisco",
    },
    {
      title: "Introduction à la méthode EBIOS Risk Manager",
      status: "Obtenue",
      issuer: "ANSSI / formation",
    },
    {
      title: "Introduction à la cybersécurité",
      status: "Obtenue",
      issuer: "Cisco / Networking Academy",
    },
    {
      title: "Introduction aux réseaux (CCNAv1)",
      status: "Obtenue",
      issuer: "Cisco / Networking Academy",
    },
  ],
  education: [
    {
      title: "Master I — Cybersécurité et Cyberdéfense",
      school: "École Hexagone",
      location: "Versailles, France",
      period: "2025 – 2026",
      details:
        "Sécurité réseau, OS, Endpoint, Forensic, Audit technique, Sécurité Cloud, SMSI, ISO 270XX, EBIOS, environnement juridique cyber.",
    },
    {
      title: "1re année de cycle ingénieur Informatique (Bac+3)",
      school: "CESI",
      location: "Nanterre Ville, France",
      period: "2024 – 2025",
      details:
        "Systèmes d’information et sécurité, Machine Learning, Architectures logicielles, Big Data.",
    },
    {
      title: "Licence de Technologie — Administration Système et Réseaux",
      school: "IUT Douala",
      location: "Cameroun",
      period: "2023 – 2024",
      details:
        "Administration des OS (Windows et Linux), réseaux interconnectés et routeurs, sécurité de l’information et des réseaux.",
    },
  ],
  languages: [
    { name: "Français", level: "C1" },
    { name: "Anglais", level: "B2" },
  ],
  contact: {
    title: "Contact",
    text: "Ouvert aux opportunités d’alternance M2 Administrateur Systèmes & Réseaux / Exploitation SI dès septembre 2026.",
  },
};

export type Site = typeof site;
