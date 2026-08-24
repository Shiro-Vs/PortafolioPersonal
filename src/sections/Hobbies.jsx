import { useEffect, useState } from 'react';
import { Music2, Gamepad2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import SectionTitle from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';
import styles from './Hobbies.module.css';

const STEAM_PROFILE_URL = 'https://steamcommunity.com/profiles/76561199215601574/';

export default function Hobbies() {
  const { t } = useLanguage();
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/data/hobbies.json', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const spotify = data?.spotify;
  const steam = data?.steam;

  const hasLiveTrack = Boolean(spotify?.track);
  const spotifyTrack = hasLiveTrack
    ? spotify.track
    : spotify?.fallback
      ? {
          title: t('hobbies.spotifyFallbackTitle'),
          artist: t('hobbies.spotifyFallbackArtist'),
          albumArt: spotify.fallback.albumArt,
          url: spotify.fallback.url,
        }
      : null;
  const spotifyHeader = hasLiveTrack
    ? spotify.isPlaying
      ? t('hobbies.spotifyPlaying')
      : t('hobbies.spotifyRecent')
    : t('hobbies.spotifyFallbackLabel');

  const steamIsOffline = steam && (steam.status === 'unknown' || steam.status === 'offline');

  return (
    <section id="pasatiempos" className={styles.section}>
      <SectionTitle eyebrow={t('hobbies.eyebrow')}>{t('hobbies.title')}</SectionTitle>
      <div className={styles.grid}>
        {spotifyTrack && (
          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <Music2 size={20} aria-hidden="true" />
              <span>{spotifyHeader}</span>
            </div>
            <div className={styles.trackRow}>
              {spotifyTrack.albumArt && (
                <img src={spotifyTrack.albumArt} alt="" className={styles.albumArt} />
              )}
              <div className={styles.trackInfo}>
                <p className={styles.trackTitle}>{spotifyTrack.title}</p>
                <p className={styles.trackArtist}>{spotifyTrack.artist}</p>
              </div>
            </div>
            {spotifyTrack.url && (
              <a href={spotifyTrack.url} target="_blank" rel="noreferrer" className={styles.link}>
                {t('hobbies.spotifyListen')}
              </a>
            )}
          </Card>
        )}

        {steam && (
          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <Gamepad2 size={20} aria-hidden="true" />
              <span>Steam</span>
            </div>
            {steam.game ? (
              <p className={styles.trackTitle}>
                {t('hobbies.steamPlaying')} {steam.game}
              </p>
            ) : (
              <>
                <p className={styles.trackTitle}>{t(`hobbies.steamStatus.${steam.status}`)}</p>
                {steamIsOffline && (
                  <p className={styles.trackArtist}>
                    {t('hobbies.steamFavorite')}: {t('hobbies.steamFavoriteGame')}
                  </p>
                )}
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
