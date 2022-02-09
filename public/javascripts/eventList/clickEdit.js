import api from '../utils/createAxiosInterceptor.js';
import isValidEventForm from '../utils/eventForm/isValidEventForm.js';
import { getFullDate, getFullTime } from './parseDate.js';
import { alertModal } from '../utils/sweetAlertMixin.js';

// DB에서 가져온 이벤트의 내용을 팝업에 채워줌
function fillEventForm(event) {
  const { title, personInCharge, location, category, topic, details } = event;
  const beginAt = `${getFullDate(new Date(event.beginAt).getTime())}T${getFullTime(
    new Date(event.beginAt).getTime()
  )}`;
  const endAt = `${getFullDate(new Date(event.endAt).getTime())}T${getFullTime(
    new Date(event.endAt).getTime()
  )}`;

  document.getElementById('event-title').value = title;
  document.getElementById('event-pic').value = personInCharge;
  document.getElementById('event-beginat').value = beginAt;
  document.getElementById('event-endat').value = endAt;
  document.getElementById('event-location').value = location;
  document.getElementById('event-category').value = category;
  document.getElementById('event-topic').value = topic;
  document.getElementById('event-details').value = details;
  document.querySelector('.form-button-new').style.display = 'none';
  document.querySelector('.form-button-edit').style.display = 'block';
  document.querySelector('.layout-form').style.display = 'grid';
}

// 수정한 이벤트를 DB에 업데이트
function putEditedEventData(eventId, formData) {
  if (isValidEventForm()) {
    api
      .put(`/event/${eventId}`, formData)
      .then(() => {
        alertModal
          .fire({ title: '수정이 완료되었습니다.', icon: 'success' })
          .then(() => window.location.replace('/event/list'));
      })
      .catch(err => alertModal.fire({ title: '오류가 발생하였습니다.', icon: 'error' }));
  }
}

async function editEventListener(event) {
  const eventId = event.target.classList[0]; // class의 이름으로 부터 eventid를 받아옴
  try {
    const data = await api.get(`/event/${eventId}`);

    fillEventForm(data);
  } catch (err) {
    window.location.replace('/event/list');
  }

  const editButton = document.querySelector('.form-button-edit');
  editButton.addEventListener('click', async () => {
    const formData = new FormData(document.querySelector('.form'));
    putEditedEventData(eventId, formData);
  });
}

//  수정 아이콘에 이벤트 할당
export default function clickEdit(eventListSection) {
  const editEventElementArray = eventListSection.querySelectorAll('.list-edit');

  editEventElementArray.forEach(eventElement =>
    eventElement.addEventListener('click', editEventListener)
  );
}
