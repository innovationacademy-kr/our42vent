import setCategoryName from './utils/setCategoryName.js';
import setBeginAt from './utils/setBeginAt.js';
import setDuration from './utils/setDuration.js';

// 띠지 클릭시, 해당 이벤트 상세 정보 select
async function getEventDetails(eventId) {
  try {
    const res = await axios.get(`/event/${eventId}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res.data;
  } catch (err) {
    return err;
  }
}

// 불러온 이벤트 상세정보를 각 항목에 입력
async function setEventDetails(eventId) {
  try {
    const { title, personInCharge, beginAt, endAt, location, category, topic, details } =
      await getEventDetails(eventId);

    document.querySelector('.details-category').textContent = setCategoryName(category);
    document.querySelector('.details-title').textContent = title;
    document.querySelector('.details-beginat').textContent = setBeginAt(beginAt);

    document.querySelector(
      '.details-duration'
    ).innerHTML = `<i class="material-icons"> schedule</i>&nbsp;&nbsp;${setDuration(
      beginAt,
      endAt
    )}`;

    document.querySelector(
      '.details-location'
    ).innerHTML = `<i class="material-icons">room</i>&nbsp;${location}`;

    // personInCharge 내용이 있냐 없냐에 따라 div 추가 / 제거
    const picElement = document.querySelector('.details-pic');

    if (personInCharge !== '' && personInCharge !== null) {
      picElement.innerHTML =
        `<span class="details-pic-label text-bold">` +
        ` 발표자 / 담당자&nbsp;&nbsp;:</span>&nbsp;&nbsp;${personInCharge}`;
      picElement.style.display = 'flex';
    } else {
      picElement.innerHTML = '';
      picElement.style.display = 'none';
    }

    document.querySelector(
      '.details-topic'
    ).innerHTML = `<div class="details-topic-label text-bold">주제</div>${topic}`;

    // details 내용이 있냐 없냐에 따라 div 추가 / 제거
    const detailsElement = document.querySelector('.details-details');
    if (details !== '' && details !== null) {
      detailsElement.innerHTML = `<div class="details-details-label text-bold">상세정보</div>${details}`;
      detailsElement.style.display = 'grid';
    } else {
      detailsElement.innerHTML = '';
      detailsElement.style.display = 'none';
    }

    // 알림 설정시, 다음 이벤트 상세보기에서 default로 원상복귀
    document.getElementById('details-notification').value = 'none';
  } catch (err) {
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

      // 상세보기에 event-(id)를 id로 넣어줌
      // (나중에 my_event post할때 event id 필요)
      detailElement.id = event.classList[0];
      detailElement.style.display = 'grid';
    });
  });
}
