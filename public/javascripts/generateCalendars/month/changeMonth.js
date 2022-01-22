import { renderInfo, generateMonth } from './generateMonth.js';

const titleYear = document.querySelector('.title-calendar-year');
const titleMonth = document.querySelector('.title-calendar-month');

// 다음 달 버튼 클릭하면 다음 달 달력 렌더링
const nextMonthButton = document.querySelector('.title-next');

nextMonthButton.addEventListener('click', () => {
  let yearParam = Number(titleYear.id.substring(5));
  let monthParam = Number(titleMonth.id.substring(6));

  if (monthParam === 11) {
    yearParam += 1;
    titleYear.id = `year-${yearParam}`;
    monthParam = 0;
  } else {
    monthParam += 1;
  }
  titleMonth.id = `month-${monthParam}`;
  renderInfo[0] = generateMonth();
});

// 이전 달 버튼 클릭하면 이전 달 달력 렌더링
const prevMonthButton = document.querySelector('.title-prev');

prevMonthButton.addEventListener('click', () => {
  let yearParam = Number(titleYear.id.substring(5));
  let monthParam = Number(titleMonth.id.substring(6));

  if (monthParam === 0) {
    yearParam -= 1;
    titleYear.id = `year-${yearParam}`;
    monthParam = 11;
  } else {
    monthParam -= 1;
  }
  titleMonth.id = `month-${monthParam}`;
  renderInfo[0] = generateMonth();
});
