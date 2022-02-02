// 이벤트 폼의 input이 유효하지 않을 때 던질 커스텀 에러
class InputError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InputError';
  }
}

function validateStr(str, inputName) {
  const bytesCount = new TextEncoder().encode(str).length;
  let errorType = 0;

  switch (inputName) {
    case 'Title':
    case 'Location':
      if (!bytesCount) errorType = 1;
      else if (bytesCount > 224) errorType = 2;
      break;
    case 'Person in charge':
      if (bytesCount > 56) errorType = 2;
      break;
    case 'Topic':
      if (!bytesCount) errorType = 1;
      else if (bytesCount > 480) errorType = 2;
      break;
    default:
      if (bytesCount > 4064) errorType = 2;
      break;
  }
  if (errorType === 1)
    throw new InputError(`${inputName} in the event form is required but no input was given`);
  else if (errorType === 2)
    throw new InputError(`${inputName} in the event form is over the limit`);
}

function validatTimeRange(time) {
  const timeDate = new Date(time);
  const minDate = new Date('1970-01-01T00:00');
  const maxDate = new Date('4242-12-31T23:59');

  // 유효한 Date string인가?
  if (Number.isNaN(timeDate.getTime())) {
    throw new InputError('Date input in the event form is not valid');
  }
  // 1970 < 시작시간/종료시간 < 4242
  if (timeDate < minDate || timeDate > maxDate)
    throw new InputError('Date input in the event form must be between 1970 and 4242');

  // db에 ISO format의 문자열로 저장하기.
  return timeDate.toISOString().slice(0, 19);
}

// 시작시간 <= 종료시간
function validateTimOrder(beginAt, endAt) {
  if (new Date(beginAt) > new Date(endAt))
    throw new InputError('beginAt is later than endAt in the event form');
}

function validateCategory(category) {
  const categoryArray = ['lecture', 'contest', 'conference', 'community'];

  if (!categoryArray.includes(category))
    throw new InputError('The category in the event form is not valid');
}

export default function validateEventData(event) {
  const curEvent = event;
  const { title, personInCharge, beginAt, endAt, location, category, topic, details } = event;

  validateStr(title, 'Title');
  validateStr(personInCharge, 'Person in charge');
  validateStr(location, 'Location');
  validateStr(topic, 'Topic');
  validateStr(details, 'Details');
  curEvent.beginAt = validatTimeRange(beginAt);
  curEvent.endAt = validatTimeRange(endAt);
  validateTimOrder(beginAt, endAt);
  validateCategory(category);
}
