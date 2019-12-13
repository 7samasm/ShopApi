const Product = require('../models/product');
const User  = require('../models/user');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
    Product.find()
    .then(products => {
        console.log(products);
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
        });
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then(product => {
        res.send(product).status(200)
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
    Product.find({})
    .then(products => {
        res.status(200).send(products)
    }
    )
    .catch(err => {
        console.log(err);
    });
};

exports.getCart = async (req, res, next) => {
    try {
        const user     = await User.findById(req.userId)
        const userwp   = await user.populate('cart.items.productId').execPopulate()
        const products = userwp.cart.items;
        const dataCart = {
            products,
            totalItems : (()=>{
                let total = 0
                products.forEach((el)=>{
                    total += el.quantity
                })
                return total
            })(),
            totalPrice : (()=>{
                let total = 0
                products.forEach((el)=>{
                    total += el.productId.price * el.quantity
                })
                return total
            })()
        }
        res.status(200).send(dataCart)
    } catch(e) {
        console.log(e);
    }
};

exports.postCart = async (req, res, next) => {
    try {
        const prodId    = req.body.productId;
        const user      = await User.findById(req.userId)
        const product   = await Product.findById(prodId)
        const result    = await user.addToCart(product)
        res.status(201).send(result)
    } catch(e) {
        res.status(404).send(e)
    }
};

exports.postCartDeleteProduct = async(req, res, next) => {
    try {
        const prodId = req.body.productId;
        const user   = await User.findById(req.userId)
        await user.removeFromCart(prodId)
        res.send('deleated').status(200)
         
    } catch(e) {
        console.log(e);
    }
};

exports.postOrder = (req, res, next) => {
    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
        const products = user.cart.items.map(i => {
            return { quantity: i.quantity, product: { ...i.productId._doc } };
        });
        const order = new Order({
            user: {
                name: req.user.name,
                userId: req.user
            },
            products: products
        });
        return order.save();
    })
    .then(result => {
        return req.user.clearCart();
    })
    .then(() => {
        res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
    Order.find({ 'user.userId': req.user._id })
    .then(orders => {
        res.render('shop/orders', {
            path: '/orders',
            pageTitle: 'Your Orders',
            orders: orders
        });
    })
    .catch(err => console.log(err));
};
