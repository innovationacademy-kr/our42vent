import subscribePushService from './subscribePushService.js';
import api from '../utils/createAxiosInterceptor.js';
import { alertModal } from '../utils/sweetAlertMixin.js';

async function initNotificationCheckbox(checkboxList) {
  const registration = await navigator.serviceWorker.getRegistration();

  if (registration) {
    const notificationSelect = document.querySelector('#details-notification');

    await registration.ready;
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      const pushTokenCookie = document.cookie.split(';').find(str => str.includes('pushToken='));

      let isReqSuccessful = true;
      if (!pushTokenCookie) {
        const updatedSubscription = await subscribePushService(registration);

        await api
          .post('/push', { subscription: updatedSubscription, isFirst: false })
          .catch(err => {
            if (err.response.status === 403) {
              checkboxList.forEach(checkbox => {
                const switchBlocker = checkbox.parentElement.lastElementChild;
                const notificationCheckbox = checkbox;
                notificationCheckbox.checked = false;
                switchBlocker.style.display = 'block';
              });
              notificationSelect.disabled = true;

              const isNotificationOpen = sessionStorage.getItem('subBlocked');
              if (!isNotificationOpen || isNotificationOpen !== 'true')
                alertModal.fire({
                  text:
                    '브라우저/기기 환경당 한 사용자만 알림 설정을 킬 수 있습니다. ' +
                    '만약 본인의 기기/브라우저 환경에서 이 알림이 떴다면 our42vent@gmail.com 으로 문의하세요.',
                  icon: 'warning',
                });
              sessionStorage.setItem('subBlocked', 'true');
            }
            isReqSuccessful = false;
          });
      }

      if (isReqSuccessful) {
        checkboxList.forEach(checkbox => {
          const notificationCheckbox = checkbox;
          notificationCheckbox.checked = true;
        });
        notificationSelect.disabled = false;
      }
    } else notificationSelect.disabled = true;
  }
}

async function changeNotificationListener(checked) {
  const notificationSelect = document.querySelector('#details-notification');

  if (!checked) {
    const registration = await navigator.serviceWorker.getRegistration();
    const subscription = await registration.pushManager.getSubscription();

    await subscription.unsubscribe();
    await api.delete('/push', { data: subscription });
    notificationSelect.disabled = true;
  } else {
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
      const err = new Error();
      err.permission = permission;
      throw err;
    }

    const registration = await navigator.serviceWorker.register('/serviceWorker.js', {
      scope: '/',
    });
    const subscription = await subscribePushService(registration);

    await api.post('/push', { subscription, isFirst: true });
    notificationSelect.disabled = false;
  }
}

function initNotificationSetting() {
  const chekboxLabelList = document.querySelectorAll('.notification-switch');
  const checkboxList = document.querySelectorAll('.notification-switch input');

  initNotificationCheckbox(checkboxList);
  chekboxLabelList.forEach(label =>
    label.addEventListener('click', e => {
      const switchBlocker = label.querySelector('.notification-switch-blocker');
      if (e.target !== switchBlocker) {
        const isChecked = label.firstElementChild.checked;

        checkboxList[0].checked = !isChecked;
        checkboxList[1].checked = !isChecked;
        switchBlocker.style.display = 'block';
        changeNotificationListener(!isChecked)
          .then(() => {
            switchBlocker.style.display = 'none';
          })
          .catch(err => {
            const switchBlocker = label.querySelector('.notification-switch-blocker');
            checkboxList[0].checked = false;
            checkboxList[1].checked = false;
            if (err.permission === 'denied')
              switchBlocker.addEventListener('click', () =>
                alertModal.fire({
                  text: '우리42벤트 사이트 알림 설정이 차단되어 있습니다. 브라우저 설정에서 차단을 해제해주세요.',
                  icon: 'warning',
                })
              );
            else switchBlocker.style.display = 'none';
            document.querySelector('#details-notification').disabled = true;
          });
      }
    })
  );
}

// 브라우저가 push messaging 을 지원하는지 확인하고 실행
if ('serviceWorker' in navigator && 'PushManager' in window) {
  initNotificationSetting();
} else {
  document.querySelectorAll('.notification-wrapper').forEach(slider => {
    const notificationSwitch = slider;
    notificationSwitch.style.display = 'none';
  });
}
