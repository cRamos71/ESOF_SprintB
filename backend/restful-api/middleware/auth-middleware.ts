import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(200).json({ error: 'Authorization header is missing' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(200).json({ error: 'Token is missing in Authorization header' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    console.log(decoded);
    req.userId = (decoded as any).userId;
    return next(); 
  } catch (error) {
    return res.status(200).json({ error: 'Invalid or expired token' });
  }
};