const express         = require('express');
const auth            = require('../middleware/isAuth')
const adminValid      = require('./validations/admin')
const adminController = require('../controllers/admin');

const router = express.Router();

router.post('/signup',adminValid.register,adminController.signUp);
router.post('/login' ,adminValid.login   ,adminController.login);
router.post('/delete-user', adminController.removeUser);
//authenicated
router.post('/add-product', adminValid.product_validate,auth,adminController.postAddProduct);
router.post('/edit-product',adminValid.product_validate,auth,adminController.postEditProduct);

// router.get('/products'       ,auth,adminController.getProducts);
router.get('/products/:id'   ,auth,adminController.getProduct);
router.get('/user-info'       ,auth,adminController.userInfos);
router.post('/delete-product',auth,adminController.postDeleteProduct);

module.exports = router;
