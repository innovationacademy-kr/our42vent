export default function setBeginAt(beginAt) {
  const dayWords = ['일', '월', '화', '수', '목', '금', '토'];

  const beginAtInObj = new Date(beginAt);
  const year = beginAtInObj.getFullYear();
  const month = beginAtInObj.getMonth() + 1;
  const date = beginAtInObj.getDate();
  const day = dayWords[beginAtInObj.getDay()];
  const hour = beginAtInObj.getHours();
  const minute = beginAtInObj.getMinutes().toString();
  const modifiedMinute = minute.length > 1 ? minute : `0${minute}`;

  return `${year}년 ${month}월 ${date}일 (${day}) ${hour}:${modifiedMinute}`;
}
