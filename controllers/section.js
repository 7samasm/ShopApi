const Section = require('../models/section');

exports.getSections = async (req,res,next) => {
	try {
		const sections = await Section.find()
		res.status(200).send(sections)
	} catch(e) {
		next(e)
	}
}

exports.addSection = async (req,res,next) => {
	const name = req.body.name
	try {
		const match = await Section.findOne({name : name})
		if (match) throw new Error('section were found') 
		const section = new Section({name})
		res.status(201).send(await section.save())
	} catch(e) {
		next(e)
	}
}