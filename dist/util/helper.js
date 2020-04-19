"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const extended_1 = require("../@types/extended/extended");
class Helper {
    static validResult(req) {
        const errs = express_validator_1.validationResult(req);
        if (!errs.isEmpty()) {
            for (const err of errs.array()) {
                const e = new extended_1.Err(`${err.msg} in ${err.param} input!`);
                e.statusCode = 422;
                e.data = errs.array();
                console.log(e);
                throw e;
            }
        }
    }
}
exports.default = Helper;
