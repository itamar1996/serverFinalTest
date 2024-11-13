import {Schema, Types,Document,model } from "mongoose"

export interface IWepone extends Document {
    userID:Types.ObjectId
    wepone:string
    amount:number
}

const actionSchema = new Schema<IWepone>({
    userID:{
        type:Schema.Types.ObjectId,
    }, 
    wepone:{
        type:String,
        default:""
    },
    amount:{
        type:Number,
        default:0
    }
})

export default model('Action',actionSchema)