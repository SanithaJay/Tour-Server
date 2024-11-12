import Subscribe from "../models/SubscribeSchema.js"


export const newSubscribe = async ( req, res, next ) =>
    {
        const { email} = req.body;
        try
        {
            let subscribe = await Subscribe.findOne( { email: email } );
            if ( subscribe )
            {
                return res.status( 400 ).json( { message: "Email already exists" } );
            }
    
           
            subscribe = new Subscribe( {
               
                email
               
            } );
            await subscribe.save();
            res.status( 200 ).json( { message: "Email is added for subscription" } )
    
        }
        catch ( error )
        {
            console.log( "Erroorr!! ", error );
            res.status( 500 ).json( { message: "Internal Server Error" } )
        }
    }
    
    
   