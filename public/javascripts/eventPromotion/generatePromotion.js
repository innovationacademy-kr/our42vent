import setDuration from '../eventDetail/utils/setDuration.js';
import setRange from '../eventDetail/utils/setRange.js';

function resize(element) {
  const textarea = element;

  textarea.style.height = '1px';
  textarea.style.height = `${textarea.scrollHeight}px`;
}

export default function generatePromotion(event) {
  const { id, title, personInCharge, beginAt, endAt, location, topic, details } = event;
  const { diffInDays } = setDuration(beginAt, endAt);
  let promotion = `${title}\n\n주제: ${topic}\n일시: ${setRange(
    beginAt,
    endAt,
    diffInDays
  )}\n장소: ${location}`;
  if (personInCharge) promotion += `\n발표자/담당자: ${personInCharge}`;
  if (details) promotion += `\n\n${details}`;

  const url = `우리42벤트에서 확인하기 -> ${window.location.origin}/event/info/${id}`;

  const promotionLayout = document.querySelector('.layout-promotion');
  promotionLayout.style.display = 'grid';
  const promotionTextBox = document.querySelector('.promotion-text');
  promotionTextBox.textContent = promotion;
  const promotionURL = document.querySelector('.promotion-url-text');
  promotionURL.textContent = url;
  resize(promotionTextBox);
}
