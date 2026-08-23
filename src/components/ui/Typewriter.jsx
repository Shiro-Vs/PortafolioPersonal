import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './Typewriter.module.css';

export default function Typewriter({ words, speedWrite = 120, speedDelete = 60, pause = 900 }) {
  const reduced = useReducedMotion();
  const [text, setText] = useState(reduced ? words[0] : '');
  const indexRef = useRef(0);
  const charRef = useRef(0);
  const deletingRef = useRef(false);

  useEffect(() => {
    if (reduced) return undefined;

    let timeoutId;

    function tick() {
      const word = words[indexRef.current];

      if (!deletingRef.current) {
        charRef.current++;
        setText(word.substring(0, charRef.current));
        if (charRef.current === word.length) {
          deletingRef.current = true;
          timeoutId = setTimeout(tick, pause);
          return;
        }
        timeoutId = setTimeout(tick, speedWrite);
        return;
      }

      charRef.current--;
      setText(word.substring(0, charRef.current));
      if (charRef.current === 0) {
        deletingRef.current = false;
        indexRef.current = (indexRef.current + 1) % words.length;
        timeoutId = setTimeout(tick, 500);
        return;
      }
      timeoutId = setTimeout(tick, speedDelete);
    }

    timeoutId = setTimeout(tick, speedWrite);
    return () => clearTimeout(timeoutId);
  }, [words, speedWrite, speedDelete, pause, reduced]);

  return (
    <span className={styles.typewriter}>
      {text}
      <span className={styles.cursor} aria-hidden="true">
        |
      </span>
    </span>
  );
}
