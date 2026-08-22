import styles from './SectionTitle.module.css';

export default function SectionTitle({ eyebrow, children }) {
  return (
    <header className={styles.header}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h2 className={styles.title}>{children}</h2>
    </header>
  );
}
