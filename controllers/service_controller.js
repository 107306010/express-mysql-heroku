const serviceModel = require('../models/service_model');
service = new serviceModel();
const pageModel = require('../models/page_model');
page = new pageModel();
const { validationResult } = require('express-validator');

module.exports = class ServiceController {
    //Edit Controller
    postEdit(req, res, next) {
        // 獲取client端資料
        const updatedInfo = {
            telephone: req.body.telephone,
            address: req.body.address,
            opentime: req.body.opentime,
            closetime: req.body.closetime,
            類別: req.body.r_categories,
            店名: req.body.店名
        }
        const id1 = req.body.id;

        const errors = validationResult(req)
        // 如果有錯誤訊息＝驗證失敗
        if (!errors.isEmpty()) {
            var { telephone, address, opentime, closetime, r_categories, 店名, id } = req.body;
            // 顯示驗證失敗的代號 422，渲染頁面、錯誤訊息，並保留原本的使用者輸入
            page.editPage(id1).then(result => {
                return res.status(422).render('restaurantEdit', {
                    errorMessages: errors.array(),
                    data: { telephone, address, opentime, closetime, 類別: r_categories, 店名, id },
                    categories: result[1]
                })
            })
        }
        else {
            // 將資料寫入資料庫
            service.edittingRestaurant([updatedInfo, id1]).then(result => {
                return res.redirect('/');
            }, (err) => {
                // 若寫入失敗則回傳
                res.json({
                    result: err
                })
            })
        }
    }

    //Add Controller
    postAdd(req, res, next) {
        // 獲取client端資料
        const restaurantInfo = {
            telephone: req.body.telephone,
            address: req.body.address,
            opentime: req.body.opentime,
            closetime: req.body.closetime,
            類別: req.body.r_categories,
            店名: req.body.店名
        }
        const errors = validationResult(req);
        // 如果有錯誤訊息＝驗證失敗
        if (!errors.isEmpty()) {
            // 顯示驗證失敗的代號 422，渲染頁面、錯誤訊息，並保留原本的使用者輸入
            page.addPage().then(result => {
                return res.status(422).render('restaurantAdd', {
                    errorMessages: errors.array(),
                    data: restaurantInfo,
                    categories: result
                })
            }, (err) => {
                res.json({
                    result: err
                })
            })
        }
        // 無錯誤訊息=驗證成功 將資料寫入資料庫
        else {
            service.addingRestaurant(restaurantInfo).then(result => {
                return res.redirect('/');
            }, (err) => {
                // 若寫入失敗則回傳
                res.json({
                    result: err
                })
            })
        }

    }

    //delete controller
    getDelete(req, res, next) {
        const id = req.query.id;

        service.deletingRestaurant(id).then(result => {
            return res.redirect('/');
        }, (err) => {
            // 若寫入失敗則回傳
            res.json({
                result: err
            })
        })

    }

    //Comment Add Controller
    postCommentAdd(req, res, next) {
        // 獲取client端資料
        const comment = {
            foodName: req.body.foodname,
            c_score: req.body.score,
            advices: req.body.inputcomment
        }
        const rID = req.body.id;

        const errors = validationResult(req)
        // 如果有錯誤訊息＝驗證失敗
        if (!errors.isEmpty()) {
            var { foodname, score, inputcomment, id } = req.body;
            // 顯示驗證失敗的代號 422，渲染頁面、錯誤訊息，並保留原本的使用者輸入
            return res.status(422).render('restaurantAddComments', {
                errorMessages: errors.array(),
                data: {
                    foodname, score, inputcomment, id: Number(id)
                }
            })
        }
        // 將資料寫入資料庫
        service.addingComment([comment, rID]).then(result => {
            return res.redirect('/details?id=' + rID);
        }, (err) => {
            // 若寫入失敗則回傳
            res.json({
                result: err
            })
        })
    }

    getSearchResult(req, res, next) {
        const selectedValue = {
            keyword: req.body.keyword,
            category: req.body.r_categories,
            region: req.body.r_region
        }
        //console.log(selectedValue);

        service.searchRestaurant(selectedValue).then(result => {
            return res.render('index', { data: result, categories: res.locals.categories, region: res.locals.region })
        }, (err) => {
            console.log(err)
            res.json({
                result: err
            })
        })
    }
}