const { body, query, checkSchema } = require('express-validator');

module.exports = {
    //Add and Edit share the same validation
    addRestaurant: [
        body('店名')
            .trim()
            .notEmpty()
            .withMessage('請填寫店名'),

        body('address')
            .trim()
            .notEmpty()
            .withMessage('請填寫地址'),

        body('r_categories')
            .isNumeric().withMessage('請選擇類別'),

        body('telephone')
            .trim()
            .notEmpty().withMessage('請填寫電話')
    ],
    commentRestaurant: [
        body('foodname')
            .trim()
            .notEmpty()
            .withMessage('吃了什麼記得寫'),

        body('score')
            .trim()
            .notEmpty().withMessage('給點分吧')
            .custom((value) => {
                // 0<=輸入<=10
                if (value > 10 || 0 > value) {
                    // 驗證失敗時的錯誤訊息
                    throw new Error('請給1-10分')
                }
                else if (isNaN(Number(value))) {
                    throw new Error('我只算正實數!不要亂打')
                }
                // 成功驗證回傳 true
                return true
            }),

        body('inputcomment')
            .trim()
            .notEmpty()
            .withMessage('給點評論吧')
    ]
}