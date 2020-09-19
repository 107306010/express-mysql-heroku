var express = require('express');
var router = express.Router();

const GetPageMethod = require('../controllers/page_controller');
getPageMethod = new GetPageMethod();

const ServiceRestaurantMethod = require('../controllers/service_controller');
serviceRestaurantMethod = new ServiceRestaurantMethod();

/* GET home page. */
router.get('/', getPageMethod.getHomePage);

/* GET add page. */
router.get('/add', getPageMethod.getAddPage);

/* GET edit page. */
router.get('/edit', getPageMethod.getEditPage);

// add post
router.post('/restaurantAdd', serviceRestaurantMethod.postAdd);

//edit post
router.post('/restaurantEdit', serviceRestaurantMethod.postEdit);

//delete
router.get('/restaurantDelete', serviceRestaurantMethod.getDelete);

module.exports = router;