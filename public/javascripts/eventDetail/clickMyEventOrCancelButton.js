// '내 이벤트로 등록' 클릭시, my_event insert
const myEventButton = document.querySelector('.details-myevent-button');

myEventButton.addEventListener('click', () => {
  const notification = document.getElementById('details-notification').value;
  const detailsElement = document.querySelector('.layout-details');
  const eventId = detailsElement.id.substring(6);

  axios
    .post(`/event/myevent/${eventId}`, { notification })
    .then(res => {
      // TODO : 이벤트 등록 알림 모달 창
      detailsElement.style.display = 'none';
    })
    .catch(err => {
      // TODO : client side 에러핸들링
      console.log(err.message);
    });
});

const cancelButton = document.querySelector('.details-cancel-button');

cancelButton.addEventListener('click', () => {
  const detailsElement = document.querySelector('.layout-details');
  const eventId = detailsElement.id.substring(6);

  axios
    .delete(`/event/myevent/${eventId}`)
    .then(res => {
      // TODO : 이벤트 등록 취소 알림 모달 창
      detailsElement.style.display = 'none';
    })
    .catch(err => {
      // TODO : client side 에러핸들링
      console.log(err.message);
    });
});