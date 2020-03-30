import {Controller, Get} from '@overnightjs/core'
import {Logger}  from '@overnightjs/logger'
import {Request,Response} from 'express'
import {isValidObjectId} from 'mongoose'
import Product from '../models/product'

@Controller('api')
export class ShopController {

  @Get('/')
  private getIndex(req : Request,res : Response)  {
    const sort : {[prop : string] : number} = {}
    //check sortBy and orderBy url's query
    if (req.query.sortBy && req.query.orderBy)
    sort[req.query.sortBy] = req.query.orderBy === 'desc' ? -1 : 1
    Product.paginate(
      {},
      {
      sort  : sort,
      limit : +req.query.limit || 12,
      page  : +req.query.page  || 1
      },
      (err,result) => {
        if (err) return Logger.Err(err)
        res.status(200).send(result)
      }
    )
  }

  @Get('products/:id')
  private async getProduct(req : Request, res : Response) {
    try {
      const prodId = req.params.id;
      if (isValidObjectId(prodId)) {
        const product = await Product.findById(prodId)
          .populate('userId')
        res.send(product).status(200)
      } else {
        res.send(false)
      }
    } catch (e) {
      console.log(e)
      // next(e)
    }
  }

  @Get('products/section/:section')
  private getProductsBySection(req : Request, res : Response) {
    const sort : {[prop : string] : number} = {}
    if (req.query.sortBy && req.query.orderBy)
      sort[req.query.sortBy] = req.query.orderBy === 'desc' ? -1 : 1
    const section = req.params.section;
    Product.paginate({ section }, {
      sort: sort,
      limit: 12,
      page: +req.query.page || 1
    })
      .then(pageObj => {
        console.log(res);
        res.status(200).send(pageObj)
      })
      .catch(err => {
        console.log(err)
        // next(err);
      });
  };

}