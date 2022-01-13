import insertEvent from '../models/accessEventTable.js';

export default function insertEventController(req, res) {
  // 이벤트 form 에 작성된 내용 req.body에 담겨있다
  const event = req.body;
  insertEvent(res.locals.userId, event);

  // 캘린더 뷰로 리다이렉트
  res.redirect('/');
}
