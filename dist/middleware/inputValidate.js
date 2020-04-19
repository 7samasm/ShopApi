"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const user_1 = require("../models/user");
exports.register_validate = [
    express_validator_1.body('name')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .isLength({ min: 5 }),
    express_validator_1.body('email')
        .isEmail()
        .custom((val, { req }) => {
        const prom = user_1.User.findOne({ email: val }).then(userDoc => {
            if (userDoc) {
                return Promise.reject('E-Mail address already exists!');
            }
            return Promise.resolve('good');
        });
        return prom;
    })
        .normalizeEmail(),
    express_validator_1.body('password')
        .trim()
        .escape()
        .isLength({ min: 6 })
];
exports.login_validate = [
    express_validator_1.body('email')
        .isEmail()
        .not()
        .isEmpty()
        .normalizeEmail(),
    express_validator_1.body('password')
        .trim()
        .escape()
        .not()
        .isEmpty()
];
exports.product_validate = [
    express_validator_1.body('title')
        .trim()
        .escape()
        .not()
        .isEmpty(),
    express_validator_1.body('price')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .isNumeric(),
    express_validator_1.body('description')
        .trim()
        .escape()
        .not()
        .isEmpty(),
    express_validator_1.body('imageUrl')
        .trim()
        .escape()
        .not()
        .isEmpty(),
    express_validator_1.body('section')
        .not()
        .isEmpty()
];
