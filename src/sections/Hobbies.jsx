import { useEffect, useState } from 'react';
import { Music2, Gamepad2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { spotifyFavorites, steamFavorites } from '../data/hobbies';
import SectionTitle from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import styles from './Hobbies.module.css';

const STEAM_PROFILE_URL = 'https://steamcommunity.com/profiles/76561199215601574/';

// Duración y delay de cada barrita del ecualizador — valores fijos (no
// Math.random()) para que el patrón sea el mismo en cada render, pero con
// variación suficiente para que no se vea como una sola ola uniforme.
const EQUALIZER_BARS = [
  [0.9, 0], [1.3, 0.1], [0.7, 0.05], [1.1, 0.25], [0.8, 0.15], [1.4, 0],
  [0.6, 0.2], [1.2, 0.1], [0.9, 0.3], [1.5, 0.05], [0.7, 0.15], [1, 0],
  [1.3, 0.2], [0.8, 0.1], [1.1, 0], [0.6, 0.25], [1.4, 0.15], [0.9, 0.05],
  [1.2, 0.2], [0.7, 0], [1, 0.3], [1.3, 0.1], [0.8, 0.2], [1.1, 0.05],
];

function LiveBadge({ live, label }) {
  return (
    <span className={`${styles.badge} ${live ? styles.badgeLive : styles.badgeOffline}`}>
      <span className={styles.badgeDot} aria-hidden="true" />
      {label}
    </span>
  );
}

function hideOnError(e) {
  e.currentTarget.style.display = 'none';
}

export default function Hobbies() {
  const { t } = useLanguage();
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      // /api/hobbies (función serverless de Vercel) da datos en vivo por
      // request. Si no está disponible — dev local sin `vercel dev`,
      // despliegue estático — se cae al JSON generado por el cron de CI,
      // que ya trae su propio manejo de estado offline.
      try {
        const liveRes = await fetch('/api/hobbies');
        if (liveRes.ok) {
          const json = await liveRes.json();
          if (!cancelled) setData(json);
          return;
        }
      } catch {
        // sigue al fallback estático
      }

      try {
        const staticRes = await fetch('/data/hobbies.json', { cache: 'no-store' });
        if (!cancelled) setData(staticRes.ok ? await staticRes.json() : null);
      } catch {
        if (!cancelled) setData(null);
      }
    }

    load();

    // Vuelve a consultar cada 30s mientras la pestaña esté abierta y
    // visible, para que un cambio de canción/juego se refleje sin recargar.
    const interval = setInterval(() => {
      if (!document.hidden) load();
    }, 30000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const spotify = data?.spotify;
  const steam = data?.steam;

  const hasLiveTrack = Boolean(spotify?.track);
  const spotifyIsLive = Boolean(spotify?.isPlaying);
  const spotifyHeader = hasLiveTrack
    ? spotifyIsLive
      ? t('hobbies.spotifyPlaying')
      : t('hobbies.spotifyRecent')
    : t('hobbies.spotifyOfflineLabel');

  const steamIsOffline = steam && (steam.status === 'unknown' || steam.status === 'offline' || !steam.game);
  const steamIsLive = Boolean(steam?.game) && !steamIsOffline;

  return (
    <section id="pasatiempos" className={styles.section}>
      <SectionTitle eyebrow={t('hobbies.eyebrow')}>{t('hobbies.title')}</SectionTitle>
      <div className={styles.grid}>
        {spotify && (
          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <Music2 size={20} aria-hidden="true" />
              <span className={styles.cardHeaderLabel}>{spotifyHeader}</span>
              <LiveBadge
                live={spotifyIsLive}
                label={t(spotifyIsLive ? 'hobbies.liveBadge' : 'hobbies.offlineBadge')}
              />
            </div>

            {hasLiveTrack ? (
              <>
                <div className={styles.trackRow}>
                  {spotify.track.albumArt && (
                    <img src={spotify.track.albumArt} alt="" className={styles.albumArt} />
                  )}
                  <div className={styles.trackInfo}>
                    <p className={styles.trackTitle}>{spotify.track.title}</p>
                    <p className={styles.trackArtist}>{spotify.track.artist}</p>
                  </div>
                </div>
                {spotifyIsLive && (
                  <span className={styles.equalizer} aria-hidden="true">
                    {EQUALIZER_BARS.map(([duration, delay], i) => (
                      <span
                        key={i}
                        style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
                      />
                    ))}
                  </span>
                )}
              </>
            ) : (
              <ul className={styles.favoriteList}>
                {spotifyFavorites.map(({ id }) => (
                  <li key={id} className={styles.favoriteItem}>
                    <strong>{t(`hobbies.spotifyFavorites.${id}.title`)}</strong> —{' '}
                    {t(`hobbies.spotifyFavorites.${id}.artist`)}
                  </li>
                ))}
              </ul>
            )}

            {spotify.track?.url && (
              <Button
                as="a"
                href={spotify.track.url}
                target="_blank"
                rel="noreferrer"
                variant="secondary"
                className={styles.cardButton}
              >
                {t('hobbies.spotifyListen')}
              </Button>
            )}
          </Card>
        )}

        {steam && (
          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <Gamepad2 size={20} aria-hidden="true" />
              <span>Steam</span>
              <LiveBadge
                live={steamIsLive}
                label={steamIsLive ? t('hobbies.liveBadge') : t(`hobbies.steamStatus.${steam.status}`)}
              />
            </div>

            {steamIsLive ? (
              <div className={styles.gameCard}>
                {steam.gameImage && (
                  <img src={steam.gameImage} alt="" className={styles.gameArt} onError={hideOnError} />
                )}
                <p className={styles.trackTitle}>
                  {t('hobbies.steamPlaying')} {steam.game}
                </p>
              </div>
            ) : (
              <>
                {(steam.status === 'unknown' || steam.status === 'offline') && (
                  <p className={styles.trackTitle}>{t(`hobbies.steamStatus.${steam.status}`)}</p>
                )}
                <p className={styles.trackArtist}>{t('hobbies.steamOfflineLabel')}:</p>
                <ul className={styles.chipList}>
                  {steamFavorites.map(({ id }) => (
                    <li key={id} className={styles.chip}>
                      {t(`hobbies.steamFavorites.${id}`)}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <Button
              as="a"
              href={STEAM_PROFILE_URL}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              className={styles.cardButton}
            >
              {t('hobbies.steamAdd')}
            </Button>
          </Card>
        )}
      </div>
    </section>
  );
}
