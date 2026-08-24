import sgiImage from '../assets/images/projects/sgi.webp';
import safImage from '../assets/images/projects/saf-automotriz.webp';
import fivuzaImage from '../assets/images/projects/fivuza.webp';
import vantageImage from '../assets/images/projects/vantage.webp';
import evaImage from '../assets/images/projects/eva.webp';

export const projects = [
  {
    id: 'eva',
    tags: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Gemini AI'],
    image: evaImage,
    links: { repo: 'https://github.com/Shiro-Vs/EVA' },
  },
  {
    id: 'sgi',
    tags: ['Angular', 'TypeScript', 'Chart.js', 'Java', 'Spring Boot', 'Spring Security', 'JWT', 'MySQL'],
    image: sgiImage,
    links: {
      frontend: 'https://github.com/Shiro-Vs/SGI-Frontend',
      backend: 'https://github.com/Shiro-Vs/SGI-Backend',
    },
  },
  {
    id: 'saf',
    tags: ['React', 'TypeScript', 'Vite', 'React Router', 'Java', 'Spring Boot', 'Spring Data JPA', 'MySQL'],
    image: safImage,
    links: {
      frontend: 'https://github.com/Shiro-Vs/Automotriz',
      backend: 'https://github.com/Shiro-Vs/AutomotrizBackend',
    },
  },
  {
    id: 'fivuza',
    tags: ['React', 'TypeScript', 'TanStack Query', 'Vite', 'Python', 'Django', 'DRF', 'PostgreSQL', 'JWT'],
    image: fivuzaImage,
    links: {
      frontend: 'https://github.com/vexa-dev/FivuzaFrontend',
      backend: 'https://github.com/vexa-dev/FivuzaBackend',
    },
  },
  {
    id: 'vantage',
    tags: ['React', 'TypeScript', 'Ant Design', 'Zustand'],
    image: vantageImage,
    links: { repo: 'https://github.com/vexa-dev/VantageFrontend' },
  },
];
