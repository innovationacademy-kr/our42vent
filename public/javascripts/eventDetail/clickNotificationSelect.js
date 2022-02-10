import { createElementAddClass } from '../utils/domNodeUtils.js';

const notificationSelect = document.getElementById('details-notification');

// 알림 설정 꺼져있을 때 이벤트 상세정보 창에서 알림 설정 select 호버하면 팝업으로 안내
notificationSelect.addEventListener('pointermove', e => {
  if (e.pointerType === 'touch' || !notificationSelect.disabled) return;
  const prevSVGWrapper = document.querySelector('.notification-alert-svg');
  if (prevSVGWrapper) prevSVGWrapper.remove();

  const SVGWrapper = document.body.appendChild(
    createElementAddClass('div', ['notification-alert-svg'])
  );
  SVGWrapper.innerHTML =
    `<svg width="${130}" height="23" viewBox="0 0 ${130} 23" fill="none"` +
    `xmlns="http://www.w3.org/2000/svg"><rect x="${130}" y="22.0771" width="${130}" height="22"` +
    `rx="3" transform="rotate(-180 ${130} 22.0771)" fill="black" fill-opacity="0.7"/><text x="8"` +
    `y="14" fill="#fff" width="${130}" height="26" font-family="'Noto Sans KR', sans-serif" ` +
    `font-size="11">알림 설정이 꺼져있습니다</text></svg>`;
  SVGWrapper.style.left = `${e.clientX - 134}`;
  SVGWrapper.style.top = `${e.clientY - 28 + window.scrollY}`;
});

notificationSelect.addEventListener('pointerleave', e => {
  if (e.pointerType === 'touch' || !notificationSelect.disabled) return;
  const prevSVGWrapper = document.querySelector('.notification-alert-svg');
  if (prevSVGWrapper) prevSVGWrapper.remove();
});
