import generatePromotion from '../eventPromotion/generatePromotion.js';

// 이벤트 상세보기에서 취소 및 공유 버튼 눌렀을 경우
export default function clickExitOrShareButton(eventParam, eventId) {
  const exitButton = document.querySelector('.details-exit-button');
  const shareButton = document.querySelector('.details-share-button');
  const detailsLayout = document.querySelector('.layout-details');
  const detailsPopup = document.querySelector('.details-content');

  // 이벤트 상세보기 팝업 밖에서 클릭시, 팝업 닫힘
  detailsLayout.addEventListener('click', event => {
    if (!detailsPopup.contains(event.target)) detailsLayout.style.display = 'none';
  });

  // ESC 누를 시, 이벤트 상세보기 팝업 닫힘
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') detailsLayout.style.display = 'none';
  });

  exitButton.addEventListener('click', () => {
    document.querySelector('.layout-details').style.display = 'none';
  });

  shareButton.addEventListener('click', () => {
    const event = eventParam;
    event.id = eventId;
    event.beginAt = new Date(event.beginAt).toISOString();
    event.endAt = new Date(event.endAt).toISOString();
    generatePromotion(event);
  });
}
