const add = require('../models/adding_model');

module.exports = class Restaurant {
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
        add(restaurantInfo).then(result => {
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