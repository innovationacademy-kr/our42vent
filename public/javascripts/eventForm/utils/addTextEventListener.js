import { colorizeBorderForStr } from './colorizeBorder.js';
import countByte from '../../utils/eventForm/countByte.js';

function colorizeTextBorder(element, maxByte, isRequired, isTextarea) {
  const byteCount = countByte(element);

  // 필수가 아닌데 아무것도 입력된게 없을때
  if (!byteCount && !isRequired) {
    colorizeBorderForStr(true, element, isTextarea);
  } else if (byteCount > 0 && byteCount <= maxByte) {
    colorizeBorderForStr(true, element, isTextarea);
  } else {
    colorizeBorderForStr(false, element, isTextarea);
  }
}

export default function addStrEventListener(inputId, maxByte, isRequired, isTextarea) {
  const inputElement = document.getElementById(inputId);

  inputElement.addEventListener('focusin', () => {
    colorizeTextBorder(inputElement, maxByte, isRequired, isTextarea);
    inputElement.addEventListener('keyup', () => {
      colorizeTextBorder(inputElement, maxByte, isRequired, isTextarea);
    });
  });

  inputElement.addEventListener('focusout', () => {
    inputElement.style.border = 'none';
  });
}
