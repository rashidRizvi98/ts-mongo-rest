import { Developer } from "../models/developer"
import { IDeveloper } from "../models/developer"
import { Request,Response } from "express"
import { CustomRequest } from "./user"
import { HttpError } from "../commons/error"
import { ErrorConstants } from "../types"

const findDevelopers=async()=>{
    try {
        const developers=await Developer.find()
        return developers
    } catch (error) {
        throw new HttpError(500,ErrorConstants.SOMETHING_WENT_WRONG)     
    }
}

const findDeveloper=async(payload)=>{
    try {
        const developer=await Developer.findById(payload)
        return developer
    } catch (error) {
        throw new HttpError(400,ErrorConstants.DEVELOPER_DOES_NOT_EXIST)  
    }
}

const createDeveloper=async(payload)=>{
    const developer=new Developer(payload)

    try {
       const obj=await Developer.create(developer)
        return obj

    } catch (error) {
        throw new HttpError(500,ErrorConstants.SOMETHING_WENT_WRONG)     
    }
}

const updateAssignment=async(payload)=>{

    try {
        const developer=await Developer.findById(payload.id)
        developer.assignedToProject=payload.assignedToProject
        const updatedDeveloper=await developer.save()
        return updatedDeveloper
    } catch (error) {
        throw new HttpError(500,ErrorConstants.SOMETHING_WENT_WRONG)   
    }

}

const deleteDeveloper=async(payload)=>{
    try {
        const developer=await Developer.deleteOne({"_id":payload})
        return developer
    } catch (error) {
        throw new HttpError(500,ErrorConstants.SOMETHING_WENT_WRONG)   
    }
}

export default{
    findDevelopers,
    findDeveloper,
    createDeveloper,
    updateAssignment,
    deleteDeveloper
    
}