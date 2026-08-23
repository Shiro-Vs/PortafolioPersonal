import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import Footer from '../components/Footer';
import MailIcon from '../assets/icons/social/mail.svg?react';
import LinkedInIcon from '../assets/icons/social/linkedin.svg?react';
import WhatsAppIcon from '../assets/icons/social/whatsapp.svg?react';
import avatarPensando from '../assets/images/contact/avatar-pensando.webp';
import styles from './Contact.module.css';

const CONTACT_LINKS = [
  {
    label: 'robert.vs@outlook.com',
    href: 'mailto:robert.vs@outlook.com',
    icon: MailIcon,
  },
  {
    label: 'linkedin.com/in/shirovs',
    href: 'https://www.linkedin.com/in/shirovs',
    icon: LinkedInIcon,
  },
  {
    label: '+51 937 385 728',
    href: 'https://wa.me/51937385728',
    icon: WhatsAppIcon,
  },
];

export default function Contact() {
  const [status, setStatus] = useState('');
  const [formHeight, setFormHeight] = useState(null);
  const formRef = useRef(null);
  const messageRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const el = formRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(([entry]) => setFormHeight(entry.contentRect.height));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setStatus('Gracias por tu mensaje. ¡Te responderé pronto!');
    formRef.current?.reset();
    if (messageRef.current) messageRef.current.style.height = '';
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setStatus(''), 5000);
  }

  function handleMessageInput(e) {
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }

  return (
    <section id="contacto" className={styles.section}>
      <div className={styles.inner}>
        <SectionTitle eyebrow="Hablemos">Contacto</SectionTitle>

        <div className={styles.layout}>
          <div
            className={styles.contactColumn}
            style={formHeight ? { maxHeight: `${formHeight}px` } : undefined}
          >
            <ul className={styles.contactLinks}>
              {CONTACT_LINKS.map(({ label, href, icon: Icon }) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noreferrer" className={styles.contactLink}>
                    <span className={styles.contactIcon} aria-hidden="true">
                      <Icon width={20} height={20} />
                    </span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <img
              src={avatarPensando}
              alt=""
              aria-hidden="true"
              width={700}
              height={1296}
              loading="lazy"
              className={styles.thinkingAvatar}
            />
          </div>

          <motion.form
            ref={formRef}
            className={`${styles.form} ${styles.formCard}`}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <h3 className={styles.formHeading}>¿Tienes un proyecto en mente?</h3>
            <label className={styles.field}>
              Nombre
              <input type="text" name="nombre" required />
            </label>
            <label className={styles.field}>
              Correo
              <input type="email" name="correo" required />
            </label>
            <label className={styles.field}>
              Mensaje
              <textarea
                ref={messageRef}
                name="mensaje"
                rows={4}
                required
                onInput={handleMessageInput}
                className={styles.message}
              />
            </label>
            <Button type="submit" variant="primary">
              Enviar mensaje
            </Button>
            <p className={styles.status} role="status" aria-live="polite">
              {status}
            </p>
          </motion.form>
        </div>
      </div>
      <Footer />
    </section>
  );
}
