// اسم الكاش - قم بتغيير الرقم (v4) عند تحديث الكود لفرض التحديث على الهواتف
const CACHE_NAME = "solo-leveling-system-v66";
// قائمة الملفات المطلوب حفظها للعمل بدون إنترنت (Offline)
// يجب كتابة المسار الكامل للمجلد في GitHub Pages
const ASSETS_TO_CACHE = [
    "/solo-leveling-system/",
    "/solo-leveling-system/index.html",
    "/solo-leveling-system/manifest.json",
    "/solo-leveling-system/sw.js",
    // روابط الأيقونات (نفس الروابط المستخدمة في المانيفست)
    "https://cdn-icons-png.flaticon.com/512/2592/2592201.png"
];

// مرحلة التثبيت: حفظ الملفات في الكاش
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("System: Caching all assets...");
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    // تفعيل السيرفس وركر فوراً دون انتظار إغلاق المتصفح
    self.skipWaiting();
});

// مرحلة التنشيط: حذف الكاش القديم
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log("System: Removing old cache", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// استراتيجية جلب البيانات: البحث في الكاش أولاً، ثم الإنترنت
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // إذا وجد الملف في الكاش نعيده، وإلا نطلبه من الإنترنت
            return response || fetch(event.request);
        })
    );
});
































































