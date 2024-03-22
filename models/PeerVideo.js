import {model, models, Schema} from "mongoose";

const PeerVideoSchema = Schema({
    question: { type: Schema.Types.ObjectId, ref: 'Question' },
    videoUrl: { type: String, required: true },
    submissionTime: { type: Date, default: Date.now },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'PeerVideoReview' }],
});

export const PeerVideo = models?.PeerVideo || model('PeerVideo', PeerVideoSchema);
