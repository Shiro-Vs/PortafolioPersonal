import { skillCategories } from '../data/skills';
import SectionTitle from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';
import TechIcon from '../components/ui/TechIcon';
import styles from './Skills.module.css';

export default function Skills() {
  return (
    <section id="lenguajes" className={styles.section}>
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
