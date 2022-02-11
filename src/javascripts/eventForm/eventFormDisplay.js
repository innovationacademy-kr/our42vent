const createEventButtonArray = document.querySelectorAll('.create-event-button');

createEventButtonArray.forEach(item => {
  const createEventButton = item;

  createEventButton.addEventListener('click', () => {
    document.querySelector('.layout-form').style.display = 'grid';
    document.querySelector('.form-button-new').style.display = 'block';
    document.querySelector('.form-button-edit').style.display = 'none';
  });
});

const exitEventButton = document.querySelector('.form-button-exit');

exitEventButton.addEventListener('click', () => {
  document.querySelector('.layout-form').style.display = 'none';
});
