import bcrypt from 'bcrypt'
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { Types } from 'mongoose';
import { RefreshToken } from '../models/refreshToken';


import { User, USER_ROLE_ENUM } from '../models/user';


interface JwtPayload extends jwt.JwtPayload{
    _id: Types.ObjectId
    role: USER_ROLE_ENUM
}

export interface CustomRequest extends Request {
    tokenPayload: JwtPayload
}


const generateAccessToken = (_id: Types.ObjectId, role: USER_ROLE_ENUM) => {
    return jwt.sign({ _id, role }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "10m",
    });
  };

  const generateRefreshToken =async(_id: Types.ObjectId, role: USER_ROLE_ENUM) => {
    const refreshToken= jwt.sign({ _id, role }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "20m",
    });
    await RefreshToken.create({refreshToken})
    return refreshToken
  };  

const registerUser=async(req: Request,res: Response)=>{

    const user=await User.findOne({"email":req.body.email})

    if(user){
        return res.status(400).json({
            message:"User Already Registered"
        })
    }

    const hash_password =await bcrypt.hashSync(req.body.password, 10);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const newUser=new User(
        {
            firstName,
            lastName,
            email: req.body.email,
            hash_password,
            username: firstName + lastName,
          }
    )

    try {
        const obj=await User.create(newUser)

        const accessToken=generateAccessToken(obj._id,obj.role)
        const refreshToken=await generateRefreshToken(obj._id,obj.role)
        res.status(201).json({accessToken,refreshToken})
    } catch (error) {
        return res.status(500).json({
            message: "Something Went Wrong",
          });
    }
}

const signIn=async(req: Request,res: Response)=>{

    const user=await User.findOne({"email":req.body.email})

    if(!user){
        return res.status(400).json({
            message:"User does not exists"
        })
    }

    if(await bcrypt.compare(req.body.password,user.hash_password)){
        const accessToken=generateAccessToken(user._id,user.role)
        const refreshToken=await generateRefreshToken(user._id,user.role)
        res.status(201).json({accessToken,refreshToken})
    }else{
        res.status(401).json({
            message: "Incorrect password",
          });
    }
}

const refreshTokenForUser=async(req: Request,res: Response)=>{

    const oldRefreshToken=await RefreshToken.findOneAndDelete({"refreshToken":req.body.refreshToken})

    if (!oldRefreshToken) {
        return res.status(400).json({
            message:"Invalid RefreshToken"
        })
    }

   const decoded = jwt.decode(req.body.refreshToken) as JwtPayload;
    console.log("decoded: ",decoded)
    const accessToken=generateAccessToken(decoded._id,decoded.role)
    const refreshToken=await generateRefreshToken(decoded._id,decoded.role)
    res.status(201).json({accessToken,refreshToken})
}

const signOut=async(req,res)=>{

    try {
        await RefreshToken.findOneAndDelete({"refreshToken":req.body.refreshToken})
        res.status(204).json({
            message:"Success"
        })
    } catch (error) {
        res.status(500).json({
            message:"Something Went Wrong"
        })
    }


}


const requireSignIn=(req: Request,res: Response,next)=>{

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

export default{
    registerUser,
    signIn,
    refreshTokenForUser,
    signOut,
    requireSignIn
}