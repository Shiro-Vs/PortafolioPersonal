import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

// Simula acercarse a un "planeta": cada <section> entra con un zoom-in
// marcado, como si el viaje espacial se detuviera ahí. Solo anima
// transform/opacity (baratos para el navegador) — nada de filter/blur,
// que fuerza repintados costosos en elementos tan grandes.
export function useSpaceEntrance() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('main > section');
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { scale: 0.82, opacity: 0.4 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top center',
              toggleActions: 'play reverse play reverse',
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, [reduced]);
}
