import { Request, Response } from 'express';
import workOpportunityService from '../services/job-service';
import { WorkOpportunityData } from '../types/types';


const createWorkOpportunity = async (req: Request, res: Response) => {
  const {
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
  } = req.body;

  try {
    const newOpportunity = workOpportunityService.createWorkOpportunity(
      company_id,
      title,
      description,
      type,
      location,
      work_schedule,
      contract_type,
      urgency,
      new Date(date),
      skillsRequired
    );

    res.status(200).json(newOpportunity);
  } catch (error) {
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


export default {
  getAllWorkOpportunities,
  createWorkOpportunity,
  filterWorkOpportunities
};