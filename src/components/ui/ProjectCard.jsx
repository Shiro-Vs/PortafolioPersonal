import GitHubIcon from '../../assets/icons/tech/github.svg?react';
import Card from './Card';
import Button from './Button';
import styles from './ProjectCard.module.css';

const LINK_LABELS = { demo: 'Demo', frontend: 'Frontend', backend: 'Backend', repo: 'Ver repositorio' };

export default function ProjectCard({ title, description, tags, image, links }) {
  const linkEntries = links ? Object.entries(links).filter(([, url]) => url) : [];

  return (
    <Card className={styles.card}>
      <div className={styles.thumb} aria-hidden="true">
        {image ? <img src={image} alt="" /> : <span className={styles.thumbFallback}>Próximamente</span>}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
      {linkEntries.length > 0 && (
        <div className={styles.links}>
          {linkEntries.map(([key, url]) => (
            <Button
              key={key}
              as="a"
              href={url}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              className={styles.linkButton}
            >
              <GitHubIcon width={16} height={16} aria-hidden="true" />
              {LINK_LABELS[key] ?? key}
            </Button>
          ))}
        </div>
      )}
    </Card>
  );
}
