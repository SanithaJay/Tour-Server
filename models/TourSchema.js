import mongoose from "mongoose";
const TourSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    distance:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    maxGroupSize:{
        type:Number,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    reviewCount:{
        type:Number,
    },
    reviewRating:{
        type:Number,
    },
    photo:{
        type:String,
        required:true,
    },
    featured:{
        type:Boolean,
        required:true
    }

});
export default mongoose.model("Tour",TourSchema);

