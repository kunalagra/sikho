import {model, models, Schema} from "mongoose";

const PeerVideoReviewSchema = Schema({
    reviewer: { type: Schema.Types.ObjectId, ref: 'User' }, 
    PeerVideo: { type: Schema.Types.ObjectId, ref: 'PeerVideo' }, 
    rating: { type: Number }, 
    comment: { type: String}, 
    reviewTime: { type: Date },
    feedback: Number
});

export const PeerVideoReview = models?.PeerVideoReview || model('PeerVideoReview', PeerVideoReviewSchema);