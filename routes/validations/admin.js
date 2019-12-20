const {body}          = require('express-validator')
const User            = require('../../models/user')

const register = [
    body('name')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .isLength({min : 5}),
    body('email')
        .isEmail()
        .custom((val,{req})=>{
            return User.findOne({email : val}).then(userDoc => {
                if(userDoc) {
                    return Promise.reject('E-Mail address already exists!')
                }
            })
        })
        .normalizeEmail(),
    body('password')
        .trim()
        .escape()
        .isLength({min : 6})

]

const login = [
    body('email')
        .isEmail()
        .not()
        .isEmpty()
        .normalizeEmail(),
    body('password')
        .trim()
        .escape()
        .not()
        .isEmpty()        
]
const product_validate = [
    body('title')
        .trim()
        .escape()
        .not()
        .isEmpty(),
    body('price')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .isNumeric(),
    body('description')
        .trim()
        .escape()
        .not()
        .isEmpty(),
    body('imageUrl')
        .trim()
        .escape()
        .not()
        .isEmpty()        
]

module.exports = {
	register,
    login,
    product_validate
}