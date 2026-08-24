import gsap from 'gsap';
import { highlights } from '../data/highlights';
import { useGsapScrollTrigger } from '../hooks/useGsapScrollTrigger';
import { useLanguage } from '../i18n/LanguageContext';
import Card from '../components/ui/Card';
import styles from './Highlights.module.css';

export default function Highlights() {
  const { t } = useLanguage();
  const scope = useGsapScrollTrigger((scopeRef) => {
    const items = gsap.utils.toArray(`.${styles.item}`, scopeRef.current);
    gsap.set(items, { opacity: 0, y: 20 });
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: scopeRef.current,
        start: 'top 80%',
      },
    });
  });

  return (
    <section id="destacados" className={styles.section} ref={scope}>
      <div className={styles.grid}>
        {highlights.map(({ id, Icon }) => (
          <Card key={id} className={`${styles.item} ${styles.glow}`}>
            <Icon size={24} aria-hidden="true" className={styles.icon} />
            <span className={styles.value}>{t(`highlights.${id}.value`)}</span>
            <span className={styles.label}>{t(`highlights.${id}.label`)}</span>
          </Card>
        ))}
      </div>
    </section>
  );
}
