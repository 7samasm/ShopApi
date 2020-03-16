const objectId = require('mongoose').Types.ObjectId
// const pick     = require('lodash').pick
const Product  = require('../models/product');
const User     = require('../models/user');
const Order    = require('../models/order');

const _12_PER_PAGE = 12

exports.getProductsOfUser = async (req, res, next) => {
    try {
      const userId = '5df629e9333785293aff6bb2';
      if (!objectId.isValid(userId)) throw new Error('id is invalid')
      const stat = await User.aggregate(
        [
          //  select user who match requsted id
          { $match: { _id: objectId(userId) } },
          // split his cart into several documonts
          {
            $unwind: {
              path: "$cart",
              preserveNullAndEmptyArrays: true
            }
          },
          // bring product's data for each splited document
          {
            $lookup: {
              from: "products",
              localField: "cart.productId",
              foreignField: "_id",
              as: "_cart"
            }
          },
          // will get singel doc cause look up applay for each ex unwind
          {
            $unwind: {
              path: "$_cart",
              preserveNullAndEmptyArrays: true
            }
          },
          // add quantity field to cart
          { $addFields: { "_cart.quantity": "$cart.quantity" } },
          // group spilted docs by _id        
          {
            $group: {
              _id: {
                _id: "$_id",
                user: {
                  id: "$_id",
                  name: "$name",
                  email: "$email"
                }
              },
              _cart: { $push: "$_cart" },
              totalPrice: { $sum: { $multiply: ["$_cart.price", "$_cart.quantity"] } },
              totalItems: { $sum: { $multiply: [1, "$_cart.quantity"] } }
            }
          },
          // bunddle to final output      
          {
            $project: {
              _id: 0,
              user: "$_id.user",
              cartShape: {
                products: {
                  $cond: [{ $eq: ["$_cart", [{}]] },
                    [], "$_cart"
                  ]
                },
                totalPrice: "$totalPrice",
                totalItems: "$totalItems"
              }
            }
          }
        ]
      ).exec()
      // res.send(stat)
      Product.find({ userId }, (err, docs) => {
        res.send({
          user: stat[0].user,
          cart: stat[0].cartShape,
          products: docs
        }).status(200)
      })
    } catch (e) {
      next(e)
    };
};

exports.getProduct = async (req, res, next) => {
  try {
    const prodId = req.params.productId;
    if (objectId.isValid(prodId)) {
        const product = await Product.findById(prodId)
          .populate('userId')
        res.send(product).status(200)
    } else {
        res.send(false)
    }
  } catch (e) {
    next(e)
  };
};

exports.getIndex = (req, res, next) => {

  const sort = {}
  //check sortBy and orderBy url's query
  if (req.query.sortBy && req.query.orderBy)
  sort[req.query.sortBy] = req.query.orderBy === 'desc' ? -1 : 1
  Product.paginate({},{
    sort  : sort,
    limit : +req.query.limit || _12_PER_PAGE,
    page  : +req.query.page  || 1
  })
  .then(pageObj => {
    res.status(200).send(pageObj)
  })
  .catch(err => {
    next(err);
  });
};

exports.getProductsBySection = (req, res, next) => {
  const sort = {}
  if (req.query.sortBy && req.query.orderBy)
    sort[req.query.sortBy] = req.query.orderBy === 'desc' ? -1 : 1  
  const section = req.params.section;
  Product.paginate({section},{
    sort : sort,
    limit: _12_PER_PAGE,
    page : +req.query.page || 1
  })
  .then(pageObj => {
    res.status(200).send(pageObj)
  })
  .catch(err => {
    next(err);
  });
};

exports.postCart = async (req, res, next) => {
  try {
    const {productId,quantity}   = req.body
    console.log(quantity);
    const user = await User.findById(req.userId)
    const product = await Product.findById(productId)
    const result = await user.addToCart(product ,quantity || 1)
    res.status(201).send(result)
  } catch (e) {
    next(e)
  }
};

exports.postCartDeleteProduct = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    const user = await User.findById(req.userId)
    await user.removeFromCart(prodId)
    res.send('deleated').status(200)

  } catch (e) {
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
                                orders: orders });
        })
        .catch(err => next(err));
};