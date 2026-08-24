import { useEffect, useState } from 'react';
import { User, Trophy, Code2, FolderGit2, Briefcase, Gamepad2, Mail } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import styles from './Nav.module.css';

const SECTIONS = [
  { id: 'sobreMi', Icon: User },
  { id: 'destacados', Icon: Trophy },
  { id: 'lenguajes', Icon: Code2 },
  { id: 'proyectos', Icon: FolderGit2 },
  { id: 'experiencia', Icon: Briefcase },
  { id: 'pasatiempos', Icon: Gamepad2 },
  { id: 'contacto', Icon: Mail },
];

export default function Nav() {
  const { lang, setLang, t } = useLanguage();
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

  function toggleLang() {
    setLang(lang === 'es' ? 'en' : 'es');
  }

  return (
    <>
      <button
        type="button"
        onClick={toggleLang}
        className={styles.langSwitch}
        aria-label="Cambiar idioma / Switch language"
      >
        <span className={lang === 'es' ? styles.langActive : ''}>ES</span>
        <span className={styles.langDivider}>|</span>
        <span className={lang === 'en' ? styles.langActive : ''}>EN</span>
      </button>

      <nav className={styles.nav} aria-label="Navegación de secciones">
        {SECTIONS.map(({ id }) => {
          const label = t(`nav.${id}`);
          return (
            <a key={id} href={`#${id}`} className={styles.dashLink} aria-label={`Ir a ${label}`}>
              <span className={`${styles.dash} ${active === id ? styles.active : ''}`} />
              <span className={styles.tooltip}>{label}</span>
            </a>
          );
        })}
      </nav>

      <nav className={styles.dock} aria-label="Navegación de secciones">
        {SECTIONS.map(({ id, Icon }) => {
          const label = t(`nav.${id}`);
          return (
            <a
              key={id}
              href={`#${id}`}
              className={`${styles.dockLink} ${active === id ? styles.dockActive : ''}`}
              aria-label={`Ir a ${label}`}
            >
              <Icon size={20} aria-hidden="true" />
            </a>
          );
        })}
      </nav>
    </>
  );
}
