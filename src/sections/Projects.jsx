import gsap from 'gsap';
import { projects } from '../data/projects';
import { useGsapScrollTrigger } from '../hooks/useGsapScrollTrigger';
import SectionTitle from '../components/ui/SectionTitle';
import ProjectCard from '../components/ui/ProjectCard';
import styles from './Projects.module.css';

export default function Projects() {
  const scope = useGsapScrollTrigger((scopeRef) => {
    const cards = gsap.utils.toArray(`.${styles.grid} > *`, scopeRef.current);
    gsap.set(cards, { opacity: 0, y: 28 });
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.55,
      stagger: 0.08,
      ease: 'power2.out',
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
