import { getFullDate, getFullTime } from '../utils/eventListUtils.js';
import { checkTime, checkByte } from '../eventForm/clickNewEventButton.js';

// DB에서 가져온 이벤트의 내용을 팝업에 채워줌
async function fillEventData(event) {
  const beginAt = `${getFullDate(new Date(event.beginAt).getTime())}T${getFullTime(
    new Date(event.beginAt).getTime()
  )}`;
  const endAt = `${getFullDate(new Date(event.endAt).getTime())}T${getFullTime(
    new Date(event.endAt).getTime()
  )}`;
  document.getElementById('event-title').value = event.title;
  document.getElementById('event-pic').value = event.personInCharge;
  document.getElementById('event-beginat').value = beginAt;
  document.getElementById('event-endat').value = endAt;
  document.getElementById('event-location').value = event.location;
  document.getElementById('event-category').value = event.category;
  document.getElementById('event-topic').value = event.topic;
  document.getElementById('event-details').value = event.details;
  document.querySelector('.form-button-new').style.display = 'none';
  document.querySelector('.form-button-edit').style.display = 'block';
  document.querySelector('.layout-form').style.display = 'grid';
}

// 수정한 이벤트를 DB에 업데이트
function putEditedEventData(eventId, formData) {
  if (
    checkByte('event-title', 256) &&
    checkByte('event-pic', 64) &&
    checkTime('event-beginat', '시작') &&
    checkTime('event-endat', '종료') &&
    checkByte('event-location', 256) &&
    checkByte('event-topic', 512) &&
    checkByte('event-details', 4096)
  ) {
    // TODO: 이벤트 생성 성공 / 실패 시 사용자에게 알림
    axios
      .put(`/event/list/edit/${eventId}`, formData)
      .then(() => {
        window.location.replace('/event/list');
      })
      .catch(err => console.error(err.stack));
  }
}

async function editEventListener(event) {
  const eventId = event.target.classList[1]; // class의 이름으로 부터 eventid를 받아옴
  const res = await axios.get(`/event/list/edit/${eventId}`, {
    headers: { 'Content-Type': 'application/json' },
  });
  await fillEventData(res.data);

  const editButton = document.querySelector('.form-button-edit');
  editButton.addEventListener('click', async () => {
    const formData = new FormData(document.querySelector('.form'));
    putEditedEventData(eventId, formData);
  });
}

//  수정 아이콘을 위한 이벤트 리스너 생성
export default function AddEditEventListener() {
  const editEventElementArray = document.querySelectorAll('.list-edit');

  editEventElementArray.forEach(eventElement =>
    eventElement.addEventListener('click', editEventListener)
  );
}
