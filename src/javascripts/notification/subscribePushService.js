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
    'BM9QjkyqV9IiwOfuXXIwmq-oteF3ZJQu_vQXyPC-w4FGud6CXxhbFU0SRlCQJfEg9IhDfLXi9x6MzzP4nogUOQE';

  // Push Service 구독
  await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVAPIDKey),
  });

  const subscription = await registration.pushManager.getSubscription();

  return subscription;
}
