const userDropButton = document.querySelector('.user-drop-button');
const userDropContent = document.querySelector('.user-drop-content');

userDropButton.addEventListener('click', () => {
  if (userDropContent.style.display === '') {
    userDropContent.style.display = 'block';
    userDropButton.firstElementChild.style.color = 'var(--light_mint)';
  } else if (userDropContent.style.display === 'block') {
    userDropContent.style.display = '';
    userDropButton.firstElementChild.style.color = 'var(--white)';
  }
});

window.addEventListener('click', event => {
  if (!event.target.matches('.user-drop-button, .user-username, .user-imageurl')) {
    if (userDropContent.style.display === 'block') {
      userDropContent.style.display = '';
      userDropButton.firstElementChild.style.color = 'var(--white)';
    }
  }
});
