// Questo è un service worker di base per la PWA
// Al momento è semplice, serve solo a rendere l'app "installabile"
// e a fornire una base per la futura funzionalità offline.

const CACHE_NAME = 'dove-app-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/@phosphor-icons/web'
  // Aggiungeremo altri file (CSS, JS, immagini) qui in futuro
];

// Evento di installazione: apre la cache e aggiunge i file principali
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aperta');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento di fetch: serve i file dalla cache se disponibili
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se trovato in cache, ritorna la risposta dalla cache
        if (response) {
          return response;
        }
        // Altrimenti, esegui la richiesta di rete
        return fetch(event.request);
      }
    )
  );
});