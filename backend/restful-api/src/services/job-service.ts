import { decode, JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { WorkOpportunity } from '../models/workOpportunity';
import { Student } from '../models/student';
import { WorkOpportunityData } from '../types/types';
import { Request, Response } from 'express';


const prisma = new PrismaClient();

interface AuthPayload {
  userId: number;
  email: string;
  role: string;
}



const createWorkOpportunity = async (data: WorkOpportunityData) => {
  try {
    const userID = data.userID;
    console.log(data);
    // Fetch user with their associated company
    const user = await prisma.users.findUnique({
      where: { user_id: userID },
      include: { Company: true },
    });

    if (!user || !user.Company) {
      throw new Error("Company not found for the provided user");
    }

    const company_id = user.Company.company_id;

    // Create the new Work Opportunity
    const opportunity = await prisma.work_Opportunities.create({
      data: {
        Company: { connect: { company_id: company_id } },
        title: data.title,
        description: data.description,
        type: data.type || null,
        location: data.location,
        work_schedule: data.work_schedule,
        contract_type: data.contract_type,
        urgency: data.urgency,
        date: new Date(),
        required_skills: { connect: [] },
      },
    });


    if (Array.isArray(data.required_skills) && data.required_skills.length > 0) {
      await prisma.work_Opportunities.update({
        where: {
          opportunity_id: opportunity.opportunity_id, 
        },
        data: {
          required_skills: {
            connect: data.required_skills.map((skillId) => ({
              opportunity_id_skills_id: {
                opportunity_id: opportunity.opportunity_id, 
                skills_id: skillId,
              },
            })),
          },
        },
      });
    }

      // Fetch the students who have the required skills (using a join on student_skills)
      const studentsWithSkills = await prisma.student_Skills.findMany({
        where: {
          skills_id: { in: data.required_skills }, // Get students who have any of the required skills
        },
        include: {
          Student: true, // Include student details
        },
      });
  
      // Create a WorkOpportunity instance to apply the Observer pattern
      const workOpportunity = new WorkOpportunity(
        opportunity.opportunity_id,
        company_id,
        opportunity.title,
        opportunity.description,
        opportunity.type,
        opportunity.location,
        opportunity.work_schedule,
        opportunity.contract_type,
        opportunity.urgency,
        opportunity.date,
        data.required_skills
      );
  
    return opportunity;

  } catch (error) {
    console.error(error);
    throw new Error('Error creating the work opportunity');
  }
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

const getAppliedStudents = async (userId: number) => {
  try{
    const company = await prisma.company.findUnique({
      where: {user_id: userId},
    });

    if(!company)
      throw new Error("Company not found for the provided user");

    const opportunities = await prisma.work_Opportunities.findMany({
      where: {company_id: company.company_id}
    });

    const candidaturesWithStudents = await Promise.all(
      opportunities.map((opportunity) =>
        prisma.candidature.findMany({
          where: { opportunity_id: opportunity.opportunity_id },
          include: {
            Student: true, // Include the student data for each candidature
            Work_Opportunities: { select: { title: true } }, // Include opportunity title
          },
        })
      )
    );

    // Flatten the result into a single array and extract relevant details
    const allStudents = candidaturesWithStudents.flat().map((candidature) => ({
      candidature_id: candidature.candidature_id,
      email: candidature.Student.email,
      student_name: candidature.Student.name, 
      opportunity_id: candidature.opportunity_id,
      opportunity_title: candidature.Work_Opportunities.title,
      date: candidature.date,
    }));
    
    return allStudents;
  }catch (error) {
    console.error("Error fetching students for company opportunities:", error);
    throw new Error("Unable to fetch students");
  }
}

export default{
  createWorkOpportunity,
  getAllJobOpportunities,
  filterOpportunities,
  getAppliedStudents
} 