"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const appServer_1 = __importDefault(require("./appServer"));
const config_1 = require("./config");
const appServer = new appServer_1.default();
const port = 8080;
config_1.connectDb()
    .then(res => {
    appServer.start(port);
})
    .catch(e => console.log(e.message));
// export default appServer
