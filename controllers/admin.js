const pick                 = require('lodash').pick
const bcrypt               = require('bcryptjs');
const jwt                  = require('jsonwebtoken');
const objectId             = require('mongoose').Types.ObjectId
const { validationResult } = require('express-validator')

const Product = require('../models/product');
const User    = require('../models/user')

exports.signUp = async (req,res,next) => {
    try {
        // check inputs validation
        const errs = validationResult(req);
        if (!errs.isEmpty()) {
            for(err of errs.errors){
                const e = new Error(`${err.msg} in ${err.param} input`)
                e.statusCode = 422
                e.data = errs.array()
                throw e
            }
        } 
        // get body values
        const body = pick(req.body,['name','email','password'])
        // hashing password
        const hashedPass = await bcrypt.hash(body.password,10)
        // mutate body's password whith hashedPass
        body.password = hashedPass
        const user = new User(body);
        res.status(201).send(await user.save()) 
    } catch (err) {
        next(err)
    }
}

exports.login = async (req, res, next) => {
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
        // get requested name and password
        const {name,password} = pick(req.body,['name','password'])
        // get user by requested name and check if its found
        const user = await User.findOne({ name: name })
        if (!user) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }
        /*
          compare requested plain password whith user hashed pass 
          which i get from db and check it they're equil
        */
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }
        // sign new token
        const token = jwt.sign(
            {
                name  : user.name,
                userId: user._id.toString()
            },
            'someSecret',
            { expiresIn: '72h' }
        );
        res.status(200).json({ token, userId: user._id.toString() });
    } catch(e) {
        next(e);
    }

};

exports.removeUser = async (req,res,next) => {
    try {
        const userId = req.body.userId
        const user = await User.findById(userId)
        await user.remove()
        res.status(204).send('deleted successfly!')
    } catch (error) {
        next(error)
    }
    
} 

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
        const body    = pick(req.body,['title','price','description','imageUrl'])
        const product = new Product({
            ...body,
            userId: req.userId
        });
        res.status(201).send(await product.save())
    } catch(e) {
        next(e)
    }
};

exports.postEditProduct = async (req, res, next) => {
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
        const product = await Product.findById(prodId)
        for (const prop in body) {
            product[prop] = body[prop]
        }
        res.status(200).send(await product.save())
    } catch(e) {
        next(e)
    }
};

exports.postDeleteProduct = async (req, res, next) => {
    try {
        const prodId       = req.body.productId;
        await Product.findByIdAndRemove(prodId)
        res.status(200).send('deleted succssfly')
    } catch(e) {
        next(e)
    }
};

exports.getProducts = async (req, res, next) => {
    try {
        const user     =  await User.findById(req.userId)
        const userProds = await Product.find({userId : user})
        res.status(200).send(userProds)
    } catch(e) {
        next(e);
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