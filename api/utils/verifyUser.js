import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
/*
export const verifytoken = (req, res, next) => {
    console.log(req.body)
    const token = req.body.access_token;
    if(!token) return next(errorHandler(401,'Unauthorized'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err) return next(errorHandler(403,'Forbidden'));
        res.user = user;
        next();
    })
}
*/
export const verifytoken = (req, res, next) => {
    // Check for the token in the access_token cookie
    const token = req.cookies.access_token;

    if (!token) {
        return next(errorHandler(401, 'Unauthorized'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Forbidden'));
        
        // Attach the decoded user to the request object
        req.user = user;
        next();
    });
};

