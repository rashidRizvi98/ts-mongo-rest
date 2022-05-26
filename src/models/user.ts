import  { model, Schema } from 'mongoose'

export interface IUser{
  firstName: string
  lastName: string
  username: string
  email: string
  hash_password: string
  role: USER_ROLE_ENUM
}

export enum USER_ROLE_ENUM{
  USER='USER',
  ADMIN='ADMIN'
}

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [USER_ROLE_ENUM.USER, USER_ROLE_ENUM.ADMIN],
      default: USER_ROLE_ENUM.USER,
    },
  },
  { timestamps: true }
);

 export const User = model<IUser>("User", userSchema);
  