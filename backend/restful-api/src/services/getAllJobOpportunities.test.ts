import { PrismaClient } from "@prisma/client";
import workOpportunityService from './job-service';
import { jest } from '@jest/globals';

// Mock Prisma Client
jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    work_Opportunities: {
      findMany: jest.fn(),
    },
  };
  return {
    PrismaClient: jest.fn(() => mPrismaClient),
  };
});

describe('getAllJobOpportunities', () => {
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch all job opportunities successfully', async () => {
    const mockOpportunities = [
      {
        opportunity_id: 1,
        company_id: 2,
        title: 'Software Developer',
        description: 'Develop software applications',
        type: 'aa',
        location: 'Remote',
        urgency: 'High',
        work_schedule: 'Full-Time',
        contract_type: 'Full-Time',
        date: new Date(),
        required_skills: [{ skill_name: 'JavaScript' }],
      },
      {
        opportunity_id: 2,
        company_id: 1,
        title: 'Data Scientist',
        description: 'Analyze data and build models',
        type: 'aa',
        location: 'San Francisco',
        urgency: 'High',
        work_schedule: 'Full-Time',
        contract_type: 'Full-Time',
        date: new Date(),
        required_skills: [{ skill_name: 'Python' }],
      },
    ];

    // Type the mock correctly for Prisma
    const workOpportunitiesMock = prisma.work_Opportunities as jest.Mocked<typeof prisma.work_Opportunities>;
    workOpportunitiesMock.findMany.mockResolvedValue(mockOpportunities);


    // Act: Call the function
    const opportunities = await workOpportunityService.getAllJobOpportunities();

    // Assert: Verify the result
    expect(opportunities).toEqual(mockOpportunities);
    expect(workOpportunitiesMock.findMany).toHaveBeenCalledTimes(1);
  });

  it('should handle errors when fetching opportunities fails', async () => {
    // Type the mock correctly for Prisma
    const workOpportunitiesMock = prisma.work_Opportunities as jest.Mocked<typeof prisma.work_Opportunities>;

    // Arrange: Mock an error from prisma
    workOpportunitiesMock.findMany.mockRejectedValue(new Error('Database error'));
  });
});