const userDropButton = document.querySelector('.user-drop-button');
const userDropContent = document.querySelector('.user-drop-content');
const userDropLogout = userDropContent.lastElementChild.firstElementChild;

userDropButton.addEventListener('click', () => {
  if (userDropContent.classList.contains('hidden')) {
    userDropButton.firstElementChild.style.color = 'var(--light_mint)';
  } else if (!userDropContent.classList.contains('hidden')) {
    userDropButton.firstElementChild.style.color = 'var(--white)';
  }
  userDropContent.classList.toggle('hidden');
});

userDropLogout.addEventListener('click', () => sessionStorage.clear());

window.addEventListener('click', event => {
  if (!event.target.matches('.user-drop-button, .user-username, .user-imageurl')) {
    if (!userDropContent.classList.contains('hidden')) {
      userDropContent.classList.toggle('hidden');
      userDropButton.firstElementChild.style.color = 'var(--white)';
    }
  }
});

const img = document.querySelector('.user-imageurl');

img.addEventListener('error', e => {
  e.target.src = '/assets/images/user_default.png';
  e.onerror = null;
});
