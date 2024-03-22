import {model, models, Schema} from "mongoose";

const LessonPlanSchema = new Schema({
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    student: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    plan: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
    objectives: [{ type: String }],
    topics: [{ type: String }],
    resources: [{ type: String }],
    schedule: {
      startDate: { type: Date, required: true },
      endDate: { type: Date },
      frequency: { type: String },
    },
    status: { type: String, enum: ['draft', 'active', 'completed'], default: 'draft' },
    createdAt: { type: Date, default: Date.now },  
  });
  
export const LessonPlan = models?.LessonPlan || model('LessonPlan', LessonPlanSchema);