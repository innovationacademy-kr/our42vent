import { clickEventDetails } from '../../eventDetail/clickEventDetails.js';
import { createElementAddClass } from '../../utils/domNodeUtils.js';

// 업데이트 된 DOM에 적용되는 eventlisteners
export default function addListenersAfterRender(allEvents) {
  loadMore();
  highlightHoveredMultiLabel();
  /**
   * TODO: navigator.maxTouchPoints === 0 로 touch screen 을 걸러주는데
   * 터치 스크린 랩탑도 걸러져서 개선이 필요합니다.
   */
  if (navigator.maxTouchPoints === 0) showBeginAt(allEvents);
  clickEventDetails();
}

// more 버튼 눌렀을 때 more 박스 표시
function loadMore() {
  const moreButtonList = document.querySelectorAll('.month-more-button');
  moreButtonList.forEach(moreButton => {
    const moreContentDiv = moreButton.parentElement.querySelector('.month-more');
    moreButton.addEventListener('click', () => {
      moreContentDiv.style.display = 'grid';
    });

    document.addEventListener('click', e => {
      if (e.target !== moreButton && !moreContentDiv.contains(e.target))
        moreContentDiv.style.display = 'none';
    });
  });
}

// 연일 띠지 호버 시 shadow 적용
function highlightHoveredMultiLabel() {
  const multiLabelNodeList = document.querySelectorAll('.month-label-multi, .month-label-end');

  multiLabelNodeList.forEach(multiLabelNode => {
    const curMultiLabelsNodeList = document.querySelectorAll(`.${multiLabelNode.classList[0]}`);
    curMultiLabelsNodeList.forEach(curLabel => {
      const curMultiLabel = curLabel;
      multiLabelNode.addEventListener('mouseenter', () => {
        curMultiLabel.style.boxShadow = '1px 1px 1px var(--dark_grey)';
      });
      multiLabelNode.addEventListener('mouseleave', () => {
        curMultiLabel.style.boxShadow = 'none';
      });
    });
  });
}

// 시작 시간 표시
function showBeginAt(allEvents) {
  const labelsNodeList = document.querySelectorAll(
    '.month-label-single, .month-label-multi, .month-label-end'
  );

  labelsNodeList.forEach(label => {
    label.addEventListener('mousemove', e => {
      const prevSVGWrapper = document.querySelector('.beginat-svg');
      if (prevSVGWrapper) prevSVGWrapper.remove();

      const { beginAt, isMulti } = allEvents.find(
        event => event.id === Number(label.classList[0].substring(9))
      );

      const beginAtKST = new Date(new Date(beginAt).getTime() + 3.24e7).toISOString();
      const SVGWrapper = document.body.appendChild(createElementAddClass('div', ['beginat-svg']));
      const startTime = isMulti
        ? `${beginAtKST.slice(5, 7)}/${beginAtKST.slice(8, 10)} ${beginAtKST.slice(11, 16)}`
        : beginAtKST.slice(11, 16);
      const boxWidth = isMulti ? 70 : 40;
      SVGWrapper.innerHTML =
        `<svg width="${boxWidth}" height="23" viewBox="0 0 ${boxWidth} 23" fill="none"` +
        `xmlns="http://www.w3.org/2000/svg"><rect x="${boxWidth}" y="22.0771" width="${boxWidth}" height="22"` +
        `rx="3" transform="rotate(-180 ${boxWidth} 22.0771)" fill="black" fill-opacity="0.7"/><text x="8"` +
        `y="14" fill="#fff" width="${boxWidth}" height="26" font-family="'Noto Sans KR', sans-serif" font-size="11">` +
        `${startTime}</text></svg>`;
      SVGWrapper.style.left = `${e.clientX - boxWidth + 2}`;
      SVGWrapper.style.top = `${e.clientY + 12 + window.scrollY}`;
    });

    label.addEventListener('mouseleave', () => {
      const prevSVGWrapper = document.querySelector('.beginat-svg');
      if (prevSVGWrapper) prevSVGWrapper.remove();
    });
  });
}
