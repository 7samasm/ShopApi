const pick    = require('lodash').pick
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Product = require('../models/product');
const User    = require('../models/user')

exports.signUp = (req,res) => {
    // get body values
    const body = pick(req.body,['name','email','password'])
    // hashing password
    bcrypt.hash(body.password,10)
    .then(hashedPass => {
        body['password'] = hashedPass
        const user = new User(body);
        return user.save()
    })
    .then(user => {
        res.status(201).send(user)
    })
    .catch(err => {
        console.log(err)
    })
}

exports.login = (req, res, next) => {
    const {name,password} = pick(req.body,['name','password'])
    let loadedUser;
    User.findOne({ name: name })
        .then(user => {
            if (!user) {
                const error = new Error('A user with this email could not be found.');
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
                if (!isEqual) {
                const error = new Error('Wrong password!');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign(
                {
                    name  : loadedUser.name,
                    userId: loadedUser._id.toString()
                },
                'someSecret',
                { expiresIn: '72h' }
            );
            res.status(200).json({ token, userId: loadedUser._id.toString() });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
  };

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
    const title   = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        userId: req.user
    });
    product
    .save()
    .then(result => {
      // console.log(result);
      res.status(201).send(result)
  })
    .catch(err => {
        console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
    // const editMode = req.query.edit;
    // if (!editMode) {
    //     return res.redirect('/');
    // }
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then(product => {
        if (!product) {
            return res.send('invaled id').status(200);
        }
        res.send(product)
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;

    Product.findById(prodId)
    .then(product => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.description = updatedDesc;
        product.imageUrl = updatedImageUrl;
        return product.save();
    })
    .then(result => {
        console.log('UPDATED PRODUCT!');
        res.status(200).send("updated")
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
    Product.find()
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then(products => {
        console.log(products);
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByIdAndRemove(prodId)
    .then(() => {
        res.send('deleted succssfly');
    })
    .catch(err => console.log(err));
};
