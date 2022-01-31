// 이벤트 폼의 input이 유효하지 않을 때 던질 커스텀 에러
class InputError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InputError';
  }
}

function isValidStr(str, inputName, required, maxByte) {
  if (required && str === '') {
    throw new InputError(`${inputName} in the event form is required but no input was given`);
  } else {
    const newLineCnt = str.match(/\n/g) ? str.match(/\n/g).length : 0;
    const bytesCount = new TextEncoder().encode(str).length + newLineCnt;

    if (bytesCount > maxByte) {
      throw new InputError(`${inputName} in the event form is over the limit`);
    }
  }
}

function validatedTime(time) {
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
function isValidOrder(beginAt, endAt) {
  if (new Date(beginAt) > new Date(endAt))
    throw new InputError('beginAt is later than endAt in the event form');
}

function isValidCategory(category) {
  const categoryArray = ['lecture', 'contest', 'conference', 'community'];

  if (!categoryArray.includes(category)) {
    throw new InputError('The category in the event form is not valid');
  }
}

export default function validateBeforeInsertOrEdit(event) {
  const curEvent = event;
  const { title, personInCharge, beginAt, endAt, location, category, topic, details } = event;

  isValidStr(title, 'Title', true, 224);
  isValidStr(personInCharge, 'Person in charge', false, 56);
  isValidStr(location, 'Location', true, 224);
  isValidStr(topic, 'Topic', true, 480);
  isValidStr(details, 'Details', false, 4064);
  curEvent.beginAt = validatedTime(beginAt);
  curEvent.endAt = validatedTime(endAt);
  isValidOrder(beginAt, endAt);
  isValidCategory(category);
}
