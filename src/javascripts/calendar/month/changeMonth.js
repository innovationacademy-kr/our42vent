import { renderInfo, generateMonth } from './generateMonth.js';

// 다음 달 버튼 클릭하면 다음 달 달력 렌더링
const nextMonthButton = document.querySelector('.title-next');

nextMonthButton.addEventListener('click', () => {
  const prevYearMonth = sessionStorage.getItem('yearMonth');
  let yearParam = Number(prevYearMonth.slice(0, 4));
  let monthParam = Number(prevYearMonth.substring(4));

  if (monthParam === 11) {
    yearParam += 1;
    monthParam = 0;
  } else {
    monthParam += 1;
  }
  sessionStorage.setItem('yearMonth', `${yearParam}${monthParam}`);
  renderInfo[0] = generateMonth();
});

// 이전 달 버튼 클릭하면 이전 달 달력 렌더링
const prevMonthButton = document.querySelector('.title-prev');

prevMonthButton.addEventListener('click', () => {
  const prevYearMonth = sessionStorage.getItem('yearMonth');
  let yearParam = Number(prevYearMonth.slice(0, 4));
  let monthParam = Number(prevYearMonth.substring(4));

  if (monthParam === 0) {
    yearParam -= 1;
    monthParam = 11;
  } else {
    monthParam -= 1;
  }
  sessionStorage.setItem('yearMonth', `${yearParam}${monthParam}`);
  renderInfo[0] = generateMonth();
});
