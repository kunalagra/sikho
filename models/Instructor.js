import {model, models, Schema} from "mongoose";

const InstructorSchema = new Schema({
  name: { type: String },
  age: { type: Number },
  gender: { type: String, enum: ['Male', 'Female'] },
  description: { type: String },
  city: {type: String},
  country: {type: String},
  phone: {type: String},
  rating: {type: Number, default: 50},
  plans: [{ type: Schema.Types.ObjectId, ref: 'Plan',default: [] }],
  courses: [{ type: Schema.Types.ObjectId, ref: 'LessonPlan',default: [] }],

  
}, {timestamps: true});

export const Instructor = models?.Instructor || model('Instructor', InstructorSchema);