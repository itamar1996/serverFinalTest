import { Request, Response } from "express";
import { attack, intercepted , getAttacks, getWepones, getAttacksById } from "../services/attackService";
import attackDTO from "../DTO/attackDTO";
import { verify } from "jsonwebtoken";
import intersptedDTO from "../DTO/intersptedDTO";

export const handleAttack = async(
    req:Request <any,any ,attackDTO>
    ,res:Response
)=>{
    try {           
        const token = req.headers['authorization']
        const payload = verify(token!,process.env.JWT_SECRET!);

        const id = (payload as any).user_id                
        const result = await attack(req.body,id)        
        res.send(result)
        return
    } catch (error) {
        console.log(error);
    }
}
export const handleDefence = async(
    req:Request <any,any ,intersptedDTO>
    ,res:Response
)=>{
    try {                
        const token = req.headers['authorization']
        const payload = verify(token!,process.env.JWT_SECRET!);
        const id = (payload as any).user_id    
        const result = await intercepted(req.body,id)
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
        const token = req.headers['authorization']
        const payload = verify(token!,process.env.JWT_SECRET!);

        const id = (payload as any).user_id    
        const area = req.params.area    
        const result = await getAttacks(area,id)
        res.send(result)
        return
    } catch (error) {
        console.log(error);
    }
}
export const handleGetAttacksById = async(
    req:Request
    ,res:Response
)=>{
    try {            
        const token = req.headers['authorization']
        const payload = verify(token!,process.env.JWT_SECRET!);

        const id = (payload as any).user_id   
        const result = await getAttacksById(id)
        res.send(result)
        return
    } catch (error) {
        console.log(error);
    }
}
export const handleGetWepones = async(
    req:Request
    ,res:Response
)=>{
    try {       
        const token = req.headers['authorization']
        const payload = verify(token!,process.env.JWT_SECRET!);

        const id = (payload as any).user_id
            
        const result = await getWepones(id)
        res.send(result)
        return
    } catch (error) {
        console.log(error);
    }
}

