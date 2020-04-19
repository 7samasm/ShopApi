"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const request = require('supertest')
// const app = require('../app')
const supertest_1 = __importDefault(require("supertest"));
const appServer_1 = __importDefault(require("../appServer"));
const config_1 = require("../config");
describe('PRODUCT', () => {
    let app;
    beforeAll((done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield config_1.connectDb();
            app = new appServer_1.default().appInstance;
            done();
        }
        catch (error) {
            done(error.message);
        }
    }));
    describe('GET /', () => {
        it('should get all products', (done) => {
            supertest_1.default(app)
                .get('/api')
                .expect(200)
                .end((err, res) => {
                if (err)
                    done(err.message);
                expect(res.body.docs.length).toBeGreaterThan(1);
                done();
            });
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
