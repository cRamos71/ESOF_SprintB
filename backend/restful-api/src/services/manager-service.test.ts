/*import { createManager, prisma } from '../services/manager-service'; // Import the actual function and prisma
import { UserData } from '../types/user';

// Mock Prisma's manager.create only
jest.mock('../services/manager-service', () => {
  const actualModule = jest.requireActual('../services/manager-service');
  return {
    ...actualModule,
    prisma: {
      manager: {
        create: jest.fn(),
      },
    },
  };
});

describe('createManager', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('should create a manager successfully with the provided data', async () => {
    // Mock Data
    const userId = 1337;
    const userData: UserData = {
      name: 'John Doe',
      email: 'john.doe1@example.com',
      password: '',
    };
    const hashedPassword = 'hashedPassword123';

    const mockResponse = {
      user_id: userId,
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      last_access: new Date(),
    };

    // Mock Prisma manager.create
    (prisma.manager.create as jest.Mock).mockResolvedValue(mockResponse);

    // Debugging: Log before calling createManager to check if it's invoked
    console.log('Calling createManager with:', userId, userData, hashedPassword);

    // Call the function
    const result = await createManager(userId, userData, hashedPassword);

    // Debugging: Log the result to check if createManager is working correctly
    console.log('Result:', result);

    // Assertions
    expect(prisma.manager.create).toHaveBeenCalledWith({
      data: {
        user_id: userId,
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        last_access: expect.any(Date),
      },
    });
    expect(result).toEqual(mockResponse);
  });
});*/