import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js"


dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use( express.json());
app.use(cookieParser());

app.use("/api/v1/auth",authRoute)

mongoose.set( "strictQuery", false )

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


dbConnect().then( () =>
{
    app.listen( port );
    console.log( `app listening on port ${ port }` );
} )
.catch((error)=>{
    console.log("erroorrrr in port",error)
})
