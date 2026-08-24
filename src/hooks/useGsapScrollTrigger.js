import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
// Evita que los callbacks de ScrollTrigger se disparen más de una vez por
// frame — reduce el trabajo redundante cuando hay muchos triggers activos
// (parallax de Skills, stagger de cada sección, entrada espacial) y se hace
// un salto largo de scroll, como al navegar con el Nav.
ScrollTrigger.config({ limitCallbacks: true });

// Un elemento DOM es controlado por GSAP o por Framer Motion, nunca por ambos.
export function useGsapScrollTrigger(buildTimeline, deps = []) {
  const scope = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => buildTimeline(scope), scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}
