import {model, models, Schema} from "mongoose";

const ScheduleSchema = new Schema({
  lessons: { type: Schema.Types.ObjectId, ref: 'LessonPlan'},
//   reviews: [{ type: Schema.Types.ObjectId, ref: 'PeerVideoReview', default: [] }],
  start: { type: Date, required: True},
  end: { type: Date, required: True},
  meetid: {type: String},
  title: {type: String}
}, {timestamps: true});

export const Schedule = models?.Schedule || model('Schedule', ScheduleSchema);