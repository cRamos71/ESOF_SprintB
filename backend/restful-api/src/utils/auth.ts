import jwt from 'jsonwebtoken';
import { Request } from 'express';

export interface AuthTokenPayload {
  userId: string;
  email: string;
  userType: string;
}

export function authenticateToken(req: Request): AuthTokenPayload {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) throw new Error('Authentication token missing');

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as AuthTokenPayload;
  return decoded;
}
