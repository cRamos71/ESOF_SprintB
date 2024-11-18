"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkOpportunity = void 0;
const student_1 = require("./student");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class WorkOpportunity {
    constructor(opportunity_id, company_id, title, description, type, location, work_schedule, contract_type, urgency, date, skillsRequired) {
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
    // Get interested students for this opportunity
    getInterestedStudents() {
        return __awaiter(this, void 0, void 0, function* () {
            const students = yield prisma.student.findMany({
                where: {
                    skills: {
                        some: {
                            skills_id: {
                                in: this.skillsRequired,
                            }
                        }
                    }
                },
                include: {
                    skills: true, // Include the skills relation
                }
            });
            return students.map((studentData) => {
                const skillIds = studentData.skills.map(skill => skill.skills_id); // Extract skill IDs
                return new student_1.Student(studentData.student_id, studentData.user_id, studentData.name, studentData.email, studentData.password, studentData.last_access, studentData.interests, skillIds // Pass skill IDs to the Student constructor
                );
            });
        });
    }
    // Add skills to this work opportunity
    addSkills(skillsIds) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.work_Opportunities.update({
                where: {
                    opportunity_id: this.opportunity_id,
                },
                data: {
                    required_skills: {
                        connect: skillsIds.map((skillId) => ({
                            opportunity_id_skills_id: {
                                opportunity_id: this.opportunity_id,
                                skills_id: skillId,
                            },
                        })),
                    },
                },
            });
        });
    }
    notifyInterestedStudents() {
        return __awaiter(this, void 0, void 0, function* () {
            const students = yield this.getInterestedStudents(); // This now returns Student instances
            students.forEach((student) => {
                if (student_1.Student.isInterestedInOpportunity(student, this.skillsRequired)) {
                    console.log(`Notifying student: ${student.name}`);
                    // Here you can send notifications, emails, etc.
                }
            });
        });
    }
}
exports.WorkOpportunity = WorkOpportunity;