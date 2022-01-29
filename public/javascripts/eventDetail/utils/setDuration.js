function setDurationTime(beginAt, endAt) {
  let hours;
  let mins;

  const diffInMins = (endAt - beginAt) / (1000 * 60);
  const diffInHours = Math.floor(diffInMins / 60);
  if (diffInHours > 1) {
    hours = `${diffInHours} hours`;
  } else if (diffInHours === 1) {
    hours = '1 hour';
  } else {
    hours = '';
  }
  const minsLeft = diffInMins - diffInHours * 60;
  if (minsLeft > 1) {
    mins = `${minsLeft} mins`;
  } else if (minsLeft === 1) {
    mins = '1 min';
  } else {
    mins = '';
  }
  return `for ${hours} ${mins}`;
}

export default function setDuration(beginAt, endAt) {
  const beginAtInObj = new Date(new Date(beginAt).setSeconds(0));
  const endAtInObj = new Date(endAt);
  const modifiedEndAt = new Date(
    endAtInObj.getFullYear(),
    endAtInObj.getMonth(),
    endAtInObj.getDate(),
    beginAtInObj.getHours(),
    beginAtInObj.getMinutes()
  );
  const diffInDays = (modifiedEndAt - beginAtInObj) / (1000 * 3600 * 24);
  let duration;

  if (diffInDays > 1) {
    duration = `for ${diffInDays + 1} days`;
  } else if (diffInDays === 1) {
    duration = `for 2 days`;
  } else {
    duration = setDurationTime(beginAtInObj, endAtInObj);
  }
  return { duration, diffInDays };
}
