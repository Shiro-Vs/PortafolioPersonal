import { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import gsap from 'gsap';
import Body from './parts/Body';
import Ears from './parts/Ears';
import Cheeks from './parts/Cheeks';
import Eyes from './parts/Eyes';
import Tail from './parts/Tail';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useGsapScrollTrigger } from '../../hooks/useGsapScrollTrigger';
import styles from './Pikachu.module.css';

const SIZES = { sm: 96, md: 180, lg: 260 };

export default function Pikachu({
  size = 'md',
  idleBlink = true,
  followCursor = false,
  reactToScroll = false,
  className = '',
}) {
  const px = SIZES[size] ?? SIZES.md;
  const reduced = useReducedMotion();
  const rootRef = useRef(null);
  const tailRef = useRef(null);
  const [blink, setBlink] = useState(false);

  // Idle: parpadeo periódico — Framer Motion (micro-interacción de estado)
  useEffect(() => {
    if (!idleBlink || reduced) return undefined;
    let timeoutId;
    const scheduleBlink = () => {
      const delay = 2800 + Math.random() * 3200;
      timeoutId = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 140);
        scheduleBlink();
      }, delay);
    };
    scheduleBlink();
    return () => clearTimeout(timeoutId);
  }, [idleBlink, reduced]);

  // Seguir cursor: física de resorte sobre la cabeza — Framer Motion
  const rotate = useSpring(0, { stiffness: 120, damping: 14 });
  const mouse = useMousePosition();
  useEffect(() => {
    if (!followCursor || reduced || !rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const dx = mouse.x - cx;
    rotate.set(Math.max(-12, Math.min(12, dx / 40)));
  }, [mouse, followCursor, reduced, rotate]);

  // Reacción a scroll: timeline pineado sobre la cola — GSAP ScrollTrigger
  // (nunca el mismo elemento que controla Framer Motion, ver useGsapScrollTrigger)
  useGsapScrollTrigger(
    (scopeRef) => {
      if (!reactToScroll || reduced || !tailRef.current) return;
      gsap.to(tailRef.current, {
        rotate: 16,
        transformOrigin: '15% 85%',
        ease: 'sine.inOut',
        scrollTrigger: {
          trigger: scopeRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    },
    [reactToScroll, reduced],
  );

  return (
    <div
      ref={rootRef}
      className={`${styles.wrapper} ${className}`}
      style={{ width: px, height: px }}
    >
      <svg viewBox="0 0 300 300" width="100%" height="100%" role="img" aria-label="Mascota Pikachu">
        <defs>
          <linearGradient id="clayYellow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFE9A8" />
            <stop offset="100%" stopColor="#FFC94A" />
          </linearGradient>
          <linearGradient id="clayYellowDark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFD166" />
            <stop offset="100%" stopColor="#F2A93C" />
          </linearGradient>
          <filter id="clayShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="4" dy="6" stdDeviation="5" floodColor="#8B6F3E" floodOpacity="0.35" />
            <feDropShadow dx="-3" dy="-4" stdDeviation="4" floodColor="#FFFFFF" floodOpacity="0.6" />
          </filter>
        </defs>

        <g ref={tailRef}>
          <Tail />
        </g>

        <motion.g style={followCursor && !reduced ? { rotate, transformOrigin: '150px 220px' } : undefined}>
          <Body />
          <Ears />
          <Cheeks />
          <Eyes blink={blink} />
        </motion.g>
      </svg>
    </div>
  );
}
