import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { env } from '../../infrastructure/env';

interface AuthenticatedRequest extends Request {
    userId?: string; 
  }

const Auth = (req:AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ msg: "No token provided" });
    }

    const token = authHeader.split(' ')[1]; 

    jwt.verify(token, env.JWT_SECRET as string, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).json({ msg: "Invalid token" });
        }

        req.userId = decoded.id; // Ensure your token includes the user ID
        next();
    });
};

module.exports = Auth;
