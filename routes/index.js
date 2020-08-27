var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  var db = req.con;
  var data = "";
  db.query('SELECT * FROM restaurant', function (err, rows) {
    if (err) {
      console.log(err);
    }
    var data = rows;

    // use index.ejs
    res.render('index', { title: 'Restaurant', data: data });
  });
});

module.exports = router;
