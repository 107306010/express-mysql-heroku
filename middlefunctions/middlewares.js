const db = require('../models/connection_db');
module.exports = {
    getHomePageData: (req, res, next) => {
        db.query(`SELECT category_name from r_categories;
            SELECT regeion_name from r_region;`, function (err, rows) {
            if (err) {
                console.log(err);
            }
            res.locals.categories = rows[0];
            res.locals.region = rows[1];
        })
        //回傳查詢資料
        return next();
    }
}