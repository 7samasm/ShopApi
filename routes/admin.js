const path = require('path');
const express = require('express');
const auth    = require('../middleware/isAuth')

const adminController = require('../controllers/admin');

const router = express.Router();

router.post('/signup', adminController.signUp);
router.post('/login', adminController.login);

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
