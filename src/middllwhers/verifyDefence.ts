import {NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export default (req:Request,res:Response,next:NextFunction)=>{
    try {
        const token = req.headers['authorization']
        if(!token){
             res.status(401).json({
                err:"missing token"
            })
            return
        }
        const payload = verify(token,process.env.JWT_SECRET!);
        (req as any).user = payload
        if(!(payload as any).organization.startsWith("IDF"))
            {
            res.status(403).json({
                err:"you not defencer"
            })
        }
        next()
    } catch (error) {
        res.status(401).json({
            err:"how are you"
        })
    }
}