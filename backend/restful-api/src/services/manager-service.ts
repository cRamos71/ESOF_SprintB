import { PrismaClient } from '@prisma/client';
import { UserData } from '../types/user';

export const prisma = new PrismaClient();

export const createManager = async (
  userId: number,
  userData: UserData,
  hashedPassword: string
) => {
  return await prisma.manager.create({
    data: {
      user_id: userId,
      name: userData.name || "",
      email: userData.email,
      password: hashedPassword,
      last_access: new Date(),
    },
  });
};