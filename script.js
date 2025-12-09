// --- Formulario de Contacto ---
function enviarMensaje(e) {
  e.preventDefault();
  const estado = document.getElementById("estado-formulario");
  if (estado) {
    estado.textContent = "Gracias por tu mensaje. ¡Te responderé pronto!";
    estado.style.display = "block"; // Asegurar que se vea

    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
      estado.style.display = "none";
      estado.textContent = "";
    }, 5000);
  }
  e.target.reset();
}

// --- Efecto de Escritura (Typing) ---
document.addEventListener("DOMContentLoaded", () => {
  const palabras = ["Minimalismo", "Rendimiento", "UI/UX"];
  const etiqueta = document.getElementById("etiqueta-dinamica");

  if (!etiqueta) return;

  // Configuración
  let i = 0; // índice de palabra
  let j = 0; // índice de letra
  let borrando = false;

  const speedWrite = 120; // velocidad al escribir
  const speedDelete = 60; // velocidad al borrar
  const pause = 900; // pausa cuando termina de escribir

  // Función recursiva de escritura

  function type() {
    const palabra = palabras[i];

    if (!borrando) {
      etiqueta.textContent = palabra.substring(0, j);
      if (j === palabra.length) {
        borrando = true;
        return setTimeout(type, pause);
      }
      j++;
      return setTimeout(type, speedWrite);
    }

    // Lógica de borrado
    etiqueta.textContent = palabra.substring(0, j);
    if (j === 0) {
      // Pasar a la siguiente palabra SIN que aparezca completa
      borrando = false;
      i = (i + 1) % palabras.length;
      j = 0; // clave para evitar el flash
      etiqueta.textContent = ""; // limpia por si acaso
      return setTimeout(type, 500); // pequeña pausa antes de escribir la siguiente
    }
    j--;
    return setTimeout(type, speedDelete);
  }

  type();
});

// --- Animaciones (Anime.js) ---
document.addEventListener("DOMContentLoaded", () => {
  // Hero (Entrada inmediata)
  const heroTimeline = anime.timeline({
    easing: "easeOutExpo",
    duration: 1000,
  });

  heroTimeline
    .add({
      targets: "#sobreMi .titulo",
      translateY: [30, 0],
      opacity: [0, 1],
      delay: 200,
    })
    .add(
      {
        targets: "#sobreMi .subtitulo",
        translateY: [30, 0],
        opacity: [0, 1],
      },
      "-=800"
    )
    .add(
      {
        targets: ".etiquetas",
        translateY: [20, 0],
        opacity: [0, 1],
      },
      "-=800"
    )
    .add(
      {
        targets: "#sobreMi .redes",
        translateY: [20, 0],
        opacity: [0, 1],
      },
      "-=800"
    )
    .add(
      {
        targets: "#sobreMi .flip-container",
        translateY: [50, 0],
        opacity: [0, 1],
      },
      "-=800"
    );

  // Animaciones al hacer Scroll
  const animateSimple = (element, animeParamsIn, animeParamsOut) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Entra en pantalla: Animar hacia estado final
            anime({
              targets: element,
              ...animeParamsIn,
            });
          } else {
            // Sale de pantalla: Resetear a estado inicial (instantáneo o rápido)
            anime.set(element, animeParamsOut);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(element);
  };

  // Configuración base para entrada y salida
  const baseIn = {
    translateY: [50, 0],
    opacity: [0, 1],
    easing: "easeOutQuad",
    duration: 800,
  };
  const baseOut = {
    opacity: 0,
    translateY: 50,
  };

  // Animar Títulos de Sección
  const titulos = document.querySelectorAll(".titulo-mediano.oculto");
  titulos.forEach((titulo) => {
    animateSimple(titulo, baseIn, baseOut);
  });

  // Animar Formulario y Texto de Contacto
  const contactoAnimar = document.querySelectorAll(
    "#contacto .colum-derecha, #contacto form"
  );
  contactoAnimar.forEach((el, index) => {
    el.style.opacity = 0;
    animateSimple(
      el,
      {
        ...baseIn,
        duration: 1000,
        delay: index * 200,
        easing: "easeOutExpo",
      },
      baseOut
    );
  });

  // -- 3.2.2: Animaciones STAGGER (Cascada) para Grids --
  // Función para manejar contenedores con hijos
  const observeContainer = (containerSelector, childrenSelector) => {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Entra: Ejecutar Stagger
            anime({
              targets: childrenSelector,
              translateY: [50, 0],
              opacity: [0, 1],
              delay: anime.stagger(100),
              easing: "easeOutQuint",
              duration: 800,
            });
          } else {
            // Sale: Resetear Hijos
            anime.set(childrenSelector, {
              opacity: 0,
              translateY: 50,
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);
  };

  // Observar Contenedores
  observeContainer(".lista-herramientas", ".lista-herramientas .categoria");
  observeContainer(".proyectos-card", ".proyectos-card .proyecto");

  // Interacciones Avanzadas

  // A) Levitación (Floating) del Profile
  anime({
    targets: ".flip-container",
    translateY: [-10, 10], // Sube y baja 10px
    direction: "alternate",
    loop: true,
    easing: "easeInOutSine",
    duration: 3500, // Lento y suave
  });

  // B) [ELIMINADO] Hovers Elásticos
  // C) [ELIMINADO] Mouse Parallax

  // D) Efecto Glitch en el Nombre
  const nombre = document.querySelector(".acento");
  if (nombre) {
    nombre.addEventListener("mouseenter", () => {
      anime({
        targets: nombre,
        skewX: [0, 20, -20, 0], // Distorsión
        translateX: [0, -2, 2, 0], // Jitter
        opacity: [1, 0.8, 1], // Parpadeo
        easing: "steps(5)", // Movimiento robótico
        duration: 300,
      });
    });
  }
});

// --- Fondo Interactivo (Estrellas) ---
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("fondo-interactivo");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height;
  let stars = [];

  // Configuración
  const config = {
    starCount: 1500, // Requerimiento: MUCHAS estrellas y parpadeo
    mouseDist: 150, // Radio de repulsión aumentado
    mousePush: 3, // Fuerza de empuje
  };

  const mouse = { x: null, y: null };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initStars();
  }

  // Clase Star
  class Star {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.speedY = Math.random() * 0.2 + this.size * 0.1;

      // Interpolation values
      this.currentSize = this.size;
      this.targetSize = this.size;
    }

    update() {
      // 1. Movimiento Natural (Caída)
      this.y += this.speedY;

      // Reiniciar si sale por abajo
      if (this.y > height) {
        this.y = -10;
        this.x = Math.random() * width;
      }

      // 2. Interacción: Efecto ZOOM SUAVE (Lerp)
      this.targetSize = this.size; // Reset target to normal

      if (mouse.x != null) {
        let dx = this.x - mouse.x;
        let dy = this.y - mouse.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.mouseDist) {
          // Factor 0 a 1 (1 = cursor encima)
          const zoomLevel = (config.mouseDist - distance) / config.mouseDist;
          // Objetivo: Tamaño magnificado
          this.targetSize = this.size * (1 + zoomLevel * config.mousePush);
        }
      }

      // 3. Aplicar suavizado (Lerp)
      // current moves 10% closer to target every frame
      this.currentSize += (this.targetSize - this.currentSize) * 0.1;
    }

    draw() {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.beginPath();
      // Use currentSize for drawing
      ctx.arc(this.x, this.y, this.currentSize, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initStars() {
    stars = [];
    for (let i = 0; i < config.starCount; i++) {
      stars.push(new Star());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let star of stars) {
      star.update();
      star.draw();
    }
    requestAnimationFrame(animate);
  }

  // Eventos y Loop
  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  // Cuando el mouse sale, no hay repulsión -> Retoman caída natural
  window.addEventListener("mouseout", () => {
    mouse.x = null;
    mouse.y = null;
  });

  resize();
  animate();
});
