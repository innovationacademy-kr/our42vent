function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i += 1) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default async function subscribePushService(registration) {
  await navigator.serviceWorker.ready;

  const publicVAPIDKey =
    'BKEcD06WlgB9e8eXU-5Xdit23c1kG2QSssM82RJGGb7hqgJpyO7tZexvO_9oNvjuLHXogLAcEVXcT_3Qz-Xj5Nk';

  // Push Service 구독
  await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVAPIDKey),
  });

  const subscription = await registration.pushManager.getSubscription();

  return subscription;
}
