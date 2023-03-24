const cacheName = "v1";
const contentToCache = [
    "/index.html",
    "/app.js",
    "/assets/bootstrap@5.3.0-alpha2/bootstrap.bundle.min.js",
    "/assets/bootstrap@5.3.0-alpha2/bootstrap.min.css"
];

self.addEventListener("install", (e) => {
    console.log("[Service Worker] Install");
    e.waitUntil(
        (async () => {
            const cache = await caches.open(cacheName);
            console.log("[Service Worker] Caching content");
            await cache.addAll(contentToCache);
        })()
    );
});
