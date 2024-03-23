import {model, models, Schema} from "mongoose";

const AssignmentSchema = new Schema({
    title: String,
    description: String,
    start: {type: Date, default: Date.now},
    end: {type: Date},
    submissions: [
         {
        student: {type: Schema.Types.ObjectId, ref: 'User'},
        solution: {type: String},
        grading: {type: Number},
        submitTime: {type: Date, default: Date.now}
    }
    ]
})

export const Assignment = models?.Assignment || model('Assignment', AssignmentSchema);