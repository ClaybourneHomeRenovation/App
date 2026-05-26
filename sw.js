const CACHE_NAME = "claybourne-quote-builder-v7";

const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./supabase-client.js",
  "./manifest.webmanifest",
  "./data/supplier_catalog.generated.js",
  "./pdf-lib.min.js",
  "./tesseract.min.js",
  "./tesseract-worker.min.js",
  "./tesseract-core/tesseract-core-lstm.js",
  "./tesseract-core/tesseract-core-lstm.wasm",
  "./tesseract-core/tesseract-core-lstm.wasm.js",
  "./tesseract-core/tesseract-core-simd-lstm.js",
  "./tesseract-core/tesseract-core-simd-lstm.wasm",
  "./tesseract-core/tesseract-core-simd-lstm.wasm.js",
  "./24f3232d-c8cd-479a-9e2b-b5e3a6f63e42.png",
  "./claybourne_quote_docx_header.png",
  "./service-agreement-data.js",
  "./service-agreement-print-template.pdf",
  "./service-agreement-pages/page-1.png",
  "./service-agreement-pages/page-2.png",
  "./service-agreement-pages/page-3.png",
  "./service-agreement-pages/page-4.png",
  "./service-agreement-pages/page-5.png",
  "./service-agreement-pages/page-6.png",
  "./service-agreement-pages/page-7.png",
  "./service-agreement-pages/page-8.png",
  "./service-agreement-pages/page-9.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", event => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", event => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.hostname.includes("supabase.co")) return;

  const shouldCheckNetworkFirst =
    request.mode === "navigate"
    || url.pathname.endsWith("/")
    || url.pathname.endsWith(".html")
    || url.pathname.endsWith(".css")
    || url.pathname.endsWith(".js")
    || url.pathname.endsWith(".webmanifest");

  if (shouldCheckNetworkFirst) {
    event.respondWith(
      fetch(request, { cache: "no-store" }).then(response => {
        if (!response || response.status !== 200 || response.type === "opaque") return response;
        const responseCopy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, responseCopy));
        return response;
      }).catch(() => caches.match(request).then(cached => cached || caches.match("./index.html")))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (!response || response.status !== 200 || response.type === "opaque") return response;
        const responseCopy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, responseCopy));
        return response;
      }).catch(() => caches.match("./index.html"));
    })
  );
});
