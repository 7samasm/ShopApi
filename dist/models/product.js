"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const productSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Comment',
        }
    ]
}, { timestamps: true });
productSchema.plugin(mongoose_paginate_v2_1.default);
productSchema.pre('remove', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = this._id;
            let users = yield mongoose_1.models['User'].find({ "cart.productId": id });
            users.forEach(user => {
                user.removeFromCart(id);
            });
            next();
        }
        catch (e) {
            next(e);
        }
    });
});
// methods
productSchema.methods.addToComments = function (cmt) {
    const commentsCopy = [...this.comments];
    commentsCopy.push(cmt._id);
    this.comments = commentsCopy;
    return this.save();
};
exports.Product = mongoose_1.model('Product', productSchema);
