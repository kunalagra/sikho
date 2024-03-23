import {model, models, Schema} from "mongoose";

const AssignmentSchema = new Schema({
    title: String,
    description: String,
    start: {type: Date, default: Date.now},
    end: {type: Date},
    submissions: [
         {student: {type: Schema.Types.ObjectId, ref: 'User', required: True}
         ,solution: {type: String, required: True,
        grading: {type: Number}}
    }
    ]
})

export const Assignment = models?.Assignment || model('Assignment', AssignmentSchema);