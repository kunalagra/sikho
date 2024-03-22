import {model, models, Schema} from "mongoose";

// Todo - Add Username as required
const UserSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String},
  userInfo: { type: Schema.Types.ObjectId, refPath: 'type'},
  type: {type: String, enum: ["Student","Instructor"], default: "Student" }
}, {timestamps: true});


export const User = models?.User || model('User', UserSchema);