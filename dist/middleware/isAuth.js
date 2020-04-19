"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const extended_1 = require("../@types/extended/extended");
const isAuth = (req, res, next) => {
    const authHeader = req.get('x-Auth');
    if (!authHeader) {
        const error = new extended_1.Err('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader;
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, 'someSecret');
    }
    catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken.hasOwnProperty('userId')) {
        const error = new extended_1.Err('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
};
exports.default = isAuth;
