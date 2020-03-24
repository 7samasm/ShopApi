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
Object.defineProperty(exports, "__esModule", { value: true });
// const configValues = require('./config');
const mongoose_1 = require("mongoose");
const configValues = {
    db: "shop",
    uname: "7admin",
    pwd: "umTR@x7.b_whAC6",
    mode: "dev"
};
const getDbConnectionString = () => {
    if (configValues.mode !== "dev")
        return `mongodb://${configValues.uname}:${encodeURIComponent(configValues.pwd)}@ds257648.mlab.com:57648/${configValues.db}`;
    return `mongodb://localhost:27017/${configValues.db}`;
};
exports.connectDb = (cb) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield mongoose_1.connect(getDbConnectionString(), { useNewUrlParser: true, useUnifiedTopology: true }, err => {
            if (err)
                throw new Error('conection failed :(');
        });
        cb(null, res);
    }
    catch (error) {
        cb(error, undefined);
    }
});
