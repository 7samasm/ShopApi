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
userSchema.methods.addToCart = function({_id},quty) {
    // index num or -1
    const productIndexInCart = this.cart.findIndex(el => {
        return el.productId.toString() === _id.toString();
    });
    
    const cartItemsCopy = [...this.cart];

    if (productIndexInCart >= 0) {
        let newQuantity = this.cart[productIndexInCart].quantity + quty;
        cartItemsCopy[productIndexInCart].quantity = newQuantity;
    } else {
        // console.log(cartItemsCopy)
        cartItemsCopy.push({
            productId : _id,
            quantity: quty
        });
    }
    this.cart = cartItemsCopy;
    return this.save();
};

userSchema.methods.removeFromCart = function(productId) {
    const cartItemsCopy = this.cart.filter(item => {
        return item.productId.toString() !== productId.toString();
    });
    this.cart = cartItemsCopy;
    return this.save();
};

userSchema.methods.clearCart = function() {
    this.cart = []
    return this.save();
};

module.exports = mongoose.model('User', userSchema);
