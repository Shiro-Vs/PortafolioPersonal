import Card from './Card';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ title, description, tags, image, links }) {
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
      {(links?.demo || links?.repo) && (
        <div className={styles.links}>
          {links.demo && (
            <a href={links.demo} target="_blank" rel="noreferrer">
              Demo
            </a>
          )}
          {links.repo && (
            <a href={links.repo} target="_blank" rel="noreferrer">
              Repo
            </a>
          )}
        </div>
      )}
    </Card>
  );
}
