import { Controller, Get } from '@overnightjs/core'
import { Request, Response, NextFunction } from 'express-serve-static-core';
import { isValidObjectId } from 'mongoose'
import { Product } from '../models/product'

@Controller('api')
export class ShopController {

  @Get('/')
  private async getIndex(req: Request, res: Response, next: NextFunction) {
    const sort: { [prop: string]: number } = {}
    //check sortBy and orderBy url's query
    if (req.query.sortBy && req.query.orderBy)
      sort[req.query.sortBy] = req.query.orderBy === 'desc' ? -1 : 1
    try {
      const result = await Product.paginate({},
        {
          sort: sort,
          limit: +req.query.limit || 12,
          page: +req.query.page || 1
        }
      )
      res.status(200).send(result)
    } catch (error) {
      next(error)
    }
  }

  @Get('products/:id')
  private async getProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const prodId = req.params.id;
      if (isValidObjectId(prodId)) {
        const product = await Product.findById(prodId)
          .populate('userId', '-cart -password')
          .populate({
            path: 'comments',
            populate: { path: 'userId', select: 'name email' }
          })
        res.send(product).status(200)
      } else {
        res.send(false)
      }
    } catch (e) {
      next(e)
    }
  }

  @Get('products/section/:section')
  private async getProductsBySection(req: Request, res: Response, next: NextFunction) {
    const sort: { [prop: string]: number } = {}
    if (req.query.sortBy && req.query.orderBy)
      sort[req.query.sortBy] = req.query.orderBy === 'desc' ? -1 : 1
    const section = req.params.section;
    try {
      const result = await Product.paginate({ section },
        {
          sort: sort,
          limit: +req.query.limit || 12,
          page: +req.query.page || 1
        }
      )
      res.send(result).status(200)
    } catch (error) {
      next(error)
    }
  };

  @Get('products/stats/common')
  private async getMostCommonProducts(req: Request, res: Response, next: NextFunction) {
    const prods = await Product.aggregate([
      {$unwind: "$comments"},
      {$group   : { _id : this.mapValueKeys(),commentsCount : {$sum :1 } } },
      {$project : {...this.mapValueKeys('$_id.'),commentsCount: 1,}},
      {$sort : {commentsCount : -1}},
      {$limit : 3},
    ])
    res.json(prods);
  }

  private mapValueKeys(prefix : string = '$') : {[k : string] : string}{
    let keys = ['_id','title','description','imageUrl']
    const obj : {[k : string] : string} = {}
    for(let key of keys)
      obj[key] = prefix + key
    return obj
  }

}