import { Developer } from "../models/developer"
import { IDeveloper } from "../models/developer"
import { Request,Response } from "express"

const findDevelopers=async(req: Request,res: Response)=>{
    try {
        const developers=await Developer.find()
        res.json(developers)
    } catch (error) {
        res.send(error)
    }
}

const findDeveloper=async(req: Request,res: Response)=>{
    try {
        const developer=await Developer.findById(req.params.id)
        res.json(developer)
    } catch (error) {
        res.send(error)
    }
}

const createDeveloper=async(req: Request,res: Response)=>{
    const developer=new Developer(req.body as IDeveloper)

    try {
       const obj=await Developer.create(developer)
        res.json(obj)

    } catch (error) {
        res.send(error)
    }
}

const updateAssignment=async(req,res)=>{

    try {
        const developer=await Developer.findById(req.params.id)
        developer.assignedToProject=req.body.assignedToProject
        const updatedDeveloper=await developer.save()
        res.json(updatedDeveloper)
    } catch (error) {
        res.send('Error: ',error)
    }

}

const deleteDeveloper=async(req,res)=>{
    try {
        const developer=await Developer.deleteOne({"_id":req.params.id})
        res.json(developer)
    } catch (error) {
        res.send(error)
    }
}

export default{
    findDevelopers,
    findDeveloper,
    createDeveloper,
    updateAssignment,
    deleteDeveloper
    
}