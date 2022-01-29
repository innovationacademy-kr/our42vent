export default function generatePromotion(event) {
  const { id, title, personInCharge, beginAt, endAt, location, topic, details } = event;
  const promotion =
    `${title}\n주제: ${topic}\n일시: ${beginAt} ~ ${endAt}` +
    `\n장소: ${location}\n발표자/담당자: ${personInCharge}\n${details}\nhttps://${id}`;

  const promotionLayout = document.querySelector('.layout-promotion');
  promotionLayout.style.display = 'flex';
  const promotionTextBox = document.querySelector('.event-promotion-text');
  promotionTextBox.innerHTML = promotion;
}
