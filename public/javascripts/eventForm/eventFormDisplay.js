const createEventButton = document.querySelector('.create-event-btn');

function handleButtonClick() {
  const eventForm = document.querySelector('.layout-form');
  eventForm.style.display = 'grid';
  // window.addEventListener('click', event => {
  //   if (
  //     eventForm.style.display === 'grid' &&
  //     !document.querySelector('.form').contains(event.target)
  //   ) {
  //     eventForm.style.display = 'none';
  //   }
  // });
}

createEventButton.addEventListener('click', handleButtonClick);
