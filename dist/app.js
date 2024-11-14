"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const db_1 = require("./config/db");
const userController_1 = __importDefault(require("./controllers/userController"));
const attackController_1 = __importDefault(require("./controllers/attackController"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const verifyUser_1 = __importDefault(require("./middllwhers/verifyUser"));
const socketSevice_1 = require("./services/socketSevice");
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        methods: "*",
    },
});
exports.io.on("connection", socketSevice_1.handleSocketConnection);
(0, db_1.conectToMongo)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/users", userController_1.default);
app.use("/api/attack", verifyUser_1.default, attackController_1.default);
httpServer.listen(PORT, () => {
    console.log(`the server running on port ${PORT}`);
});
