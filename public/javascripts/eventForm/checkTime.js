function checkBeginatTime() {
  let beginAt = document.getElementById('event-beginat');
  let endAt = document.getElementById('event-endat');

  endAt.min = beginAt.value;
}

function checkEndatTime() {
  let beginAt = document.getElementById('event-beginat');
  let endAt = document.getElementById('event-endat');

  beginAt.max = endAt.value;
}
