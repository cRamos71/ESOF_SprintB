import { PrismaClient } from '@prisma/client';
import { UserData } from '../types/user';
import { WorkOpportunity } from '../models/workOpportunity'; // Import WorkOpportunity model

const prisma = new PrismaClient();

const opportunities: WorkOpportunity[] = []; 

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