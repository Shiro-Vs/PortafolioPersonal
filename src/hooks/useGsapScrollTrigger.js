import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({
  // Evita que los callbacks de ScrollTrigger se disparen más de una vez
  // por frame — reduce el trabajo redundante cuando hay muchos triggers
  // activos (parallax de Skills, stagger de cada sección, entrada
  // espacial) y se hace un salto largo de scroll, como al navegar con el
  // Nav.
  limitCallbacks: true,
  // En móvil, la barra de direcciones del navegador se oculta/aparece al
  // hacer scroll, cambiando window.innerHeight. Sin esto, ScrollTrigger
  // trata ese cambio como un resize real y recalcula la posición de TODOS
  // los triggers de la página en medio del scroll — la causa más probable
  // del lag reportado al saltar de una punta a otra con el Nav en celular.
  ignoreMobileResize: true,
});

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
