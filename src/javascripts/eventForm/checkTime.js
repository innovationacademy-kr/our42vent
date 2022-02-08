const beginAt = document.getElementById('event-beginat');
const endAt = document.getElementById('event-endat');

function checkBeginAt() {
  if (endAt.value !== '') beginAt.max = endAt.value;
}

function checkEndAt() {
  if (beginAt.value !== '') endAt.min = beginAt.value;
}

beginAt.addEventListener('click', checkBeginAt);

endAt.addEventListener('click', checkEndAt);
