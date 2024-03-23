import {model, models, Schema} from "mongoose";

const PlanSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    instructor: { type: Schema.Types.ObjectId, ref: 'Instructor'},
    rating: {type: Number, default: 4.0},
    price: {type: Number, default: 200},
    domain: {type: String, required: true},
    description: {type: String, required: true},
    totalclasses: {type: Number, required: true},
    time: {type: Number, required: true},
    thumbnail: {type: String},
    lesson: [{type: Schema.Types.ObjectId, ref: 'LessonPlan'}],
    modules: [
      {
        id: {
          type: Number,
          required: true,
        },
        title: {
          type: String,
          required: true,
        }, 
        description: {
          type: String,
          required: true,
        },
        lessons: [
          {
            title: {
              type: String,
              required: true,
            },
            content: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
  });
  
export const Plan = models?.Plan || model('Plan', PlanSchema);