const path            = require('path');
const express         = require('express');
const {body}          = require('express-validator')

const auth            = require('../middleware/isAuth')
const adminController = require('../controllers/admin');
const User            = require('../models/user')

const router = express.Router();

router.post('/signup',[
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
        .isLength({min : 3})

],adminController.signUp);
router.post('/login', adminController.login);
router.post('/delete-user', adminController.removeUser);
//authenicated
router.get('/products'       ,auth,adminController.getProducts);
router.post('/add-product'   ,auth,adminController.postAddProduct);
router.post('/edit-product'  ,auth,adminController.postEditProduct);
router.post('/delete-product',auth,adminController.postDeleteProduct);

module.exports = router;
