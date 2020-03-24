"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const app = new app_1.default();
const port = 8080;
config_1.connectDb((err, res) => {
    if (err)
        return console.log(err.message);
    app.start(port);
});
exports.default = app;
