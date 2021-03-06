const pageModel = require('../models/page_model');
page = new pageModel();

module.exports = class PageController {
    getHomePage(req, res, next) {
        page.homePage().then(result => {
            return res.render('index', {
                title: 'Restaurant', categories: result[0], region: result[1],
                data: { telephone: "", address: "", opentime: "0:00", closetime: "0:00", 類別: "", 店名: ""}
            })
        }, err => {
            console.log(err)
        })
    }

    getAddPage(req, res, next) {
        page.addPage().then(result => {
            return res.render('restaurantAdd', {
                title: 'Add Restaurant',
                data: { telephone: "", address: "", opentime: "0:00", closetime: "0:00", 類別: "", 店名: "" },
                errorMessages: {},
                categories: result
            })
        }, (err) => {
            res.json({
                result: err
            })
        })
    }

    getEditPage(req, res, next) {
        //要抓取POST值 可以用 body 要抓取GET值 可以用 query
        var id = req.query.id;
        page.editPage(id).then(result => {
            // 若查詢成功則回傳
            return res.render('restaurantEdit', {
                title: 'Edit Restaurant',
                data: result[0][0],
                errorMessages: {},
                categories: result[1]
            });
        }, (err) => {
            // 若寫入失敗則回傳
            res.json({
                result: err
            })
        })
    }

    getDetailsPage(req, res, next) {
        var id = req.query.id;

        page.detailsPage(id).then(result => {
            let data = result[0];
            let comment = result[1];
            let avgScore = result[2];
            return res.render('restaurantDetails', {
                title: 'Details Restaurant',
                data: data, comment: comment, avgScore: avgScore
            });
        }, (err) => {
            // 若寫入失敗則回傳
            res.json({
                result: err
            })
        })
    }

    getCommentAddPage(req, res, next) {
        var id = req.query.id;
        page.commentPage(id).then(result => {
            // 若查詢成功則回傳
            return res.render('restaurantAddComments', {
                title: 'Add Restaurant'
                , data: { foodname: "", score: "", inputcomment: "", id: id }, errorMessages: {}
            });
        }, (err) => {
            // 若寫入失敗則回傳
            res.json({
                result: err
            })
        })
    }
}