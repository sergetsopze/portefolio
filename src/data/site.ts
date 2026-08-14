export const site = {
  name: "Serge TSOPZE",
  initials: "ST",
  email: "tsopzeserge@gmail.com",
  phone: "+33 7 53 81 59 05",
  phoneHref: "+33753815905",
  portrait: "/portrait.png",
  links: {
    linkedin: "https://www.linkedin.com/in/sergetsopze",
    github: "https://github.com/sergetsopze",
  },
} as const;

export const navItems = [
  { href: "#accueil", num: "01", key: "home" },
  { href: "#propos", num: "02", key: "about" },
  { href: "#experience", num: "03", key: "experience" },
  { href: "#projets", num: "04", key: "projects" },
  { href: "#competences", num: "05", key: "skills" },
  { href: "#certifications", num: "06", key: "certs" },
  { href: "#contact", num: "07", key: "contact" },
] as const;

export type Locale = "fr" | "en";
export type Theme = "dark" | "light";

export type ProjectCategory = "all" | "pro" | "academic" | "personal";

export const copy = {
  fr: {
    welcome: "Bienvenue sur mon portfolio",
    enter: "Entrer",
    available: "Recherche d’alternance M2 · sept. 2026",
    role: "Administrateur Systèmes, Réseaux & Sécurité",
    subtitle: "Alternant M2 · Cybersécurité & Cyberdéfense",
    tagline:
      "J’administre, je sécurise et je fiabilise des parcs Windows/Linux : identités, réseaux segmentés, supervision SIEM et support N2/N3. Formé à l’administration systèmes & réseaux, je vise une alternance M2 pour renforcer votre exploitation.",
    ctaProjects: "Voir mes projets",
    ctaContact: "Me contacter",
    downloadCv: "Télécharger mon CV",
    nav: {
      home: "Accueil",
      about: "À propos",
      experience: "Expérience",
      projects: "Projets",
      skills: "Compétences",
      certs: "Certifications",
      contact: "Contacts",
    },
    stackTitle: "01  Ce que je pilote, de bout en bout",
    stack: [
      { label: "Systèmes", code: "OS", items: ["Windows", "Linux", "AD"] },
      { label: "Réseau", code: "NET", items: ["VLAN", "Pare-feu", "Wi-Fi"] },
      { label: "Sécurité", code: "SEC", items: ["Wazuh", "Nmap", "Hardening"] },
      { label: "Cloud", code: "CLD", items: ["Workspace", "IAM", "PAM"] },
    ],
    about: {
      kicker: "02  À propos",
      diploma: "Administrateur Systèmes, Réseaux & Sécurité",
      headline: "L’infrastructure, de l’exploitation au terrain.",
      p1: "Je m’appelle Serge TSOPZE. J’ai construit un parcours centré sur l’administration des systèmes et des réseaux : Licence ASR à l’IUT Douala, cycle ingénieur au CESI, puis Master Cybersécurité et Cyberdéfense à l’École Hexagone.",
      p2: "Mon terrain, c’est le SI hybride : Active Directory, segmentation VLAN, Google Workspace, supervision Wazuh et support N2/N3. J’aime autant résoudre un incident que durcir un serveur ou rédiger la procédure qui évite qu’il se reproduise.",
      p3: "Objectif : intégrer une équipe Exploitation / Infrastructures en alternance M2 dès septembre 2026 pour fiabiliser, sécuriser et optimiser votre parc.",
      factsTitle: "Fiche rapide",
      facts: [
        { label: "Rôle", value: "Administrateur Systèmes & Réseaux" },
        { label: "Diplôme en cours", value: "Master I Cybersécurité — Hexagone" },
        { label: "École", value: "École Hexagone · Versailles" },
        { label: "Basé à", value: "Clamart (92) · Mobile France" },
        { label: "Langues", value: "Français C1 · Anglais B2" },
        { label: "Statut", value: "Alternance M2 · sept. 2026" },
      ],
      stats: [
        { value: "1+", label: "An d’expérience terrain" },
        { value: "N2/N3", label: "Support & MCO" },
        { value: "4", label: "Certifications cyber / réseau" },
        { value: "3", label: "Écoles · ASR, CESI, Hexagone" },
      ],
    },
    experience: {
      kicker: "03  Expérience professionnelle",
      title: "Formation et expérience",
      educationTitle: "Formation",
      jobsTitle: "Expérience",
      education: [
        {
          title: "Master I — Cybersécurité et Cyberdéfense",
          school: "École Hexagone · Versailles",
          period: "2025 – 2026",
          details:
            "Sécurité réseau, OS, Endpoint, Forensic, Audit technique, Sécurité Cloud, SMSI, ISO 270XX, EBIOS.",
          tags: ["Réseau & OS", "Cloud", "EBIOS"],
        },
        {
          title: "1re année cycle ingénieur Informatique (Bac+3)",
          school: "CESI · Nanterre Ville",
          period: "2024 – 2025",
          details:
            "Systèmes d’information et sécurité, Machine Learning, architectures logicielles, Big Data.",
          tags: ["SI & sécurité", "Python", "Architecture"],
        },
        {
          title: "Licence Techno — Administration Système et Réseaux",
          school: "IUT Douala · Cameroun",
          period: "2023 – 2024",
          details:
            "Administration Windows/Linux, réseaux interconnectés et routeurs, sécurité de l’information.",
          tags: ["Windows", "Linux", "Réseaux"],
        },
      ],
      jobs: [
        {
          title: "Stagiaire — Administration systèmes & réseaux",
          org: "IFFP · Nanterre Préfecture",
          kind: "Stage",
          period: "Novembre 2025 – Avril 2026",
          bullets: [
            "MCO d’un parc hybride (Windows, Linux, VoIP) et support N2/N3 (physique et PMAD).",
            "Identités et droits (AD, Google Workspace), durcissement serveurs et patch management.",
            "VLAN L2/L3, isolation Wi-Fi, règles de pare-feu, audits Nmap.",
            "Déploiement Wazuh (SIEM), SOP support N1/N2 et outils d’inventaire.",
          ],
          tags: ["AD", "VLAN", "Wazuh", "MCO"],
        },
        {
          title: "Stagiaire — Robotique & automatisation",
          org: "CESI · Nanterre Ville",
          kind: "Stage",
          period: "Juin – Juillet 2025",
          bullets: [
            "Système robotique Niryo + vision artificielle (Python, OpenCV).",
            "Tri intelligent et coordination multi-robots via MQTT.",
          ],
          tags: ["Python", "MQTT", "OpenCV"],
        },
      ],
    },
    projects: {
      kicker: "04  Mes projets",
      title: "Mes projets",
      hint: "Filtres et galerie prêts : les captures d’écran pourront être ajoutées ensuite.",
      filters: [
        { id: "all", label: "Tous" },
        { id: "pro", label: "Systèmes & réseau" },
        { id: "academic", label: "Académique" },
        { id: "personal", label: "Personnel" },
      ],
      items: [
        {
          id: "wazuh",
          category: "pro" as const,
          status: "Terminé",
          title: "SIEM Wazuh — supervision & détection",
          summary: "Observabilité du parc et corrélation de logs",
          description:
            "Déploiement et exploitation d’un SIEM Wazuh pour suivre la santé des équipements et détecter des activités suspectes.",
          role: "Déploiement & exploitation",
          result: "Corrélation de logs et détection d’incidents sur le SI.",
          stack: ["Wazuh", "SIEM", "Linux"],
          images: [
            "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1400&q=80",
          ],
        },
        {
          id: "vlan",
          category: "pro" as const,
          status: "Terminé",
          title: "Segmentation réseau & durcissement",
          summary: "Isolation des flux et réduction de la surface d’attaque",
          description:
            "Conception de VLAN L2/L3, isolation Wi-Fi, règles de pare-feu et audits Nmap.",
          role: "Conception & administration",
          result: "Meilleure isolation des flux et durcissement du SI.",
          stack: ["VLAN", "Pare-feu", "Nmap"],
          images: [
            "https://images.unsplash.com/photo-1544197150-b99a41b6c09d?auto=format&fit=crop&w=1400&q=80",
          ],
        },
        {
          id: "parc",
          category: "pro" as const,
          status: "Terminé",
          title: "Outils de gestion de parc IT",
          summary: "Inventaire, emprunts et cycle de vie matériel",
          description:
            "Outils d’inventaire et d’emprunt avec suivi par émargements pour fiabiliser le support.",
          role: "Process & automatisation",
          result: "Suivi du matériel plus fiable pour l’équipe support.",
          stack: ["Apps Script", "Inventaire"],
          images: [
            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80",
          ],
        },
        {
          id: "niryo",
          category: "academic" as const,
          status: "Terminé",
          title: "Cellule robotique autonome",
          summary: "Tri intelligent multi-robots synchronisé",
          description:
            "Bras Niryo, vision artificielle et communication MQTT pour un tri automatisé.",
          role: "Développement & intégration",
          result: "Tri temps réel coordonné via MQTT.",
          stack: ["Python", "OpenCV", "MQTT"],
          images: [
            "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1400&q=80",
          ],
        },
      ],
    },
    skills: {
      kicker: "05  La pile, couche par couche",
      title: "La pile, couche par couche",
      intro:
        "Ce que je manipule au quotidien. Les éléments surlignés en bleu sont ceux sur lesquels je suis le plus à l’aise.",
      layers: [
        {
          title: "Systèmes",
          code: "OS",
          count: "3",
          items: [
            { name: "Windows Server", highlight: true },
            { name: "Linux", highlight: true },
            { name: "Active Directory", highlight: true },
            { name: "Patch management", highlight: false },
          ],
        },
        {
          title: "Réseaux",
          code: "NET",
          count: "4",
          items: [
            { name: "VLAN L2/L3", highlight: true },
            { name: "Pare-feu", highlight: true },
            { name: "TCP/IP", highlight: true },
            { name: "Wi-Fi isolé", highlight: false },
          ],
        },
        {
          title: "Sécurité",
          code: "SEC",
          count: "SEC",
          items: [
            { name: "Wazuh (SIEM)", highlight: true },
            { name: "Nmap", highlight: true },
            { name: "Durcissement OS", highlight: true },
            { name: "EBIOS", highlight: false },
          ],
        },
        {
          title: "Cloud & identités",
          code: "IAM",
          count: "IAM",
          items: [
            { name: "Google Workspace", highlight: true },
            { name: "IAM", highlight: true },
            { name: "Passbolt / PAM", highlight: false },
          ],
        },
        {
          title: "Support & MCO",
          code: "OPS",
          count: "OPS",
          items: [
            { name: "Support N2/N3", highlight: true },
            { name: "MCO", highlight: true },
            { name: "SOP / procédures", highlight: false },
            { name: "Gestion de parc", highlight: false },
          ],
        },
        {
          title: "Automatisation",
          code: "CODE",
          count: "CODE",
          items: [
            { name: "PowerShell", highlight: true },
            { name: "Python", highlight: true },
            { name: "Bash", highlight: false },
            { name: "Apps Script", highlight: false },
          ],
        },
      ],
      bars: [
        { label: "Windows · Linux · Active Directory", value: 90 },
        { label: "VLAN · Pare-feu · TCP/IP", value: 86 },
        { label: "Support N2/N3 · MCO", value: 88 },
        { label: "Wazuh · logs · détection", value: 80 },
        { label: "Google Workspace · IAM", value: 78 },
        { label: "PowerShell · Python · Bash", value: 75 },
      ],
    },
    certs: {
      kicker: "06  Certifications",
      title: "Certifications et reconnaissances",
      items: [
        {
          title: "Cyber Ops Associate — Cisco",
          detail:
            "Certification opérationnelle cyber en cours : détection, analyse et réponse aux incidents.",
          issuer: "Cisco",
          status: "En cours",
        },
        {
          title: "Introduction à la méthode EBIOS Risk Manager",
          detail:
            "Initiation à l’analyse de risques selon la méthode EBIOS, référentiel ANSSI.",
          issuer: "ANSSI / formation",
          status: "Obtenue",
        },
        {
          title: "Introduction à la cybersécurité",
          detail:
            "Fondamentaux de la cybersécurité : menaces, défense et bonnes pratiques.",
          issuer: "Cisco Networking Academy",
          status: "Obtenue",
        },
        {
          title: "Introduction aux réseaux (CCNAv1)",
          detail:
            "Bases des réseaux : modèles OSI/TCP-IP, adressage, commutation et routage.",
          issuer: "Cisco Networking Academy",
          status: "Obtenue",
        },
      ],
    },
    contact: {
      kicker: "07  Contact",
      title: "Une infrastructure à fiabiliser ? Écrivez-moi.",
      text: "Ouvert aux opportunités d’alternance M2 en administration systèmes, réseaux et sécurité. Je réponds sous 24 heures.",
      name: "Nom",
      email: "Email",
      message: "Message",
      send: "Envoyer le message",
      sent: "Ouverture de votre client mail…",
      mail: "Courriel",
      phone: "Téléphone",
      locationLabel: "Localisation",
      location: "Clamart (92) · Mobile France entière",
      document: "Document",
      cv: "Curriculum Vitæ (PDF)",
      namePh: "Votre nom",
      emailPh: "vous@entreprise.com",
      messagePh: "Votre besoin (alternance, mission, question…)",
    },
    footer: "Construit avec Next.js · Hébergé sur Vercel",
  },
  en: {
    welcome: "Welcome to my portfolio",
    enter: "Enter",
    available: "Looking for a 2nd-year Master’s apprenticeship · Sept. 2026",
    role: "Systems, Network & Security Administrator",
    subtitle: "M2 apprentice · Cybersecurity & Cyberdefence",
    tagline:
      "I operate, secure and harden Windows/Linux estates: identities, segmented networks, SIEM monitoring and N2/N3 support. With a systems & network background, I am looking for an M2 apprenticeship to strengthen your operations team.",
    ctaProjects: "View my work",
    ctaContact: "Contact me",
    downloadCv: "Download my CV",
    nav: {
      home: "Home",
      about: "About",
      experience: "Experience",
      projects: "Projects",
      skills: "Skills",
      certs: "Certifications",
      contact: "Contact",
    },
    stackTitle: "01  What I run, end to end",
    stack: [
      { label: "Systems", code: "OS", items: ["Windows", "Linux", "AD"] },
      { label: "Network", code: "NET", items: ["VLAN", "Firewall", "Wi-Fi"] },
      { label: "Security", code: "SEC", items: ["Wazuh", "Nmap", "Hardening"] },
      { label: "Cloud", code: "CLD", items: ["Workspace", "IAM", "PAM"] },
    ],
    about: {
      kicker: "02  About",
      diploma: "Systems, Network & Security Administrator",
      headline: "Infrastructure, from operations to the floor.",
      p1: "My name is Serge TSOPZE. My path is built around systems and network administration: an ASR degree at IUT Douala, an engineering cycle at CESI, then a Master’s in Cybersecurity and Cyberdefence at École Hexagone.",
      p2: "I work on hybrid IT: Active Directory, VLAN segmentation, Google Workspace, Wazuh monitoring and N2/N3 support. I enjoy resolving incidents as much as hardening a server or writing the SOP that prevents a repeat.",
      p3: "Goal: join an Operations / Infrastructure team as an M2 apprentice from September 2026 to make your estate more reliable, secure and efficient.",
      factsTitle: "Quick facts",
      facts: [
        { label: "Role", value: "Systems & Network Administrator" },
        { label: "Current degree", value: "M1 Cybersecurity — Hexagone" },
        { label: "School", value: "École Hexagone · Versailles" },
        { label: "Based in", value: "Clamart (92) · Mobile across France" },
        { label: "Languages", value: "French C1 · English B2" },
        { label: "Status", value: "M2 apprenticeship · Sept. 2026" },
      ],
      stats: [
        { value: "1+", label: "Year of hands-on experience" },
        { value: "N2/N3", label: "Support & run operations" },
        { value: "4", label: "Cyber / network certifications" },
        { value: "3", label: "Schools · ASR, CESI, Hexagone" },
      ],
    },
    experience: {
      kicker: "03  Professional experience",
      title: "Education and experience",
      educationTitle: "Education",
      jobsTitle: "Experience",
      education: [
        {
          title: "Master’s Year 1 — Cybersecurity and Cyberdefence",
          school: "École Hexagone · Versailles",
          period: "2025 – 2026",
          details:
            "Network security, OS, endpoint, forensics, technical audit, cloud security, ISMS, ISO 270XX, EBIOS.",
          tags: ["Network & OS", "Cloud", "EBIOS"],
        },
        {
          title: "Engineering cycle Year 1 (Bachelor+3)",
          school: "CESI · Nanterre",
          period: "2024 – 2025",
          details:
            "Information systems and security, machine learning, software architectures, big data.",
          tags: ["IS & security", "Python", "Architecture"],
        },
        {
          title: "Technology degree — Systems & Network Administration",
          school: "IUT Douala · Cameroon",
          period: "2023 – 2024",
          details:
            "Windows/Linux administration, interconnected networks and routers, information security.",
          tags: ["Windows", "Linux", "Networking"],
        },
      ],
      jobs: [
        {
          title: "Intern — Systems & network administration",
          org: "IFFP · Nanterre",
          kind: "Internship",
          period: "November 2025 – April 2026",
          bullets: [
            "Run operations on a hybrid estate (Windows, Linux, VoIP) and N2/N3 support (on-site and remote).",
            "Identity and access (AD, Google Workspace), server hardening and patch management.",
            "L2/L3 VLANs, Wi-Fi isolation, firewall rules, Nmap audits.",
            "Wazuh SIEM rollout, N1/N2 SOPs and inventory tooling.",
          ],
          tags: ["AD", "VLAN", "Wazuh", "Ops"],
        },
        {
          title: "Intern — Robotics & automation",
          org: "CESI · Nanterre",
          kind: "Internship",
          period: "June – July 2025",
          bullets: [
            "Niryo robotic cell with computer vision (Python, OpenCV).",
            "Smart sorting and multi-robot coordination over MQTT.",
          ],
          tags: ["Python", "MQTT", "OpenCV"],
        },
      ],
    },
    projects: {
      kicker: "04  My projects",
      title: "My projects",
      hint: "Filters and gallery are ready — screenshots can be dropped in later.",
      filters: [
        { id: "all", label: "All" },
        { id: "pro", label: "Systems & network" },
        { id: "academic", label: "Academic" },
        { id: "personal", label: "Personal" },
      ],
      items: [
        {
          id: "wazuh",
          category: "pro" as const,
          status: "Completed",
          title: "Wazuh SIEM — monitoring & detection",
          summary: "Estate observability and log correlation",
          description:
            "Deployed and operated Wazuh SIEM to track device health and spot suspicious activity.",
          role: "Deployment & operations",
          result: "Log correlation and incident detection on the estate.",
          stack: ["Wazuh", "SIEM", "Linux"],
          images: [
            "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1400&q=80",
          ],
        },
        {
          id: "vlan",
          category: "pro" as const,
          status: "Completed",
          title: "Network segmentation & hardening",
          summary: "Traffic isolation and a smaller attack surface",
          description:
            "L2/L3 VLAN design, Wi-Fi isolation, firewall rules and Nmap audits.",
          role: "Design & administration",
          result: "Better traffic isolation and a hardened estate.",
          stack: ["VLAN", "Firewall", "Nmap"],
          images: [
            "https://images.unsplash.com/photo-1544197150-b99a41b6c09d?auto=format&fit=crop&w=1400&q=80",
          ],
        },
        {
          id: "parc",
          category: "pro" as const,
          status: "Completed",
          title: "IT asset-management tooling",
          summary: "Inventory, loans and hardware lifecycle",
          description:
            "Inventory and loan tools with sign-off tracking to make support more reliable.",
          role: "Process & automation",
          result: "More reliable hardware tracking for the support team.",
          stack: ["Apps Script", "Inventory"],
          images: [
            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80",
          ],
        },
        {
          id: "niryo",
          category: "academic" as const,
          status: "Completed",
          title: "Autonomous robotic cell",
          summary: "Synchronised multi-robot smart sorting",
          description:
            "Niryo arm, computer vision and MQTT for automated sorting.",
          role: "Development & integration",
          result: "Real-time sorting coordinated over MQTT.",
          stack: ["Python", "OpenCV", "MQTT"],
          images: [
            "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1400&q=80",
          ],
        },
      ],
    },
    skills: {
      kicker: "05  The stack, layer by layer",
      title: "The stack, layer by layer",
      intro:
        "What I use day to day. Items highlighted in blue are the ones I am most comfortable with.",
      layers: [
        {
          title: "Systems",
          code: "OS",
          count: "3",
          items: [
            { name: "Windows Server", highlight: true },
            { name: "Linux", highlight: true },
            { name: "Active Directory", highlight: true },
            { name: "Patch management", highlight: false },
          ],
        },
        {
          title: "Networking",
          code: "NET",
          count: "4",
          items: [
            { name: "L2/L3 VLAN", highlight: true },
            { name: "Firewall", highlight: true },
            { name: "TCP/IP", highlight: true },
            { name: "Isolated Wi-Fi", highlight: false },
          ],
        },
        {
          title: "Security",
          code: "SEC",
          count: "SEC",
          items: [
            { name: "Wazuh (SIEM)", highlight: true },
            { name: "Nmap", highlight: true },
            { name: "OS hardening", highlight: true },
            { name: "EBIOS", highlight: false },
          ],
        },
        {
          title: "Cloud & identity",
          code: "IAM",
          count: "IAM",
          items: [
            { name: "Google Workspace", highlight: true },
            { name: "IAM", highlight: true },
            { name: "Passbolt / PAM", highlight: false },
          ],
        },
        {
          title: "Support & ops",
          code: "OPS",
          count: "OPS",
          items: [
            { name: "N2/N3 support", highlight: true },
            { name: "Run operations", highlight: true },
            { name: "SOPs", highlight: false },
            { name: "Asset management", highlight: false },
          ],
        },
        {
          title: "Automation",
          code: "CODE",
          count: "CODE",
          items: [
            { name: "PowerShell", highlight: true },
            { name: "Python", highlight: true },
            { name: "Bash", highlight: false },
            { name: "Apps Script", highlight: false },
          ],
        },
      ],
      bars: [
        { label: "Windows · Linux · Active Directory", value: 90 },
        { label: "VLAN · Firewall · TCP/IP", value: 86 },
        { label: "N2/N3 support · run ops", value: 88 },
        { label: "Wazuh · logs · detection", value: 80 },
        { label: "Google Workspace · IAM", value: 78 },
        { label: "PowerShell · Python · Bash", value: 75 },
      ],
    },
    certs: {
      kicker: "06  Certifications",
      title: "Certifications and recognition",
      items: [
        {
          title: "Cyber Ops Associate — Cisco",
          detail:
            "Hands-on cyber operations certification in progress: detection, analysis and incident response.",
          issuer: "Cisco",
          status: "In progress",
        },
        {
          title: "Introduction to EBIOS Risk Manager",
          detail:
            "Introduction to risk analysis with the EBIOS method (ANSSI framework).",
          issuer: "ANSSI / training",
          status: "Earned",
        },
        {
          title: "Introduction to Cybersecurity",
          detail:
            "Cybersecurity fundamentals: threats, defence and good practices.",
          issuer: "Cisco Networking Academy",
          status: "Earned",
        },
        {
          title: "Introduction to Networks (CCNAv1)",
          detail:
            "Networking basics: OSI/TCP-IP, addressing, switching and routing.",
          issuer: "Cisco Networking Academy",
          status: "Earned",
        },
      ],
    },
    contact: {
      kicker: "07  Contact",
      title: "Infrastructure to harden? Write to me.",
      text: "Open to M2 apprenticeships in systems, network and security administration. I reply within 24 hours.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send message",
      sent: "Opening your mail client…",
      mail: "Email",
      phone: "Phone",
      locationLabel: "Location",
      location: "Clamart (92) · Mobile across France",
      document: "Document",
      cv: "Curriculum Vitæ (PDF)",
      namePh: "Your name",
      emailPh: "you@company.com",
      messagePh: "Your need (apprenticeship, assignment, question…)",
    },
    footer: "Built with Next.js · Hosted on Vercel",
  },
} as const;

export type Copy = (typeof copy)[Locale];
