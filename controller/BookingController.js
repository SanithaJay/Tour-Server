import Booking from "../models/BookingSchema.js";
import User from "../models/UserSchema.js";
import Tour from "../models/TourSchema.js";

export const createBooking = async ( req, res, next ) =>
{
    const { fullname,phone, bookingDate,guests,amount } = req.body;

    const userId = req.userId;
    const tourId = req.params.id;

    console.log( "userid:", userId, "tourid:", tourId );

    const user = await User.findById( userId );
    const tour = await Tour.findById( tourId );

    //console.log( user );
    //console.log( tour );
    if ( !user )
    {
       return res.status( 404 ).json( { success: false, message: "Please Login" } );
    }
    if ( !tour )
    {

       return  res.status( 404 ).json( { success: false, message: "tour package not exist" } );
    }
    try
    {

        let booking = new Booking( {
            fullname,
            phone,
            bookingDate,
            user: {
                id: userId,
            },
            tour: {
                id: tourId,
            },
            guests,
            amount,

        } );
        await booking.save();



        res.status( 200 ).json( { success: true, message: "Booking Saved Successfully" } );
    }
    catch ( error )
    {
        console.log( "Error in booking!!! ", error )
        res.status( 500 ).json( { success: false, message: "Internal Server Error" } );
    }
}


