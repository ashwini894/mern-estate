import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import path from 'path'

import cookieParser from 'cookie-parser';

dotenv.config();

//console.log(process.env.MONGO)

mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB!'))
    .catch((err) => console.error('Connection error:', err));

mongoose.set('debug', true);

//create dynamic dirname to app work on any computer
const __dirname = path.resolve();

const app = express();

//use below to allow json as a input to server
app.use(express.json());
app.use(cookieParser());

app.listen(3000, ()=>{
    console.log("Server is running on port 3000.!");
});

// Serve the public/uploads directory as static
app.use('/api/public/uploads', express.static(path.join(__dirname, 'api/public/uploads')));

//use all route here
app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/listing',listingRouter);

//if we run only / means front and create static folder i.e dynamic path client folder and build folder i.e dist
app.use(express.static(path.join(__dirname,'/client/dist')));

//now any address other than /api and / should run index.html
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})

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