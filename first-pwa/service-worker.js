const CACHE_NAME = "firstpwa-v1";
var urlToCache = [
    "/",
    "/icon.png",
    "/icon_512x.png",
    "/nav.html",
    "/index.html",
    "/manifest.json",
    "/pages/home.html",
    "/pages/about.html",
    "/pages/blog.html",
    "/pages/gallery.html",
    "/css/materialize.min.css",
    "/css/style.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/img/about.jpg",
    "/img/barley_field.jpg",
    "/img/halloween.jpg",
    "/img/programming.jpg",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.googleapis.com/css?family=Montserrat"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlToCache);
        })
    )
})

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request, { cacheName : CACHE_NAME })
        .then(function(response) {
            if (response) {
                console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                return response;
            }

            console.log("ServiceWorker: Memuat aset dari server", event.request.url);
            return fetch(event.request);
        })
    )
})

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("Serviceworker: cache " + cacheName + " dihapus!");
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
})