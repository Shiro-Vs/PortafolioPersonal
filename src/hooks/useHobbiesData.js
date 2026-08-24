import { useEffect, useState } from 'react';

// Consulta /api/hobbies (función serverless de Vercel, dato en vivo por
// request); si no está disponible — dev local sin `vercel dev`, despliegue
// estático — cae al JSON generado por el cron de CI. Vuelve a consultar
// cada 30s mientras la pestaña esté visible, para reflejar un cambio de
// canción/juego sin recargar.
export function useHobbiesData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
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
  const spotifyIsLive = Boolean(spotify?.isPlaying) && hasLiveTrack;

  const steamIsOffline = steam && (steam.status === 'unknown' || steam.status === 'offline' || !steam.game);
  const steamIsLive = Boolean(steam?.game) && !steamIsOffline;

  return { spotify, steam, hasLiveTrack, spotifyIsLive, steamIsLive };
}
