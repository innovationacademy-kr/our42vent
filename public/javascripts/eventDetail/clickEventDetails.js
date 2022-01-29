import setCategoryName from './utils/setCategoryName.js';
import setDuration from './utils/setDuration.js';
import setRange from './utils/setRange.js';

// 띠지 클릭시, 해당 이벤트 상세 정보 select
async function getEventDetails(eventId) {
  const { data } = await axios.get(`/event/${eventId}`);
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
      `<div class="details-details-content">${details}</div>`;
    detailsElement.style.display = 'flex';
  } else {
    detailsElement.innerHTML = '';
    detailsElement.style.display = 'none';
  }
}

// 등록 여부에 따라 알림 & 버튼 설정
function fillButtonNotification(beginAt, endAt, isMyEvent, notification) {
  const [now, beginAtObj, endAtObj] = [new Date(), new Date(beginAt), new Date(endAt)];

  if (!isMyEvent && now > endAtObj) {
    document.querySelectorAll('.notification-button > *').forEach(child => {
      const childElem = child;
      childElem.style.display = 'none';
    });
    document.querySelector('.notification-button').style.height = '0px';
    return;
  }

  const notificationInfo = document.querySelector('.details-notification-info');
  let buttonClass = [];
  let notificationClass = [];

  document.querySelector('.notification-button').style.height = '';
  if (isMyEvent) {
    buttonClass = ['.details-myevent-button', '.details-cancel-button'];
    notificationClass = ['#details-notification', '.details-notification-info'];
    if (now > beginAtObj || notification === null) {
      notificationInfo.textContent = '';
    } else if (notification === 0) {
      notificationInfo.textContent = '이벤트 시작 시간 알림';
    } else {
      notificationInfo.textContent = `이벤트 ${notification}분 전 알림`;
    }
  } else {
    buttonClass = ['.details-cancel-button', '.details-myevent-button'];
    notificationClass = ['.details-notification-info', '#details-notification'];
  }

  document.querySelector(buttonClass[0]).style.display = 'none';
  document.querySelector(buttonClass[1]).style.display = 'block';
  document.querySelector(notificationClass[0]).style.display = 'none';
  document.querySelector(notificationClass[1]).style.display = 'block';
}

// 불러온 이벤트 상세정보를 각 항목에 입력
async function setEventDetails(eventId) {
  try {
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
    } = await getEventDetails(eventId);

    document.querySelector('.details-category').textContent = setCategoryName(category);
    document.querySelector('.details-title').textContent = title;

    const { duration, diffInDays } = setDuration(beginAt, endAt);
    document.querySelector('.details-range').textContent = setRange(beginAt, endAt, diffInDays);
    document.querySelector(
      '.details-duration'
    ).innerHTML = `<i class="material-icons"> schedule</i>&nbsp;&nbsp;${duration}`;

    document.querySelector(
      '.details-location'
    ).innerHTML = `<i class="material-icons">room</i>&nbsp;${location}`;
    fillPICTopicDetails(personInCharge, topic, details);
    fillButtonNotification(beginAt, endAt, isMyEvent, notification);

    // 알림 설정시, 다음 이벤트 상세보기에서 default로 원상복귀
    document.getElementById('details-notification').value = 'none';
  } catch (err) {
    // TODO 에러페이지 표시
    console.log(err.message);
  }
}

export default async function clickEventDetails() {
  // event-(id)로 시작하는 모든 element select
  const eventList = document.querySelectorAll('[class^=event-]');

  // 각각의 띠지에 클릭 이벤트리스너 설정
  eventList.forEach(event => {
    const eventId = event.classList[0].substring(6);
    const detailElement = document.querySelector('.layout-details');

    event.addEventListener('click', () => {
      setEventDetails(eventId);

      //  상세보기에 event-(id)를 id로 넣어줌 (나중에 my_event post할때 event id 필요)
      [detailElement.id] = event.classList;
      detailElement.style.display = 'grid';
    });
  });
}
