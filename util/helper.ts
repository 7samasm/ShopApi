import { validationResult } from "express-validator";
import { Request } from "express-serve-static-core";
import { Err } from "../middleware/isAuth";

export default class Helper {
  static validResult (req : Request) : void {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
      for (const err of errs.errors) {
        const e = new Err(`${err.msg} in ${err.param} input!`)
        e.statusCode = 422
        e.data = errs.array()
        throw e
      }
    }
  }
}