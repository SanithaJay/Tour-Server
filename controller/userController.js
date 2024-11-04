import User from "../models/UserSchema.js"


export const updateUser = async ( req, res, next ) =>
{

    const id = req.params.id;
    try
    {
        const updateUser = await User.findByIdAndUpdate(

            id,
            { $set: req.body },
            { new: true }
        );
        if ( !updateUser )
        {
            return res.json( { message: "No user" } )
        }
        res.status( 200 ).json( { succes: true, message: "Updated Succesfully" } );
    }
    catch ( error )
    {
        return res.status( 500 ).json( { succes: false, message: "Internal server Error" } );
    }


};