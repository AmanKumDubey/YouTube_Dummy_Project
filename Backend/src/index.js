import express from "express";
import connectDB from "./db/database.js"
import dotenv from "dotenv";

dotenv.config();


const PORT=process.env.PORT || 4000;
const app=express();

dotenv.config({
    path: './.env'
})

connectDB()

.then(()=>{

    app.listen(PORT,()=>{
        console.log(`PORT is listing at ${PORT}`);
        console.log(" \n HELLO G! ");
    })
})
.catch((error)=>{
    console.log("APP is not running ")
})

