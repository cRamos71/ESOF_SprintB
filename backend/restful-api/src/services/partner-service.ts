import { PrismaClient } from '@prisma/client';
import { UserData } from '../types/user';

const prisma = new PrismaClient();

export const createPartner = async (
  userId: number,
  userData: UserData,
  hashedPassword: string
) => {
  return await prisma.partner.create({
    data: {
      user_id: userId,
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      last_access: new Date(),
    },
  });
};