import { Subject } from '../types/observer';
import { Student } from './student';

export class WorkOpportunity implements Subject {
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
  skillsRequired: string[];

  interestedStudents: Student[] = [];

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
    skillsRequired: string[]
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

  registerObserver(observer: Student): void {
    this.interestedStudents.push(observer);
  }

  removeObserver(observer: Student): void {
    this.interestedStudents = this.interestedStudents.filter(
      (student) => student.id !== observer.id
    );
  }

  notifyObservers(): void {
    this.interestedStudents.forEach((student) => {
      if (this.isStudentInterested(student)) {
        student.update(this); // Notify student if they are interested
      }
    });
  }

  private isStudentInterested(student: Student): boolean {
    // A student is interested if their skills overlap with the required skills
    return this.skillsRequired.some((skill) => student.interests.includes(skill));
  }
}