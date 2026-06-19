require('dotenv').config();
const express = require('express');
const path = require('path');
const https = require('https');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Google Reviews ──────────────────────────────────────────────────────────
const PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_ID       = process.env.GOOGLE_PLACE_ID || 'ChIJgd6NwYaJr44RR_R2unEi5dU';
const CACHE_TTL      = 24 * 60 * 60 * 1000; // 24 h
let reviewsCache     = null;
let reviewsCacheTime = 0;

const FALLBACK_REVIEWS = [
  {
    author_name: 'Gabriel Félix',
    rating: 5,
    text: 'Perforaron el pozo de mi finca y quedé muy satisfecho. Cumplieron con el tiempo que acordamos y el agua salió de buena calidad. Gente seria y trabajadora.',
    relative_time_description: 'hace 1 mes',
  },
  {
    author_name: 'Freddy Cedano',
    rating: 5,
    text: 'Profesionales, responsables y un servicio de primera.',
    relative_time_description: 'hace 1 mes',
  },
];

function fetchFromPlaces() {
  return new Promise((resolve, reject) => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&language=es&key=${PLACES_API_KEY}`;
    https.get(url, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

app.get('/api/reviews', async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  try {
    if (reviewsCache && Date.now() - reviewsCacheTime < CACHE_TTL) {
      return res.json(reviewsCache);
    }
    const data    = await fetchFromPlaces();
    const reviews = (data.result?.reviews || []).filter(r => r.rating >= 4);
    const result  = reviews.length > 0 ? reviews : FALLBACK_REVIEWS;
    reviewsCache     = result;
    reviewsCacheTime = Date.now();
    res.json(result);
  } catch (_) {
    res.json(FALLBACK_REVIEWS);
  }
});
// ────────────────────────────────────────────────────────────────────────────
const DIST_DIR = path.join(__dirname, 'dist', 'hidropozo', 'browser');

app.use(compression());

// Redirigir HTTP → HTTPS (en producción con proxy como Nginx/Heroku/Render)
app.use((req, res, next) => {
  const proto = req.headers['x-forwarded-proto'];
  if (proto && proto !== 'https') {
    return res.redirect(301, 'https://' + req.headers.host + req.url);
  }
  next();
});

// Redirigir www → sin www
app.use((req, res, next) => {
  if (req.headers.host && req.headers.host.startsWith('www.')) {
    const newHost = req.headers.host.slice(4);
    return res.redirect(301, 'https://' + newHost + req.url);
  }
  next();
});

app.use(express.static(DIST_DIR, {
  maxAge: '1y',
  index: false,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
  }
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Hidropozo server escuchando en puerto ${PORT}`);
});
