let ver = 'v12'
this.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(ver).then(function(cache) {
			return cache.addAll([
				'/',
				'index.html'
			]);
		})
	);
});

this.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request)
		.catch(function() {
			return fetch(event.request);
		})
	);
});

this.addEventListener('activate', function(event) {
	var cacheWhitelist = [ver];

	event.waitUntil(
		caches.keys().then(function(keyList) {
			return Promise.all(keyList.map(function(key) {
				if (cacheWhitelist.indexOf(key) === -1) {
					return caches.delete(key);
				}
			}));
		})
	);
});
