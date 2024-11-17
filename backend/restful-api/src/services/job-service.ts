import { decode, JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { WorkOpportunity } from '../models/workOpportunity';
import { Student } from '../models/student';

const prisma = new PrismaClient();

interface AuthPayload {
  userId: number;
  email: string;
  role: string;
}

/*
token: sessionStorage.getItem("token"),
title: formData.title,
description: formData.description,
category: formData.category,
location: formData.location,
schedule: formData.schedule,
*/

/*const createWorkOpportunity = async (data) => {
  try {

    const decoded = decode(sessionStorage.getItem("token"));
    
    const opportunity = await prisma.work_Opportunities.create({
      data: {
        company_id: decoded.company_id,
        title: data.title,
        description: data.description,
        type: data.type,
        location: data.location,
        work_schedule: data.schedule,
        contract_type: data.contract,
        date: data.date,
        required_skills: data.required_skills
      }
    });
    return opportunity;
  } catch (error) {
    throw new Error('Error creating job opportunity: ' + error.message);
  }
};*/

const students: Student[] = [
  new Student(1, 'Alice', 'alice@example.com', ['JavaScript', 'React']),
  new Student(2, 'Bob', 'bob@example.com', ['Java', 'Spring']),
];

// Mocked list of opportunities
const opportunities: WorkOpportunity[] = [];

// Service method to create a new work opportunity
const createWorkOpportunity = (
  company_id: number,
  title: string,
  description: string,
  type: string | undefined,
  location: string,
  work_schedule: string,
  contract_type: string,
  urgency: string,
  date: Date,
  skillsRequired: string[]
) => {
  const opportunity = new WorkOpportunity(
    opportunities.length + 1,
    company_id,
    title,
    description,
    type,
    location,
    work_schedule,
    contract_type,
    urgency,
    date,
    skillsRequired
  );

  // Register all students as observers
  students.forEach((student) => opportunity.registerObserver(student));

  // Add the opportunity to the list
  opportunities.push(opportunity);

  // Notify all observers
  opportunity.notifyObservers();

  return opportunity;
};


const getAllJobOpportunities = async () => {
  try {
    const opportunities = await prisma.work_Opportunities.findMany({
      include: {
        Company: true,  
        required_skills: true  
      }
    });
    return opportunities;
  } catch (error) {
    console.error("Error fetching work opportunities:", error);
    throw new Error("Unable to fetch work opportunities");
  }
};


const filterOpportunities = async ({
  urgency,
  location,
  work_schedule,
}: {
  urgency?: string;
  location?: string;
  work_schedule?: string;
}) => {
  const filters: any = {};

  if (urgency) filters.urgency = urgency;
  if (location) filters.location = location;
  if (work_schedule) filters.way_of_work = work_schedule;

  const opportunities = await prisma.work_Opportunities.findMany({
    where: filters,
  });

  return opportunities;
};


export default{
  createWorkOpportunity,
  getAllJobOpportunities,
  filterOpportunities
} 