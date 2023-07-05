self.addEventListener("install", e=>{
    console.log("installing service worker!!")
    e.waitUntil(
        caches.open("static").then(cache=>{
            return cache.addAll([
                "./", 
                "./style.css", 
                "/logo.png",
                "/grua.png",
                "/grua500.png",
                "./main.js",
            ])
        })
    )
})

self.addEventListener("fetch", e => {
    //console.log(`Intercepting fetch ${e.request.url}`);
    e.respondWith( 
        caches.match(e.request).then( response => {
            return response || fetch(e.request);
        })
    );
});
