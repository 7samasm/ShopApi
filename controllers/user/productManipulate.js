const pick                 = require('lodash').pick
const objectId             = require('mongoose').Types.ObjectId
const { validationResult } = require('express-validator')

const Product = require('../../models/product');
const User    = require('../../models/user')

exports.postAddProduct = async (req, res, next) => {
    try {
        // check inputs validation
        const errs = validationResult(req);
        if (!errs.isEmpty()) {
            for(err of errs.errors){
                const e = new Error(`${err.msg} in ${err.param} input`)
                e.statusCode = 422
                throw e
            }
        }         
        const body    = pick(req.body,['title','price','description','imageUrl','section'])
        const product = new Product({
            ...body,
            userId: req.userId
        });
        res.status(201).send(await product.save())
    } catch(e) {
        next(e)
    }
};

exports.postEditProduct =  (req, res, next) => {
    try {
        // check inputs validation
        const errs = validationResult(req);
        if (!errs.isEmpty()) {
            for(err of errs.errors){
                const e = new Error(`${err.msg} in ${err.param} input`)
                e.statusCode = 422
                throw e
            }
        }         
        const prodId  = req.body.productId;
        const body    = pick(req.body,['title','price','description','imageUrl'])
        Product.findById(prodId,(err,doc)=>{
            if (err) return err
            for (const prop in body) {
                doc.set(prop,body[prop]) 
            }
            doc.save()
            res.status(200).send(doc)
        }).catch(e => next(e))

    } catch(e) {
        next(e)
    }
};

exports.postDeleteProduct = (req, res, next) => {
    try {
        const prodId       = req.body.productId;
        Product.findById(prodId,(err,doc)=>{
            if (err) throw err
            doc.remove()
        })
        res.status(200).send('deleted succssfly')
    } catch(e) {
        next(e)
    }
};
exports.getProduct = async (req, res, next) => {
    try {
        const {id}      = req.params;
        if(objectId.isValid(id)) {
            const user      = await User.findById(req.userId)
            const userProds = await Product.findOne({_id : id , userId : user._id})
            res.status(200).send(userProds)  
        } else {
            res.send(false)
        }
    } catch(e) {
        next(e)
    }
};

exports.userInfos = async (req, res, next) => {
    try {
        const userId = req.userId;
        if (!objectId.isValid(userId)) throw new Error('id is invalid')
        const stat = await User.aggregate([
            //  select user who match requsted id
            {   $match  : { _id : objectId(userId)} },
            // split his cart into several documonts
            {   $unwind :{
                    path : "$cart",
                    preserveNullAndEmptyArrays : true
                }
            },
            // bring product's data for each splited document
            {   $lookup : {
                    from : "products",
                    localField : "cart.productId",
                    foreignField : "_id",
                    as : "_cart"
                }
            },
            // will get singel doc cause look up applay for each ex unwind
            {   $unwind :{
                    path : "$_cart",
                    preserveNullAndEmptyArrays : true
                }
            },
            // add quantity field to cart
            {   $addFields : {"_cart.quantity" : "$cart.quantity"} },
            // group spilted docs by _id        
            {   $group : {
                    _id: {
                        _id : "$_id",
                        user : {
                            id   : "$_id",
                            name : "$name",
                            email : "$email"
                        }
                    },
                    _cart : { $push : "$_cart"},
                    totalPrice : {$sum : {$multiply : ["$_cart.price","$_cart.quantity"]}},
                    totalItems : {$sum : {$multiply : [1,"$_cart.quantity"]}}
                }
            },
            // bunddle to final output      
            {   $project : {
                    _id : 0,
                    user : "$_id.user",
                    cartShape : {
                        products   : {$cond : [{$eq : ["$_cart",[{}]]},[],"$_cart"]},
                        totalPrice : "$totalPrice",
                        totalItems : "$totalItems"
                    }
                }
            }
        ]).exec()
    
        Product.find({userId},(err,docs)=>{
            res.send({
                user   : stat[0].user,
                cart   : stat[0].cartShape,
                products : docs
            }).status(200)   
        })
    }
    catch(e){
        next(e)
    };
};