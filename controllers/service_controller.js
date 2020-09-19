const serviceModel = require('../models/service_model');
service = new serviceModel();

module.exports = class ServiceController {
    //Edit Controller
    postEdit(req, res, next) {
        // 獲取client端資料
        const updatedInfo = {
            telephone: req.body.telephone,
            address: req.body.address,
            營業時間: req.body.營業時間,
            類別: req.body.類別,
            店名: req.body.店名
        }
        const id = req.body.id;
        // 將資料寫入資料庫
        service.edittingRestaurant([updatedInfo, id]).then(result => {
            // 若寫入成功則回傳
            res.setHeader('Content-Type', 'application/json');
            res.redirect('/');
        }, (err) => {
            // 若寫入失敗則回傳
            res.json({
                result: err
            })
        })
    }

    //Add Controller
    postAdd(req, res, next) {
        // 獲取client端資料
        const restaurantInfo = {
            telephone: req.body.telephone,
            address: req.body.address,
            營業時間: req.body.營業時間,
            類別: req.body.類別,
            店名: req.body.店名
        }
        // 將資料寫入資料庫
        service.addingRestaurant(restaurantInfo).then(result => {
            // 若寫入成功則回傳
            res.setHeader('Content-Type', 'application/json');
            res.redirect('/');
        }, (err) => {
            // 若寫入失敗則回傳
            res.json({
                result: err
            })
        })
    }

    //delete controller
    getDelete(req, res, next) {
        const id = req.query.id;

        service.deletingRestaurant(id).then(result => {
            // 若寫入成功則回傳
            res.setHeader('Content-Type', 'application/json');
            res.redirect('/');
        }, (err) => {
            // 若寫入失敗則回傳
            res.json({
                result: err
            })
        })

    }
}