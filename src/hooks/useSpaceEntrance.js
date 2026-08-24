import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

// Simula acercarse a un "planeta": en escritorio cada <section> entra con
// un zoom-in marcado, como si el viaje espacial se detuviera ahí. En móvil
// se simplifica a solo fade (ver comentario más abajo) por rendimiento.
export function useSpaceEntrance() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // En móvil las secciones ocupan más alto que el viewport, así que
      // activar el efecto recién al llegar al centro deja un tramo largo
      // de scroll con la siguiente sección "apagada" (hueco visual). Se
      // adelanta el disparo en pantallas chicas para que aparezca apenas
      // entra en vista.
      mm.add(
        { isMobile: '(max-width: 767px)', isDesktop: '(min-width: 768px)' },
        (context) => {
          const { isMobile } = context.conditions;
          const sections = gsap.utils.toArray('main > section');

          // El zoom (scale) obliga al navegador a promover cada sección —
          // subárboles grandes y complejos — a su propia capa GPU mientras
          // anima. En celulares de gama media/baja eso es notoriamente caro,
          // sobre todo cuando varias secciones disparan casi a la vez al
          // saltar rápido con el Nav. En móvil se deja solo el fade
          // (opacity), mucho más barato de componer, y más corto.
          const from = isMobile ? { opacity: 0 } : { scale: 0.82, opacity: 0.4 };
          const to = isMobile
            ? { opacity: 1, duration: 0.4, ease: 'power2.out' }
            : { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' };

          sections.forEach((section) => {
            gsap.fromTo(section, from, {
              ...to,
              scrollTrigger: {
                trigger: section,
                start: isMobile ? 'top 85%' : 'top center',
                toggleActions: 'play reverse play reverse',
              },
            });
          });
        },
      );
    });

    return () => ctx.revert();
  }, [reduced]);
}
