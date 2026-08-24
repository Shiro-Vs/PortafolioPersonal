// Lógica de fetch a Spotify/Steam compartida entre scripts/fetch-hobbies-data.mjs
// (cron de GitHub Actions, genera public/data/hobbies.json) y api/hobbies.js
// (función serverless de Vercel, datos en vivo por request).

export async function getSpotifyAccessToken() {
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

export async function fetchSpotify() {
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

export async function fetchSteam() {
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
    gameImage: player.gameid ? `https://cdn.cloudflare.steamstatic.com/steam/apps/${player.gameid}/header.jpg` : null,
  };
}
