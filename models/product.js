const mongoose  = require('mongoose');
const Users     = require('./user');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    section : {
        type: String,
        required: true        
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

// const user     = await User.findById(req.userId)
// const userwp   = await user.populate('cart.productId').execPopulate()
//findByIdAndRemove
productSchema.pre('remove', async function(next){
    try {
        // statements
        const id = this._id
        let users = await mongoose.models['User'].find({"cart.productId" : id})
        users.forEach( function(el, index) {
            el.removeFromCart(id)
        });
        next()
    } catch(e) {
        // statements
        next(e)
    }
})

module.exports = mongoose.model('Product', productSchema);