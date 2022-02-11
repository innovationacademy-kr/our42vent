import countByte from '../../utils/eventForm/countByte.js';

function colorizeTextBorder(inputId, inputElement) {
  const byteCount = countByte(inputElement.value);
  const element = inputElement;
  let isValid = true;

  switch (inputId) {
    case 'event-title':
    case 'event-location':
      if (!byteCount || byteCount > 224) isValid = false;
      break;
    case 'event-pic':
      if (byteCount > 56) isValid = false;
      break;
    case 'event-topic':
      if (!byteCount || byteCount > 480) isValid = false;
      break;
    default:
      if (byteCount > 4064) isValid = false;
      break;
  }

  element.style.border = isValid ? '2px solid green' : '2px solid red';
  if (inputId === 'event-topic' || inputId === 'event-details') element.style.outline = 'none';
}

export default function addTextEventListener(inputId) {
  const inputElement = document.getElementById(inputId);

  inputElement.addEventListener('focusin', () => {
    colorizeTextBorder(inputId, inputElement);
    inputElement.addEventListener('keyup', () => colorizeTextBorder(inputId, inputElement));
  });

  inputElement.addEventListener('focusout', () => {
    inputElement.style.border = 'none';
  });
}
