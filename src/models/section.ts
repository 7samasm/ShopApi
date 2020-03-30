import { Schema, model , Document} from 'mongoose'

export interface ISection extends Document {
	name: string
}

const sectionSchema = new Schema({

	name: {
		type: String,
		required: true
	}
})

export default model<ISection>('section', sectionSchema);
