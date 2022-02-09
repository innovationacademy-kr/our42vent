import clickExitOrShareButton from './clickExitOrShareButton.js';
import api from '../utils/createAxiosInterceptor.js';
import replaceToHyperlink from './utils/replaceToHyperlink.js';
import setCategoryName from './utils/setCategoryName.js';
import setDuration from './utils/setDuration.js';
import setRange from './utils/setRange.js';
import { alertModal } from '../utils/sweetAlertMixin.js';

// 띠지 클릭시, 해당 이벤트 상세 정보 select
async function getEventDetails(eventId) {
  const data = await api.get(`/event/${eventId}`).catch(err => {
    alertModal.fire({ title: '오류가 발생하였습니다.', icon: 'error' }).then(() => {
      throw err;
    });
  });
  return data;
}

// pic & topic & details 입력
function fillPICTopicDetails(personInCharge, topic, details) {
  // personInCharge 내용이 있냐 없냐에 따라 div 추가 / 제거
  const picElement = document.querySelector('.details-pic');

  if (personInCharge !== '' && personInCharge !== null) {
    picElement.innerHTML =
      `<span class="details-pic-label text-bold">` +
      `발표자 / 담당자&nbsp;&nbsp;:</span>&nbsp;&nbsp;${personInCharge}`;
    picElement.style.display = 'flex';
  } else {
    picElement.innerHTML = '';
    picElement.style.display = 'none';
  }

  // topic 내용 div 추가
  document.querySelector('.details-topic').innerHTML =
    '<div class="details-topic-label text-bold">주제</div>' +
    `<div class="details-topic-content">${topic}</div>`;

  // details 내용이 있냐 없냐에 따라 div 추가 / 제거
  const detailsElement = document.querySelector('.details-details');
  if (details !== '' && details !== null) {
    detailsElement.innerHTML =
      '<div class="details-details-label text-bold">상세정보</div>' +
      `<div class="details-details-content">${replaceToHyperlink(details)}</div>`;
    detailsElement.style.display = 'flex';
  } else {
    detailsElement.innerHTML = '';
    detailsElement.style.display = 'none';
  }
}

// 등록 여부에 따라 알림 & 버튼 설정
function fillButtonNotification(beginAt, endAt, isMyEvent, notification) {
  const [now, beginAtObj, endAtObj] = [new Date(), new Date(beginAt), new Date(endAt)];
  const notificationButtonRow = document.querySelector('.notification-button');

  if (now > endAtObj) {
    document.querySelectorAll('.notification-button > *').forEach(child => {
      const childElem = child;
      childElem.style.display = 'none';
    });
    notificationButtonRow.style.height = '0px';
    return;
  }

  notificationButtonRow.style.height = '';
  notificationButtonRow.style.flexDirection = '';

  const buttonClass = isMyEvent
    ? ['.details-myevent-button', '.details-cancel-button']
    : ['.details-cancel-button', '.details-myevent-button'];
  document.querySelector(buttonClass[0]).style.display = 'none';
  document.querySelector(buttonClass[1]).style.display = 'block';

  if ('serviceWorker' in navigator && 'PushManager' in window && now < beginAtObj) {
    const notificationInfo = document.querySelector('.details-notification-info');
    let notificationClass = ['.details-notification-info', '#details-notification'];

    if (isMyEvent) {
      notificationClass = ['#details-notification', '.details-notification-info'];
      if (now > beginAtObj || notification === null) notificationInfo.textContent = '';
      else if (notification === 0) notificationInfo.textContent = '이벤트 시작 시간 알림';
      else notificationInfo.textContent = `이벤트 ${notification}분 전 알림`;
    }

    document.querySelector(notificationClass[0]).style.display = 'none';
    document.querySelector(notificationClass[1]).style.display = 'block';
  } else {
    document.querySelector('#details-notification').style.display = 'none';
    document.querySelector('.details-notification-info').style.display = 'none';
    notificationButtonRow.style.flexDirection = 'row-reverse';
  }
}

// 불러온 이벤트 상세정보를 각 항목에 입력
export async function setEventDetails(eventId) {
  const event = await getEventDetails(eventId);

  const {
    title,
    personInCharge,
    beginAt,
    endAt,
    location,
    category,
    topic,
    details,
    isMyEvent,
    notification,
  } = event;
  document.querySelector('.details-category').textContent = setCategoryName(category);
  document.querySelector('.details-title').textContent = title;

  const { duration, diffInDays } = setDuration(beginAt, endAt);
  document.querySelector('.details-range').textContent = setRange(beginAt, endAt, diffInDays);
  document.querySelector(
    '.details-duration'
  ).innerHTML = `<i class="material-icons"> schedule</i>&nbsp;&nbsp;${duration}`;

  document.querySelector(
    '.details-location'
  ).innerHTML = `<i class="material-icons">room</i>&nbsp;${replaceToHyperlink(location)}`;
  fillPICTopicDetails(personInCharge, topic, details);
  fillButtonNotification(beginAt, endAt, isMyEvent, notification);
  clickExitOrShareButton(event, eventId);

  // 알림 설정시, 다음 이벤트 상세보기에서 default로 원상복귀
  document.getElementById('details-notification').value = 'none';
}

export async function clickEventDetails() {
  // _eventId-(id)로 시작하는 모든 element select
  const eventList = document.querySelectorAll('[class^=_eventId-]');

  // 각각의 띠지에 클릭 이벤트리스너 설정
  eventList.forEach(event => {
    const eventId = event.classList[0].substring(9);
    const detailElement = document.querySelector('.layout-details');

    event.addEventListener('click', async () => {
      await setEventDetails(eventId);

      //  상세보기에 eventId를 id로 넣어줌 (나중에 my_event post할때 event id 필요)
      [detailElement.id] = event.classList;
      detailElement.style.display = 'grid';
    });
  });
}
