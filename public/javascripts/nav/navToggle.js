const toggleDiv = document.querySelector('.toggle-icon');
const navTag = document.querySelector('nav');
const mainTag = document.querySelector('main');
console.log(toggleDiv, navTag, mainTag);

toggleDiv.addEventListener('click', () => {
  toggleDiv.classList.toggle('change');
  navTag.classList.toggle('change');
});

mainTag.addEventListener('click', () => {
  if (!'change'.localeCompare(navTag.classList[0])) {
    toggleDiv.classList.toggle('change');
    navTag.classList.toggle('change');
  }
});
