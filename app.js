const express        = require('express');
const bodyParser     = require('body-parser');
const cors           = require('cors');
const config         = require('./config');
const history        = require('./middleware/history')
const errorHandeler  = require('./middleware/errorHandler');
const adminRoutes    = require('./routes/admin');
const shopRoutes     = require('./routes/shop');

const app = express();

// middlewares funcs
app.use(bodyParser.json());
app.use(cors())
app.use(history(app,express))
app.use(express.static('public'));

//middlewares routes 
app.use('/api/admin', adminRoutes);
app.use('/api',shopRoutes);
app.use(errorHandeler);

const port = process.env.PORT || 3001; 

//conect to db
config.connectDb((err,res) => {
	if (err) return console.log(err.message)
	console.log(`server is runnig on port : ${port}`)
	app.listen(port);
})
module.exports = app