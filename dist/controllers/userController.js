"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@overnightjs/core");
const mongoose_1 = require("mongoose");
const lodash_1 = require("lodash");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const product_1 = __importDefault(require("../models/product"));
const user_1 = __importDefault(require("../models/user"));
const isAuth_1 = __importStar(require("../middleware/isAuth"));
const inputValidate_1 = require("../middleware/inputValidate");
const errorMiddleware_1 = __importDefault(require("../middleware/errorMiddleware"));
const uplodeMiddleware_1 = __importDefault(require("../middleware/uplodeMiddleware"));
let UserController = class UserController {
    postCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId, quantity } = req.body;
                const user = yield user_1.default.findById(req.userId);
                const product = yield product_1.default.findById(productId);
                const result = yield user.addToCart(product, quantity || 1);
                res.status(201).send(result);
            }
            catch (e) {
                next(e);
            }
        });
    }
    ;
    deleteCartItem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = req.body;
                console.log(productId);
                const user = yield user_1.default.findById(req.userId);
                yield user.removeFromCart(productId);
                res.send('deleated').status(200);
            }
            catch (e) {
                next(e);
            }
        });
    }
    addddProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // check inputs validation
                const errs = express_validator_1.validationResult(req);
                if (!errs.isEmpty()) {
                    for (const err of errs.errors) {
                        const e = new isAuth_1.Err(`${err.msg} in ${err.param} input`);
                        e.statusCode = 422;
                        throw e;
                    }
                }
                const body = lodash_1.pick(req.body, ['title', 'price', 'description', 'imageUrl', 'section']);
                // mutate image url with requsted uploded file if found
                if (req.file)
                    body.imageUrl = req.file.filename;
                const product = new product_1.default(Object.assign(Object.assign({}, body), { userId: req.userId }));
                res.status(201).send(yield product.save());
            }
            catch (e) {
                next(e);
            }
        });
    }
    editProduct(req, res, next) {
        try {
            // check inputs validation
            const errs = express_validator_1.validationResult(req);
            if (!errs.isEmpty()) {
                for (const err of errs.errors) {
                    const e = new isAuth_1.Err(`${err.msg} in ${err.param} input`);
                    e.statusCode = 422;
                    throw e;
                }
            }
            const prodId = req.body.productId;
            const body = lodash_1.pick(req.body, ['title', 'price', 'description', 'imageUrl', 'section']);
            // mutate image url with requsted uploded file if found
            if (req.file)
                body.imageUrl = req.file.filename;
            product_1.default.findById(prodId, (err, result) => {
                const doc = result;
                if (err)
                    return err;
                for (const prop in body) {
                    doc.set(prop, body[prop]);
                }
                doc.save();
                res.status(200).send(doc);
            }).catch(e => console.log(e));
        }
        catch (e) {
            next(e);
        }
    }
    deleteProduct(req, res, next) {
        try {
            const { productId } = req.body;
            console.log(productId);
            product_1.default.findById(productId, (err, result) => {
                if (err)
                    throw err;
                const doc = result;
                doc.remove();
                res.status(200).send(doc);
            });
        }
        catch (e) {
            next(e);
        }
    }
    getUserProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (mongoose_1.isValidObjectId(id)) {
                    const user = yield user_1.default.findById(req.userId);
                    const userProds = yield product_1.default.findOne({ _id: id, userId: user._id });
                    res.status(200).send(userProds);
                }
                else {
                    res.send(false);
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    getUserInfos(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId;
                if (!mongoose_1.isValidObjectId(userId))
                    throw new Error('id is invalid');
                const stat = yield user_1.default.aggregate([
                    //  select user who match requsted id
                    { $match: { _id: mongoose_1.Types.ObjectId(userId) } },
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
                    // group spilted docs by user _id        
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
                                products: { $cond: [{ $eq: ["$_cart", [{}]] }, [], "$_cart"] },
                                totalPrice: "$totalPrice",
                                totalItems: "$totalItems"
                            }
                        }
                    }
                ]).exec();
                product_1.default.find({ userId }, (err, docs) => {
                    res.send({
                        user: stat[0].user,
                        cart: stat[0].cartShape,
                        products: docs
                    }).status(200);
                });
            }
            catch (e) {
                next(e);
            }
            ;
        });
    }
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // check inputs validation
                const errs = express_validator_1.validationResult(req);
                if (!errs.isEmpty()) {
                    for (const err of errs.errors) {
                        const e = new isAuth_1.Err(`${err.msg} in ${err.param} input!`);
                        e.statusCode = 422;
                        e.data = errs.array();
                        throw e;
                    }
                }
                // get body values
                const body = lodash_1.pick(req.body, ['name', 'email', 'password']);
                // hashing password
                const hashedPass = yield bcryptjs_1.default.hash(body.password, 10);
                // mutate body's password whith hashedPass
                body.password = hashedPass;
                const user = new user_1.default(body);
                res.status(201).send(yield user.save());
            }
            catch (err) {
                next(err);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // check inputs validation
                const errs = express_validator_1.validationResult(req);
                if (!errs.isEmpty()) {
                    for (const err of errs.errors) {
                        const e = new isAuth_1.Err(`${err.msg} in ${err.param} input!`);
                        e.statusCode = 422;
                        throw e;
                    }
                }
                // get requested email and password
                const { email, password } = lodash_1.pick(req.body, ['email', 'password']);
                // get user by requested email and check if its found
                const user = yield user_1.default.findOne({ email: email });
                if (!user) {
                    const error = new isAuth_1.Err('A user with this email could not be found.');
                    error.statusCode = 401;
                    throw error;
                }
                /*
                  compare requested plain password whith user hashed pass
                  which i get from db and check it they're equil
                */
                const isEqual = yield bcryptjs_1.default.compare(password, user.password);
                if (!isEqual) {
                    const error = new isAuth_1.Err('Wrong password!');
                    error.statusCode = 401;
                    throw error;
                }
                // sign new token
                const token = jsonwebtoken_1.default.sign({
                    name: user.name,
                    userId: user._id.toString()
                }, 'someSecret', { expiresIn: '72h' });
                res.status(200).json({ token, userId: user._id.toString() });
            }
            catch (e) {
                next(e);
            }
        });
    }
};
__decorate([
    core_1.Post('cart'),
    core_1.Middleware([isAuth_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "postCart", null);
__decorate([
    core_1.Delete('cart'),
    core_1.Middleware([isAuth_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteCartItem", null);
__decorate([
    core_1.Post('add-product'),
    core_1.Middleware([uplodeMiddleware_1.default('image'), ...inputValidate_1.product_validate, isAuth_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addddProduct", null);
__decorate([
    core_1.Put('edit-product'),
    core_1.Middleware([uplodeMiddleware_1.default('image'), ...inputValidate_1.product_validate, isAuth_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "editProduct", null);
__decorate([
    core_1.Delete('delete-product'),
    core_1.Middleware([isAuth_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteProduct", null);
__decorate([
    core_1.Get('products/:id'),
    core_1.Middleware([isAuth_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserProduct", null);
__decorate([
    core_1.Get('user-info'),
    core_1.Middleware([isAuth_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserInfos", null);
__decorate([
    core_1.Post('signup'),
    core_1.Middleware([...inputValidate_1.register_validate]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signUp", null);
__decorate([
    core_1.Post('login'),
    core_1.Middleware([...inputValidate_1.login_validate]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
UserController = __decorate([
    core_1.Controller('api/admin'),
    core_1.ClassErrorMiddleware(errorMiddleware_1.default)
], UserController);
exports.UserController = UserController;
