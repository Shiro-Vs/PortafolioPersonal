import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import styles from './Contact.module.css';

export default function Contact() {
  const [status, setStatus] = useState('');
  const formRef = useRef(null);
  const timeoutRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    setStatus('Gracias por tu mensaje. ¡Te responderé pronto!');
    formRef.current?.reset();
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setStatus(''), 5000);
  }

  return (
    <section id="contacto" className={styles.section}>
      <SectionTitle eyebrow="Hablemos">Contacto</SectionTitle>
      <motion.form
        ref={formRef}
        className={styles.form}
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
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
          <textarea name="mensaje" rows={5} required />
        </label>
        <Button type="submit" variant="primary">
          Enviar mensaje
        </Button>
        <p className={styles.status} role="status" aria-live="polite">
          {status}
        </p>
      </motion.form>
    </section>
  );
}
