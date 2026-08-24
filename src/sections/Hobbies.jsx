import { useEffect, useState } from 'react';
import { Music2, Gamepad2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { spotifyFavorites, steamFavorites } from '../data/hobbies';
import SectionTitle from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';
import styles from './Hobbies.module.css';

const STEAM_PROFILE_URL = 'https://steamcommunity.com/profiles/76561199215601574/';

function LiveBadge({ live, label }) {
  return (
    <span className={`${styles.badge} ${live ? styles.badgeLive : styles.badgeOffline}`}>
      <span className={styles.badgeDot} aria-hidden="true" />
      {label}
    </span>
  );
}

export default function Hobbies() {
  const { t } = useLanguage();
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      // /api/hobbies (función serverless de Vercel) da datos en vivo por
      // request. Si no está disponible — dev local sin `vercel dev`,
      // despliegue estático en GitHub Pages — se cae al JSON generado por
      // el cron de CI, que ya trae su propio manejo de estado offline.
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
    return () => {
      cancelled = true;
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
                    <div className={styles.albumArtWrap}>
                      <img src={spotify.track.albumArt} alt="" className={styles.albumArt} />
                      {spotifyIsLive && (
                        <span className={styles.equalizer} aria-hidden="true">
                          <span />
                          <span />
                          <span />
                        </span>
                      )}
                    </div>
                  )}
                  <div className={styles.trackInfo}>
                    <p className={styles.trackTitle}>{spotify.track.title}</p>
                    <p className={styles.trackArtist}>{spotify.track.artist}</p>
                  </div>
                </div>
                {spotify.track.url && (
                  <a href={spotify.track.url} target="_blank" rel="noreferrer" className={styles.link}>
                    {t('hobbies.spotifyListen')}
                  </a>
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
          </Card>
        )}

        {steam && (
          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <Gamepad2 size={20} aria-hidden="true" />
              <span>Steam</span>
              <LiveBadge
                live={steamIsLive}
                label={t(steamIsLive ? 'hobbies.liveBadge' : 'hobbies.offlineBadge')}
              />
            </div>

            {steamIsLive ? (
              <p className={styles.trackTitle}>
                {t('hobbies.steamPlaying')} {steam.game}
              </p>
            ) : (
              <>
                <p className={styles.trackTitle}>{t(`hobbies.steamStatus.${steam.status}`)}</p>
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
            <a href={STEAM_PROFILE_URL} target="_blank" rel="noreferrer" className={styles.link}>
              {t('hobbies.steamAdd')}
            </a>
          </Card>
        )}
      </div>
    </section>
  );
}
