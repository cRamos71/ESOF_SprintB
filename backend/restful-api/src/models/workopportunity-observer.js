"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkOpportunity = void 0;
class WorkOpportunity {
    constructor(opportunity_id, company_id, title, description, type, location, work_schedule, contract_type, urgency, date, required_skills) {
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
        this.required_skills = required_skills;
        this.observers = []; // List of observers (students)
    }
    addObserver(observer) {
        this.observers.push(observer);
    }
    removeObserver(observer) {
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
exports.WorkOpportunity = WorkOpportunity;
