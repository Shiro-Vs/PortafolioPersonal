// Corre solo en CI (GitHub Actions). Lee credenciales de variables de entorno
// y escribe public/data/hobbies.json con lo que se está escuchando en Spotify
// y el estado/juego actual en Steam. Si algo falla, conserva el JSON anterior
// en vez de romper el build.
import { readFile, writeFile } from 'node:fs/promises';

const OUTPUT_PATH = 'public/data/hobbies.json';

async function getSpotifyAccessToken() {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) return null;

  const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });
  if (!res.ok) throw new Error(`Spotify token refresh failed: ${res.status}`);
  const { access_token } = await res.json();
  return access_token;
}

function trackFromItem(item) {
  return {
    title: item.name,
    artist: item.artists.map((a) => a.name).join(', '),
    albumArt: item.album?.images?.[1]?.url ?? item.album?.images?.[0]?.url ?? null,
    url: item.external_urls?.spotify ?? null,
  };
}

async function fetchSpotify() {
  const accessToken = await getSpotifyAccessToken();
  if (!accessToken) return { isPlaying: false, track: null };

  const headers = { Authorization: `Bearer ${accessToken}` };

  const nowRes = await fetch('https://api.spotify.com/v1/me/player/currently-playing', { headers });
  if (nowRes.status === 200) {
    const data = await nowRes.json();
    if (data?.item) {
      return { isPlaying: Boolean(data.is_playing), track: trackFromItem(data.item) };
    }
  }

  const recentRes = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', { headers });
  if (recentRes.ok) {
    const data = await recentRes.json();
    const item = data?.items?.[0]?.track;
    if (item) return { isPlaying: false, track: trackFromItem(item) };
  }

  return { isPlaying: false, track: null };
}

async function fetchSteam() {
  const { STEAM_API_KEY, STEAM_ID } = process.env;
  if (!STEAM_API_KEY || !STEAM_ID) return { status: 'unknown', game: null };

  const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${STEAM_API_KEY}&steamids=${STEAM_ID}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Steam API failed: ${res.status}`);
  const data = await res.json();
  const player = data?.response?.players?.[0];
  if (!player) return { status: 'unknown', game: null };

  const STATUS_LABELS = { 0: 'offline', 1: 'online', 2: 'busy', 3: 'away', 4: 'snooze', 5: 'looking-to-trade', 6: 'looking-to-play' };
  return {
    status: STATUS_LABELS[player.personastate] ?? 'unknown',
    game: player.gameextrainfo ?? null,
  };
}

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
    spotify: { ...spotify, fallback: previous.spotify?.fallback ?? null },
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
