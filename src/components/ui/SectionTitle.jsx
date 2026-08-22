import { motion } from 'framer-motion';
import styles from './SectionTitle.module.css';

export default function SectionTitle({ eyebrow, children }) {
  return (
    <motion.header
      className={styles.header}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h2 className={styles.title}>{children}</h2>
    </motion.header>
  );
}
