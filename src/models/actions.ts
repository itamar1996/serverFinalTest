import {Schema, Types,Document,model } from "mongoose"

export interface IAction extends Document {
    userID:Types.ObjectId
    action:string
    status:string
    area:string
}

const actionSchema = new Schema<IAction>({
    userID:{
        type:Schema.Types.ObjectId,
    }, 
    action:{
        type:String,
        default:""
    },
    status:{
        type:String,
        default:""
    },
    area:{
        type:String,
        default:""
    }
})

export default model('Action',actionSchema)