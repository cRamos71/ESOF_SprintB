import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export class Student {
  student_id: number;
  user_id: number;
  name: string;
  email: string;
  password: string;
  birth_date: Date;
  address: string;
  disponibility: string;
  interests: string; // Interests will be a CSV string
  last_access: Date;
  skills: number[]; // Array of skill IDs from the Student_Skills relation

  constructor(
    student_id: number,
    user_id: number,
    name: string,
    email: string,
    password: string,
    last_access: Date,
    interests: string,
    skills: number[] // Skills are now passed as an array of skill IDs
  ) {
    this.student_id = student_id;
    this.user_id = user_id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.last_access = last_access;
    this.interests = interests;
    this.skills = skills; // Assign skills to the class property
  }

  static isInterestedInOpportunity(student: Student, requiredSkills: number[]): boolean {
    // Split interests into an array if it's a CSV string
    const studentInterests = student.interests.split(','); 
    // Check if the student's interests overlap with the required skills
    return requiredSkills.some(skillId => studentInterests.includes(skillId.toString()));
  }
}