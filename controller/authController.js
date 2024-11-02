import User from "../models/UserSchema.js";
import bcrypt from "bcrypt";


export const newUser = async ( req, res, next ) =>
{
    const { name, email, password, role } = req.body;
    try
    {
        let user = await User.findOne( { email: email } );
        if ( user )
        {
            return res.status( 400 ).json( { message: "User already exists" } );
        }

        const salt = await bcrypt.genSalt( 10 );
        const hashPassword = await bcrypt.hash( password, salt );
        user = new User( {
            name,
            email,
            password: hashPassword,
            role,
        } );
        await user.save();
        res.status(200).json({message: "New User created succesfully"})

    }
    catch ( error )
    {
        console.log( "Erroorr!! ", error );
        res.status( 500 ).json( { message: "Internal Server Error" } )
    }
}