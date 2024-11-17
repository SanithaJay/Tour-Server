import Tour from "../models/TourSchema.js";
import User from "../models/UserSchema.js"


export const newTour = async ( req, res, next ) =>
{
    const { title, city, address, distance, price, maxGroupSize, desc, photo, featured } = req.body;
    const userId = req.userId;
    console.log( "In controller" )


    try
    {
        let tour = new Tour( {
            title,
            city,
            address,
            distance,
            price,
            maxGroupSize,
            reviewCount:0,
            reviewRating:0.0,
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
};

export const updateTour = async ( req, res, next ) =>
{
    const tourId = req.params.id;
    const userId = req.userId;

    try
    {
        const tour = await Tour.findById( tourId );

        if ( !tour )
        {
            return res.status( 404 ).json( { success: false, message: "tour not found" } );
        }
        const editTour = await Tour.findByIdAndUpdate(
            tourId,
            { $set: req.body },
            { new: true } );
        res.status( 200 ).json( { success: true, message: "succesfully Updated", data: editTour, } );
    }
    catch ( error )
    {
        console.log( "error in  tour details update!!! ", error );
        res.status( 500 ).json( { success: false, message: "Internal server error" } );
    }
};


export const deleteTour = async ( req, res, next ) =>
{
    const tourId = req.params.id;
    try
    {
        const tour = await Tour.findById( tourId );
        if ( !tour )
        {
            return res.status( 404 ).json( { success: false, message: "Tour not Found" } );
        }
        await Tour.findByIdAndDelete( tourId );
        return res.status( 200 ).json( { success: true, message: "Tour Deleted Succesfully" } );

    }
    catch ( error )
    {
        return res.status( 500 ).json( { success: false, message: "Internal Server Error" } )
    }

};



export const getAllTour = async ( req, res, next ) =>
{
    try
    {
        const tour = await Tour.find( {} );
        return res.status( 200 ).json( { success: true, message: "Tours are listed", data: tour } );
    }
    catch ( error )
    {
        return res.status( 500 ).json( { success: false, message: "Internal Server Error" } );
    }
}


export const getSingleTour = async ( req, res, next ) =>
{
    const tourId =req.params.id;
    try
    {
        const tour = await Tour.findById( tourId);
        console.log(tour);
        if ( !tour )
        {
            return res.status( 404 ).json( { success: false, message: "Tour not found" } )
        }
        return res.status(200).json({success:true,message:"Found Tour ",data:tour});
    }
    catch ( error )
    {
        return res.status( 500 ).json( { success: false, message: "Internal Server Error" } );
    }

};


export const searchTours = async (req, res, next) => {
    try {
       
        const { city, distance, maxGroupSize } = req.query;

        let searchConditions = {};

      

       
        if (city) {
            searchConditions.city = { $regex: city, $options: "i" }; 
        }

        
        if (distance) {
            searchConditions.distance = { $lte: Number(distance) };
        }

       
        if (maxGroupSize) {
            searchConditions.maxGroupSize = { $gte: Number(maxGroupSize) }; 
        }

       
        const tours = await Tour.find(searchConditions);

       
        if (tours.length === 0) {
            return res.status(404).json({ success: false, message: "No tours found with the given criteria" });
        }

       
        return res.status(200).json({ success: true, message: "Tours found", data: tours });

    } catch (error) {
        console.error("Error in searching tours:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};