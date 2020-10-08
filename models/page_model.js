const db = require('./connection_db');
module.exports = class GetPage {
    homePage() {
        return new Promise((resolve, reject) => {
            // 將資料寫入資料庫
            db.query(`SELECT category_name from r_categories;
            SELECT regeion_name from r_regeion;`, function (err, rows) {
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
            db.query(`SELECT * FROM remote_restaurant WHERE id = ${restaurantId}; 
            SELECT category_name from r_categories` , function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                //回傳資料
                console.log(rows);
                resolve(rows);

            })
        })
    }

    addPage() {
        return new Promise((resolve, reject) => {
            db.query('SELECT category_name from r_categories', function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                resolve(rows);
            })
        })
    }

    detailsPage(restaurantId) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * from(remote_restaurant inner join 
                r_categories on r_categories.categoryID = remote_restaurant.類別)
                where id = ${restaurantId};
                SELECT * 
                FROM (comments inner join remote_restaurant on c_Rid = id) 
                where c_Rid = ${restaurantId};
                SELECT AVG(c_score) as avgScore from(remote_restaurant inner join comments on c_Rid = id)
                where id = ${restaurantId};
                `
            db.query(sql, function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }

                //尚無評論 設定無評論default值
                else if (rows[1].length == 0) {
                    rows[1].push({ foodName: "尚無評論", c_score: 0, advices: "尚無評論" });
                    rows[2][0].avgScore = 0;
                    resolve(rows);
                }
                //有評論 回傳資料
                else {
                    resolve(rows);
                }

            })
        })
    }

    commentPage(restaurantId) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id FROM remote_restaurant WHERE id = ${restaurantId}`, function (err, rows) {
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