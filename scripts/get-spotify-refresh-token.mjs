// Script de un solo uso, corre en tu máquina (NO en CI). Te ayuda a obtener el
// SPOTIFY_REFRESH_TOKEN una vez, para guardarlo como GitHub Secret.
//
// Uso:
//   1. Crea una app en https://developer.spotify.com/dashboard
//      - Redirect URI: http://127.0.0.1:8888/callback
//   2. SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node scripts/get-spotify-refresh-token.mjs
//   3. Abre la URL que imprime, inicia sesión y autoriza.
//   4. El script imprime el refresh_token — guárdalo como GitHub Secret
//      SPOTIFY_REFRESH_TOKEN (y no lo commitees).
import { createServer } from 'node:http';

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;
const REDIRECT_URI = 'http://127.0.0.1:8888/callback';
const SCOPE = 'user-read-currently-playing user-read-recently-played';

if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
  console.error('Faltan SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET en el entorno.');
  process.exit(1);
}

const authUrl = new URL('https://accounts.spotify.com/authorize');
authUrl.searchParams.set('client_id', SPOTIFY_CLIENT_ID);
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
authUrl.searchParams.set('scope', SCOPE);

console.log('\nAbre esta URL, inicia sesión en Spotify y autoriza la app:\n');
console.log(authUrl.toString());
console.log('\nEsperando el redirect en http://127.0.0.1:8888/callback ...\n');

const server = createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI);
  if (url.pathname !== '/callback') {
    res.writeHead(404).end();
    return;
  }

  const code = url.searchParams.get('code');
  if (!code) {
    res.writeHead(400).end('Falta el parámetro code.');
    return;
  }

  const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const data = await tokenRes.json();

  if (!tokenRes.ok) {
    res.writeHead(500).end('Error al obtener el token, revisa la consola.');
    console.error(data);
    server.close();
    process.exit(1);
  }

  res.writeHead(200, { 'Content-Type': 'text/html' }).end('<h1>Listo, ya puedes cerrar esta pestaña.</h1>');
  console.log('\nrefresh_token:\n');
  console.log(data.refresh_token);
  console.log('\nGuárdalo como GitHub Secret: SPOTIFY_REFRESH_TOKEN\n');
  server.close();
});

server.listen(8888);
