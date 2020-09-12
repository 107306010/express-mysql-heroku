var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  var db = req.con;
  var data = "";
  db.query('SELECT * FROM heroku_25ee65053a55ba4.remote_restaurant;', function (err, rows) {
    if (err) {
      console.log(err);
    }
    var data = rows;
    console.log(data);
    // use index.ejs
    res.render('index', { title: 'Restaurant', data: data });
  });
});
router.get('/add', function (req, res, next) {

  // use userAdd.ejs
  res.render('restaurantAdd', { title: 'Add Restaurant' });
});

// add post
router.post('/restaurantAdd', function (req, res, next) {

  var db = req.con;

  var sql = {
    // id: req.body.id,
    telephone: req.body.telephone,
    address: req.body.address,
    營業時間: req.body.營業時間,
    類別: req.body.類別,
    店名: req.body.店名
  };

  //console.log(sql);
  // db.query('SET @@auto_increment_increment=1;', function (err, rows) {
  //   if (err) {
  //     console.log(err);
  //   }
  // });
  var qur = db.query('INSERT INTO remote_restaurant SET ?', sql, function (err, rows) {
    if (err) {
      console.log(err);
    }

    res.setHeader('Content-Type', 'application/json');
    res.redirect('/');
  });

});
module.exports = router;
