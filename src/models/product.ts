import { Schema, models, model, Document,PaginateModel} from 'mongoose'
import mongoosePaginate from "mongoose-paginate-v2";
import { IUserDocument } from './user';
import { ICommentDocument } from './comment';
import { returnStatement } from '@babel/types';


export interface IProduct  {
  title       : string
  price       : number
  description : string
  imageUrl    : string
  section     : string
  userId?     : Schema.Types.ObjectId,
  comments    : any[]
}

export interface IProductDocument extends IProduct,Document {
  addToComments(cmt : ICommentDocument) : Promise<this>
}

const productSchema = new Schema<IProductDocument>(
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
    },
    comments : [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      }
    ]
  },
  { timestamps: true }
);

productSchema.plugin(mongoosePaginate);

productSchema.pre('remove', async function (next) {
  try {
    const id = this._id
    let users : IUserDocument[] = await models['User'].find({ "cart.productId": id })
    users.forEach(user => {
      user.removeFromCart(id)
    });
    next()
  } catch (e) {
    next(e)
  }
})

// methods
productSchema.methods.addToComments = function (cmt : ICommentDocument) {
  const commentsCopy = [...this.comments]
  commentsCopy.push(cmt._id)
  this.comments = commentsCopy
  return this.save()
}


export const Product  = model<IProductDocument,PaginateModel<IProductDocument>>('Product', productSchema);