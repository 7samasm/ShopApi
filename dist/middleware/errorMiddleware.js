"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("@overnightjs/logger");
const middleware = (err, req, res, next) => {
    logger_1.Logger.Warn(`${err.message} status code is ${err.statusCode}`);
    const status = err.statusCode || 500;
    const message = err.message;
    res.status(status).json({ error: message });
};
exports.default = middleware;
