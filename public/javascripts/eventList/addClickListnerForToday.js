import { createElementAddClass } from '../utils/domNodeUtils.js';

export default function addClickListnerForToday(eventListSection, scrollOffset) {
  const todayButton = document.querySelector('.header-today-button');
  todayButton.addEventListener('click', () => {
    eventListSection.scrollTo({ top: scrollOffset, behavior: 'smooth' });
  });

  //  FIXME: 나중에 month에서 Today-hover 만드는 것과 합쳐야함
  if (navigator.maxTouchPoints === 0) {
    todayButton.addEventListener('mousemove', e => {
      const prevSVGWrapper = document.querySelector('.today-svg');
      if (prevSVGWrapper) prevSVGWrapper.remove();

      const today = new Date();
      const SVGWrapper = document.body.appendChild(createElementAddClass('div', ['today-svg']));

      const boxWidth = 109;
      SVGWrapper.innerHTML =
        `<svg width="${boxWidth}" height="23" viewBox="0 0 ${boxWidth} 23" fill="none"` +
        `xmlns="http://www.w3.org/2000/svg"><rect x="${boxWidth}" y="22.0771" width="${boxWidth}" height="22"` +
        `rx="3" transform="rotate(-180 ${boxWidth} 22.0771)" fill="black" fill-opacity="0.7"/><text x="8"` +
        `y="14" fill="#fff" width="${boxWidth}" height="26" font-family="sans-serif" font-size="11">` +
        `오늘 ${today.getFullYear()}년 ${
          today.getMonth() + 1
        }월  ${today.getDate()}일</text></svg>`;
      SVGWrapper.style.left = `${e.clientX - boxWidth + 2}`;
      SVGWrapper.style.top = `${e.clientY + 12 + window.scrollY}`;
    });

    todayButton.addEventListener('mouseleave', () => {
      const prevSVGWrapper = document.querySelector('.today-svg');
      if (prevSVGWrapper) prevSVGWrapper.remove();
    });
  }
}
