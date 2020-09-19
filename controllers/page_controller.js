const pageModel = require('../models/page_model');
page = new pageModel();

module.exports = class PageController {
    getHomePage(req, res, next) {
        var data = "";
        var restaurant = "";
        var restaurant = req.query.restaurant;

        var filter = "";
        if (restaurant) {
            filter = 'WHERE id = ?';
        }
        page.homePage(filter, restaurant).then(result => {
            // 若查詢成功則回傳
            data = result;

            res.render('index', { title: 'Restaurant', data: data, restaurant: restaurant });

        }, (err) => {
            // 若寫入失敗則回傳
            res.json({
                result: err
            })
        })
    }

    getAddPage(req, res, next) {
        res.render('restaurantAdd', { title: 'Add Restaurant' });
    }

    getEditPage(req, res, next) {
        //要抓取POST值 可以用 body 要抓取GET值 可以用 query
        var id = req.query.id;
        var data = "";
        page.editPage(id).then(result => {
            // 若查詢成功則回傳
            data = result;

            res.render('restaurantEdit', { title: 'Edit Restaurant', data: data });

        }, (err) => {
            // 若寫入失敗則回傳
            res.json({
                result: err
            })
        })
    }
}