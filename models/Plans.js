import {model, models, Schema} from "mongoose";

const PlansSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    question: { type: Schema.Types.ObjectId, ref: 'Instructor'},
    rating: {type: Number, default: 4.0},
    price: {type: Number, default: 200},
    domain: {type: String, required: true},
    description: {type: String, required: true},
    totalclasses: {type: Number, required: true},
    time: {type: Number, required: true},
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
  
export const Plans = models?.Plans || model('Plans', PlansSchema);