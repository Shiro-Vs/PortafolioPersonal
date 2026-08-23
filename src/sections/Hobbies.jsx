import { useEffect, useState } from 'react';
import { Music2, Gamepad2 } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import Card from '../components/ui/Card';
import styles from './Hobbies.module.css';

const STEAM_PROFILE_URL = 'https://steamcommunity.com/profiles/76561199215601574/';

const STEAM_STATUS_LABELS = {
  online: 'En línea',
  busy: 'Ocupado',
  away: 'Ausente',
  snooze: 'Inactivo',
  'looking-to-trade': 'Disponible para intercambiar',
  'looking-to-play': 'Buscando jugar',
  offline: 'Desconectado',
  unknown: 'Sin datos',
};

export default function Hobbies() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/data/hobbies.json')
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

  return (
    <section id="pasatiempos" className={styles.section}>
      <SectionTitle eyebrow="Fuera del código">Pasatiempos</SectionTitle>
      <div className={styles.grid}>
        {spotify?.track && (
          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <Music2 size={20} aria-hidden="true" />
              <span>{spotify.isPlaying ? 'Escuchando ahora' : 'Lo último que escuché'}</span>
            </div>
            <div className={styles.trackRow}>
              {spotify.track.albumArt && (
                <img src={spotify.track.albumArt} alt="" className={styles.albumArt} />
              )}
              <div className={styles.trackInfo}>
                <p className={styles.trackTitle}>{spotify.track.title}</p>
                <p className={styles.trackArtist}>{spotify.track.artist}</p>
              </div>
            </div>
            {spotify.track.url && (
              <a href={spotify.track.url} target="_blank" rel="noreferrer" className={styles.link}>
                Escuchar en Spotify
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
              <p className={styles.trackTitle}>Jugando {steam.game}</p>
            ) : (
              <p className={styles.trackTitle}>{STEAM_STATUS_LABELS[steam.status] ?? 'Sin datos'}</p>
            )}
            <a href={STEAM_PROFILE_URL} target="_blank" rel="noreferrer" className={styles.link}>
              Agrégame en Steam
            </a>
          </Card>
        )}
      </div>
    </section>
  );
}
