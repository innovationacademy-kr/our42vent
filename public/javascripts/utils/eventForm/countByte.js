// input의 byte 카운트
export default function countByte(inputElement) {
  const newLine = inputElement.value.match(/\n/g);
  const newLineCount = newLine ? newLine.length : 0;
  /**
   클라이언트는 \n을 개행그대로,
   브라우저에서 나오면서 \n -> \r\n
   이를 고려하기 위해 여기서 미리 \n만큼의 개수를 더 더함.
   */
  const bytesCount = new TextEncoder().encode(inputElement.value).length + newLineCount;

  return bytesCount;
}
