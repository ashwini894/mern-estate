import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser';

dotenv.config();

//console.log(process.env.MONGO)
mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to MongoDB!");
}).catch((err)=>{
    console.log(err);
});
mongoose.set('debug', true);

//mongoose.set('bufferCommands', false);

const app = express();
//use below to allow json as a input to server
app.use(express.json());
app.use(cookieParser());

app.listen(3000, ()=>{
    console.log("Server is running on port 3000.");
});

//use all route here
app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);

//middleware
app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})