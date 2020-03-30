import { validationResult } from "express-validator";
import { Request } from "express-serve-static-core";
import {  Err } from "../@types/extended/extended";

export default class Helper {
  static validResult (req : Request) : void {
    const errs  = validationResult(req) ;
    if (!errs.isEmpty()) {
      for (const err of errs.array()) {
        const e  = new Err(`${err.msg} in ${err.param} input!`)
        e.statusCode = 422
        e.data = errs.array()
        console.log(e)
        throw e
      }
    }
  }
}