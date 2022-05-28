import express,{Express} from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import { Conf } from './config'

import devRouter from './routes/developer'
import userRouter from './routes/user'

const app: Express=express()

mongoose.connect(Conf.DB_URL)

const con=mongoose.connection
  
con.on("open",()=>{
    console.log("connection success")
})

app.use(express.json())
app.use('/user',userRouter)
app.use('/developers',devRouter)


app.listen(Conf.PORT,()=>{
    console.log(`SERVER IS RUNNING A: ${Conf.PORT}`)
})