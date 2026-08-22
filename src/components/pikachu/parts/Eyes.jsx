import { motion } from 'framer-motion';

export default function Eyes({ blink = false }) {
  const eyeAnimate = { scaleY: blink ? 0.1 : 1 };
  const eyeTransition = { duration: 0.12, ease: 'easeInOut' };

  return (
    <g>
      <motion.g style={{ transformOrigin: '128px 165px' }} animate={eyeAnimate} transition={eyeTransition}>
        <ellipse cx="128" cy="165" rx="9" ry="12" fill="#2B2740" />
        <circle cx="131" cy="160" r="2.5" fill="#fff" />
      </motion.g>
      <motion.g style={{ transformOrigin: '172px 165px' }} animate={eyeAnimate} transition={eyeTransition}>
        <ellipse cx="172" cy="165" rx="9" ry="12" fill="#2B2740" />
        <circle cx="175" cy="160" r="2.5" fill="#fff" />
      </motion.g>
    </g>
  );
}
