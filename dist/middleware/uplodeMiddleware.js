"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
exports.default = (postedFile) => {
    const fileStorage = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/img');
        },
        filename: (req, file, cb) => {
            cb(null, new Date().toISOString() + '-' + file.originalname);
        }
    });
    const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg') {
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    };
    return multer_1.default({ storage: fileStorage, fileFilter: fileFilter }).single(postedFile);
};
