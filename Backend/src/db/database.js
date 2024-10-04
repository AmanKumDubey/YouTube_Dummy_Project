import mongoose from "mongoose";
// import dotenv from "dotenv";

// import("dotenv").config();

const connectDB= async()=>{
    try{
        const connectionInstance=mongoose.connect(`${process.env.DATABASE_URL}`);
        console.log("DB Connection Successful");
    } catch(error){
        console.error("DB Connection Failed !");
        process.exit(1);
    }
}
export default connectDB;