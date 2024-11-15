import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from './prisma.service';

export const loginUser = async (email: string, password: string, role: string) => {
  // Find the user by email
  const user = await prisma.users.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  // Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid credentials');

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.user_id, email: user.email, role },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

  // Return the correct user model based on the role
  let userDetails;
  if (role === 'student') {
    userDetails = await prisma.student.findUnique({ where: { user_id: user.user_id } });
  } else if (role === 'manager') {
    userDetails = await prisma.manager.findUnique({ where: { user_id: user.user_id } });
  } else if (role === 'partner') {
    userDetails = await prisma.partner.findUnique({ where: { user_id: user.user_id } });
  } else if (role === 'company') {
    userDetails = await prisma.company.findUnique({ where: { user_id: user.user_id } });
  }

  return { token, userDetails };
};
