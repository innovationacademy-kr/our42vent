function adjustNameSize() {
  const username = document.querySelector('.user-username');
  if (username.textContent.length > 7) {
    username.style.fontSize = '.87em';
  }
}

adjustNameSize();
