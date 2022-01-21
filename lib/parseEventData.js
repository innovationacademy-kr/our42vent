import consoleLogger from './consoleLogger.js';

// event의 topic으로 category 분류
function setCategory(topic, name) {
  let category;
  switch (topic) {
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
// creator, title, beginAt, endAt, location, category, topic, description
// , createAt, updatedAt, intraId
export default async function parseEventData(eventList) {
  try {
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
        event.id,
      ]);
    });
    return parsedEvents;
  } catch (err) {
    consoleLogger.error('parseEventData : ', err.stack);
    return null;
  }
}
