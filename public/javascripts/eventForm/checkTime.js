const beginAt = document.getElementById('event-beginat');
const endAt = document.getElementById('event-endat');

beginAt.addEventListener('click', () => (beginAt.max = endAt.value));

endAt.addEventListener('click', () => (endAt.min = beginAt.value));
