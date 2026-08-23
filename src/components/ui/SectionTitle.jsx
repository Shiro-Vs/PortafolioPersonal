import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './SectionTitle.module.css';

export default function SectionTitle({ eyebrow, children }) {
  const reduced = useReducedMotion();

  return (
    <motion.header
      className={styles.header}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {eyebrow && (
        <div className={styles.eyebrowRow}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <motion.span
            className={styles.accentBar}
            initial={{ scaleX: 0 }}
            whileInView={reduced ? undefined : { scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          />
        </div>
      )}
      <h2 className={styles.title}>{children}</h2>
    </motion.header>
  );
}
