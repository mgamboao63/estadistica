const CACHE_NAME = 'laboratorio-milton-v1';
const urlsToCache = [
  './',
  './index.html',
  'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.12/codemirror.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.12/theme/dracula.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.12/codemirror.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.12/mode/python/python.min.js'
];

// Instalación: Guarda los archivos básicos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Intercepta peticiones: Si no hay red, sirve desde el caché
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});