const objectId= require('mongoose').Types.ObjectId
const Product = require('../models/product');
const User    = require('../models/user');
const Order   = require('../models/order');
const mongoose = require('mongoose')

exports.getProductsOfUser = async (req, res, next) => {
    try {
        const userId = '5df629e9333785293aff6bb2';
        if (!objectId.isValid(userId)) throw new Error('id is invalid')
        const stat = await User.aggregate([
            {
                $match : {
                    _id : objectId(userId)
                }
            },
            {$unwind :
                {
                 path : "$cart",
                 preserveNullAndEmptyArrays : true
                }
            },
            {
                $lookup : {
                    from : "products",
                    localField : "cart.productId",
                    foreignField : "_id",
                    as : "_cart"
                }
            },
            {$unwind :
                {
                 path : "$_cart",
                 preserveNullAndEmptyArrays : true
                }
            },
            {$addFields : {"_cart.quantity" : "$cart.quantity"}},        
            {
                $project : {
                    _id  : 1,name : 1,email: 1,
                    _cart : "$_cart"
                }
            },
            {
                $group : {
                    _id: {
                        _id : "$_id",
                        user : {
                            id   : "$_id",
                            name : "$name",
                            email : "$email"
                        }
                    },
                    _cart : { $push : "$_cart"}
                }
            },      
            {
                $project : {
                    _id : null,
                    user : "$_id.user",
                    cartShape : {
                        products   : {$cond : [{$eq : ["$_cart",[{}]]},[],"$_cart"]},
                        totalPrice : {
                            $reduce : {
                                input : "$_cart",
                                initialValue    : "$price",
                                in    : {$sum : ["$$value",{$multiply : ["$$this.quantity","$$this.price"]}]}
                            }
                        },
                        totalItems : {
                            $reduce : {
                                input : "$_cart",
                                initialValue    : "$quantity",
                                in    : {$sum : ["$$value","$$this.quantity"]}
                            }
                        }
                    }
                }
            },
        ]).exec()
        res.send(stat)
        Product.find({userId},(err,docs)=>{
            res.send({
                products : docs,
                user   : stat[0].user,
                cart   : stat[0].cartShape
            }).status(200)   
        })
    }
    catch(e){
        next(e)
    };
};

exports.getProduct = async (req, res, next) => {
    try {
        const prodId = req.params.productId;
        if(objectId.isValid(prodId)) {
            const product = await Product.findById(prodId)
            res.send(product).status(200)
        } else {
            res.send(false)
        }
    }
    catch(e){
        next(e)
    };
};

exports.getIndex = (req, res, next) => {
    Product.find({})
    .then(products => {
        res.status(200).send(products)
    })
    .catch(err => {
        next(err);
    });
};

exports.postCart = async (req, res, next) => {
    try {
        const prodId    = req.body.productId;
        const user      = await User.findById(req.userId)
        const product   = await Product.findById(prodId)
        const result    = await user.addToCart(product)
        res.status(201).send(result)
    } catch(e) {
        next(e)
    }
};

exports.postCartDeleteProduct = async(req, res, next) => {
    try {
        const prodId = req.body.productId;
        const user   = await User.findById(req.userId)
        await user.removeFromCart(prodId)
        res.send('deleated').status(200)
         
    } catch(e) {
        next(e)
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
    .catch(err => next(err));
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
    .catch(err => next(err));
};
