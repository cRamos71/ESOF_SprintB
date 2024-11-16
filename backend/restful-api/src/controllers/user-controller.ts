import { Request, Response } from 'express';
import * as userService from '../services/user-service';
import * as loginService from '../services/login-service';


export const register = async (req: Request, res: Response) => {
  const { role, name, email, password} = req.body;
  try {
    const newUser = await userService.registerUser(role, { name, email, password});
    res.status(200).json(newUser);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(200).json({ error: err.message });
    } else {
      res.status(200).json({ error: 'Something went wrong' });
    }
  }
};


