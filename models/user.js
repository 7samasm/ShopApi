const mongoose = require('mongoose');
const Product     = require('./product')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password : {
        type : String,
        required : true
    },
    products : [
        {
            type     : Schema.Types.ObjectId,
            ref      : 'Product',
            required : true
        }
    ],
    cart: [
        {
            productId : {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: { type: Number, required: true }
        }
    ]
});

//middlewares

userSchema.post("remove",doc => {
    Product.deleteMany({userId : doc._id})
})

// methods
userSchema.methods.addToCart = function(product) {
    const cartProductIndex = this.cart.findIndex(el => {
        return el.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart];

    if (cartProductIndex >= 0) {
        newQuantity = this.cart[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        // console.log(updatedCartItems)
        updatedCartItems.push({
            productId : product._id,
            quantity: newQuantity
        });
    }
    this.cart = updatedCartItems;
    return this.save();
};

userSchema.methods.removeFromCart = function(productId) {
    const updatedCartItems = this.cart.filter(item => {
        return item.productId.toString() !== productId.toString();
    });
    this.cart = updatedCartItems;
    return this.save();
};

userSchema.methods.clearCart = function() {
    this.cart = []
    return this.save();
};

userSchema.methods.generateAuthToken = function() {
    let user = this
}

module.exports = mongoose.model('User', userSchema);
