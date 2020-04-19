import { Application } from 'express-serve-static-core';
import { Logger } from '@overnightjs/logger';
import request from 'supertest'

import AppServer from '../appServer'
import { connectDb } from '../config';
import { IProduct } from '../models/product';


describe('USER', () => {
  let app: Application
  beforeAll(
    async (done) => {
      try {
        await connectDb()
        app = new AppServer().appInstance
        done()
      } catch (error) {
        done(error.message)
      }
    }
  )

  describe('POST /admin/add-product', () => {
    it('should add product', (done) => {
      const product /*: IProduct */ = {
        title: 'ali 601',
        price: 125,
        description: 'ncns',
        imageUrl: 'd.png',
        section : 'laptops',
      }
      // console.log(app)
      request(app)
        .post('/api/admin/add-product')
        .set('x-Auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWxpIiwidXNlcklkIjoiNWRmNjI5ZTkzMzM3ODUyOTNhZmY2YmIyIiwiaWF0IjoxNTg1NTUwOTIzLCJleHAiOjE1ODU4MTAxMjN9.nkUaRwPxqrTQ1R4HVRS21kbkN8MdDR3Ku4dxg2HrLXk')
        .send(product)
        .expect(201)
        .end((err, {body}) => {
          if (err) {
            done(err.message)
          }
          Logger.Info(body,true)
          expect(body).not.toBe([])
          done()
        })
    })
  })

})