// const history        = require('connect-history-api-fallback');
import history from 'connect-history-api-fallback'
import {static as staticFiles,RequestHandler} from 'express'
import App from '../app'

export default (app : App) => {

	const middlewere : RequestHandler = (req,res,next) => {
		// dont apply history when req api
		if (req.path.startsWith('/api')) {
			next()
		} else {
			app.getApp().use(staticFiles('public'))
			history()(req,res,next)		
		}
  }
  return middlewere
}