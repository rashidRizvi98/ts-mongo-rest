import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import { CustomRequest, JwtPayload } from "../services/user"

export const requireSignIn=(req: Request,res: Response,next)=>{

    const authHeader = req.headers["authorization"]
    if (authHeader == null) return res.status(400).json({
        message:"Token not present"
    })
    
    const token = authHeader.split(" ")[1]
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, tokenPayload: JwtPayload) => {
    if (err) { 
        res.status(400).json({
            message:"Invalid Token"
        })
     }
     else {
        (req as CustomRequest).tokenPayload=tokenPayload
        console.debug(`TOKEN PAYLOAD:*** ${tokenPayload._id}`)
     next() //proceed to the next action in the calling function
     }
    }) //end of jwt.verify()
    }