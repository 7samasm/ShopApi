import { ErrorRequestHandler } from "express";
import { Logger } from "@overnightjs/logger";


const middleware : ErrorRequestHandler =  (err,req,res,next) => {
  Logger.Warn(`${err.message} status code is ${err.statusCode}`)
	const status = err.statusCode || 500
	const message= err.message
  res.status(status).json({error : message})
}

export default middleware