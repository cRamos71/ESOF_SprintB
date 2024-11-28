import { Request, Response } from 'express';
import { UserFactory } from '../factories/user-factory';

export const registerUser = async (req: Request, res: Response) => {
  const { role, email, password, name } = req.body;

  try {
    const user = await UserFactory.create(role, { email, password, name });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(200).json({ success: false, message: error.message });
  }
};