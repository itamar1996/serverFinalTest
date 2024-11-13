import { Request, Response } from "express";
import userDTO from "../DTO/userDTO";
import { attack, interpeted , getAttacks } from "../services/attackService";
import attackDTO from "../DTO/attackDTO";

export const handleAttack = async(
    req:Request <any,any ,attackDTO>
    ,res:Response
)=>{
    try {                
        const result = await attack(req.body)
        res.send(result)
        return
    } catch (error) {
        console.log(error);
    }
}
export const handleDefence = async(
    req:Request <any,any ,attackDTO>
    ,res:Response
)=>{
    try {                
        const result = await interpeted(req.body)
        res.send(result)
        return
    } catch (error) {
        console.log(error);
    }
}
export const handleGetAttacks = async(
    req:Request <any,any ,attackDTO>
    ,res:Response
)=>{
    try {            
        const area = req.params.area    
        const result = await getAttacks(area)
        res.send(result)
        return
    } catch (error) {
        console.log(error);
    }
}

