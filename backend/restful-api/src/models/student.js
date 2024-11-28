"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class Student {
    constructor(student_id, user_id, name, email, password, last_access, interests, skills) {
        this.student_id = student_id;
        this.user_id = user_id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.last_access = last_access;
        this.interests = interests;
        this.skills = skills;
    }
    static isInterestedInOpportunity(student, requiredSkills) {
        // Split interests into an array if it's a CSV string
        const studentInterests = student.interests.split(',');
        // Check if the student's interests overlap with the required skills
        return requiredSkills.some(skillId => studentInterests.includes(skillId.toString()));
    }
}
exports.Student = Student;
