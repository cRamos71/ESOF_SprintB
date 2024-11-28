export class WorkOpportunity {
  private observers: any[] = []; // List of observers (students)

  constructor(
    public opportunity_id: number,
    public company_id: number,
    public title: string,
    public description: string,
    public type: string | null,
    public location: string,
    public work_schedule: string,
    public contract_type: string,
    public urgency: string | null,
    public date: Date,
    public required_skills: number[]
  ) {}

  addObserver(observer: any) {
    this.observers.push(observer);
  }

  removeObserver(observer: any) {
    this.observers = this.observers.filter(o => o !== observer);
  }

  // Notify all observers (students) about the new work opportunity
  notifyObservers() {
    this.observers.forEach(observer => {
      observer.update(this);
    });
  }

  // This is called when a work opportunity is created or updated
  createOrUpdateOpportunity() {
    console.log(`New work opportunity created: ${this.title}`);
    
    // Notify observers (students)
    this.notifyObservers();
  }
}