const history        = require('connect-history-api-fallback');

module.exports = (app,express) => {

	return (req,res,next) => {
		// dont apply history when req api
		if (req.path.startsWith('/api')) {
			next()
		} else {
			app.use(express.static('public'));
			history()(req,res,next)		
		}
	}
}