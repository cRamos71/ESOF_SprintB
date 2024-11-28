import { PrismaClient } from '@prisma/client';
import { createPartner } from './partner-service';
import { UserData } from '../types/user';

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      partner: {
        create: jest.fn(),
      },
    })),
  };
});

const prisma = new PrismaClient();

describe('createPartner', () => {
  it('should create a new partner', async () => {
    const userId = 1000;
    const userData: UserData = {
      name: 'Alice Partner',
      email: 'alice.partner@example.com',
      password: '',
      birth_date: new Date(),
      address: 'marques',
      disponibility: 'always',
      approval_badge: false,
      interests: 'nothing',
    };
    const hashedPassword = 'hashed_password_example';

    // Mock the create method to resolve with a mocked value
    (prisma.partner.create as jest.Mock).mockResolvedValue({
      user_id: userId,
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      last_access: new Date(),
    });

    // Call createPartner function
    const result = await createPartner(userId, userData, hashedPassword);

  
    // Ensure the Prisma Client's `create` method was called with correct data
    /*expect(prisma.partner.create).toHaveBeenCalledWith({
      data: {
        user_id: userId,
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        last_access: expect.any(Date),
      },
    });*/
  });

  it('should throw an error if Prisma create fails', async () => {
    const userId = 1000;
    const userData: UserData = {
      name: 'Bob Partner',
      email: 'bob.partner@example.com',
      password: '',
      birth_date: new Date(),
      address: 'somewhere',
      disponibility: 'rarely',
      approval_badge: false,
      interests: 'something',
    };
    const hashedPassword = 'hashed_password_example';
  });
});