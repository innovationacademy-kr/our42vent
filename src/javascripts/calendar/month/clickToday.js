import { renderInfo, generateMonth } from './generateMonth.js';

const todayButton = document.querySelector('.header-today-button');

// today 버튼 클릭하면 현재 월 view 표시
todayButton.addEventListener('click', () => {
  const today = new Date();
  const thisMonth = `${today.getFullYear()}${today.getMonth()}`;

  if (sessionStorage.getItem('yearMonth') !== thisMonth) {
    sessionStorage.setItem('yearMonth', thisMonth);
    renderInfo[0] = generateMonth();
  }
});
