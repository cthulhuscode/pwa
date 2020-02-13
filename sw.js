//Asignar un nombre a la caché
const CACHE_NAME = 'v1_carrusel';

//Archivos que se van a cachear
urlsToCache = [
    './',
    'style.css',
    'main.js',
    './img/icons/64.png',
    './img/icons/256.png',
    'index.html',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
];

//Eventos del ServiceWorker

//Intalar, almacenar los activos estáticos del sitio
self.addEventListener('install', e => {
    //Esperar hasta que el objeto caché puedar ser abierto
    e.waitUntill(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
            .then(() => self.skipWaiting())
        })
        .catch(err => console.log('Falló registro de caché', err))
    )
});

//Permite activar el serviceWorker, hace que funcione sin conexión
self.addEventListener('active', e => {
    //Constante para comparar si la información que se tenía es la misma
    const cacheWhiteList = [CACHE_NAME];

    //Detectar que archivos han sufrido un cambio
    e.skipWaiting(
        //Ver las llaves de los archivos que han sido modificados
        caches.keys()
        .then(cachesNames => {
            cachesNames.map(cacheName => {
                //Eliminar lo que ya no se necesita en caché
                if(cacheWhiteList.indexOf(cacheName) === -1){
                    return caches.delete(cacheName)
                }
            })
        })
        //Indica que se ha terminado de actualizar el caché
        .then(() => self.ClientRectList.claim())
    )
});

/*Recupera todos los archivos del servidor, actualiza
los archivos cuando ha habido cambios en el servidor*/
self.addEventListener('fetch', e => {
    //Responder con los objetos de la caché
    e.respondWith(
        //Buscar una coincidencia a cada una de las peticiones que haga el método
        caches.match(e.request)
        .then(function(res) {
            return res || fetch(e.request).then(function(response){
                return caches.open('v1_carrusel').then(function(cache){
                    //cache.put(e.request, response.clone());
                    return response;
                })
            })
        })
    )
})

