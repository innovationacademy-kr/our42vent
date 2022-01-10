const userDropButton = document.querySelector('.user-drop-button');
const userDropContent = document.querySelector('.user-drop-content');

userDropButton.addEventListener('click', () => {
  if (userDropContent.classList.contains('hidden')) {
    userDropButton.firstElementChild.style.color = 'var(--light_mint)';
  } else if (!userDropContent.classList.contains('hidden')) {
    userDropButton.firstElementChild.style.color = 'var(--white)';
  }
  userDropContent.classList.toggle('hidden');
});

window.addEventListener('click', event => {
  if (!event.target.matches('.user-drop-button, .user-username, .user-imageurl')) {
    if (!userDropContent.classList.contains('hidden')) {
      userDropContent.classList.toggle('hidden');
      userDropButton.firstElementChild.style.color = 'var(--white)';
    }
  }
});
