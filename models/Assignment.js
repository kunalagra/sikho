import {model, models, Schema} from "mongoose";

const AssignmentSchema = new Schema({
    title: String,
    description: String,
    submissions: [
         {student: {type: Schema.Types.ObjectId, ref: 'User', required: True}
         ,solution: {type: String, required: True,
        grading: {type: Number}}
    }
    ]
})

export const Assignment = models?.Assignment || model('Assignment', AssignmentSchema);