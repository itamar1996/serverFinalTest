import bcrypt from "bcrypt";
import userDTO from "../DTO/userDTO";
import User, { IUser } from "../models/user";
import loginDTO from "../DTO/loginDTO";
import jwt from 'jsonwebtoken';
import organizations from '../data/organizations.json'
import wepones from "../models/wepones";

export const seedData = async (): Promise<void> => {
    try {
        for (const element of organizations) {
            const user  = new User({
                username: element.name,
                password: await bcrypt.hash('123',10),
                organization:element.name,
                area:element.area
            })
            await user.save()
            for (const resource of element.resources) {
                const wepone = new wepones({
                    userID: user._id,
                    wepone: resource.name,
                    amount: resource.amount,
                });
                await wepone.save()
            }
        }
        console.log("seed sucses");
        
        return
    } catch (error) {
        console.log("eror register",error);
        return
    }
};
export const registerUser = async (userDetails: userDTO): Promise<IUser | void> => {
    try {
        const hashedPassword = await bcrypt.hash(userDetails.password, 10);

    const user = new User({
        username: userDetails.username,
        password: hashedPassword,
        organization:userDetails.organization,
        area:userDetails.area
    });

    const savedUser = await user.save(); 

    return savedUser;

    } catch (error) {
        console.log("eror register",error);
        return
    }
};
export const loginUser = async (userDetails: loginDTO)=> {
    try {
        const user = await User.findOne({ username: userDetails.username }).lean();
        if (!user) {
            return{                
                code:403,
                msg:"user not found"
            }
        }
        const isPasswordMatch = await bcrypt.compare(userDetails.password, user.password)
        if(!isPasswordMatch){
            return{                
                code:403,
                msg:"password not match"
            }        
        }
    const token = await jwt.sign({
        user_id:user.id,
        username:user.username,
        organization:user.organization
    },process.env.JWT_SECRET!,{expiresIn:"10m"})

    return {...user , token , password: "**********"}; 
    } catch (error) {
        console.log("eror register",error);
        throw error
    }
};