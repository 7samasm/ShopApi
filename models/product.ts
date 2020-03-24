import { Schema, models, model, Types, Document,PaginateModel} from 'mongoose'
import mongoosePaginate from "mongoose-paginate-v2";


export interface IProduct extends Document {
  title       : string
  price       : number
  description : string
  imageUrl    : string
  section     : string
  userId      : Types.ObjectId
  
}
interface IProductModel<T extends Document> extends PaginateModel<T>{}

const productSchema = new Schema(
  {
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
    section: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

productSchema.plugin(mongoosePaginate);

// const user     = await User.findById(req.userId)
// const userwp   = await user.populate('cart.productId').execPopulate()
//findByIdAndRemove
productSchema.pre('remove', async function (next) {
  try {
    // statements
    const id = this._id
    let users = await models['User'].find({ "cart.productId": id })
    users.forEach(el => {
      el.removeFromCart(id)
    });
    next()
  } catch (e) {
    // statements
    next(e)
  }
})
const Product : IProductModel<IProduct> = model<IProduct>('Product', productSchema) as IProductModel<IProduct>;
export default Product