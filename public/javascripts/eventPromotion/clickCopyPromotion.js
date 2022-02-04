import { alertModal } from '../utils/sweetAlertMixin.js';

const promotionCopy = document.querySelector('.promotion-copy-button');

promotionCopy.addEventListener('click', () => {
  const promotionTextBox = document.querySelector('.promotion-text');
  const urlText = document.querySelector('.promotion-url-text').textContent;
  const promotiontext = promotionTextBox.textContent;
  promotionTextBox.textContent = `${promotiontext}\n\n${urlText}`;

  promotionTextBox.select();
  document.execCommand('copy'); // 클립보드에 복사
  promotionTextBox.textContent = promotiontext;
  alertModal.fire({ title: '복사되었습니다.', icon: 'success' });
});
