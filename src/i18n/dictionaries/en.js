export const en = {
  nav: {
    sobreMi: 'About',
    destacados: 'Highlights',
    lenguajes: 'Skills',
    proyectos: 'Projects',
    experiencia: 'Experience',
    contacto: 'Contact',
  },
  hero: {
    eyebrow: "Hi, I'm",
    role: 'Full Stack Developer · Java/Spring Boot & React',
    subtitle:
      'I like turning ideas into simple, functional solutions. I enjoy learning on my own, solving problems, and caring about the details so that what I build feels useful and pleasant to use.',
    words: ['Minimalism', 'Performance', 'UI/UX'],
    ctaProjects: 'View projects',
    ctaContact: 'Get in touch',
    ctaCv: 'Download CV',
  },
  highlights: {
    hackathon: { value: '7th', label: 'place at UTP+ Hackathon (Motiviza+)' },
    sgi: { value: '10+', label: 'branches digitized with SGI' },
    vexa: { value: 'Co-founder', label: 'and Tech Lead at VEXA' },
    proyectos: { value: '5+', label: 'Full Stack projects delivered' },
  },
  skills: {
    eyebrow: 'Stack',
    title: 'Languages and tools',
    categories: {
      Lenguajes: 'Languages',
      'Frontend & UI': 'Frontend & UI',
      'Backend & BD': 'Backend & DB',
      'Herramientas & Entorno': 'Tools & Environment',
    },
  },
  projects: {
    eyebrow: 'Work',
    title: 'Projects',
    thumbFallback: 'Coming soon',
    linkLabels: { demo: 'Demo', frontend: 'Frontend', backend: 'Backend', repo: 'View repository', apiDocs: 'API Docs' },
    items: {
      eva: {
        title: 'EVA — Personal Finance',
        description:
          'Personal finance mobile app: accounts, savings goals, expense planning, and an AI assistant (Google Gemini) to help make better financial decisions.',
      },
      sgi: {
        title: 'SGI — Minimarket Management System',
        description:
          "Full stack system to digitize the operation of a minimarket chain (10 branches): an Angular interface to manage products, stock movements, branches, and users, consuming a REST API with 30 endpoints (7 modules), JWT authentication, and role-based access control (RBAC) for 4 roles, documented with Swagger/OpenAPI.",
      },
      saf: {
        title: 'SAF Service — Auto Repair Shop Management',
        description:
          'Full stack system for an auto repair shop: a React interface to manage vehicles, clients, employees, attendance, and technical records, with a dashboard and differentiated roles (Admin, Mechanic), consuming a REST API with 32 endpoints (6 modules) built with Spring Boot.',
      },
      fivuza: {
        title: 'Fivuza — Multi-tenant SaaS ERP',
        description:
          "Multi-tenant SaaS ERP: the internal panel and each client's ERP live in the same React project (split by route), consuming a REST API with data isolation per PostgreSQL schema (django-tenants) and JWT authentication.",
      },
      vantage: {
        title: 'Vantage — Agile Project Management',
        description:
          'Web app to manage the Scrum methodology across companies: backlog, sprints, and ceremonies for different projects, with roles (Scrum Master, Product Owner, Dev), a Kanban board, and task assignment.',
      },
    },
  },
  experience: {
    eyebrow: 'Journey',
    title: 'Experience',
    visitSite: 'Visit site',
    items: {
      vexa: {
        role: 'Co-founder & Tech Lead',
        org: 'VEXA — software studio',
        period: '2025 — Present',
        description:
          "Co-founded VEXA with 3 partners (Frontend, Backend/Architecture, DevOps). I lead development of Fivuza, an ERP for small businesses with 6 modules (sales, inventory, HR, users, dashboard, core), currently at 40% progress. I designed and deployed VEXA's corporate landing page.",
      },
      motiviza: {
        role: 'Team Lead',
        org: 'Motiviza+ — UTP+ Hackathon by Xpedition',
        period: 'June 2025',
        description:
          'Led a team of 6 in designing and building an interactive web prototype in 48 hours, aimed at helping students manage their time in asynchronous courses. We placed 7th, delivering a working demo within the deadline.',
      },
    },
  },
  hobbies: {
    eyebrow: 'Off the clock',
    title: 'Hobbies',
    spotifyPlaying: 'Listening now',
    spotifyRecent: 'Last listened to',
    spotifyListen: 'Listen',
    spotifyOfflineLabel: 'My coding favorites',
    spotifyFavorites: {
      lofi: { title: 'Lo-fi beats for coding', artist: 'Personal playlist' },
      synthwave: { title: 'Synthwave Focus', artist: 'Personal playlist' },
      focus: { title: 'Deep Focus', artist: 'Personal playlist' },
    },
    liveBadge: 'Live',
    offlineBadge: 'Offline',
    widgetToggle: 'View Spotify and Steam activity',
    widgetIdle: 'My favorites',
    steamStatus: {
      online: 'Online',
      busy: 'Busy',
      away: 'Away',
      snooze: 'Snooze',
      'looking-to-trade': 'Looking to trade',
      'looking-to-play': 'Looking to play',
      offline: 'Offline',
      unknown: 'Currently offline',
    },
    steamPlaying: 'Playing',
    steamOfflineLabel: 'Playing in my free time',
    steamFavorites: {
      dota2: 'Dota 2',
      minecraft: 'Minecraft',
      roblox: 'Roblox',
      hollowknight: 'Hollow Knight',
      left4dead: 'Left 4 Dead',
    },
    steamAdd: 'Add me on Steam',
  },
  contact: {
    eyebrow: "Let's talk",
    title: 'Contact',
    formHeading: 'Have a project in mind?',
    nameLabel: 'Name',
    emailLabel: 'Email',
    messageLabel: 'Message',
    submit: 'Send message',
    successMessage: "Thanks for your message. I'll get back to you soon!",
  },
};
