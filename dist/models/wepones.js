"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const weponeSchema = new mongoose_1.Schema({
    userID: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    wepone: {
        type: String,
        default: ""
    },
    amount: {
        type: Number,
        default: 0
    }
});
exports.default = (0, mongoose_1.model)('Wepone', weponeSchema);
