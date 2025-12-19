const CACHE_NAME = "solo-leveling-v1";
const ASSETS_TO_CACHE = [
    "./",
    "./index.html",
    "./manifest.json"
    // إذا أضفت صور للأيقونات أضفها هنا أيضاً
    // "./icon-192.png",
    // "./icon-512.png"
];

// تثبيت الـ Service Worker وحفظ الملفات
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// تفعيل الـ Service Worker
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
});

// استراتيجية التحميل (Network First) لضمان عمل Firebase بشكل جيد
self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
