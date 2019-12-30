const pick                 = require('lodash').pick
const bcrypt               = require('bcryptjs');
const jwt                  = require('jsonwebtoken');
const { validationResult } = require('express-validator')

const User    = require('../../models/user')

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
        // get requested email and password
        const {email,password} = pick(req.body,['email','password'])
        // get user by requested email and check if its found
        const user = await User.findOne({ email: email })
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