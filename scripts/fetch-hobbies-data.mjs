// Corre solo en CI (GitHub Actions). Lee credenciales de variables de entorno
// y escribe public/data/hobbies.json con lo que se está escuchando en Spotify
// y el estado/juego actual en Steam. Si algo falla, conserva el JSON anterior
// en vez de romper el build.
import { readFile, writeFile } from 'node:fs/promises';
import { fetchSpotify, fetchSteam } from '../lib/hobbies-fetchers.mjs';

const OUTPUT_PATH = 'public/data/hobbies.json';

async function main() {
  const results = await Promise.allSettled([fetchSpotify(), fetchSteam()]);
  const [spotifyResult, steamResult] = results;

  if (spotifyResult.status === 'rejected') console.error('Spotify fetch failed:', spotifyResult.reason);
  if (steamResult.status === 'rejected') console.error('Steam fetch failed:', steamResult.reason);

  let previous = { spotify: null, steam: null };
  try {
    previous = JSON.parse(await readFile(OUTPUT_PATH, 'utf-8'));
  } catch {
    // sin JSON previo, se usan los placeholders por defecto
  }

  const spotify = spotifyResult.status === 'fulfilled' ? spotifyResult.value : previous.spotify;
  const steam = steamResult.status === 'fulfilled' ? steamResult.value : previous.steam;

  const payload = {
    spotify,
    steam,
    fetchedAt: new Date().toISOString(),
  };

  await writeFile(OUTPUT_PATH, JSON.stringify(payload, null, 2));
  console.log('hobbies.json actualizado:', payload);
}

main().catch((err) => {
  console.error('fetch-hobbies-data failed:', err);
  process.exitCode = 1;
});
