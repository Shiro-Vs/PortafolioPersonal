import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './AnimatedName.module.css';

const letterVariants = {
  hidden: { opacity: 0, y: 36, rotateX: -70 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { delay: i * 0.025, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function AnimatedName({ lines, className }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <span className={`${styles.wrapper} ${className || ''}`}>
        {lines.map((line) => (
          <span key={line} className={styles.line}>
            {line}
          </span>
        ))}
      </span>
    );
  }

  // Offset de cada línea en el índice global de letras, usado para escalonar
  // el delay de la animación de forma continua a través de todas las líneas.
  const lineOffsets = lines.map((_, i) =>
    lines.slice(0, i).reduce((sum, line) => sum + line.length, 0),
  );

  return (
    <motion.span
      className={`${styles.wrapper} ${className || ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.6 }}
    >
      {lines.map((line, li) => (
        <span key={li} className={styles.line}>
          {line.split('').map((char, ci) => (
            <motion.span
              key={`${li}-${ci}`}
              custom={lineOffsets[li] + ci}
              variants={letterVariants}
              className={styles.char}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}
