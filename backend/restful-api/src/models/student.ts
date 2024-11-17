import { Observer } from '../types/observer';

export class Student implements Observer {
  id: number;
  name: string;
  email: string;
  interests: string[];  // Skills or fields of interest for the student

  constructor(id: number, name: string, email: string, interests: string[]) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.interests = interests;
  }

  // Update method that gets called when a new opportunity is available
  update(opportunity: any): void {
    console.log(`Notifying student ${this.name} about a new opportunity: ${opportunity.title}`);
    // Logic to send email or message can be added here
    // For example, send an email notification
  }
}