import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { UserData } from '../types/user';
import { createStudent } from '../services/student-service';
import { createCompany } from '../services/company-service';
import { createPartner } from '../services/partner-service';
import { createManager } from '../services/manager-service';

const prisma = new PrismaClient();

export class UserFactory {
  static async create(role: string, userData: UserData) {
    const emailExists = await UserFactory.checkEmailExists(role, userData.email);
    if (emailExists) {
      throw new Error('Email is already taken');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await prisma.users.create({
      data: {},
    });

    switch (role) {
      case 'student':
        return await createStudent(newUser.user_id, userData, hashedPassword);

      case 'company':
        return await createCompany(newUser.user_id, userData, hashedPassword);

      case 'partner':
        return await createPartner(newUser.user_id, userData, hashedPassword);

      case 'manager':
        return await createManager(newUser.user_id, userData, hashedPassword);

      default:
        throw new Error('Invalid role');
    }
  }

  static async checkEmailExists(role: string, email: string): Promise<boolean> {
    let existingUser;

    switch (role) {
      case 'student':
        existingUser = await prisma.student.findUnique({ where: { email } });
        break;
      case 'manager':
        existingUser = await prisma.manager.findUnique({ where: { email } });
        break;
      case 'partner':
        existingUser = await prisma.partner.findUnique({ where: { email } });
        break;
      case 'company':
        existingUser = await prisma.company.findUnique({ where: { email } });
        break;
      default:
        throw new Error('Invalid role for email check');
    }

    return existingUser ? true : false;
  }
}