export function colorizeBorder(isValid, inputElement) {
  const element = inputElement;

  if (isValid) element.style.border = '2px solid green';
  else element.style.border = '2px solid red';
}

export function colorizeBorderForStr(isValid, inputElement, isTextarea) {
  const element = inputElement;

  colorizeBorder(isValid, inputElement);
  if (isTextarea) element.style.outline = 'none';
}
