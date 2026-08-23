import styles from './Ambient.module.css';

export default function Ambient() {
  return (
    <div className={styles.ambient} aria-hidden="true">
      <span className={`${styles.stars} ${styles.starsFar}`} />
      <span className={`${styles.stars} ${styles.starsMid}`} />
      <span className={`${styles.stars} ${styles.starsNear}`} />
    </div>
  );
}
