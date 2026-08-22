import { projects } from '../data/projects';
import SectionTitle from '../components/ui/SectionTitle';
import ProjectCard from '../components/ui/ProjectCard';
import styles from './Projects.module.css';

export default function Projects() {
  return (
    <section id="proyectos" className={styles.section}>
      <SectionTitle eyebrow="Trabajo">Proyectos</SectionTitle>
      <div className={styles.grid}>
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
}
