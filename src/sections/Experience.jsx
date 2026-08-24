import gsap from 'gsap';
import { experience } from '../data/experience';
import { useGsapScrollTrigger } from '../hooks/useGsapScrollTrigger';
import { useLanguage } from '../i18n/LanguageContext';
import SectionTitle from '../components/ui/SectionTitle';
import ExperienceCard from '../components/ui/ExperienceCard';
import styles from './Experience.module.css';

export default function Experience() {
  const { t } = useLanguage();
  const scope = useGsapScrollTrigger((scopeRef) => {
    const cards = gsap.utils.toArray(`.${styles.grid} > *`, scopeRef.current);
    gsap.set(cards, { opacity: 0, y: 32 });
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: scopeRef.current,
        start: 'top 75%',
      },
    });
  });

  return (
    <section id="experiencia" className={styles.section} ref={scope}>
      <SectionTitle eyebrow={t('experience.eyebrow')}>{t('experience.title')}</SectionTitle>
      <div className={styles.grid}>
        {experience.map((item) => (
          <ExperienceCard key={item.id} {...item} t={t} />
        ))}
      </div>
    </section>
  );
}
