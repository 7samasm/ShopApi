// const configValues = require('./config');
import { connect } from "mongoose";

const configValues = {
	db: "shop",
	uname: "7admin",
	pwd: "umTR@x7.b_whAC6",
	mode: "dev"
}

const getDbConnectionString = () => {
	if (configValues.mode !== "dev")
		return `mongodb://${configValues.uname}:${encodeURIComponent(configValues.pwd)}@ds257648.mlab.com:57648/${configValues.db}`;
	return `mongodb://localhost:27017/${configValues.db}`
}



export const connectDb = async () => {

	return connect(
		getDbConnectionString(),
		{ useNewUrlParser: true, useUnifiedTopology: true }
		// err => {
		// 	if (err) throw new Error('conection failed :(')
		// }
	)

}

