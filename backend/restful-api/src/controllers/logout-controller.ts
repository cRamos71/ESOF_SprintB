import { Request, Response } from 'express';
import * as logoutService from '../services/logout-service';


export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('auth_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    const result = await logoutService.logoutUser();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during logout.', error: error.message });
  }
};