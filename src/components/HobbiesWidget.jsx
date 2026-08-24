import { useEffect, useRef, useState } from 'react';
import { Music2, Gamepad2, Headphones } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useHobbiesData } from '../hooks/useHobbiesData';
import { spotifyFavorites, steamFavorites } from '../data/hobbies';
import styles from './HobbiesWidget.module.css';

// Menos barras que en la sección original — el panel del widget es mucho
// más chico, no hace falta la misma densidad para que se vea bien.
const EQUALIZER_BARS = [
  [0.9, 0], [1.3, 0.1], [0.7, 0.05], [1.1, 0.25], [0.8, 0.15],
  [1.4, 0], [0.6, 0.2], [1.2, 0.1], [0.9, 0.3], [1.5, 0.05],
  [0.7, 0.15], [1, 0],
];

function hideOnError(e) {
  e.currentTarget.style.display = 'none';
}

export default function HobbiesWidget() {
  const { t } = useLanguage();
  const { spotify, steam, spotifyIsLive, steamIsLive } = useHobbiesData();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    function onPointerDown(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  // Todavía no llegó ningún dato (ni siquiera el fallback estático) — no
  // hay nada que mostrar todavía, evita un parpadeo con el ícono "vacío".
  if (!spotify && !steam) return null;

  const anyLive = spotifyIsLive || steamIsLive;
  const Icon = spotifyIsLive ? Music2 : steamIsLive ? Gamepad2 : Headphones;

  return (
    <div ref={rootRef} className={styles.widget} data-open={open || undefined}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={t('hobbies.widgetToggle')}
      >
        <Icon size={20} aria-hidden="true" />
        <span className={`${styles.dot} ${anyLive ? styles.dotLive : styles.dotOffline}`} aria-hidden="true" />
      </button>

      <div className={styles.panel}>
        {spotifyIsLive && (
          <div className={styles.row}>
            <div className={styles.trackRow}>
              {spotify.track.albumArt && (
                <img src={spotify.track.albumArt} alt="" className={styles.albumArt} />
              )}
              <div className={styles.trackInfo}>
                <p className={styles.trackTitle}>{spotify.track.title}</p>
                <p className={styles.trackArtist}>{spotify.track.artist}</p>
              </div>
            </div>
            <span className={styles.equalizer} aria-hidden="true">
              {EQUALIZER_BARS.map(([duration, delay], i) => (
                <span key={i} style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }} />
              ))}
            </span>
          </div>
        )}

        {steamIsLive && (
          <div className={styles.row}>
            {steam.gameImage && (
              <img src={steam.gameImage} alt="" className={styles.gameArt} onError={hideOnError} />
            )}
            <p className={styles.trackTitle}>
              {t('hobbies.steamPlaying')} {steam.game}
            </p>
          </div>
        )}

        {!anyLive && (
          <div className={styles.idle}>
            <p className={styles.idleLabel}>{t('hobbies.widgetIdle')}</p>

            <div className={styles.idleGroup}>
              <Music2 size={13} aria-hidden="true" className={styles.idleIcon} />
              <ul className={styles.favoriteList}>
                {spotifyFavorites.slice(0, 2).map(({ id }) => (
                  <li key={id}>{t(`hobbies.spotifyFavorites.${id}.title`)}</li>
                ))}
              </ul>
            </div>

            <div className={styles.idleGroup}>
              <Gamepad2 size={13} aria-hidden="true" className={styles.idleIcon} />
              <ul className={styles.favoriteList}>
                {steamFavorites.slice(0, 2).map(({ id }) => (
                  <li key={id}>{t(`hobbies.steamFavorites.${id}`)}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
