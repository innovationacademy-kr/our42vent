// \n 포함한 input의 byte를 카운트
export default function countByte(inputElement) {
  const newLine = inputElement.value.match(/\n/g);
  const newLineCount = newLine ? newLine.length : 0;
  const bytesCount = new TextEncoder().encode(inputElement.value).length + newLineCount;

  return bytesCount;
}
