import bcrypt from 'bcryptjs';
import prisma from './prisma.service';

export const registerUser = async (role: string, userData: any) => {
  // Check if the email already exists
  const existingUser = await prisma.users.findUnique({ where: { email: userData.email } });
  if (existingUser) throw new Error('Email already exists');

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  // Create user in the `Users` table first
  const newUser = await prisma.users.create({
    data: {
      email: userData.email,
      password: hashedPassword,
      last_access: new Date(),
    },
  });

  // Create specific user type based on the role
  if (role === 'student') {
    return await prisma.student.create({
      data: {
        user_id: newUser.user_id,
        name: userData.name,
        email: userData.email,
        birth_date: userData.birth_date,
        address: userData.address,
        disponibility: userData.disponibility,
        interests: userData.interests,
        last_access: new Date(),
        skills: userData.skills,  // Assuming skills are passed as an array of IDs
        candidatures: [],
        associations: [],
      },
    });
  }

  if (role === 'manager') {
    return await prisma.manager.create({
      data: {
        user_id: newUser.user_id,
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        last_access: new Date(),
      },
    });
  }

  if (role === 'partner') {
    return await prisma.partner.create({
      data: {
        user_id: newUser.user_id,
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        last_access: new Date(),
      },
    });
  }

  if (role === 'company') {
    return await prisma.company.create({
      data: {
        user_id: newUser.user_id,
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        last_access: new Date(),
      },
    });
  }

  throw new Error('Invalid user role');
};
