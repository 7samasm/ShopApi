"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const product_1 = __importDefault(require("./product"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: [
        {
            productId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: { type: Number, required: true }
        }
    ]
});
//middlewares
userSchema.post("remove", doc => {
    product_1.default.deleteMany({ userId: doc._id });
});
// methods
userSchema.methods.addToCart = function ({ _id }, quty) {
    // index num or -1
    const productIndexInCart = this.cart.findIndex((el) => {
        return el.productId.toString() === _id.toString();
    });
    const cartItemsCopy = [...this.cart];
    if (productIndexInCart >= 0) {
        let newQuantity = this.cart[productIndexInCart].quantity + quty;
        cartItemsCopy[productIndexInCart].quantity = newQuantity;
    }
    else {
        // console.log(cartItemsCopy)
        cartItemsCopy.push({
            productId: _id,
            quantity: quty
        });
    }
    this.cart = cartItemsCopy;
    return this.save();
};
userSchema.methods.removeFromCart = function (productId) {
    const cartItemsCopy = this.cart.filter((item) => {
        return item.productId.toString() !== productId.toString();
    });
    this.cart = cartItemsCopy;
    return this.save();
};
userSchema.methods.clearCart = function () {
    this.cart = [];
    return this.save();
};
exports.default = mongoose_1.model('User', userSchema);
