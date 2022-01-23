import { alertModal, confirmModal } from '../utils/sweetAlertMixin.js';

function deleteEvent(event) {
  const eventId = event.target.classList[0]; // class의 이름으로 부터 eventId를 받아옴
  confirmModal.fire({ title: '삭제 하시겠습니까?', icon: 'warning' }).then(result => {
    if (result.isConfirmed) {
      axios
        .delete(`/event/${eventId}`)
        .then(() => {
          alertModal
            .fire({ title: '삭제되었습니다!', icon: 'success' })
            .then(() => window.location.replace('/event/list/'));
        })
        .catch(() => {
          alertModal.fire({ title: '오류가 발생하였습니다.', icon: 'error' });
          //   TODO : 적절한 에러 핸들링 필요
          window.location.replace('/event/list');
        });
    }
  });
}

// 삭제 아이콘에 이벤트 할당
export default function addClickListenerForDelete() {
  const deleteButtonElementArray = document.querySelectorAll('.list-delete');
  deleteButtonElementArray.forEach(eventElement =>
    eventElement.addEventListener('click', deleteEvent)
  );
}
