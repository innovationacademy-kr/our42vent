// timestamp를 YY-MM-DD 형태로 바꿔줌
export function getFullDate(timestamp) {
  const fullDay = new Date(timestamp);
  const year = fullDay.getFullYear();
  let [month, date] = [fullDay.getMonth() + 1, fullDay.getDate()];

  if (month < 10) month = `0${month}`;
  if (date < 10) date = `0${date}`;
  return `${year}-${month}-${date}`;
}

// timestamp를 HH:MM 형태로 바꿔줌
export function getFullTime(timestamp) {
  const fullTime = new Date(timestamp);
  let [hour, min] = [fullTime.getHours(), fullTime.getMinutes()];

  if (hour < 10) hour = `0${hour}`;
  if (min < 10) min = `0${min}`;
  return `${hour}:${min}`;
}

// 며칠동안 이벤트가 진행되는지
export function getDateGap(begin, end) {
  return Math.floor((new Date(end).getTime() - new Date(begin).getTime()) / 8.64e7); // 8.64e7 = 1일을 milisecond로 변환한 값
}
