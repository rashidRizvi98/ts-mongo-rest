import mongoose from 'mongoose'

export interface IDeveloper{
    name: string
    title: string
    assignedToProject: boolean
}

const developerSchema=new mongoose.Schema<IDeveloper>({
    name:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    assignedToProject:{
        type: Boolean,
        required: true,
        default: false
    }
},{
    versionKey: false
})

export const Developer=mongoose.model<IDeveloper>('Developer',developerSchema)
