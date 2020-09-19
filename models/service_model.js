const db = require('./connection_db');
module.exports = class RestaurantService {
    // Add model
    addingRestaurant(restaurantInfo) {
        return new Promise((resolve, reject) => {
            // 將資料寫入資料庫
            db.query('INSERT INTO remote_restaurant SET ?', restaurantInfo, function (err, rows) {
                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                resolve(rows);
            })
        })
    }
    // Edit model
    edittingRestaurant([updatedInfo, id]) {
        return new Promise((resolve, reject) => {
            // 將資料寫入資料庫
            db.query('UPDATE remote_restaurant SET ? WHERE id = ?', [updatedInfo, id], function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                resolve(rows);
            })
        })
    }
    // Delete Model
    deletingRestaurant(id) {
        return new Promise((resolve, reject) => {
            // 將資料刪除
            db.query('DELETE FROM remote_restaurant WHERE id = ?', id, function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                resolve(rows);
            })
        })
    }

}
