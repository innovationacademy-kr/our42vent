const beginAt = document.getElementById('event-beginat');
const endAt = document.getElementById('event-endat');

beginAt.addEventListener('click', () => {
  beginAt.max = endAt.value;
  return endAt.vaule;
});

endAt.addEventListener('click', () => {
  endAt.min = beginAt.value;
  return beginAt.value;
});
