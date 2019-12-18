const path            = require('path');
const express         = require('express');
const auth            = require('../middleware/isAuth')
const adminValid      = require('./validations/admin')
const adminController = require('../controllers/admin');
const User            = require('../models/user')

const router = express.Router();

router.post('/signup',adminValid.register,adminController.signUp);
router.post('/login' ,adminValid.login   ,adminController.login);
router.post('/delete-user', adminController.removeUser);
//authenicated
router.get('/products'       ,auth,adminController.getProducts);
router.get('/products/:id'   ,auth,adminController.getProduct);
router.post('/add-product'   ,auth,adminController.postAddProduct);
router.post('/edit-product'  ,auth,adminController.postEditProduct);
router.post('/delete-product',auth,adminController.postDeleteProduct);

module.exports = router;
