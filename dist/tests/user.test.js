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
const logger_1 = require("@overnightjs/logger");
const supertest_1 = __importDefault(require("supertest"));
const appServer_1 = __importDefault(require("../appServer"));
const config_1 = require("../config");
describe('USER', () => {
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
    describe('POST /admin/add-product', () => {
        it('should add product', (done) => {
            const product /*: IProduct */ = {
                title: 'ali 601',
                price: 125,
                description: 'ncns',
                imageUrl: 'd.png',
                section: 'laptops',
            };
            // console.log(app)
            supertest_1.default(app)
                .post('/api/admin/add-product')
                .set('x-Auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWxpIiwidXNlcklkIjoiNWRmNjI5ZTkzMzM3ODUyOTNhZmY2YmIyIiwiaWF0IjoxNTg1NTUwOTIzLCJleHAiOjE1ODU4MTAxMjN9.nkUaRwPxqrTQ1R4HVRS21kbkN8MdDR3Ku4dxg2HrLXk')
                .send(product)
                .expect(201)
                .end((err, { body }) => {
                if (err) {
                    done(err.message);
                }
                logger_1.Logger.Info(body, true);
                expect(body).not.toBe([]);
                done();
            });
        });
    });
});
