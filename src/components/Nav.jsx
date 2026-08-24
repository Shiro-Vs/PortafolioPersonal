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
    //
    // Los offsets se calculan una sola vez (no en cada scroll): usar
    // getBoundingClientRect() en el handler de scroll fuerza un reflow del
    // navegador en cada frame, y sumado a las animaciones de GSAP corriendo
    // en simultáneo (p. ej. al saltar de una punta a otra de la página con
    // el Nav) generaba lag notorio en celulares.
    let offsets = elements.map((el) => el.offsetTop);

    function updateActive() {
      const threshold = window.scrollY + window.innerHeight * 0.4;
      let current = elements[0]?.id;
      for (let i = 0; i < elements.length; i++) {
        if (offsets[i] <= threshold) {
          current = elements[i].id;
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

    function recomputeOffsets() {
      offsets = elements.map((el) => el.offsetTop);
      updateActive();
    }

    updateActive();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Recalcula los offsets cada vez que cambia el alto de la página, sin
    // importar la causa (fuentes/imágenes que terminan de cargar, el
    // fetch async de Pasatiempos, un cambio de idioma que alarga el texto).
    // Mucho más confiable que recalcular solo en 'resize'/'load', y no
    // agrega costo durante el scroll en sí.
    const resizeObserver = new ResizeObserver(recomputeOffsets);
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener('scroll', onScroll);
      resizeObserver.disconnect();
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
