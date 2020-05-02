"use strict";
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
// import {Application, application} from 'express'
// import * as express from 'express'
// import 'reflect-metadata'
const express_1 = require("express");
const core_1 = require("@overnightjs/core");
const logger_1 = require("@overnightjs/logger");
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const history_1 = __importDefault(require("./middleware/history"));
const controllers = __importStar(require("./controllers"));
class AppServer extends core_1.Server {
    constructor() {
        super(true);
        this.SERVER_START = 'server start on port : ';
        // setup Middlewares
        this.app.use(body_parser_1.json());
        this.app.use(cors_1.default());
        this.app.use(history_1.default(this));
        this.app.use(express_1.static('public'));
        this.setupControllers();
    }
    setupControllers() {
        const ctlrInstances = [];
        for (const name in controllers) {
            if (controllers.hasOwnProperty(name)) {
                const controller = controllers[name];
                ctlrInstances.push(new controller());
            }
        }
        // Logger.Info(ctlrInstances)
        super.addControllers(ctlrInstances);
    }
    start(port) {
        this.app.listen(port, () => {
            logger_1.Logger.Warn(this.SERVER_START + port);
        });
    }
    get appInstance() {
        return this.app;
    }
}
exports.default = AppServer;
