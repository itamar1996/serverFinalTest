import express from "express";
import cors from "cors";
import 'dotenv/config';
import { conectToMongo } from "./config/db";
import userController from './controllers/userController';
import attackController from './controllers/attackController';
import http from 'http';
import { Server } from 'socket.io';
import verifyUser from "./middllwhers/verifyUser";
import { handleSocketConnection } from "./services/socketSevice";

const PORT = process.env.PORT || 3000;

const app = express();
const httpServer = http.createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: "*",
  },
}); 

io.on("connection", handleSocketConnection)

conectToMongo();

app.use(express.json());
app.use(cors());



app.use("/api/users", userController);
app.use("/api/attack", verifyUser, attackController);

httpServer.listen(PORT, () => {
  console.log(`the server running on port ${PORT}`);
});
