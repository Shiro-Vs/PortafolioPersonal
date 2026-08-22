import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
