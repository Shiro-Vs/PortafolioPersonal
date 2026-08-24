import { fetchSpotify, fetchSteam } from '../lib/hobbies-fetchers.mjs';

// Función serverless de Vercel: datos de Spotify/Steam en tiempo real por
// request (a diferencia de scripts/fetch-hobbies-data.mjs, que solo corre
// cada 5 min vía cron y escribe un JSON estático para el despliegue en
// GitHub Pages). Cacheada brevemente en el edge para no pegarle a las APIs
// de Spotify/Steam en cada carga de página.
export default async function handler(req, res) {
  const [spotifyResult, steamResult] = await Promise.allSettled([fetchSpotify(), fetchSteam()]);

  const spotify = spotifyResult.status === 'fulfilled' ? spotifyResult.value : { isPlaying: false, track: null };
  const steam = steamResult.status === 'fulfilled' ? steamResult.value : { status: 'unknown', game: null };

  if (spotifyResult.status === 'rejected') console.error('Spotify fetch failed:', spotifyResult.reason);
  if (steamResult.status === 'rejected') console.error('Steam fetch failed:', steamResult.reason);

  res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
  res.status(200).json({ spotify, steam, fetchedAt: new Date().toISOString() });
}
