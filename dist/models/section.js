"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const sectionSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    }
});
exports.Section = mongoose_1.model('section', sectionSchema);
