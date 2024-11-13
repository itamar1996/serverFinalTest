"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
    },
    password: String,
    organization: {
        type: String,
        default: ""
    },
    area: {
        type: String,
        default: "",
        required: false
    },
    wepone: {
        type: [mongoose_1.Types.ObjectId],
        default: []
    },
    actions: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'Actions',
        default: null
    }
});
exports.default = (0, mongoose_1.model)('User', userSchema);
