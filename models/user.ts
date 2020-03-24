import { Schema, model,Document} from 'mongoose'
import Product from "./product"

export interface IUser extends Document {
  name : string
  email: string
  password : string
  cart : any[]
  addToCart(id : any, quantity : number) : Promise<this>
  removeFromCart(productId : any) : Promise<this>
}


const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cart: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: { type: Number, required: true }
    }
  ]
});

//middlewares

userSchema.post("remove", doc => {
  Product.deleteMany({ userId: doc._id })
})

// methods
userSchema.methods.addToCart = function ({ _id }: any, quty: number) {
  // index num or -1
  const productIndexInCart = this.cart.findIndex((el: any) => {
    return el.productId.toString() === _id.toString();
  });

  const cartItemsCopy = [...this.cart];

  if (productIndexInCart >= 0) {
    let newQuantity = this.cart[productIndexInCart].quantity + quty;
    cartItemsCopy[productIndexInCart].quantity = newQuantity;
  } else {
    // console.log(cartItemsCopy)
    cartItemsCopy.push({
      productId: _id,
      quantity: quty
    });
  }
  this.cart = cartItemsCopy;
  return this.save();
};

userSchema.methods.removeFromCart = function (productId : any) {
  const cartItemsCopy = this.cart.filter((item : any) => {
    return item.productId.toString() !== productId.toString();
  });
  this.cart = cartItemsCopy;
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = []
  return this.save();
};

export default model<IUser>('User', userSchema);
