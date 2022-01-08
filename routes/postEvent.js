import consoleLogger from '../controllers/consoleLogger.js';

export default function postEventRouter(express) {
  const router = express.Router();

  router.post('/', (req, res) => {
    /*
    let sql_value = {
      creator: user.id,
      title: req.body.titleName,
      personInCharge: req.body.picName,
      beginAt: req.body.beginatName,
      endAt: req.body.endatName,
      location: req.body.locationName,
      category: req.body.categoryName,
      topic: req.body.topicName,
      details: req.body.detailsName,
    };

    pool.query('INSERT INTO event set ?', sql_value, (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        console.log(rows.name);
      }
    });
    */

    consoleLogger.info(req.body);
    res.redirect('/');
  });
  return router;
}
