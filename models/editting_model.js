const db = require('./connection_db');
module.exports = function edittingRestaurant([updatedInfo, id]) {
    let result = {};
    return new Promise((resolve, reject) => {
        // 將資料寫入資料庫
        db.query('UPDATE remote_restaurant SET ? WHERE id = ?', [updatedInfo, id], function (err, rows) {
            if (err) {
                console.log(err);
                result.status = "加入失敗。"
                result.err = "伺服器錯誤，請稍後在試！"
                reject(result);
                return;
            }
            resolve(result);
        })
    })
}