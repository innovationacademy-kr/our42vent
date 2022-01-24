export default function setNotification(notificationOption) {
  let notification;

  switch (notificationOption) {
    case '5':
      notification = 5;
      break;
    case '15':
      notification = 15;
      break;
    case '30':
      notification = 30;
      break;
    case '60':
      notification = 60;
      break;
    default:
      notification = null; // 0??
  }
  return notification;
}
