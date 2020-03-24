import { Schema, models, model, Types, Document,PaginateModel} from 'mongoose'
import mongoosePaginate from "mongoose-paginate-v2";
import { IUser } from './user';


export interface IProduct extends Document {
  title       : string
  price       : number
  description : string
  imageUrl    : string
  section     : string
  userId      : Types.ObjectId
  
}

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

productSchema.pre('remove', async function (next) {
  try {
    const id = this._id
    let users : IUser[] = await models['User'].find({ "cart.productId": id })
    users.forEach(user => {
      user.removeFromCart(id)
    });
    next()
  } catch (e) {
    next(e)
  }
})


const Product : PaginateModel<IProduct> = model<IProduct>('Product', productSchema) as PaginateModel<IProduct>;
export default Product