import mongoose from "mongoose";


const ReviewSchema = new mongoose.Schema( {
    star: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        id: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        },
        name: {
            type: String,
            required: true,
        }
    },
    tour: {
        id: {
            type: mongoose.Schema.ObjectId,
            ref: "Tour",
            //required: true

        }
    },
    comments: {
        type: String,
        required: true,
    }

} );
export default mongoose.model( "Review", ReviewSchema );