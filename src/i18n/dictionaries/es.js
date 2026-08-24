export const es = {
  nav: {
    sobreMi: 'Sobre mí',
    destacados: 'Destacados',
    lenguajes: 'Lenguajes',
    proyectos: 'Proyectos',
    experiencia: 'Experiencia',
    pasatiempos: 'Pasatiempos',
    contacto: 'Contacto',
  },
  hero: {
    eyebrow: 'Hola, soy',
    role: 'Full Stack Developer · Java/Spring Boot & React',
    subtitle:
      'Me gusta transformar ideas en soluciones simples y funcionales. Disfruto aprender por mi cuenta, resolver problemas y cuidar los detalles para que lo que construyo se sienta útil y agradable de usar.',
    words: ['Minimalismo', 'Rendimiento', 'UI/UX'],
    ctaProjects: 'Ver proyectos',
    ctaContact: 'Contactarme',
    ctaCv: 'Descargar CV',
  },
  highlights: {
    hackathon: { value: '7.°', label: 'puesto en Hackathon UTP+ (Motiviza+)' },
    sgi: { value: '10+', label: 'sucursales digitalizadas con SGI' },
    vexa: { value: 'Cofundador', label: 'y Líder Técnico en VEXA' },
    proyectos: { value: '5+', label: 'proyectos Full Stack entregados' },
  },
  skills: {
    eyebrow: 'Stack',
    title: 'Lenguajes y herramientas',
    categories: {
      Lenguajes: 'Lenguajes',
      'Frontend & UI': 'Frontend & UI',
      'Backend & BD': 'Backend & BD',
      'Herramientas & Entorno': 'Herramientas & Entorno',
    },
  },
  projects: {
    eyebrow: 'Trabajo',
    title: 'Proyectos',
    thumbFallback: 'Próximamente',
    linkLabels: { demo: 'Demo', frontend: 'Frontend', backend: 'Backend', repo: 'Ver repositorio', apiDocs: 'API Docs' },
    items: {
      eva: {
        title: 'EVA — Finanzas Personales',
        description:
          'Aplicación móvil de finanzas personales: cuentas, metas de ahorro, planificación de gastos y un asistente de IA (Google Gemini) para tomar mejores decisiones financieras.',
      },
      sgi: {
        title: 'SGI — Sistema de Gestión de Minimarkets',
        description:
          'Sistema full stack para digitalizar la operación de una cadena de minimarkets (10 sucursales): interfaz en Angular para gestionar productos, movimientos, sucursales y usuarios, consumiendo una API REST de 30 endpoints (7 módulos) con autenticación JWT y control de acceso por 4 roles (RBAC), documentada con Swagger/OpenAPI.',
      },
      saf: {
        title: 'SAF Service — Gestión para Taller Automotriz',
        description:
          'Sistema full stack para un taller automotriz: interfaz en React para administrar vehículos, clientes, empleados, asistencias y fichas técnicas, con dashboard y roles diferenciados (Admin, Mecánico), consumiendo una API REST de 32 endpoints (6 módulos) desarrollada con Spring Boot.',
      },
      fivuza: {
        title: 'Fivuza — ERP SaaS Multi-tenant',
        description:
          'ERP SaaS multi-tenant: el panel interno y el ERP de cada cliente conviven en el mismo proyecto React (diferenciados por ruta), consumiendo una API REST con aislamiento de datos por esquema de PostgreSQL (django-tenants) y autenticación JWT.',
      },
      vantage: {
        title: 'Vantage — Gestión Ágil de Proyectos',
        description:
          'Aplicación web para gestionar la metodología Scrum en empresas: backlog, sprints y ceremonias de distintos proyectos, con roles (Scrum Master, Product Owner, Dev), tablero Kanban y asignación de tareas.',
      },
    },
  },
  experience: {
    eyebrow: 'Trayectoria',
    title: 'Experiencia',
    visitSite: 'Visitar sitio',
    items: {
      vexa: {
        role: 'Cofundador & Líder Técnico',
        org: 'VEXA — estudio de software',
        period: '2025 — Presente',
        description:
          'Cofundé VEXA junto a 3 socios (Frontend, Backend/Arquitectura, DevOps). Dirijo el desarrollo de Fivuza, un ERP para pequeños negocios con 6 módulos (ventas, inventario, RRHH, usuarios, dashboard, core), actualmente al 40% de avance. Diseñé y desplegué la landing corporativa de VEXA.',
      },
      motiviza: {
        role: 'Líder de equipo',
        org: 'Motiviza+ — Hackathon UTP+ by Xpedition',
        period: 'Junio 2025',
        description:
          'Lideré a un equipo de 6 personas en el diseño y desarrollo de un prototipo web interactivo en 48 horas, orientado a ayudar a estudiantes a gestionar su tiempo en cursos asincrónicos. Obtuvimos el 7.° puesto entregando una demo funcional dentro del plazo.',
      },
    },
  },
  hobbies: {
    eyebrow: 'Fuera del código',
    title: 'Pasatiempos',
    spotifyPlaying: 'Escuchando ahora',
    spotifyRecent: 'Lo último que escuché',
    spotifyListen: 'Escuchar',
    spotifyOfflineLabel: 'Mis favoritos para programar',
    spotifyFavorites: {
      lofi: { title: 'Lo-fi para programar', artist: 'Playlist personal' },
      synthwave: { title: 'Synthwave Focus', artist: 'Playlist personal' },
      focus: { title: 'Deep Focus', artist: 'Playlist personal' },
    },
    liveBadge: 'En vivo',
    offlineBadge: 'Fuera de línea',
    steamStatus: {
      online: 'En línea',
      busy: 'Ocupado',
      away: 'Ausente',
      snooze: 'Inactivo',
      'looking-to-trade': 'Disponible para intercambiar',
      'looking-to-play': 'Buscando jugar',
      offline: 'Desconectado',
      unknown: 'Actualmente desconectado',
    },
    steamPlaying: 'Jugando',
    steamOfflineLabel: 'Jugando en ratos libres',
    steamFavorites: {
      dota2: 'Dota 2',
      minecraft: 'Minecraft',
      roblox: 'Roblox',
      hollowknight: 'Hollow Knight',
      left4dead: 'Left 4 Dead',
    },
    steamAdd: 'Agrégame en Steam',
  },
  contact: {
    eyebrow: 'Hablemos',
    title: 'Contacto',
    formHeading: '¿Tienes un proyecto en mente?',
    nameLabel: 'Nombre',
    emailLabel: 'Correo',
    messageLabel: 'Mensaje',
    submit: 'Enviar mensaje',
    successMessage: 'Gracias por tu mensaje. ¡Te responderé pronto!',
  },
};
