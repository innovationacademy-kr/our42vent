self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('push', async e => {
  const { title, body } = e.data.json();

  self.registration.showNotification(title, {
    body,
    icon: '/assets/favicons/our42vent.ico',
    badge: '/assets/images/our42vent_badge.png',
  });
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/'));
});
