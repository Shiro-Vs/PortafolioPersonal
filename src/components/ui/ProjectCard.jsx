import { ExternalLink } from 'lucide-react';
import GitHubIcon from '../../assets/icons/social/github.svg?react';
import Angular from '../../assets/icons/tech/angular.svg?react';
import TypeScript from '../../assets/icons/tech/typescript.svg?react';
import Java from '../../assets/icons/tech/java.svg?react';
import Spring from '../../assets/icons/tech/spring.svg?react';
import MySQL from '../../assets/icons/tech/mysql.svg?react';
import ReactIcon from '../../assets/icons/tech/react.svg?react';
import Vite from '../../assets/icons/tech/vite.svg?react';
import Python from '../../assets/icons/tech/python.svg?react';
import Django from '../../assets/icons/tech/django.svg?react';
import PostgreSQL from '../../assets/icons/tech/postgresql.svg?react';
import Firebase from '../../assets/icons/tech/firebase.svg?react';
import ChartJs from '../../assets/icons/tech/chartjs.svg?react';
import Jwt from '../../assets/icons/tech/jwt.svg?react';
import ReactRouter from '../../assets/icons/tech/react-router.svg?react';
import TanStackQuery from '../../assets/icons/tech/tanstack-query.svg?react';
import Drf from '../../assets/icons/tech/drf.svg?react';
import AntDesign from '../../assets/icons/tech/antdesign.svg?react';
import Zustand from '../../assets/icons/tech/zustand.svg?react';
import Expo from '../../assets/icons/tech/expo.svg?react';
import Gemini from '../../assets/icons/tech/gemini.svg?react';
import Card from './Card';
import Button from './Button';
import TechIcon from './TechIcon';
import styles from './ProjectCard.module.css';

const LINK_ICONS = { repo: GitHubIcon, frontend: GitHubIcon, backend: GitHubIcon, demo: ExternalLink, apiDocs: ExternalLink };

const TAG_ICONS = {
  Angular,
  TypeScript,
  Java,
  'Spring Boot': Spring,
  'Spring Security': Spring,
  'Spring Data JPA': Spring,
  MySQL,
  React: ReactIcon,
  'React Native': ReactIcon,
  Vite,
  Python,
  Django,
  PostgreSQL,
  Firebase,
  'Chart.js': ChartJs,
  JWT: Jwt,
  'React Router': ReactRouter,
  'TanStack Query': TanStackQuery,
  DRF: Drf,
  'Ant Design': AntDesign,
  Zustand,
  Expo,
  'Gemini AI': Gemini,
};

export default function ProjectCard({ id, tags, image, links, t }) {
  const linkEntries = links ? Object.entries(links).filter(([, url]) => url) : [];

  return (
    <Card className={styles.card}>
      <div className={styles.thumb}>
        {image ? (
          <img src={image} alt={t(`projects.items.${id}.title`)} loading="lazy" />
        ) : (
          <span className={styles.thumbFallback} aria-hidden="true">
            {t('projects.thumbFallback')}
          </span>
        )}
      </div>
      <h3 className={styles.title}>{t(`projects.items.${id}.title`)}</h3>
      <p className={styles.description}>{t(`projects.items.${id}.description`)}</p>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {TAG_ICONS[tag] && <TechIcon icon={TAG_ICONS[tag]} size={14} />}
            {tag}
          </span>
        ))}
      </div>
      {linkEntries.length > 0 && (
        <div className={styles.links}>
          {linkEntries.map(([key, url]) => {
            const Icon = LINK_ICONS[key] ?? GitHubIcon;
            return (
              <Button
                key={key}
                as="a"
                href={url}
                target="_blank"
                rel="noreferrer"
                variant="secondary"
                className={styles.linkButton}
              >
                <Icon width={16} height={16} aria-hidden="true" />
                {t(`projects.linkLabels.${key}`)}
              </Button>
            );
          })}
        </div>
      )}
    </Card>
  );
}
