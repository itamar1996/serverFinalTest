import {Schema, Types,Document,model } from "mongoose"

export interface IUser extends Document {
    username:string
    password:string
    organization:string
    area:string
    wepone:[Types.ObjectId]
    actions:[Types.ObjectId]
}

const userSchema = new Schema<IUser>({
    username:{
        type:String,
    }, 
    password:String,
    organization:{
        type:String,
        default:""
    },
    area:{
        type:String,
        default:"",
        required:false
    },
    wepone:{
        type:[Types.ObjectId],
        default:[]
    },
    actions:{
        type:[Schema.Types.ObjectId],
        ref:'Actions',
        default:null
    }
})

export default model('User',userSchema)