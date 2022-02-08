import { alertModal, confirmModal } from '../utils/sweetAlertMixin.js';
import generatePromotion from '../eventPromotion/generatePromotion.js';
import isValidEventForm from '../utils/eventForm/isValidEventForm.js';

// 이벤트 생성 버튼 입력전, 모든 항목 입력 완료시 이벤트 생성 post 요청
function clickNewEventButton() {
  if (isValidEventForm()) {
    const form = document.querySelector('.form');
    const formData = new FormData(form);

    axios
      .post('/event', formData)
      .then(res => {
        confirmModal
          .fire({
            title: '이벤트가 생성되었습니다.',
            icon: 'success',
            confirmButtonText: '홍보글 생성',
            cancelButtonText: '닫기',
          })
          .then(result => {
            if (result.isConfirmed) {
              form.reset();
              form.parentNode.style.display = 'none'; // 이벤트 생성 폼 삭제
              generatePromotion(res.data);
            } else {
              window.location.replace(window.location.pathname);
            }
          });
      })
      .catch(err => {
        alertModal.fire({ title: '오류가 발생하였습니다.', icon: 'error' });
        console.log(err.stack);
      });
  }
}

const newEventButton = document.querySelector('.form-button-new');
newEventButton.addEventListener('click', clickNewEventButton);
