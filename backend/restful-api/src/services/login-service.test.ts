import { loginUser } from './login-service';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

// Mock the Prisma client and the methods used in the loginUser function
jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    student: { findUnique: jest.fn() },
    users: { findUnique: jest.fn() },
    manager: { findUnique: jest.fn() },
    partner: { findUnique: jest.fn() },
    company: { findUnique: jest.fn() },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('loginUser', () => {
  const mockPrisma = new PrismaClient();

  const mockUserDetails = {
    user_id: 1,
    email: 'test@example.com',
    password: 'hashedpassword',
  };

  const mockUser = {
    user_id: 1,
  };

  const mockToken = 'mocked-jwt-token';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test Description 
  it('should log in a student successfully', async () => {
    // create mock objects simulating resolved promise / database responses
    (mockPrisma.student.findUnique as jest.Mock).mockResolvedValue(mockUserDetails);
    (mockPrisma.users.findUnique as jest.Mock).mockResolvedValue(mockUser);

    // always true to only test the code logic
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    //Mock jwt sign method
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);

  
    const result = await loginUser('test@example.com', 'password123', 'student');

    // Assertions
    // check method is executing the correct query
    expect(mockPrisma.student.findUnique).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
    expect(mockPrisma.users.findUnique).toHaveBeenCalledWith({ where: { user_id: mockUserDetails.user_id } });
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', mockUserDetails.password);
    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: mockUser.user_id, email: mockUserDetails.email, role: 'student' },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );
    expect(result).toEqual({ token: mockToken, userDetails: mockUserDetails });
  });
});