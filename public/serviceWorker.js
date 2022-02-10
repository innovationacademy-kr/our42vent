self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('push', e => {
  const { title, body } = e.data.json();

  e.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: '/assets/favicons/our42vent.ico',
      badge: '/assets/images/our42vent_badge.png',
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/'));
});
