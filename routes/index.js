const express = require('express');
const router = express.Router();
const paramValidator = require('../config/param_validator');

const GetPageMethod = require('../controllers/page_controller');
getPageMethod = new GetPageMethod();

const ServiceRestaurantMethod = require('../controllers/service_controller');
serviceRestaurantMethod = new ServiceRestaurantMethod();

/* GET home page. */
router.route("/")
    .get(getPageMethod.getHomePage,)
    .post(serviceRestaurantMethod.getSearchResult);


/* GET add page. */
router.route('/add')
    .get(getPageMethod.getAddPage)
    .post(paramValidator.addRestaurant, serviceRestaurantMethod.postAdd);

/* GET edit page. */
router.route('/edit')
    .get(getPageMethod.getEditPage)
    .post(paramValidator.addRestaurant, serviceRestaurantMethod.postEdit);

/* GET comment add page. */
router.route('/commentAdd')
    .get(getPageMethod.getCommentAddPage)
    .post(paramValidator.commentRestaurant, serviceRestaurantMethod.postCommentAdd);

/* GET restaurant details page. */
router.get('/details', getPageMethod.getDetailsPage);

//delete
router.get('/restaurantDelete', serviceRestaurantMethod.getDelete);

module.exports = router;