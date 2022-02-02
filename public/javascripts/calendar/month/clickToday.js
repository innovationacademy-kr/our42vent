import { renderInfo, generateMonth } from './generateMonth.js';
import { createElementAddClass } from '../../utils/domNodeUtils.js';

const todayButton = document.querySelector('.header-today-button');
const today = new Date();

// today 버튼 클릭하면 현재 월 view 표시
todayButton.addEventListener('click', () => {
  const thisMonth = `${today.getFullYear()}${today.getMonth()}`;

  if (sessionStorage.getItem('yearMonth') !== thisMonth) {
    sessionStorage.setItem('yearMonth', thisMonth);
    renderInfo[0] = generateMonth();
  }
});

// TODAY 버튼 호버하면 오늘 날짜 표시
todayButton.addEventListener('pointermove', e => {
  if (e.pointerType === 'touch') return;
  const prevSVGWrapper = document.querySelector('.today-svg');
  if (prevSVGWrapper) prevSVGWrapper.remove();

  const today = new Date();
  const SVGWrapper = document.body.appendChild(createElementAddClass('div', ['today-svg']));

  const boxWidth = 109;
  SVGWrapper.innerHTML =
    `<svg width="${boxWidth}" height="23" viewBox="0 0 ${boxWidth} 23" fill="none"` +
    `xmlns="http://www.w3.org/2000/svg"><rect x="${boxWidth}" y="22.0771" width="${boxWidth}" height="22"` +
    `rx="3" transform="rotate(-180 ${boxWidth} 22.0771)" fill="black" fill-opacity="0.7"/><text x="8"` +
    `y="14" fill="#fff" width="${boxWidth}" height="26" font-family="'Noto Sans KR', sans-serif" font-size="11">` +
    `오늘 ${today.getFullYear()}년 ${today.getMonth() + 1}월  ${today.getDate()}일</text></svg>`;
  SVGWrapper.style.left = `${e.clientX - boxWidth + 2}`;
  SVGWrapper.style.top = `${e.clientY + 12 + window.scrollY}`;
});

todayButton.addEventListener('pointerleave', e => {
  if (e.pointerType === 'touch') return;
  const prevSVGWrapper = document.querySelector('.today-svg');
  if (prevSVGWrapper) prevSVGWrapper.remove();
});
