import bcrypt from "bcrypt";
import userDTO from "../DTO/userDTO";
import User, { IUser } from "../models/user";
import loginDTO from "../DTO/loginDTO";
import jwt from 'jsonwebtoken';
import organizations from '../data/organizations.json'
import wepones from "../models/wepones";
import attackDTO from "../DTO/attackDTO";
import actions, { IAction } from "../models/actions";



export const attack = async (attackDeteles:attackDTO): Promise<void| IAction> => {
    try {
      console.log(attackDeteles.wepone);
      
        const wepone = await wepones.findOne({
            wepone: attackDeteles.wepone,
            userID: attackDeteles.userID
          });
          if(!wepone){
            console.log("wepone not found");
            return
          }
          if(wepone.amount == 0){
            console.log("wepone == 0");
            return
          }
          wepone.amount --
          await wepone.save()
          const action = new actions({
            userID : attackDeteles.userID,
            action:`attack by ${attackDeteles.wepone}`,
            status:"launched"
          })
          await action.save()
          console.log("attack sucses");
          
        return action
    } catch (error) {
        console.log("eror attack",error);
        return
    }
};