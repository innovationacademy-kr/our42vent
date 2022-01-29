// 시작일 ~ 종료일
export default function setRange(beginAt, endAt, diffInDays) {
  const dayWords = ['일', '월', '화', '수', '목', '금', '토'];

  const beginAtObj = new Date(beginAt);
  const endAtObj = new Date(endAt);

  const [beginYear, beginMonth, beginDate, beginDay, beginHour, beginMinute] = [
    beginAtObj.getFullYear(),
    beginAtObj.getMonth() + 1,
    beginAtObj.getDate(),
    dayWords[beginAtObj.getDay()],
    beginAtObj.getHours(),
    beginAtObj.getMinutes(),
  ];
  const [endYear, endMonth, endDate, endDay, endHour, endMinute] = [
    endAtObj.getFullYear(),
    endAtObj.getMonth() + 1,
    endAtObj.getDate(),
    dayWords[endAtObj.getDay()],
    endAtObj.getHours(),
    endAtObj.getMinutes(),
  ];

  const beginModifiedHour = beginHour > 9 ? beginHour : `0${beginHour}`;
  const beginModifiedMinute = beginMinute > 9 > 1 ? beginMinute : `0${beginMinute}`;
  const endModifiedHour = endHour > 9 ? endHour : `0${endHour}`;
  const endModifiedMinute = endMinute > 9 ? endMinute : `0${endMinute}`;

  const range =
    diffInDays >= 1
      ? `${beginYear}년 ${beginMonth}월 ${beginDate}일 (${beginDay}) ` +
        `${beginModifiedHour}:${beginModifiedMinute} ~ ` +
        `${endYear}년 ${endMonth}월 ${endDate}일 (${endDay}) ${endModifiedHour}:${endModifiedMinute}`
      : `${beginYear}년 ${beginMonth}월 ${beginDate}일 (${beginDay}) ` +
        `${beginModifiedHour}:${beginModifiedMinute} ~ ${endModifiedHour}:${endModifiedMinute}`;

  return range;
}
