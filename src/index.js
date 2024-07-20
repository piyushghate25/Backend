// require ('dotenv').config({path: './env'})  if we use this line then we donot  need the dotenv.config code.  this can directly access the envoirmental variables
import mongoose from "mongoose";
import dotenv from "dotenv"
import { DB_NAME } from "./constants.js";

import connectDB from "./db/index.js";

dotenv.config({
    path : './env'
})

connectDB()  //promises
.then(()=>{
    app.listen(process.env.PORT || 8000 ,()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGODB CONNECTION FAILES !!! " , err);
})




/*
import express from "express";

const app = express()

( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", ()=>{
            console.log("Error",Err);
            throw error
        })

        app.listen(process.env.PORT, ()=>{
            console.log("Server is running on port", `${process.env.PORT}`);
        })

    }catch(error){
        console.log("Error",Err);
        throw err
    }

})() 
*/