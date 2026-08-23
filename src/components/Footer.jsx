import GitHubIcon from '../assets/icons/social/github.svg?react';
import InstagramIcon from '../assets/icons/social/instagram.svg?react';
import styles from './Footer.module.css';

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/shiro.vs/', icon: InstagramIcon },
  { label: 'GitHub', href: 'https://github.com/Shiro-Vs', icon: GitHubIcon },
];

export default function Footer() {
  return (
    <footer className={styles.wrapper}>
      <div className={styles.divider} aria-hidden="true" />
      <div className={styles.footer}>
        <p>© {new Date().getFullYear()} Robert Vasquez Sanchez</p>
        <div className={styles.social}>
          {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
            <a key={href} href={href} target="_blank" rel="noreferrer" aria-label={label}>
              <Icon width={20} height={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
