import {model, models, Schema} from "mongoose";

const StudentSchema = new Schema({
  name: { type: String },
  age: { type: Number },
  gender: { type: String, enum: ['Male', 'Female'] },
  college: { type: String },
  city: {type: String},
  country: {type: String},
  phone: {type: String},
  lessons: [{ type: Schema.Types.ObjectId, ref: 'LessonPlan',default: [] }],
  peerVideo: [{ type: Schema.Types.ObjectId, ref: 'PeerVideo', default: [] }],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'PeerVideoReview', default: [] }],
  rating: {type: Number, default: 50},
  assigned: [{ type: Schema.Types.ObjectId, ref: 'Queue', default: [],  }],
  assignedTime: [{ type: Date,  default: [],  }],
  amount: {type: Number, default: 0}
}, {timestamps: true});

export const Student = models?.Student || model('Student', StudentSchema);