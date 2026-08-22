# Portafolio Personal

[![GitHub](https://img.shields.io/badge/GitHub-Shiro--Vs-181717?style=flat&logo=github)](https://github.com/Shiro-Vs)

Portafolio web con animaciones, estilo Claymorphism y una mascota interactiva. Migrado de HTML/CSS/JS a React + Vite.

## 🚀 Tecnologías

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=black)

- **React 19 + Vite** — SPA compilada a estático, desplegada en GitHub Pages.
- **GSAP + ScrollTrigger** para scroll storytelling y timelines.
- **Framer Motion** para micro-interacciones y física de resorte.
- **Claymorphism** como sistema de diseño (sombras dobles, bordes suaves, paleta pastel).

## 📁 Estructura

```
src/
├── assets/         # íconos e imágenes
├── components/     # componentes reutilizables (ui/, pikachu/)
├── sections/       # Hero, Skills, Projects, Contact
├── hooks/          # hooks de animación (GSAP, cursor, reduced motion)
├── data/           # projects.js, skills.js
└── styles/         # tokens.css (sistema de diseño), global.css
legacy/             # versión estática original, conservada como referencia
```

## 💻 Desarrollo

```bash
npm install
npm run dev
```

## 🚢 Deploy

Se despliega automáticamente a GitHub Pages vía GitHub Actions (`.github/workflows/deploy.yml`) en cada push a `main`. El dominio propio (`shirovs.online`) se preserva mediante `public/CNAME`.

## 📞 Contacto

**Robert Vasquez Sanchez** - [@Shiro-Vs](https://github.com/Shiro-Vs)

- 💼 [LinkedIn](https://www.linkedin.com/in/shirovs)
- 🐙 [GitHub](https://github.com/Shiro-Vs)

---

Hecho con ❤️ por [Robert Vasquez Sanchez](https://github.com/Shiro-Vs)
