// Lettura consumi - service worker minimo: rende la pagina installabile come app
// e la apre anche senza rete con l'ultima versione vista.
var CACHE='lettura-consumi-v1';
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(['./','manifest.json','icona-192.png','icona-512.png']);}));self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==CACHE;}).map(function(n){return caches.delete(n);}));}));self.clients.claim();});
self.addEventListener('fetch',function(e){if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(function(r){var cp=r.clone();caches.open(CACHE).then(function(c){c.put(e.request,cp);});return r;}).catch(function(){return caches.match(e.request,{ignoreSearch:true});}));});
