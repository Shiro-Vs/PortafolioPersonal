import gsap from 'gsap';
import { projects } from '../data/projects';
import { useGsapScrollTrigger } from '../hooks/useGsapScrollTrigger';
import SectionTitle from '../components/ui/SectionTitle';
import ProjectCard from '../components/ui/ProjectCard';
import styles from './Projects.module.css';

export default function Projects() {
  const scope = useGsapScrollTrigger((scopeRef) => {
    const cards = gsap.utils.toArray(`.${styles.grid} > *`, scopeRef.current);
    gsap.set(cards, { opacity: 0, y: 32, scale: 0.9, rotate: -1.5 });
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'back.out(1.6)',
      scrollTrigger: {
        trigger: scopeRef.current,
        start: 'top 75%',
      },
    });
  });

  return (
    <section id="proyectos" className={styles.section} ref={scope}>
      <SectionTitle eyebrow="Trabajo">Proyectos</SectionTitle>
      <div className={styles.grid}>
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
}
