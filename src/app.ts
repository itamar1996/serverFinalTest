import  express  from "express";
import 'dotenv/config'
import { conectToMongo } from "./config/db";
import userController from './controllers/userController'
import attackController from './controllers/attackController'

import cors from 'cors';
import http from 'http'
import {Server} from 'socket.io'


const app = express()
const PORT = process.env.PORT || 3000
const httpServer = http.createServer(app)
export const io = new Server(httpServer,{
    cors:{
        origin:"*",
        methods:"*"
    }
})


conectToMongo()
app.use(cors());
app.use(express.json())
app.use("/api/users",userController)
app.use("/api/attack",attackController)
// app.use('/api/votes',votesController)
// app.use("/api/candidates", candidatesController);

httpServer.listen(PORT,()=>{    
    console.log(`the server running on port ${PORT}`)    
})