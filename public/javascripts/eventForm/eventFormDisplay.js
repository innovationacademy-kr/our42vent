const createEventButton = document.querySelector('.create-event-btn');

createEventButton.addEventListener('click', () => {
  document.querySelector('.layout-form').style.display = 'grid';
});

const exitEventButton = document.querySelector('.form-button-exit');

exitEventButton.addEventListener('click', () => {
  document.querySelector('.layout-form').style.display = 'none';
});
