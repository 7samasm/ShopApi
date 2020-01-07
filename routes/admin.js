const express         = require('express');
const auth            = require('../middleware/isAuth')
const uploadFile      = require('../middleware/uploadFile')
const adminValid      = require('./validations/admin')
const adminController = require('../controllers/user/productManipulate');
const authController  = require('../controllers/user/auth')
const sectionController = require('../controllers/section');

const router = express.Router();

router.post('/signup',adminValid.register,authController.signUp);
router.post('/login' ,adminValid.login   ,authController.login);
//authenicated
router.post('/add-product',uploadFile('image'),adminValid.product_validate,auth,adminController.postAddProduct);
router.post('/edit-product',uploadFile('image'),adminValid.product_validate,auth,adminController.postEditProduct);
router.post('/delete-product',auth,adminController.postDeleteProduct);
router.get('/products/:id'   ,auth,adminController.getProduct);
router.get('/user-info'       ,auth,adminController.userInfos);
router.post('/add-section',sectionController.addSection)
router.get('/sections',sectionController.getSections)

module.exports = router;
