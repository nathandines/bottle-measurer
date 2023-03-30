const cacheName = "v12";
const contentToCache = [
    "./",
    "app.js",
    "app.webmanifest",
    "assets/bootstrap/5.3.0-alpha2/bootstrap.bundle.min.js",
    "assets/bootstrap/5.3.0-alpha2/bootstrap.min.css"
];

self.addEventListener("install", (e) => {
    console.log("[Service Worker] Install");
    e.waitUntil(
        (async () => {
            console.log("Installing service worker with cache name: "+cacheName)
            const cache = await caches.open(cacheName);
            console.log("[Service Worker] Caching content");
            await cache.addAll(contentToCache);
        })()
    );
});

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', (event) => {
    console.log('Fetch intercepted for:', event.request.url);
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;
            return fetch(event.request);
        }),
    );
});

self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key === cacheName) return;
                    console.log("Clearing old cache named: "+key)
                    return caches.delete(key);
                })
            );
        })
    );
});
