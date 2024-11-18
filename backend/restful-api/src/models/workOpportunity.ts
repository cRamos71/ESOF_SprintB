import { Student } from './student';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class WorkOpportunity {
  opportunity_id: number;
  company_id: number;
  title: string;
  description: string;
  type?: string;
  location: string;
  work_schedule: string;
  contract_type: string;
  urgency: string;
  date: Date;
  skillsRequired: number[]; 

  constructor(
    opportunity_id: number,
    company_id: number,
    title: string,
    description: string,
    type: string | undefined,
    location: string,
    work_schedule: string,
    contract_type: string,
    urgency: string,
    date: Date,
    skillsRequired: number[]
  ) {
    this.opportunity_id = opportunity_id;
    this.company_id = company_id;
    this.title = title;
    this.description = description;
    this.type = type;
    this.location = location;
    this.work_schedule = work_schedule;
    this.contract_type = contract_type;
    this.urgency = urgency;
    this.date = date;
    this.skillsRequired = skillsRequired;
  }

  // Get interested students for this opportunity
  async getInterestedStudents() {
    const students = await prisma.student.findMany({
      where: {
        skills: {
          some: {
            skills_id: {
              in: this.skillsRequired,
            }
          }
        }
      },
      include: {
        skills: true, // Include the skills relation
      }
    });
  
    return students.map((studentData) => {
      const skillIds = studentData.skills.map(skill => skill.skills_id); // Extract skill IDs
      return new Student(
        studentData.student_id,
        studentData.user_id,
        studentData.name,
        studentData.email,
        studentData.password,
        studentData.last_access,
        studentData.interests,
        skillIds // Pass skill IDs to the Student constructor
      );
    });
  }

  // Add skills to this work opportunity
  async addSkills(skillsIds: number[]) {
    await prisma.work_Opportunities.update({
      where: {
        opportunity_id: this.opportunity_id, 
      },
      data: {
        required_skills: {
          connect: skillsIds.map((skillId) => ({
            opportunity_id_skills_id: {
              opportunity_id: this.opportunity_id, 
              skills_id: skillId,
            },
          })),
        },
      },
    });
  }


async notifyInterestedStudents() {
  const students = await this.getInterestedStudents(); // This now returns Student instances

  students.forEach((student) => {
    if (Student.isInterestedInOpportunity(student, this.skillsRequired)) {
      console.log(`Notifying student: ${student.name}`);
      // Here you can send notifications, emails, etc.
    }
  });
}
}