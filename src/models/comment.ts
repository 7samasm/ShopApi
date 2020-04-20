import { Schema, model , Document} from 'mongoose'

export interface ICommentDocument extends Document {
  commentText: string,
  userId? : Schema.Types.ObjectId
}

const commentSchema = new Schema<ICommentDocument>(
  {
  	commentText : {
  		type: String,
  		required: true
    },
    userId : {
      type : Schema.Types.ObjectId,
      ref  : 'User',
      required : true
    }
  },
  { timestamps: true }
)

export const ProductComment =  model<ICommentDocument>('Comment', commentSchema);
