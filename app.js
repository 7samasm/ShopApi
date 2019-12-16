const path           = require('path');
const express        = require('express');
const bodyParser     = require('body-parser');
const cors           = require('cors');
const mongoose       = require('mongoose');
const config         = require('./config');
const errorController= require('./controllers/error');
const User           = require('./models/user');
const adminRoutes    = require('./routes/admin');
const shopRoutes     = require('./routes/shop');


const app = express();

// middlewares funcs
app.use(bodyParser.json());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

//middlewares routes 
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

const port = process.env.PORT || 3001;

//conect to db
const db = mongoose.connect(config.getDbConnectionString(),{useMongoClient : true} , e => {
	if (e) {console.log('conection failed :(')}
})
  .then(result => {
    app.listen(port);
  })
  .catch(err => {
    console.log(err);
  });
  module.exports = app

