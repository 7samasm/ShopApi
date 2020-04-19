import { Controller, Get, Post } from '@overnightjs/core'
import { Request, Response, NextFunction } from 'express-serve-static-core'
import {Section} from '../models/section'

@Controller('api/sections')
export class SectionController {

	@Get('')
	private async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const sections = await Section.find()
			res.status(200).send(sections)
		} catch (e) {
			next(e)
		}
	}

	@Post('')
	private async addSection(req: Request, res: Response, next: NextFunction) {
		const { name } = req.body
		try {
			const match = await Section.findOne({ name })
			if (match) throw new Error('section were found')
			const section = new Section({ name })
			res.status(201).send(await section.save())
		} catch (e) {
			next(e)
		}
	}

}