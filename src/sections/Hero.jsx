import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { useReducedMotion } from '../hooks/useReducedMotion';
import styles from './Hero.module.css';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section id="sobreMi" className={styles.hero}>
      <motion.div
        className={styles.content}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.span variants={item} className={styles.eyebrow}>
          Hola, soy
        </motion.span>
        <motion.h1 variants={item} className={styles.title}>
          Robert Vasquez Sanchez
        </motion.h1>
        <motion.p variants={item} className={styles.subtitle}>
          Estudiante de ingeniería de software y desarrollador web. Construyo interfaces con
          React, Java y Python.
        </motion.p>
        <motion.div variants={item} className={styles.actions}>
          <Button as="a" href="#proyectos" variant="primary">
            Ver proyectos
          </Button>
          <Button as="a" href="#contacto" variant="secondary">
            Contactarme
          </Button>
        </motion.div>
      </motion.div>

      {/* TODO Fase 5: reemplazar por <Pikachu size="lg" idleBlink followCursor reactToScroll /> */}
      <motion.div
        className={styles.mascotPlaceholder}
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={
          reduced
            ? { opacity: 1, scale: 1 }
            : { opacity: 1, scale: 1, y: [0, -14, 0] }
        }
        transition={
          reduced
            ? { duration: 0.6, ease: 'easeOut' }
            : {
                opacity: { duration: 0.6, ease: 'easeOut' },
                scale: { duration: 0.6, ease: 'easeOut' },
                y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 },
              }
        }
      />
    </section>
  );
}
