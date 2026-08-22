import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

mkdirSync('public', { recursive: true });
mkdirSync('src/assets/images', { recursive: true });

const CLAY_BG = '#faf6f2';

// Favicon set desde el avatar real (legacy/Iconos/icono.png)
await sharp('legacy/Iconos/icono.png').resize(32, 32).png({ quality: 80 }).toFile('public/favicon-32.png');
await sharp('legacy/Iconos/icono.png').resize(192, 192).png({ quality: 85 }).toFile('public/favicon-192.png');
await sharp('legacy/Iconos/icono.png')
  .resize(180, 180)
  .flatten({ background: CLAY_BG })
  .png({ quality: 85 })
  .toFile('public/apple-touch-icon.png');

// og:image 1200x630 — perfil.png centrado sobre el fondo clay
await sharp({
  create: { width: 1200, height: 630, channels: 4, background: CLAY_BG },
})
  .composite([
    {
      input: await sharp('legacy/Imagenes/perfil.png').resize(560, 560).toBuffer(),
      gravity: 'center',
    },
  ])
  .png({ quality: 85 })
  .toFile('public/og-image.png');

// Foto real y foto de perfil, comprimidas a WebP para usar en el nuevo diseño
await sharp('legacy/Imagenes/foto.png')
  .resize(800, null, { withoutEnlargement: true })
  .webp({ quality: 82 })
  .toFile('src/assets/images/foto.webp');

await sharp('legacy/Imagenes/perfil.png')
  .resize(500, 500)
  .webp({ quality: 85 })
  .toFile('src/assets/images/perfil.webp');

console.log('Assets optimizados generados.');
