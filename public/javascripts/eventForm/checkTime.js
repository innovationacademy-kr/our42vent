const beginAt = document.getElementById('event-beginat');
const endAt = document.getElementById('event-endat');

function checkBeginAt() {
  beginAt.max = endAt.value;
}

function checkEndAt() {
  endAt.min = beginAt.value;
}

beginAt.addEventListener('click', checkBeginAt);

endAt.addEventListener('click', checkEndAt);
