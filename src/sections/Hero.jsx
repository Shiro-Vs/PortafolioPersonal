import Button from '../components/ui/Button';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="sobreMi" className={styles.hero}>
      <div className={styles.content}>
        <span className={styles.eyebrow}>Hola, soy</span>
        <h1 className={styles.title}>Robert Vasquez Sanchez</h1>
        <p className={styles.subtitle}>
          Estudiante de ingeniería de software y desarrollador web. Construyo interfaces con
          React, Java y Python.
        </p>
        <div className={styles.actions}>
          <Button as="a" href="#proyectos" variant="primary">
            Ver proyectos
          </Button>
          <Button as="a" href="#contacto" variant="secondary">
            Contactarme
          </Button>
        </div>
      </div>

      {/* TODO Fase 4: reemplazar por <Pikachu size="lg" idleBlink followCursor reactToScroll /> */}
      <div className={styles.mascotPlaceholder} aria-hidden="true" />
    </section>
  );
}
