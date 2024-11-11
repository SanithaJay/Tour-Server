import Review from "../models/ReviewSchema.js";
import User from "../models/UserSchema.js";
import Tour from "../models/TourSchema.js";

export const createReview = async ( req, res, next ) =>
{
    const { star, comments } = req.body;

    const userId = req.userId;
    const tourId = req.params.id;

    console.log( "userid:", userId, "tourid:", tourId );

    const user = await User.findById( userId );
    const tour = await Tour.findById( tourId );

console.log(user);
console.log(tour);
    if ( !user )
    {
        res.status( 404 ).json( { success: false, message: "Please Login" } );
    }
    if ( !tour )
    {

        res.status( 404 ).json( { success: false, message: "tour package not exist" } );
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
        console.log( "ReviewCount:", tour.reviewCount );
        
        tour.reviewCount = ( tour.reviewCount || 0 ) + 1;

        const reviews = await Review.find({ "tour.id": tourId });
        const totalStars = reviews.reduce((acc, review) => acc + review.star, 0);
        const averageRating = totalStars / reviews.length;

        tour.reviewRating = averageRating;
       
        await tour.save();

        res.status( 200 ).json( { success: true, message: "Review Saved Successfully" } );
    }
    catch ( error )
    {
        console.log( "Error in reviewww!!! ", error )
        res.status( 500 ).json( { success: false, message: "Internal Server Error" } );
    }
}


