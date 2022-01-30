function resize(element) {
  const textarea = element;

  textarea.style.height = '1px';
  const vh = window.innerHeight / 100;
  if (textarea.scrollHeight > vh * 64) textarea.style.height = `64vh`;
  else textarea.style.height = `${textarea.scrollHeight + 12}px`;
}

export default function generatePromotion(event) {
  const { id, title, personInCharge, beginAt, endAt, location, topic, details } = event;
  const promotion =
    `${title}\n\n주제: ${topic}\n일시: ${beginAt.replace('T', ' ')} ~ ${endAt.replace('T', ' ')}` +
    `\n장소: ${location}\n발표자/담당자: ${personInCharge}\n\n${details}`;
  const url = `우리42벤트에서 확인하기 -> ${window.location.origin}/event/detail/${id}`;

  const promotionLayout = document.querySelector('.layout-promotion');
  promotionLayout.style.display = 'grid';
  const promotionTextBox = document.querySelector('.promotion-text');
  promotionTextBox.textContent = promotion;
  const promotionURL = document.querySelector('.promotion-url-text');
  promotionURL.textContent = url;
  resize(promotionTextBox);
}
