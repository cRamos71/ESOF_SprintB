import { PrismaClient } from '@prisma/client';
import { UserData } from '../types/user';

const prisma = new PrismaClient();

export const createStudent = async (
  userId: number,
  userData: UserData,
  hashedPassword: string
) => {
  return await prisma.student.create({
    data: {
      user_id: userId,
      name: userData.name || null,
      email: userData.email,
      password: hashedPassword,
      birth_date: userData.birth_date || null,
      address: userData.address || null,
      disponibility: userData.disponibility || null,
      interests: userData.interests || null,
      last_access: new Date(),
      skills: {
        create: [], 
      },
    },
  });
};