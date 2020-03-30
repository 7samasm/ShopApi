import { Controller, Middleware, ClassErrorMiddleware, Get, Post, Delete, Put } from '@overnightjs/core'
import { Request, Response , NextFunction} from 'express'
import { isValidObjectId, Types } from 'mongoose'
import { pick } from 'lodash'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import Product, { IProduct } from '../models/product'
import User, { IUser } from '../models/user'
import isAuth   from '../middleware/isAuth'
import {login_validate, product_validate, register_validate } from '../middleware/inputValidate'
import errMiddleware from '../middleware/errorMiddleware'
import uplodeMiddleware from '../middleware/uplodeMiddleware'
import Helper from '../util/helper';
import { Err } from '../@types/extended/extended';


@Controller('api/admin')
@ClassErrorMiddleware(errMiddleware)
export class UserController {

  @Post('cart')
  @Middleware([isAuth])
  async postCart(req: Request, res: Response,  next : NextFunction) {
    try {
      const { productId, quantity } = req.body
      const user:IUser       = await User.findById((req as any).userId) as IUser
      const product:IProduct = await Product.findById(productId) as IProduct
      const result:IUser     = await user.addToCart(product, quantity)
      res.status(201).send(result)
    } catch (e) {
      next(e)
    }
  };

  @Delete('cart')
  @Middleware([isAuth])
  async deleteCartItem(req: Request, res: Response,  next : NextFunction) {
    try {
      const { productId } = req.body;
      const user = await User.findById((req as any).userId) as IUser
      await user.removeFromCart(productId)
      res.send('deleated').status(200)
    } catch (e) {
      next(e)
    }
  }

  @Post('add-product')
  @Middleware([uplodeMiddleware('image'),...product_validate,isAuth])
  async addProduct(req: Request, res: Response, next : NextFunction) {
    try {
      // check inputs validation
      Helper.validResult(req)
      const body = pick(req.body, ['title', 'price', 'description', 'imageUrl', 'section'])
      // mutate image url with requsted uploded file if found
      if (req.file) body.imageUrl = req.file.filename
      const product = new Product({
        ...body,
        userId: (req as any).userId
      });
      res.status(201).send(await product.save())
    } catch (e) {
      next(e)
    }
  }

  @Put('edit-product')
  @Middleware([uplodeMiddleware('image'),...product_validate,isAuth])
  editProduct(req: Request, res: Response,  next : NextFunction) {
    try {
      // check inputs validation
      Helper.validResult(req)
      const prodId = req.body.productId;
      const body = pick(req.body, ['title', 'price', 'description', 'imageUrl', 'section']) as {[k : string] : any}
      // mutate image url with requsted uploded file if found
      if (req.file) body.imageUrl = req.file.filename
      Product.findById(prodId, (err, result) => {
        const doc : IProduct = result as IProduct
        if (err) return err
        for (const prop in body) {
          doc.set(prop, body[prop])
        }
        doc.save()
        res.status(200).send(doc)
      }).catch(e => console.log(e))

    } catch (e) {
      next(e)
    }
  }

  @Delete('delete-product')
  @Middleware([isAuth])
  async deleteProduct(req: Request, res: Response,  next : NextFunction) {
    try {
      const {productId} = req.body;
      const doc : IProduct = await Product.findById(productId) as IProduct
      doc.remove()
      res.status(200).send(doc)
    } catch (e) {
      next(e)
    }
  }

  @Get('products/:id')
  @Middleware([isAuth])
  async getUserProduct(req: Request, res: Response,  next : NextFunction) {
    try {
      const { id } = req.params;
      if (isValidObjectId(id)) {
        const userProds = await Product.findOne({ _id: id, userId: (req as any).userId })
        res.status(200).send(userProds)
      } else {
        res.send(false)
      }
    } catch (e) {
      next(e)
    }
  }

  @Get('user-info')
  @Middleware([isAuth])
  async getUserInfos(req: Request, res: Response,  next : NextFunction) {
    try {
      const userId = (req as any).userId;
      if (!isValidObjectId(userId)) throw new Error('id is invalid')
      const stat = await User.aggregate([
        //  select user who match requsted id
        { $match: { _id: Types.ObjectId(userId) } },
        // split his cart into several documonts
        {
          $unwind: {
            path: "$cart",
            preserveNullAndEmptyArrays: true
          }
        },
        // bring product's data for each splited document
        {
          $lookup: {
            from: "products",
            localField: "cart.productId",
            foreignField: "_id",
            as: "_cart"
          }
        },
        // will get singel doc cause look up applay for each ex unwind
        {
          $unwind: {
            path: "$_cart",
            preserveNullAndEmptyArrays: true
          }
        },
        // add quantity field to cart
        { $addFields: { "_cart.quantity": "$cart.quantity" } },
        // group spilted docs by user _id        
        {
          $group: {
            _id: {
              _id: "$_id",
              user: {
                id: "$_id",
                name: "$name",
                email: "$email"
              }
            },
            _cart: { $push: "$_cart" },
            totalPrice: { $sum: { $multiply: ["$_cart.price", "$_cart.quantity"] } },
            totalItems: { $sum: { $multiply: [1, "$_cart.quantity"] } }
          }
        },
        // bunddle to final output      
        {
          $project: {
            _id: 0,
            user: "$_id.user",
            cartShape: {
              products: { $cond: [{ $eq: ["$_cart", [{}]] }, [], "$_cart"] },
              totalPrice: "$totalPrice",
              totalItems: "$totalItems"
            }
          }
        }
      ]).exec()

      Product.find({ userId }, (err, docs) => {
        res.send({
          user: stat[0].user,
          cart: stat[0].cartShape,
          products: docs
        }).status(200)
      })
    }
    catch (e) {
      next(e)
    };
  }

  @Post('signup')
  @Middleware([...register_validate])
  private async signUp(req: Request, res: Response,  next : NextFunction) {
    try {
      // check inputs validation
      Helper.validResult(req)
      // get body values
      const body = pick(req.body, ['name', 'email', 'password'])
      // hashing password
      const hashedPass = await bcrypt.hash(body.password, 10)
      // mutate body's password whith hashedPass
      body.password = hashedPass
      const user = new User(body);
      res.status(201).send(await user.save())
    } catch (err) {
      next(err)
    }
  }

  @Post('login')
  @Middleware([...login_validate])
  private async login(req: Request, res: Response,  next : NextFunction) {
    try {
      // check inputs validation
      Helper.validResult(req)
      // get requested email and password
      const { email, password } = pick(req.body, ['email', 'password'])
      // get user by requested email and check if its found
      const user = await User.findOne({ email: email })
      if (!user) {
        const error = new Err('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      /*
        compare requested plain password whith user hashed pass 
        which i get from db and check it they're equil
      */
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        const error = new Err('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      // sign new token
      const token = jwt.sign(
        {
          name: user.name,
          userId: user._id.toString()
        },
        'someSecret',
        { expiresIn: '72h' }
      );
      res.status(200).json({ token, userId: user._id.toString() });
    } catch (e) {
      next(e)
    }
  }
}