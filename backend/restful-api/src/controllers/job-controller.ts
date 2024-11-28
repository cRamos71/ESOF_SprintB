import { Request, Response } from 'express';
import workOpportunityService from '../services/job-service';
import { WorkOpportunityData } from '../types/types';
import { WorkOpportunity } from '../models/workOpportunity';




const createWorkOpportunity = async (req: Request, res: Response) => {
  const {
    title,
    description,
    type,
    location,
    work_schedule,
    contract_type,
    urgency,
    date,
    required_skills
  } = req.body;
  

  const userID = req.userId;

  try {
    const newOpportunity = await workOpportunityService.createWorkOpportunity({
      userID,
      title,
      description,
      type,
      location,
      work_schedule,
      contract_type,
      date: new Date(date),
      urgency,
      required_skills,
    });

     const workOpportunity = new WorkOpportunity(
      newOpportunity.opportunity_id,
      newOpportunity.company_id,
      newOpportunity.title,
      newOpportunity.description,
      newOpportunity.type,
      newOpportunity.location,
      newOpportunity.work_schedule,
      newOpportunity.contract_type,
      newOpportunity.urgency,
      newOpportunity.date,
      required_skills
    );

    // Notify interested students
    await workOpportunity.notifyInterestedStudents();

    res.status(200).json(newOpportunity);
  } catch (error) {
    console.error(error);
    res.status(200).json({ error: error.message });
  }
};
const getAllWorkOpportunities = async (req: Request, res: Response) => {
  try {
    console.log("Fetching job opportunities...");
    const opportunities = await workOpportunityService.getAllJobOpportunities();
    console.log("Fetched opportunities:", opportunities);   
    res.status(200).json(opportunities);
  } catch (error) {
    console.error("Error retrieving work opportunities:", error);
    res.status(200).json({ error: "Unable to fetch work opportunities" });
  }
};

const filterWorkOpportunities = async (req: Request, res: Response) => {
  const { urgency, location, work_schedule } = req.query;

  try {
    const opportunities = await workOpportunityService.filterOpportunities({
      urgency: urgency ? String(urgency) : undefined,
      location: location ? String(location) : undefined,
      work_schedule: work_schedule ? String(work_schedule) : undefined,
    });

    res.status(200).json(opportunities);
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};

const opportunitiesCandidatures = async (req: Request, res: Response) => {
  try{
    const userId = req.userId;
    const opportunities = await workOpportunityService.getAppliedStudents(userId);
    res.status(200).json(opportunities);
  }catch(error){
    res.status(200).json({error: error.message});
  }
};


export default {
  getAllWorkOpportunities,
  createWorkOpportunity,
  filterWorkOpportunities,
  opportunitiesCandidatures
};