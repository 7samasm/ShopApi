// const request = require('supertest')
// const app = require('../app')
import request from 'supertest'
import AppServer from '../appServer'
import { connectDb } from '../config';
import { Application } from 'express-serve-static-core';


describe('user',()=>{
    let app : Application
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

  describe('GET /', () => {
    it('should get all Products', (done) => { 
      request(app)
        .get('/api')
        .expect(200)
        .end((err, res) => {
          if (err) done(err.message)
          console.log(res.body)
          done()
        })
    })
  })
})





// describe('POST /admin/add-product',()=>{
//     it('should add product',(done)=>{
//         // console.log(app)
//         request(app)
//         .post('/admin/add-product')
//         .set('x-Auth','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWxpIiwidXNlcklkIjoiNWRmNjI5ZTkzMzM3ODUyOTNhZmY2YmIyIiwiaWF0IjoxNTc2NDI4NDQxLCJleHAiOjE1NzY2ODc2NDF9.9kz-We5caBTYv9jJNsC-qwuopfOkj1EKmU1JzdcAzdQ')
//         .send({
//             title : 'ali 6',
//             price : 125,
//             description : 'ncns',
//             imageUrl : 'd.png',
//         })
//         .expect(201)
//         .end((err,res)=>{
//             if(err){
//                 done(err.message)
//             }
//             // console.log(res.body)
//             expect(res.body).not.toBe([])
//             done()
//         })
//     })
// })