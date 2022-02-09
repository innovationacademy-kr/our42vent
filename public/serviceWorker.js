self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('push', async e => {
  const { title, body } = e.data.json();

  self.registration.showNotification(title, {
    body,
    icon: '/assets/favicons/our42vent.ico',
  });
});
