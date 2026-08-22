import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './Button.module.css';

export default function Button({ children, variant = 'primary', as = 'button', ...props }) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] ?? motion.button;

  return (
    <MotionTag
      className={`${styles.button} ${styles[variant]}`}
      whileHover={reduced ? undefined : { scale: 1.03 }}
      whileTap={reduced ? undefined : { scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
