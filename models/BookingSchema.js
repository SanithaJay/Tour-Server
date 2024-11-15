import mongoose from "mongoose";
const BookingSchema=new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    phone:{
        type:Number,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    bookingDate:{
        type:Date,
    },
    user: {
        id: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        },
       
    },
    tour: {
        id: {
            type: mongoose.Schema.ObjectId,
            ref: "Tour",
            //required: true

        }
    },
    guests: {
        type: Number,
        required: true,
    },
    amount:{
        type:Number,
        required:true,
        Default:0.0
    }

});
export default mongoose.model("Booking",BookingSchema);

