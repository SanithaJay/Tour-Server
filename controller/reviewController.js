import Review from "../models/ReviewSchema.js";
import User from "../models/UserSchema.js";
import Tour from "../models/TourSchema.js";
import { request } from "express";

export const createReview = async ( req, res, next ) =>
{
    const { star, comments } = req.body;

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

        let review = new Review( {
            star,
            comments,
            user: {
                id: userId,
                name: user.name,
            },
            tour: {
                id: tourId,
            }
        } );
        await review.save();


        tour.reviewCount = ( tour.reviewCount || 0 ) + 1;

        const reviews = await Review.find( { "tour.id": tourId } );
        const totalStars = reviews.reduce( ( acc, review ) => acc + review.star, 0 );
        const averageRating = ( totalStars / reviews.length ).toFixed( 1 );

        tour.reviewRating = averageRating;

        /*  console.log("Total Star:",totalStars);
         console.log( "ReviewCount:", tour.reviewCount );
         console.log( "ReviewRating:", tour.reviewRating ); */

        await tour.save();

        res.status( 200 ).json( { success: true, message: "Review Saved Successfully" } );
    }
    catch ( error )
    {
        console.log( "Error in reviewww!!! ", error )
        res.status( 500 ).json( { success: false, message: "Internal Server Error" } );
    }
}

export const getAllReview = async ( req, res, next ) =>
    {
        try
        {
            const review = await Review.find( {} );
            return res.status( 200 ).json( { success: true, message: "Reviews are listed", data: review } );
        }
        catch ( error )
        {
            return res.status( 500 ).json( { success: false, message: "Internal Server Error" } );
        }
    }
    export const getTourReview= async ( req, res, next ) =>
        {
            const tourId = req.params.id;
            console.log("tourid is",tourId)
          //  const reviews = await Review.find( { "tour.id": tourId } );
            try
            {
                const reviews = await Review.find({ "tour.id": tourId });
                if ( !reviews)
                {
                    return res.status( 404 ).json( { success: false, message: "No reviews yet" } )
                }
                return res.status(200).json({success:true,message:"Found Tour ",data:reviews});
            }
            catch ( error )
            {
                console.log(error);
                return res.status( 500 ).json( { success: false, message: "Internal Server Error" } );
            }
        
        };

