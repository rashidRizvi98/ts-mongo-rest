import { Request, Response } from "express"

import { CustomRequest } from "../services/user"
import developerService from '../services/developer'



const findDevelopers=async(req: CustomRequest,res: Response)=>{
    try {
        const developers=await developerService.findDevelopers()
        console.debug(`GET DEVELOPERS HIT BY ${req.tokenPayload._id}`)
        res.status(200).json(developers)
    } catch (error) {
        res.status(error.code).json({
            message: error.message
        })    
    }
}

const findDeveloper=async(req: Request,res: Response)=>{
    try {
        const developer=await developerService.findDeveloper(req.params.id)
        res.status(200).json(developer)
    } catch (error) {
        res.status(error.code).json({
            message: error.message
        })   
    }
}

const createDeveloper=async(req: Request,res: Response)=>{

    try {
        const developer=await developerService.createDeveloper(req.body)
        res.status(201).json(developer)
    } catch (error) {
        res.status(error.code).json({
            message: error.message
        })  
    }
}

const updateAssignment=async(req,res)=>{

    try {
        const updatedDeveloper=await developerService.updateAssignment({id: req.params.id,assignedToProject: req.body.assignedToProject})
        res.status(200).json(updatedDeveloper)
    } catch (error) {
        res.status(error.code).json({
            message: error.message
        })  
    }

}

const deleteDeveloper=async(req: Request,res: Response)=>{
    try {
        const developer=await developerService.deleteDeveloper(req.params.id)
        res.status(200).json(developer)
    } catch (error) {
        res.status(error.code).json({
            message: error.message
        })  
    }
}

export default{
    findDevelopers,
    findDeveloper,
    createDeveloper,
    updateAssignment,
    deleteDeveloper
    
}