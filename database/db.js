import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
    const USERNAME = process.env.DB_USERNAME;
    const PASSWORD =  process.env.DB_PASSWORD;

 const Connection = ()=>{
    
    const MONGODB_URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.xq6i6ki.mongodb.net/`;
    mongoose.connect(MONGODB_URI,{ useNewUrlParser:true });

    mongoose.connection.on('connected',()=>{
        console.log("Database Succefully Connected");
    })
    mongoose.connection.on('disconnected',()=>{

        console.log("Database Disconnected");


    })

    mongoose.connection.on('error',()=>{
            console.log("Error whilie connecting Database",error.message);
    })
}

export default Connection;