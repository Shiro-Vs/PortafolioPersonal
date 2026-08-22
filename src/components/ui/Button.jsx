import styles from './Button.module.css';

export default function Button({ children, variant = 'primary', as: Tag = 'button', ...props }) {
  return (
    <Tag className={`${styles.button} ${styles[variant]}`} {...props}>
      {children}
    </Tag>
  );
}
