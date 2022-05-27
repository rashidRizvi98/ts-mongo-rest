import { Request, Response } from "express";

import userService from '../services/user'

const registerUser=async(req: Request,res: Response)=>{
    try {
        const tokens=await userService.registerUser(req.body)
        res.status(201).json(tokens)
    } catch (error) {
        res.status(error.code).json({
            message: error.message
        })      
    }
}

const signIn=async(req: Request,res: Response)=>{
    try {
        const tokens=await userService.signIn(req.body)
        res.status(201).json(tokens)
        
    } catch (error) {
        res.status(error.code).json({
            message: error.message
        })      
    }
}

const refreshTokenForUser=async(req: Request,res: Response)=>{
    try {
        const tokens=await userService.refreshTokenForUser(req.body)
        res.status(201).json(tokens)

    } catch (error) {
        res.status(error.code).json({
            message: error.message
        })      
        
    }
}

const signOut=async(req: Request,res: Response)=>{

    try {
        await userService.signOut(req.body)
        res.status(204).json({
            message:"Success"
        })
    } catch (error) {
        res.status(error.code).json({
            message: error.message
        })   
    }
}

export default {registerUser,signIn,refreshTokenForUser,signOut}