"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const db_1 = require("./config/db");
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const httpServer = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        methods: "*"
    }
});
(0, db_1.conectToMongo)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// app.use("/api/users",userController)
// app.use('/api/admin',adminController)
// app.use('/api/votes',votesController)
// app.use("/api/candidates", candidatesController);
httpServer.listen(PORT, () => {
    console.log(`the server running on port ${PORT}`);
});
