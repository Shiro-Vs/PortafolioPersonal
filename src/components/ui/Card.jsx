import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './Card.module.css';

export default function Card({ children, className = '', ...props }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`${styles.card} ${className}`}
      whileHover={reduced ? undefined : { y: -6, scale: 1.02 }}
      whileTap={reduced ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
