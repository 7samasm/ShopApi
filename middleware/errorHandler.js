module.exports = (err,req,res,next) => {
	console.log(`${err.message} status code is ${err.statusCode}`)
	const status = err.statusCode || 500
	const message= err.message
	res.status(status).json({error : message})
}