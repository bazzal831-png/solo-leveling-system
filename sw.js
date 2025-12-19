const CACHE_NAME = "solo-leveling-v2";
const ASSETS_TO_CACHE = [
    "./",
    "./index.html",
    "./manifest.json",
    // أضف أيقوناتك هنا لتظهر حتى بدون إنترنت
    "./icon-192.png",
    "./icon-512.png"
];

// عند تثبيت التطبيق: قم بحفظ الملفات فوراً
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Caching assets for offline use...");
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// تفعيل وتحويل السيطرة فوراً
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// استراتيجية الاستجابة: ابحث في الذاكرة أولاً، إذا لم تجد اذهب للإنترنت
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
