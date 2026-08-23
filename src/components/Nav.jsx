import { useEffect, useState } from 'react';
import styles from './Nav.module.css';

const SECTIONS = [
  { id: 'sobreMi', label: 'Sobre mí' },
  { id: 'lenguajes', label: 'Lenguajes' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'pasatiempos', label: 'Pasatiempos' },
  { id: 'contacto', label: 'Contacto' },
];

export default function Nav() {
  const [active, setActive] = useState('sobreMi');

  useEffect(() => {
    const elements = SECTIONS.map(({ id }) => document.getElementById(id)).filter(Boolean);

    // Scrollspy clásico: la sección activa es la última cuyo borde superior
    // ya cruzó la línea de referencia (40% del alto del viewport). Evita la
    // condición de carrera de IntersectionObserver cuando varias secciones
    // reportan cambios en el mismo lote (p. ej. Contacto, ahora muy alta al
    // incluir el footer).
    function updateActive() {
      const threshold = window.innerHeight * 0.4;
      let current = elements[0]?.id;
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= threshold) {
          current = el.id;
        }
      }
      if (current) setActive(current);
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActive();
        ticking = false;
      });
    }

    updateActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <nav className={styles.nav} aria-label="Navegación de secciones">
      {SECTIONS.map(({ id, label }) => (
        <a key={id} href={`#${id}`} className={styles.dashLink} aria-label={`Ir a ${label}`}>
          <span className={`${styles.dash} ${active === id ? styles.active : ''}`} />
          <span className={styles.tooltip}>{label}</span>
        </a>
      ))}
    </nav>
  );
}
