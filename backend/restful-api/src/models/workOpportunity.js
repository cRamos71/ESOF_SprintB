"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkOpportunity = void 0;
class WorkOpportunity {
    constructor(opportunity_id, company_id, title, description, type, location, work_schedule, contract_type, urgency, date, skillsRequired) {
        this.interestedStudents = [];
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
    registerObserver(observer) {
        this.interestedStudents.push(observer);
    }
    removeObserver(observer) {
        this.interestedStudents = this.interestedStudents.filter((student) => student.id !== observer.id);
    }
    notifyObservers() {
        this.interestedStudents.forEach((student) => {
            if (this.isStudentInterested(student)) {
                student.update(this); // Notify student if they are interested
            }
        });
    }
    isStudentInterested(student) {
        // A student is interested if their skills overlap with the required skills
        return this.skillsRequired.some((skill) => student.interests.includes(skill));
    }
}
exports.WorkOpportunity = WorkOpportunity;
