// --- GSAP + ScrollTrigger ---
// Capa de scroll storytelling y 3D sobre la base de Anime.js (que sigue
// controlando typing, marquee, glitch, spotlight y el flip del avatar).

document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReducedMotion) return;

  const tieneHoverFino = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;

  const mm = gsap.matchMedia();

  // --- Tono del fondo estelar ligado al progreso total de scroll ---
  // Se anima opacity (compositor, barato) en vez de un filter CSS, que
  // obliga al navegador a repintar toda la pantalla en cada frame de scroll.
  const fondo = document.getElementById("fondo-interactivo");
  const tinte = document.getElementById("fondo-tinte");
  if (tinte) {
    gsap.to(tinte, {
      opacity: 0.16,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      },
    });
  }

  // --- Escritorio: hero pineado, lenguajes en flip 3D, proyectos en flip 3D ---
  mm.add("(min-width: 768px)", () => {
    // HERO: se queda fijo mientras el usuario sigue scrolleando, y se
    // encoge/desvanece dando paso a #lenguajes; el fondo hace zoom para dar
    // sensación de avanzar por el espacio.
    ScrollTrigger.create({
      trigger: "#sobreMi",
      start: "top top",
      end: "+=100%",
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        gsap.set("#sobreMi .sobre-grid", {
          yPercent: self.progress * -25,
          scale: 1 - self.progress * 0.15,
          opacity: 1 - self.progress,
        });
        if (fondo) gsap.set(fondo, { scale: 1 + self.progress * 0.35 });
      },
    });

    // LENGUAJES: cada categoría entra con un flip 3D en cascada
    const categorias = gsap.utils.toArray(".lista-herramientas .categoria");
    if (categorias.length) {
      gsap.set(".lista-herramientas", { perspective: 1000 });
      gsap.set(categorias, {
        opacity: 0,
        rotateY: -40,
        y: 40,
        transformOrigin: "left center",
      });

      ScrollTrigger.batch(categorias, {
        start: "top 85%",
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            rotateY: 0,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power4.out",
          }),
        onLeave: (batch) =>
          gsap.set(batch, { opacity: 0, rotateY: -40, y: 40 }),
        onEnterBack: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            rotateY: 0,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          }),
        onLeaveBack: (batch) =>
          gsap.set(batch, { opacity: 0, rotateY: -40, y: 40 }),
      });
    }

    // PROYECTOS: cada tarjeta entra volteándose desde abajo (flip 3D)
    const proyectos = gsap.utils.toArray(".proyectos-card .proyecto");
    if (proyectos.length) {
      gsap.set(proyectos, {
        opacity: 0,
        rotateX: 55,
        y: 70,
        transformOrigin: "center bottom",
      });

      ScrollTrigger.batch(proyectos, {
        start: "top 88%",
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            rotateX: 0,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
          }),
        onLeave: (batch) => gsap.set(batch, { opacity: 0, rotateX: 55, y: 70 }),
        onEnterBack: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            rotateX: 0,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          }),
        onLeaveBack: (batch) =>
          gsap.set(batch, { opacity: 0, rotateX: 55, y: 70 }),
      });
    }

    return () => {}; // cleanup automático de ScrollTrigger al salir del breakpoint
  });

  // --- Móvil / Tablet (< 768px): fade-in y slide suaves (sin 3D pesado) ---
  mm.add("(max-width: 767px)", () => {
    // LENGUAJES: entrada limpia hacia arriba
    const categorias = gsap.utils.toArray(".lista-herramientas .categoria");
    if (categorias.length) {
      gsap.set(categorias, { opacity: 0, y: 30 });

      ScrollTrigger.batch(categorias, {
        start: "top 92%",
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
          }),
        onEnterBack: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          }),
      });
    }

    // PROYECTOS: entrada limpia hacia arriba
    const proyectos = gsap.utils.toArray(".proyectos-card .proyecto");
    if (proyectos.length) {
      gsap.set(proyectos, { opacity: 0, y: 35 });

      ScrollTrigger.batch(proyectos, {
        start: "top 92%",
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
          }),
        onEnterBack: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          }),
      });
    }

    return () => {};
  });

  // --- CONTACTO: entrada lateral (funciona en cualquier ancho) ---
  gsap.set("#contacto .colum-derecha", { opacity: 0, x: -60 });
  gsap.set("#contacto form", { opacity: 0, x: 60 });

  gsap.to("#contacto .colum-derecha", {
    opacity: 1,
    x: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#contacto",
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
  });

  gsap.to("#contacto form", {
    opacity: 1,
    x: 0,
    duration: 1,
    delay: 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#contacto",
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
  });

  // --- Tilt 3D en hover de las tarjetas de proyecto (solo con puntero fino) ---
  if (tieneHoverFino) {
    document.querySelectorAll(".proyecto.tarjeta").forEach((card) => {
      const setRotateX = gsap.quickTo(card, "rotateX", {
        duration: 0.4,
        ease: "power3",
      });
      const setRotateY = gsap.quickTo(card, "rotateY", {
        duration: 0.4,
        ease: "power3",
      });
      const setScale = gsap.quickTo(card, "scale", {
        duration: 0.4,
        ease: "power3",
      });

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        setRotateY(px * 16);
        setRotateX(-py * 16);
        setScale(1.03);
      });

      card.addEventListener("mouseleave", () => {
        setRotateX(0);
        setRotateY(0);
        setScale(1);
      });
    });
  }

  // --- Cursor personalizado (solo con puntero fino) ---
  if (tieneHoverFino) {
    const punto = document.getElementById("cursor-punto");
    const anillo = document.getElementById("cursor-anillo");

    if (punto && anillo) {
      document.body.classList.add("cursor-activo");
      gsap.set([punto, anillo], { xPercent: -50, yPercent: -50 });

      const moverPuntoX = gsap.quickTo(punto, "x", { duration: 0.08, ease: "power3" });
      const moverPuntoY = gsap.quickTo(punto, "y", { duration: 0.08, ease: "power3" });
      const moverAnilloX = gsap.quickTo(anillo, "x", { duration: 0.35, ease: "power3" });
      const moverAnilloY = gsap.quickTo(anillo, "y", { duration: 0.35, ease: "power3" });

      window.addEventListener("mousemove", (e) => {
        moverPuntoX(e.clientX);
        moverPuntoY(e.clientY);
        moverAnilloX(e.clientX);
        moverAnilloY(e.clientY);
      });

      document
        .querySelectorAll("a, button, .boton, .item, .proyecto.tarjeta, input, textarea")
        .forEach((el) => {
          el.addEventListener("mouseenter", () => anillo.classList.add("cursor-agrandado"));
          el.addEventListener("mouseleave", () => anillo.classList.remove("cursor-agrandado"));
        });
    }
  }

  // --- Botones magnéticos (solo con puntero fino) ---
  if (tieneHoverFino) {
    document.querySelectorAll(".redes a, .proyecto .boton").forEach((el) => {
      const moverX = gsap.quickTo(el, "x", { duration: 0.3, ease: "power3" });
      const moverY = gsap.quickTo(el, "y", { duration: 0.3, ease: "power3" });

      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        moverX(relX * 0.35);
        moverY(relY * 0.35);
      });

      el.addEventListener("mouseleave", () => {
        moverX(0);
        moverY(0);
      });
    });
  }

  // --- Partículas al hacer click ---
  const crearParticulas = (x, y) => {
    const cantidad = 8;
    for (let i = 0; i < cantidad; i++) {
      const particula = document.createElement("div");
      particula.className = "particula-click";
      document.body.appendChild(particula);
      gsap.set(particula, { x, y, xPercent: -50, yPercent: -50, opacity: 1, scale: 1 });

      const angulo = (Math.PI * 2 * i) / cantidad + Math.random() * 0.4;
      const distancia = 40 + Math.random() * 40;

      gsap.to(particula, {
        x: x + Math.cos(angulo) * distancia,
        y: y + Math.sin(angulo) * distancia,
        opacity: 0,
        scale: 0,
        duration: 0.6 + Math.random() * 0.3,
        ease: "power2.out",
        onComplete: () => particula.remove(),
      });
    }
  };

  document.addEventListener("click", (e) => crearParticulas(e.clientX, e.clientY));

  // --- Mini nav lateral (guiones que resaltan según la sección activa) ---
  const dashesNav = gsap.utils.toArray(".mini-nav-dash");
  if (dashesNav.length) {
    dashesNav.forEach((dash) => {
      dash.addEventListener("click", () => {
        const destino = document.querySelector(dash.dataset.target);
        if (destino) destino.scrollIntoView({ behavior: "smooth" });
      });
    });

    dashesNav.forEach((dash) => {
      const seccion = document.querySelector(dash.dataset.target);
      if (!seccion) return;

      ScrollTrigger.create({
        trigger: seccion,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) {
            dashesNav.forEach((d) => d.classList.remove("activo"));
            dash.classList.add("activo");
          }
        },
      });
    });
  }
});
