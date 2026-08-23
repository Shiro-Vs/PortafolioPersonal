import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
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
        <motion.span variants={item} className={styles.role}>
          Full Stack Developer · Java/Spring Boot & React
        </motion.span>
        <motion.p variants={item} className={styles.subtitle}>
          Estudiante de noveno ciclo de Ingeniería de Software en la UTP. Desarrollé el backend
          de dos sistemas académicos con más de 30 endpoints REST cada uno, incluyendo
          autenticación JWT y control de acceso por roles. Cofundador y líder técnico de VEXA,
          donde dirijo el desarrollo de un ERP para pequeños negocios.
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

      <motion.div
        className={styles.photoSlot}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <img src="/Avatar.png" alt="Robert Vasquez Sanchez" className={styles.photo} />
      </motion.div>
    </section>
  );
}
