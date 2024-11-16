import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const registerUser = async (role: string, userData: any) => {
  // Validate the role
  const validRoles = ['student', 'manager', 'partner', 'company'];
  if (!validRoles.includes(role)) {
    throw new Error('Invalid user role');
  }

  // Check if the email already exists in the role-specific tables
  const existingEmail =
    (await prisma.student.findUnique({
      where: { email: userData.email },
    })) ||
    (await prisma.manager.findUnique({
      where: { email: userData.email },
    })) ||
    (await prisma.partner.findUnique({
      where: { email: userData.email },
    })) ||
    (await prisma.company.findUnique({
      where: { email: userData.email },
    }));

  if (existingEmail) {
    throw new Error('Email already exists');
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  // Create the user in the `users` table
  const newUser = await prisma.users.create({
    data: {},
  });

  // Create the specific user type based on the role
  switch (role) {
    case 'student':
      return await prisma.student.create({
        data: {
          user_id: newUser.user_id,
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          birth_date: userData.birth_date,
          address: userData.address,
          disponibility: userData.disponibility,
          interests: userData.interests,
          last_access: new Date(),
          skills: {
            create: userData.skills?.map((skillId: number) => ({
              skills_id: skillId,
            })),
          },
        },
      });

    case 'manager':
      return await prisma.manager.create({
        data: {
          user_id: newUser.user_id,
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          last_access: new Date(),
        },
      });

    case 'partner':
      return await prisma.partner.create({
        data: {
          user_id: newUser.user_id,
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          last_access: new Date(),
        },
      });

    case 'company':
      return await prisma.company.create({
        data: {
          user_id: newUser.user_id,
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          last_access: new Date(),
          approval_badge: userData.approval_badge || false,
        },
      });

    default:
      throw new Error('Invalid user role');
  }
};
