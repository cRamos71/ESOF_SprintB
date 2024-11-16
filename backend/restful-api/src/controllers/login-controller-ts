import { Request, Response } from 'express';
import * as loginService from '../services/login-service';

export const login = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  try {
    const { token, userDetails } = await loginService.loginUser(email, password, role);
    res.status(200).json({ token, userDetails });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(200).json({ error: err.message });
    } else {
      res.status(200).json({ error: 'Something went wrong' });
    }
  }
};
