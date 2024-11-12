import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifytoken = (req, res, next) => {
    // Check for the token in the Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(errorHandler(401, 'Unauthorized'));
    }
    
    // Extract token by removing the 'Bearer ' prefix
    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Forbidden'));
        
        // Attach the decoded user to the request object
        req.user = user;
        next();
    });
};
