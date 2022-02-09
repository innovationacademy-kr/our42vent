const userDropButton = document.querySelector('.user-drop-button');
const userDropContent = document.querySelector('.user-drop-content');
const userDropLogout = userDropContent.firstElementChild.nextElementSibling.firstElementChild;

userDropButton.addEventListener('click', () => {
  if (userDropContent.classList.contains('hidden'))
    userDropButton.firstElementChild.style.color = 'var(--light_mint)';
  else if (!userDropContent.classList.contains('hidden'))
    userDropButton.firstElementChild.style.color = 'var(--white)';

  userDropContent.classList.toggle('hidden');
});

userDropLogout.addEventListener('click', () => sessionStorage.clear());

document.body.addEventListener('click', e => {
  if (!userDropButton.contains(e.target) && !userDropContent.contains(e.target)) {
    if (!userDropContent.classList.contains('hidden')) {
      userDropContent.classList.toggle('hidden');
      userDropButton.firstElementChild.style.color = 'var(--white)';
    }
  }
});
