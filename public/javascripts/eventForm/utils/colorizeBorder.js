export function colorizeBorder(isValid, inputElement) {
  const element = inputElement;

  element.style.border = isValid ? '2px solid green' : '2px solid red';
}

export function colorizeBorderForStr(isValid, inputElement, isTextarea) {
  const element = inputElement;

  colorizeBorder(isValid, inputElement);
  if (isTextarea) element.style.outline = 'none';
}
