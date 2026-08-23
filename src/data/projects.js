import sgiImage from '../assets/images/projects/sgi.webp';
import safImage from '../assets/images/projects/saf-automotriz.webp';
import fivuzaImage from '../assets/images/projects/fivuza.webp';
import vantageImage from '../assets/images/projects/vantage.webp';
import evaImage from '../assets/images/projects/eva.webp';

export const projects = [
  {
    id: 'eva',
    title: 'EVA — Finanzas Personales',
    description:
      'Aplicación móvil de finanzas personales: cuentas, metas de ahorro, planificación de gastos y un asistente de IA (Google Gemini) para tomar mejores decisiones financieras.',
    tags: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Gemini AI'],
    image: evaImage,
    links: { repo: 'https://github.com/Shiro-Vs/EVA' },
  },
  {
    id: 'sgi-frontend',
    title: 'SGI — Frontend',
    description:
      'Interfaz en Angular para gestionar productos, movimientos, sucursales y usuarios de una cadena de minimarkets (10 sucursales), consumiendo la API REST del backend.',
    tags: ['Angular', 'TypeScript', 'Chart.js'],
    image: sgiImage,
    links: { repo: 'https://github.com/Shiro-Vs/SGI-Frontend' },
  },
  {
    id: 'sgi-backend',
    title: 'SGI — Backend',
    description:
      'API REST de 30 endpoints (7 módulos) con autenticación JWT y control de acceso por 4 roles (RBAC), documentada con Swagger/OpenAPI.',
    tags: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'MySQL'],
    image: sgiImage,
    links: { repo: 'https://github.com/Shiro-Vs/SGI-Backend' },
  },
  {
    id: 'saf-frontend',
    title: 'SAF Service — Frontend',
    description:
      'Interfaz en React para administrar vehículos, clientes, empleados, asistencias y fichas técnicas de un taller automotriz, con dashboard y roles diferenciados (Admin, Mecánico).',
    tags: ['React', 'TypeScript', 'Vite', 'React Router'],
    image: safImage,
    links: { repo: 'https://github.com/Shiro-Vs/Automotriz' },
  },
  {
    id: 'saf-backend',
    title: 'SAF Service — Backend',
    description:
      'API REST de 32 endpoints (6 módulos) desarrollada con Spring Boot para digitalizar la operación de un taller automotriz.',
    tags: ['Java', 'Spring Boot', 'Spring Data JPA', 'MySQL'],
    image: safImage,
    links: { repo: 'https://github.com/Shiro-Vs/AutomotrizBackend' },
  },
  {
    id: 'fivuza-frontend',
    title: 'Fivuza — Frontend',
    description:
      'Frontend del ERP SaaS multi-tenant de Fivuza: el panel interno y el ERP de cada cliente conviven en el mismo proyecto React, diferenciados por ruta.',
    tags: ['React', 'TypeScript', 'TanStack Query', 'Vite'],
    image: fivuzaImage,
    links: { repo: 'https://github.com/vexa-dev/FivuzaFrontend' },
  },
  {
    id: 'fivuza-backend',
    title: 'Fivuza — Backend',
    description:
      'API REST del ERP SaaS multi-tenant con aislamiento de datos por esquema de PostgreSQL (django-tenants) y autenticación JWT.',
    tags: ['Python', 'Django', 'DRF', 'PostgreSQL', 'JWT'],
    image: fivuzaImage,
    links: { repo: 'https://github.com/vexa-dev/FivuzaBackend' },
  },
  {
    id: 'vantage',
    title: 'Vantage — Gestión Ágil de Proyectos',
    description:
      'Aplicación web para gestionar la metodología Scrum en empresas: backlog, sprints y ceremonias de distintos proyectos, con roles (Scrum Master, Product Owner, Dev), tablero Kanban y asignación de tareas.',
    tags: ['React', 'TypeScript', 'Ant Design', 'Zustand'],
    image: vantageImage,
    links: { repo: 'https://github.com/vexa-dev/VantageFrontend' },
  },
];
