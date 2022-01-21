export default function deleteEventListener() {
  const deleteElementArray = document.querySelectorAll('.list-delete');
  deleteElementArray.forEach(eventElement =>
    eventElement.addEventListener('click', event => {
      const eventId = event.target.classList[1]; // class의 이름으로 부터 eventid를 받아옴
      Swal.fire({
        title: '삭제 하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '예',
        cancelButtonText: '아니요',
      }).then(result => {
        if (result.isConfirmed) {
          axios
            .delete('/event/list/delete', { data: { eventId } })
            .then(() => {
              Swal.fire('삭제되었습니다!', '', 'success').then(() =>
                window.location.replace('/event/list/')
              );
            })
            .catch(err => console.log(err.stack));
        }
      });
    })
  );
}
