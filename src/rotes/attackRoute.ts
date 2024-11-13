import { Request, Response } from "express";
import userDTO from "../DTO/userDTO";
import { attack } from "../services/attackService";
import attackDTO from "../DTO/attackDTO";

export const handleAttack = async(
    req:Request <any,any ,attackDTO>
    ,res:Response
)=>{
    console.log("attack");
    try {                
        const result = await attack(req.body)
        res.send(result)
        return
    } catch (error) {
        console.log(error);
    }
}