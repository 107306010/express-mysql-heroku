const db = require('./connection_db');
module.exports = class GetPage {
    homePage(filter, restaurant) {
        return new Promise((resolve, reject) => {
            // 將資料寫入資料庫
            db.query('SELECT * FROM remote_restaurant ' + filter, restaurant, function (err, rows) {
                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                //回傳查詢資料
                resolve(rows);
            })
        })
    }

    editPage(restaurantId) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM remote_restaurant WHERE id = ?', restaurantId, function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                //回傳資料
                resolve(rows);
            })
        })
    }
}