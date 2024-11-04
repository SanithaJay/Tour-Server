import Tour from "../models/TourSchema.js";
import User from "../models/UserSchema.js"


export const newTour = async ( req, res, next ) =>
{
    const { title, city, address, distance, price, maxGroupSize, desc, photo, featured } = req.body;
    const userId = req.userId;
    console.log("In controller")


    try
    {
        let tour = new Tour( {
            title,
            city,
            address,
            distance,
            price,
            maxGroupSize,
            desc,
            photo,
            featured
        } );
        await tour.save();
        res.status( 200 ).json( { success: true, message: "Tour details saved suucessfully" } )
    }

    catch ( error )
    {
        //console.log("errorr in controllerrr!!:",error)
        res.status( 500 ).json( { success: false, message: "Internal Server error" } );
    }
}