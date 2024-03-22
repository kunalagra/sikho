import {model, models, Schema} from "mongoose";

const QueueSchema = Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' }, 
    PeerVideo: { type: Schema.Types.ObjectId, ref: 'PeerVideo' }, 
    userRating: { type: Number },
    assigned: [{ type: Schema.Types.ObjectId, ref: 'User' ,default: []}]
});

export const Queue = models?.Queue || model('Queue', QueueSchema);