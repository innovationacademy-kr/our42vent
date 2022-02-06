// event의 topic으로 category 분류
function setCategory(kind, name) {
  let category;
  switch (kind) {
    case 'conference':
      category = 'conference';
      break;
    case 'hackathon':
      category = 'contest';
      break;
    case undefined: // exam
      category = 'exam';
      break;
    default:
      category = 'community';
  }
  if (name.match(/\[.*특강.*\]/)) category = 'lecture'; // [...특강...]이 포함된 경우
  return category;
}

// db 삽입을 위해 data 가공
export default async function parseEventData(eventList) {
  const parsedEvents = [];
  await eventList.forEach(event => {
    parsedEvents.push([
      424242,
      event.name,
      null,
      new Date(event.begin_at),
      new Date(event.end_at),
      event.location,
      setCategory(event.kind, event.name),
      event.name,
      event.description ? event.description : null, // exam에서 undefined
      new Date(event.created_at),
      new Date(event.updated_at),
      `${event.description ? 'ev' : 'ex'}_${event.id}`, // event와 exam 아이디의 중복방지를 위해 prefix 설정
    ]);
  });
  return parsedEvents;
}
