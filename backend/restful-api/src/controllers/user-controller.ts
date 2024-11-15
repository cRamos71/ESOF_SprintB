import { Request, Response } from 'express';
import * as userService from './user.service';

export const register = async (req: Request, res: Response) => {
  const { role, name, email, password, ...otherData } = req.body;
  try {
    const newUser = await userService.registerUser(role, { name, email, password, ...otherData });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  try {
    const { token, userDetails } = await userService.loginUser(email, password, role);
    res.status(200).json({ token, userDetails });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
