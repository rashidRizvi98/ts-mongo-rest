import bcrypt from 'bcrypt'
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { Types } from 'mongoose';
import { HttpError } from '../commons/error';
import { Conf } from '../config';
import { RefreshToken } from '../models/refreshToken';


import { User} from '../models/user';
import { ErrorConstants, IAuthSuccessResponse, IRefreshTokenDto, IUserRegisterDto, IUserSigninDto, USER_ROLE_ENUM } from '../types';


export interface JwtPayload extends jwt.JwtPayload{
    _id: Types.ObjectId
    role: USER_ROLE_ENUM
}

export interface CustomRequest extends Request {
    tokenPayload: JwtPayload
}


const generateAccessToken = (_id: Types.ObjectId, role: USER_ROLE_ENUM) => {
    return jwt.sign({ _id, role }, Conf.ACCESS_TOKEN_SECRET, {
      expiresIn: "10m",
    });
  };

  const generateRefreshToken =async(_id: Types.ObjectId, role: USER_ROLE_ENUM) => {
    const refreshToken= jwt.sign({ _id, role }, Conf.REFRESH_TOKEN_SECRET, {
      expiresIn: "20m",
    });
    await RefreshToken.create({refreshToken})
    return refreshToken
  };  

const registerUser=async(payload: IUserRegisterDto): Promise<IAuthSuccessResponse>=>{

    const user=await User.findOne({"email": payload.email})
    console.log(payload)
    if(user){
        throw new HttpError(400,ErrorConstants.USER_ALREADY_EXISTS);
    }

    const hash_password =await bcrypt.hashSync(payload.password, 10);
    const firstName = payload.firstName;
    const lastName = payload.lastName;

    const newUser=new User(
        {
            firstName,
            lastName,
            email: payload.email,
            hash_password,
            username: firstName + lastName,
          }
    )

    try {
        const obj=await User.create(newUser)
        const accessToken=generateAccessToken(obj._id,obj.role)
        const refreshToken=await generateRefreshToken(obj._id,obj.role)
        return {accessToken,refreshToken}
    } catch (error) {
        console.error(error)
        throw new HttpError(500,ErrorConstants.SOMETHING_WENT_WRONG)       
    }
}

const signIn=async(payload: IUserSigninDto): Promise<IAuthSuccessResponse>=>{

    const user=await User.findOne({"email":payload.email})

    if(!user){
              throw new HttpError(400,ErrorConstants.USER_DOES_NOT_EXISTS)   
    }

    if(await bcrypt.compare(payload.password,user.hash_password)){
        const accessToken=generateAccessToken(user._id,user.role)
        const refreshToken=await generateRefreshToken(user._id,user.role)
        return {accessToken,refreshToken}
    }else{
        throw new HttpError(401,ErrorConstants.INCORRECT_PASSWORD)
    }
}

const refreshTokenForUser=async(payload: IRefreshTokenDto): Promise<IAuthSuccessResponse>=>{

    const oldRefreshToken=await RefreshToken.findOneAndDelete({"refreshToken":payload.refreshToken})

    if (!oldRefreshToken) {
        throw new HttpError(400,ErrorConstants.INVALID_REFRESH_TOKEN)
    }

   const decoded = jwt.decode(payload.refreshToken) as JwtPayload;
    console.log("decoded: ",decoded)
    const accessToken=generateAccessToken(decoded._id,decoded.role)
    const refreshToken=await generateRefreshToken(decoded._id,decoded.role)
    return {accessToken,refreshToken}
}

const signOut=async(payload: IRefreshTokenDto)=>{

    try {
        await RefreshToken.findOneAndDelete({"refreshToken":payload.refreshToken})
    } catch (error) {
        throw new HttpError(500,ErrorConstants.SOMETHING_WENT_WRONG)
    }


}


export default{
    registerUser,
    signIn,
    refreshTokenForUser,
    signOut,
}