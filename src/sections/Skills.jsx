import gsap from 'gsap';
import { skillCategories } from '../data/skills';
import { useGsapScrollTrigger } from '../hooks/useGsapScrollTrigger';
import { useLanguage } from '../i18n/LanguageContext';
import SectionTitle from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';
import TechIcon from '../components/ui/TechIcon';
import avatarSentado from '../assets/images/skills/avatar-sentado.webp';
import avatarHerramientas from '../assets/images/skills/avatar-herramientas.webp';
import styles from './Skills.module.css';

function CategoryBlock({ category, items, t }) {
  return (
    <div className={styles.content}>
      <h3 className={styles.categoryTitle}>{t(`skills.categories.${category}`)}</h3>
      <div className={styles.grid}>
        {items.map(({ name, icon }) => (
          <Card key={name} className={styles.item}>
            <TechIcon icon={icon} size={28} />
            <span>{name}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}

function animateIllustration(scopeRef, selector) {
  const illustration = scopeRef.current.querySelector(selector);
  if (!illustration) return;

  gsap.set(illustration, { opacity: 0, y: 40 });
  gsap.to(illustration, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: scopeRef.current,
      start: 'top 75%',
    },
  });

  gsap.fromTo(
    illustration,
    { y: 40 },
    {
      y: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: scopeRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    },
  );
}

export default function Skills() {
  const { t } = useLanguage();
  const scope = useGsapScrollTrigger((scopeRef) => {
    const items = gsap.utils.toArray(`.${styles.item}`, scopeRef.current);
    gsap.set(items, { opacity: 0, y: 20 });
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.03,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: scopeRef.current,
        start: 'top 75%',
      },
    });

    animateIllustration(scopeRef, `.${styles.illustration}`);
    animateIllustration(scopeRef, `.${styles.toolsIllustration}`);
  });

  return (
    <section id="lenguajes" className={styles.section} ref={scope}>
      <SectionTitle eyebrow={t('skills.eyebrow')}>{t('skills.title')}</SectionTitle>

      <div className={styles.layout}>
        <div className={styles.contentGroup}>
          {skillCategories.slice(0, 2).map((category) => (
            <CategoryBlock key={category.category} {...category} t={t} />
          ))}
        </div>
        <div className={styles.illustrationWrap}>
          <img
            src={avatarSentado}
            alt=""
            aria-hidden="true"
            width={2052}
            height={2048}
            loading="lazy"
            className={styles.illustration}
          />
        </div>
      </div>

      <div className={styles.toolsRow}>
        <div className={styles.illustrationWrap}>
          <img
            src={avatarHerramientas}
            alt=""
            aria-hidden="true"
            width={2052}
            height={2048}
            loading="lazy"
            className={styles.toolsIllustration}
          />
        </div>
        <div className={styles.contentGroup}>
          {skillCategories.slice(2, 4).map((category) => (
            <CategoryBlock key={category.category} {...category} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
