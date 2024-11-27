import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface AuthPayload {
  userId: number;
  email: string;
  role: string;
}

export const loginUser = async (email: string, password: string, role: string) => {
  let userDetails;
  
  if (role === 'student') {
    userDetails = await prisma.student.findUnique({ where: { email } });
  } else if (role === 'manager') {
    userDetails = await prisma.manager.findUnique({ where: { email } });
  } else if (role === 'partner') {
    userDetails = await prisma.partner.findUnique({ where: { email } });
  } else if (role === 'company') {
    userDetails = await prisma.company.findUnique({ where: { email } });
  } else {
    throw new Error('Invalid role specified');
  }

  if (!userDetails) throw new Error('Invalid credentials');

  const isPasswordValid = await bcrypt.compare(password, userDetails.password);
  if (!isPasswordValid) throw new Error('Invalid credentials');

  const user = await prisma.users.findUnique({ where: { user_id: userDetails.user_id } });
  if (!user) throw new Error('User not found in the users table');

  const token = jwt.sign(
    { userId: user.user_id, email: userDetails.email, role },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

  return { token, userDetails };
};
