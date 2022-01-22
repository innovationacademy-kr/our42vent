function deleteEventListener(event) {
  const eventId = event.target.classList[1]; // class의 이름으로 부터 eventId를 받아옴
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
        .catch(err => console.error(err.stack));
    }
  });
}

export default function addDeleteEventListener() {
  const deleteEventElementArray = document.querySelectorAll('.list-delete');
  deleteEventElementArray.forEach(eventElement =>
    eventElement.addEventListener('click', deleteEventListener)
  );
}
