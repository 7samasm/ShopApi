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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@overnightjs/core");
const logger_1 = require("@overnightjs/logger");
const mongoose_1 = require("mongoose");
const product_1 = __importDefault(require("../models/product"));
let ShopController = class ShopController {
    getIndex(req, res) {
        const sort = {};
        //check sortBy and orderBy url's query
        if (req.query.sortBy && req.query.orderBy)
            sort[req.query.sortBy] = req.query.orderBy === 'desc' ? -1 : 1;
        product_1.default.paginate({}, {
            sort: sort,
            limit: +req.query.limit || 12,
            page: +req.query.page || 1
        }, (err, result) => {
            if (err)
                return logger_1.Logger.Err(err);
            res.status(200).send(result);
        });
    }
    getProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prodId = req.params.id;
                if (mongoose_1.isValidObjectId(prodId)) {
                    const product = yield product_1.default.findById(prodId)
                        .populate('userId');
                    res.send(product).status(200);
                }
                else {
                    res.send(false);
                }
            }
            catch (e) {
                console.log(e);
                // next(e)
            }
        });
    }
    getProductsBySection(req, res) {
        const sort = {};
        if (req.query.sortBy && req.query.orderBy)
            sort[req.query.sortBy] = req.query.orderBy === 'desc' ? -1 : 1;
        const section = req.params.section;
        product_1.default.paginate({ section }, {
            sort: sort,
            limit: 12,
            page: +req.query.page || 1
        })
            .then(pageObj => {
            console.log(res);
            res.status(200).send(pageObj);
        })
            .catch(err => {
            console.log(err);
            // next(err);
        });
    }
    ;
};
__decorate([
    core_1.Get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "getIndex", null);
__decorate([
    core_1.Get('products/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ShopController.prototype, "getProduct", null);
__decorate([
    core_1.Get('products/section/:section'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ShopController.prototype, "getProductsBySection", null);
ShopController = __decorate([
    core_1.Controller('api')
], ShopController);
exports.ShopController = ShopController;
