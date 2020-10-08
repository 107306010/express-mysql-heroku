const db = require('./connection_db');
module.exports = class RestaurantService {
    // Add model
    addingRestaurant(restaurantInfo) {
        return new Promise((resolve, reject) => {
            // 將資料寫入資料庫
            db.query('INSERT INTO remote_restaurant SET ?', restaurantInfo, function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                resolve(rows[0]);
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
                resolve(rows[0]);
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
                resolve(rows[0]);
            })
        })
    }

    // Add comment model
    addingComment([comment, id]) {
        return new Promise((resolve, reject) => {
            // 將資料寫入資料庫
            db.query('INSERT INTO comments SET ? , `c_Rid`= ?', [comment, id], function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(rows);
                    return;
                }
                resolve(rows[0]);
            })
        })
    }

    searchRestaurant(selectedValue) {
        return new Promise((resolve, reject) => {
            var whereSql = "";

            var selectedSql = [];
            if (selectedValue.keyword) {
                selectedSql.push(`店名 LIKE "${selectedValue.keyword}%"`);
            }
            if (selectedValue.category) {
                selectedSql.push(`類別 = ${selectedValue.category}`);
            }
            // if (score) {
            //     selectedSql.push(`address LIKE ${keyword}%`);
            // }
            if (selectedValue.region) {
                selectedSql.push(`address LIKE "${selectedValue.region}%"`);
            }

            if (selectedSql.length > 0) {
                whereSql = "WHERE ";
                for (let i = 0; i < selectedSql.length; i++) {
                    if (i < selectedSql.length - 1) {
                        whereSql += selectedSql[i] + " and ";
                    }
                    else {
                        whereSql += selectedSql[i];
                    }
                }
            }

            db.query(`SELECT * from(remote_restaurant inner join r_categories on r_categories.categoryID = remote_restaurant.類別) ${whereSql}`, function (err, rows) {
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
