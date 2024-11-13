"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const actionSchema = new mongoose_1.Schema({
    userID: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    action: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: ""
    }
});
exports.default = (0, mongoose_1.model)('Action', actionSchema);
