var CACHE_PREFIX = 'ntd-bids-';
var FILES = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

function getServerVersion(){
  return fetch('./index.html', {method:'HEAD', cache:'no-store'})
    .then(function(r){
      return r.headers.get('last-modified') || r.headers.get('etag') || Date.now().toString();
    })
    .catch(function(){ return 'offline'; });
}

self.addEventListener('install', function(e){
  e.waitUntil(
    getServerVersion().then(function(ver){
      var cacheName = CACHE_PREFIX + ver;
      return caches.open(cacheName).then(function(cache){
        return cache.addAll(FILES);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    getServerVersion().then(function(ver){
      var currentCache = CACHE_PREFIX + ver;
      return caches.keys().then(function(keys){
        return Promise.all(
          keys.filter(function(k){
            return k.startsWith(CACHE_PREFIX) && k !== currentCache;
          }).map(function(k){ return caches.delete(k); })
        );
      }).then(function(){
        return caches.open(currentCache).then(function(cache){
          return cache.addAll(FILES);
        });
      });
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e){
  var isHTML = e.request.url.endsWith('.html') || e.request.url.endsWith('/');
  if(isHTML){
    e.respondWith(
      fetch(e.request).then(function(response){
        var clone = response.clone();
        caches.open(CACHE_PREFIX+'current').then(function(cache){ cache.put(e.request, clone); });
        return response;
      }).catch(function(){
        return caches.match(e.request).then(function(cached){
          return cached || caches.match('./index.html');
        });
      })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(function(cached){
        return cached || fetch(e.request).then(function(response){
          var clone = response.clone();
          caches.open(CACHE_PREFIX+'assets').then(function(cache){ cache.put(e.request, clone); });
          return response;
        });
      }).catch(function(){
        return caches.match('./index.html');
      })
    );
  }
});

self.addEventListener('message', function(e){
  if(e.data === 'skipWaiting') self.skipWaiting();
});
