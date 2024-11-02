import User from "../models/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const generateToken = ( user ) =>
{
    return jwt.sign( {
        id: user._id,
        role: user.role
    },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" }
    )
}

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
        res.status( 200 ).json( { message: "New User created succesfully" } )

    }
    catch ( error )
    {
        console.log( "Erroorr!! ", error );
        res.status( 500 ).json( { message: "Internal Server Error" } )
    }
}


export const login = async ( req, res, next ) =>
{
    const { email } = req.body;

    try
    {
        let user = await User.findOne( { email: email } );
        if ( !user )
        {
            return res.status( 404 ).json( { succes: false, message: "User not found!!!!" } )
        }
        const isPasswordMatch = await bcrypt.compare( req.body.password, user.password );
        if ( !isPasswordMatch )
        {
            return res.status( 400 ).json( { success: false, message: "Invalid Password" } );
        }

        const token = generateToken( user );
        const { password, role, ...rest } = user._doc;
        return res.status( 200 ).json( { succes: true, message: "Login Succesfull", token, data: { ...rest }, role } );
    }
    catch ( error )
    {
        console.log( "Errorrr!!!!", error );
        return res.status( 500 ).json( { succes: false, message: "Failed to login" } );
    }
};