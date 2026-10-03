// Offline support. Change the version number below whenever you replace index.html with a new release.
const CACHE = 'ko-ce-pice-platiti-v1';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png', './favicon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // fonts and other sites: use the saved copy if there is one, refresh it in the background
  if (url.origin !== location.origin) {
    e.respondWith(
      caches.open(CACHE).then(async (c) => {
        const hit = await c.match(req);
        const net = fetch(req)
          .then((r) => { if (r && (r.ok || r.type === 'opaque')) c.put(req, r.clone()); return r; })
          .catch(() => hit);
        return hit || net;
      })
    );
    return;
  }

  // opening the app: newest version when online, saved copy when offline
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((r) => { const copy = r.clone(); caches.open(CACHE).then((c) => c.put('./index.html', copy)); return r; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // everything else of ours: saved copy first
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
});
