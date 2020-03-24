"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const history        = require('connect-history-api-fallback');
const connect_history_api_fallback_1 = __importDefault(require("connect-history-api-fallback"));
const express_1 = require("express");
exports.default = (app) => {
    const middlewere = (req, res, next) => {
        // dont apply history when req api
        if (req.path.startsWith('/api')) {
            next();
        }
        else {
            app.getApp().use(express_1.static('public'));
            connect_history_api_fallback_1.default()(req, res, next);
        }
    };
    return middlewere;
};
