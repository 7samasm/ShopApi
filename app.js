const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const mongoose = require('mongoose');
const config = require('./config');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.json());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5df0d4067f1f711b80506d0c')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const port = process.env.PORT || 3001;

//conect to db
const db = mongoose.connect(config.getDbConnectionString(),{useMongoClient : true} , e => {
	if (e) {console.log('conection failed :(')}
})
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Max',
          email: 'max@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(port);
  })
  .catch(err => {
    console.log(err);
  });
