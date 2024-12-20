import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import tourRoute from  "./routes/tour.js";
import reviewRoute from "./routes/review.js";
import subscribeRoute from "./routes/subscribe.js";
import booking from "./routes/booking.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

mongoose.set( "strictQuery", false );



const dbConnect = async () =>
{
    try
    {
        await mongoose.connect( process.env.MONGO_URI );
        console.log( "DB Connection Established" );
    }
    catch ( error )
    {
        console.log( "DB Errorrr!!!!:", error )
    }
};


const coreOptions={
    origin:true,
    credentials:true,
}

app.use( express.json());
app.use(cookieParser());
app.use(cors(coreOptions));

app.use("/api/v1/auth",authRoute)
app.use("/api/v1/user",userRoute);
app.use("/api/v1/tour",tourRoute);
app.use("/api/v1/review",reviewRoute);
app.use("/api/v1/subscribe",subscribeRoute);
app.use("/api/v1/booking",booking);



dbConnect().then( () =>
{
    app.listen( port );
    console.log( `app listening on port ${ port }` );
} )
.catch((error)=>{
    console.log("erroorrrr in port",error)
})
