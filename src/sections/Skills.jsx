import gsap from 'gsap';
import { skillCategories } from '../data/skills';
import { useGsapScrollTrigger } from '../hooks/useGsapScrollTrigger';
import SectionTitle from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';
import TechIcon from '../components/ui/TechIcon';
import styles from './Skills.module.css';

export default function Skills() {
  const scope = useGsapScrollTrigger((scopeRef) => {
    const items = gsap.utils.toArray(`.${styles.item}`, scopeRef.current);
    gsap.set(items, { opacity: 0, y: 20 });
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.04,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: scopeRef.current,
        start: 'top 75%',
      },
    });
  });

  return (
    <section id="lenguajes" className={styles.section} ref={scope}>
      <SectionTitle eyebrow="Stack">Lenguajes y herramientas</SectionTitle>
      {skillCategories.map(({ category, items }) => (
        <div key={category} className={styles.category}>
          <h3 className={styles.categoryTitle}>{category}</h3>
          <div className={styles.grid}>
            {items.map(({ name, icon }) => (
              <Card key={name} className={styles.item}>
                <TechIcon icon={icon} size={28} />
                <span>{name}</span>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
