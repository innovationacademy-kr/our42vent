import generatePromotion from '../eventPromotion/generatePromotion.js';

// 이벤트 상세보기에서 취소 및 공유 버튼 눌렀을 경우
export default function clickExitOrShareButton(eventParam, eventId) {
  const exitButton = document.querySelector('.details-exit-button');
  const shareButton = document.querySelector('.details-share-button');
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
