import mongoose from "mongoose";

const SubscribeSchema = new mongoose.Schema( {
    email: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
   

} );
export default mongoose.model( "Subscribe", SubscribeSchema );