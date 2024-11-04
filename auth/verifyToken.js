import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";


export const authenticate = ( req, res, next ) =>
{
    const authToken = req.headers.authorization;
    //  console.log("token:",authToken)

    if ( !authToken || !authToken.startsWith( "Bearer" ) )
    {
        return res.status( 404 ).json( { succes: false, message: "Authorization Denied" } )

    }
    try
    {
        const token = authToken.split( " " )[ 1 ];
        // console.log("token:",token)

        const decoded = jwt.verify( token, process.env.JWT_SECRET_KEY );
        req.userId = decoded.id;
        req.role = decoded.role;
        next();

    }
    catch ( error )
    {
        if ( error.name === "TokenExpiredError" )
        {
            res.status( 401 ).json( { succes: false, message: "Token Expired" } )
        }
        res.status( 401 ).json( { succes: false, message: "Invalid Token.Please login again" } )
    }
};




export const restrict = ( roles ) => async ( req, res, next ) =>
{
    try
    {
        const userId = req.userId;
        const user = await User.findById( userId );
        const userRole = user.role;
        console.log("Role:",userRole);
        if ( !user )
        {
            return res.status( 401 ).json( { success: false, message: "User not found" } )
        }
        

        if ( userRole === "user" && roles.includes( "user" ) )
        {
            next();
        }
        else if ( userRole === "admin" && roles.includes( "admin" ) )
        {
            next();
        }
        else
        {
            return res.status( 403 ).json( { success: false, message: "You don't have the permission to access this page" } );
        }

    }
    catch ( error )
    {
        //console.log("erroorrr!!!!",error)
        return res.status( 500 ).json( { success: false, message: "Internal Server Error" } );
    }
}