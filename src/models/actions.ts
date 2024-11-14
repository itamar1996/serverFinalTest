import { Schema, Types, Document, model } from "mongoose";

export interface IAction extends Document {
  _id: string;
  userID: Types.ObjectId;
  action: string;
  status: string;
  area: string;
  isIntersptedable?: boolean;
  launchTime: Date;
}

const actionSchema = new Schema<IAction>({
  userID: {
    type: Schema.Types.ObjectId,
  },
  action: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "",
  },
  area: {
    type: String,
    default: "",
  },
  launchTime: {
    type: Date,
    default: Date.now, 
  },
});

export default model('Action', actionSchema);
