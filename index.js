import express from "express";
import Connection from "./database/db.js"
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.js'
import taskRoutes from './routes/task.js'
const app = express();



// Middleware to Parse Json
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
// app.use('/',Routes);
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);





const port  = process.env.PORT || 4000;

Connection();












app.listen(port,()=>{
    console.log(`Server is Running on Port Number ${port}`);
})