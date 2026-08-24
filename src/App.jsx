import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Ambient from './components/Ambient';
import Nav from './components/Nav';
import HobbiesWidget from './components/HobbiesWidget';
import Hero from './sections/Hero';
import Highlights from './sections/Highlights';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import { useSpaceEntrance } from './hooks/useSpaceEntrance';

export default function App() {
  useSpaceEntrance();

  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    const images = Array.from(document.images);
    Promise.all(
      images.map((img) =>
        img.complete ? Promise.resolve() : new Promise((resolve) => img.addEventListener('load', resolve, { once: true })),
      ),
    ).then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <>
      <Ambient />
      <Nav />
      <HobbiesWidget />
      <main>
        <Hero />
        <Highlights />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
