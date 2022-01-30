import drawMonth from './drawMonth.js';

// resize 반응해서 기존 이벤트 슬롯 지우고 띠지 다시 렌더링
window.addEventListener('resize', drawMonth);
