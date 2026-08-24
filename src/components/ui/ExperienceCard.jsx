import ReactIcon from '../../assets/icons/tech/react.svg?react';
import Python from '../../assets/icons/tech/python.svg?react';
import Django from '../../assets/icons/tech/django.svg?react';
import Java from '../../assets/icons/tech/java.svg?react';
import Spring from '../../assets/icons/tech/spring.svg?react';
import Html from '../../assets/icons/tech/html.svg?react';
import Css from '../../assets/icons/tech/css.svg?react';
import JavaScript from '../../assets/icons/tech/javascript.svg?react';
import Card from './Card';
import Button from './Button';
import TechIcon from './TechIcon';
import styles from './ExperienceCard.module.css';

const TAG_ICONS = {
  React: ReactIcon,
  Python,
  Django,
  Java,
  'Spring Boot': Spring,
  HTML: Html,
  CSS: Css,
  JavaScript,
};

export default function ExperienceCard({ id, tags, link, t }) {
  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.role}>{t(`experience.items.${id}.role`)}</h3>
          <p className={styles.org}>{t(`experience.items.${id}.org`)}</p>
        </div>
        <span className={styles.period}>{t(`experience.items.${id}.period`)}</span>
      </div>
      <p className={styles.description}>{t(`experience.items.${id}.description`)}</p>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {TAG_ICONS[tag] && <TechIcon icon={TAG_ICONS[tag]} size={14} />}
            {tag}
          </span>
        ))}
      </div>
      {link && (
        <Button as="a" href={link} target="_blank" rel="noreferrer" variant="secondary" className={styles.linkButton}>
          {t('experience.visitSite')}
        </Button>
      )}
    </Card>
  );
}
