import { alertModal } from '../utils/sweetAlertMixin.js';
import isValidEventForm from '../utils/isValidEventForm.js';

// 이벤트 생성 버튼 입력전, 모든 항목 입력 완료시 이벤트 생성 post 요청
function clickNewEventButton() {
  if (isValidEventForm()) {
    const formData = new FormData(document.querySelector('.form'));

    axios
      .post('/event', formData)
      .then(() => {
        alertModal
          .fire({ title: '이벤트가 생성되었습니다.', icon: 'success' })
          .then(() => window.location.replace(window.location.pathname));
      })
      .catch(err => {
        alertModal.fire({ title: '오류가 발생하였습니다.', icon: 'error' });
        console.log(err.stack);
      });
  }
}

const newEventButton = document.querySelector('.form-button-new');
newEventButton.addEventListener('click', clickNewEventButton);
