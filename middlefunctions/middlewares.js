const db = require('../models/connection_db');
module.exports = {
    getHomePageData: (req, res, next) => {
        db.query(`SELECT category_name from r_categories;
            SELECT regeion_name from r_regeion;`, function (err, rows) {
            // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
            if (err) {
                console.log(err);
            }
            //回傳查詢資料
            res.locals.categories = rows[0];
            res.locals.region = rows[1];
        })
        next();
    }
}