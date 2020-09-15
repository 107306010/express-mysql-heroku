var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  var db = req.con;
  var data = "";
  var restaurant = "";
  var restaurant = req.query.restaurant;

  var filter = "";
  if (restaurant) {
    filter = 'WHERE id = ?';
  }
  console.log(restaurant);
  db.query('SELECT * FROM remote_restaurant ' + filter, restaurant, function (err, rows) {
    if (err) {
      console.log(err);
    }
    var data = rows;

    console.log(data);
    // use index.ejs
    res.render('index', { title: 'Restaurant', data: data, restaurant: restaurant });
  });
});
router.get('/add', function (req, res, next) {

  // use userAdd.ejs
  res.render('restaurantAdd', { title: 'Add Restaurant' });
});

// add post
const AddingRestaurantMethod = require('../controllers/adding_controller');
addingRestaurantMethod = new AddingRestaurantMethod();
router.post('/restaurantAdd', addingRestaurantMethod.postAdd);

router.get('/edit', function (req, res, next) {
  //要抓取POST值 可以用 body 要抓取GET值 可以用 query
  var id = req.query.id;
  var db = req.con;
  var data = "";

  db.query('SELECT * FROM remote_restaurant WHERE id = ?', id, function (err, rows) {
    console.log(id);
    if (err) {
      console.log(err);
    }
    var data = rows;
    // use restaurantEdit.ejs
    res.render('restaurantEdit', { title: 'Edit Restaurant', data: data });
  });
});

//edit post
const EdittingRestaurantMethod = require('../controllers/editting_controller');
edittingRestaurantMethod = new EdittingRestaurantMethod();
router.post('/restaurantEdit', edittingRestaurantMethod.postEdit);

//delete
router.get('/restaurantDelete', function (req, res, next) {

  var id = req.query.id;
  var db = req.con;

  var qur = db.query('DELETE FROM remote_restaurant WHERE id = ?', id, function (err, rows) {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
});
module.exports = router;
