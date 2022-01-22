import { alertModal, confirmModal } from '../utils/sweetAlertMixin.js';

function deleteEventListener(event) {
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
        .catch(err => {
          alertModal.fire({ title: '오류가 발생하였습니다.', icon: 'error' });
          console.error(err.stack);
        });
    }
  });
}

// 삭제 아이콘에 이벤트 할당
export default function addDeleteEventListener() {
  const deleteEventElementArray = document.querySelectorAll('.list-delete');
  deleteEventElementArray.forEach(eventElement =>
    eventElement.addEventListener('click', deleteEventListener)
  );
}
