// UTC -> KST
export default function localizeDateTime(dateTime) {
  return new Date(dateTime.getTime() + 3.24e7); // +9 시간
}
