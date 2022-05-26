import { model, Schema } from 'mongoose'

export interface IDeveloper{
    name: string
    title: string
    assignedToProject: boolean

}

const developerSchema=new Schema<IDeveloper>({
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
    },

},{
    versionKey: false
})

export const Developer=model<IDeveloper>('Developer',developerSchema)
