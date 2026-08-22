import Pikachu from './pikachu/Pikachu';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Pikachu size="sm" idleBlink />
      <p>© {new Date().getFullYear()} Robert Vasquez Sanchez</p>
      <a href="https://github.com/Shiro-Vs" target="_blank" rel="noreferrer">
        GitHub
      </a>
    </footer>
  );
}
