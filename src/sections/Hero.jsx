import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Typewriter from '../components/ui/Typewriter';
import AnimatedName from '../components/ui/AnimatedName';
import { useLanguage } from '../i18n/LanguageContext';
import avatarPhoto from '../assets/images/hero/avatar.webp';
import styles from './Hero.module.css';

const NAME_LINES = ['Robert Vasquez', 'Sanchez'];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="sobreMi" className={styles.hero}>
      <motion.div
        className={styles.content}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.span variants={item} className={styles.eyebrow}>
          {t('hero.eyebrow')}
        </motion.span>
        <motion.h1 variants={item} className={styles.title}>
          <AnimatedName lines={NAME_LINES} />
        </motion.h1>
        <motion.span variants={item} className={styles.role}>
          {t('hero.role')}
        </motion.span>
        <motion.p variants={item} className={styles.subtitle}>
          {t('hero.subtitle')}
        </motion.p>
        <motion.p variants={item} className={styles.tagline}>
          <Typewriter words={t('hero.words')} />
        </motion.p>
        <motion.div variants={item} className={styles.actions}>
          <Button as="a" href="#proyectos" variant="primary">
            {t('hero.ctaProjects')}
          </Button>
          <Button as="a" href="#contacto" variant="secondary">
            {t('hero.ctaContact')}
          </Button>
          <Button as="a" href="/cv/CV-Robert-Vasquez.pdf" download variant="secondary">
            {t('hero.ctaCv')}
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.photoSlot}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <img src={avatarPhoto} alt="Robert Vasquez Sanchez" className={styles.photo} />
      </motion.div>
    </section>
  );
}
