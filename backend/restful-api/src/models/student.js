"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
class Student {
    constructor(id, name, email, interests) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.interests = interests;
    }
    // Update method that gets called when a new opportunity is available
    update(opportunity) {
        console.log(`Notifying student ${this.name} about a new opportunity: ${opportunity.title}`);
        // Logic to send email or message can be added here
        // For example, send an email notification
    }
}
exports.Student = Student;
