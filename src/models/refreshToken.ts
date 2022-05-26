import { model, Schema } from "mongoose";

export interface IRefreshToken{refreshToken: string}

const refreshTokenSchema=new Schema<IRefreshToken>({
    refreshToken:{
        type: String,
        required: true
    },
},{
    versionKey: false
})

export const RefreshToken=model<IRefreshToken>('RefreshToken',refreshTokenSchema)