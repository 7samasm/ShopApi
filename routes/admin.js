const path = require('path');
const express = require('express');
const auth    = require('../middleware/isAuth')

const adminController = require('../controllers/admin');

const router = express.Router();

router.post('/signup', adminController.signUp);
router.post('/login', adminController.login);
router.get('/products',auth,adminController.getProducts);
router.post('/add-product',auth,adminController.postAddProduct);
router.post('/edit-product',auth,adminController.postEditProduct);
router.post('/delete-product',auth,adminController.postDeleteProduct);

module.exports = router;
