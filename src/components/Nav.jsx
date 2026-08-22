import { useEffect, useState } from 'react';
import styles from './Nav.module.css';

const SECTIONS = [
  { id: 'sobreMi', label: 'Sobre mí' },
  { id: 'lenguajes', label: 'Lenguajes' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'contacto', label: 'Contacto' },
];

export default function Nav() {
  const [active, setActive] = useState('sobreMi');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px' },
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className={styles.nav} aria-label="Navegación de secciones">
      {SECTIONS.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`${styles.dash} ${active === id ? styles.active : ''}`}
          aria-label={`Ir a ${label}`}
        />
      ))}
    </nav>
  );
}
