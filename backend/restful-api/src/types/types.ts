
export interface WorkOpportunityData {
  userID: number;
  title: string;
  description: string;
  type: string;
  location: string;
  work_schedule: string;
  contract_type: string;
  date: Date;
  urgency: string;
  required_skills: number[];
}