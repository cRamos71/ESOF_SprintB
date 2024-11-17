import { PrismaClient } from '@prisma/client';
import { UserData } from '../types/user';

const prisma = new PrismaClient();

export const createCompany = async (
  userId: number,
  userData: UserData,
  hashedPassword: string
) => {
  const company = await prisma.company.create({
    data: {
      user_id: userId,
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      last_access: new Date(),
      approval_badge: userData.approval_badge || false,
    },
  });

  // Notify managers about the new company
  const managers = await prisma.manager.findMany();
  for (const manager of managers) {
    await prisma.notification.create({
      data: {
        user_id: manager.manager_id,
        manager_id: manager.manager_id,
        message: `New company "${userData.name}" has registered and requires approval.`,
      },
    });
  }

  return company;
};