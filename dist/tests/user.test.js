"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const request = require('supertest')
// const app = require('../app')
const supertest_1 = __importDefault(require("supertest"));
const start_1 = __importDefault(require("../start"));
describe('GET /', () => {
    it('should get all Products', (done) => {
        // console.log(app)
        supertest_1.default(start_1.default)
            .get('/')
            .expect(200)
            .end((err, res) => {
            if (err) {
                done(err.message);
            }
            done();
        });
    });
});
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
