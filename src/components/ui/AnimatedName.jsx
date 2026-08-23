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

  // Letras agrupadas por palabra (no por línea completa) para que el
  // navegador solo pueda saltar de línea entre palabras — cada palabra es
  // un bloque indivisible, así una pantalla angosta nunca corta una letra
  // a la mitad. El índice global de cada letra se precalcula sin mutar
  // variables durante el render (evita reprocesar el mismo estado en cada
  // pasada de React).
  const lineWords = lines.map((line) => line.split(' '));
  const lineWordCounts = lineWords.map((words) => words.length);
  const lineWordStart = lineWordCounts.map((_, i) =>
    lineWordCounts.slice(0, i).reduce((sum, c) => sum + c, 0),
  );
  const flatWords = lineWords.flat();
  const wordCharOffset = flatWords.map((_, i) =>
    flatWords.slice(0, i).reduce((sum, w) => sum + w.length, 0),
  );

  return (
    <motion.span
      className={`${styles.wrapper} ${className || ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.6 }}
    >
      {lineWords.map((words, li) => (
        <span key={li} className={styles.line}>
          {words.map((word, wi) => {
            const flatIndex = lineWordStart[li] + wi;
            const charOffset = wordCharOffset[flatIndex];
            return (
              <span key={wi}>
                <span className={styles.word}>
                  {word.split('').map((char, ci) => (
                    <motion.span
                      key={ci}
                      custom={charOffset + ci}
                      variants={letterVariants}
                      className={styles.char}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
                {wi < words.length - 1 ? ' ' : null}
              </span>
            );
          })}
        </span>
      ))}
    </motion.span>
  );
}
