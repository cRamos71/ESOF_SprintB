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
const client_1 = require("@prisma/client");
const workOpportunity_1 = require("../models/workOpportunity");
const prisma = new client_1.PrismaClient();
const createWorkOpportunity = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = data.userID;
        console.log(data);
        // Fetch user with their associated company
        const user = yield prisma.users.findUnique({
            where: { user_id: userID },
            include: { Company: true },
        });
        if (!user || !user.Company) {
            throw new Error("Company not found for the provided user");
        }
        const company_id = user.Company.company_id;
        // Create the new Work Opportunity
        const opportunity = yield prisma.work_Opportunities.create({
            data: {
                Company: { connect: { company_id: company_id } },
                title: data.title,
                description: data.description,
                type: data.type || null,
                location: data.location,
                work_schedule: data.work_schedule,
                contract_type: data.contract_type,
                urgency: data.urgency,
                date: new Date(),
                required_skills: { connect: [] },
            },
        });
        if (Array.isArray(data.required_skills) && data.required_skills.length > 0) {
            yield prisma.work_Opportunities.update({
                where: {
                    opportunity_id: opportunity.opportunity_id,
                },
                data: {
                    required_skills: {
                        connect: data.required_skills.map((skillId) => ({
                            opportunity_id_skills_id: {
                                opportunity_id: opportunity.opportunity_id,
                                skills_id: skillId,
                            },
                        })),
                    },
                },
            });
        }
        // Fetch the students who have the required skills (using a join on student_skills)
        const studentsWithSkills = yield prisma.student_Skills.findMany({
            where: {
                skills_id: { in: data.required_skills }, // Get students who have any of the required skills
            },
            include: {
                Student: true, // Include student details
            },
        });
        // Create a WorkOpportunity instance to apply the Observer pattern
        const workOpportunity = new workOpportunity_1.WorkOpportunity(opportunity.opportunity_id, company_id, opportunity.title, opportunity.description, opportunity.type, opportunity.location, opportunity.work_schedule, opportunity.contract_type, opportunity.urgency, opportunity.date, data.required_skills);
        return opportunity;
    }
    catch (error) {
        console.error(error);
        throw new Error('Error creating the work opportunity');
    }
});
const getAllJobOpportunities = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const opportunities = yield prisma.work_Opportunities.findMany({
            include: {
                Company: true,
                required_skills: true
            }
        });
        return opportunities;
    }
    catch (error) {
        console.error("Error fetching work opportunities:", error);
        throw new Error("Unable to fetch work opportunities");
    }
});
const filterOpportunities = (_a) => __awaiter(void 0, [_a], void 0, function* ({ urgency, location, work_schedule, }) {
    const filters = {};
    if (urgency)
        filters.urgency = urgency;
    if (location)
        filters.location = location;
    if (work_schedule)
        filters.way_of_work = work_schedule;
    const opportunities = yield prisma.work_Opportunities.findMany({
        where: filters,
    });
    return opportunities;
});
exports.default = {
    createWorkOpportunity,
    getAllJobOpportunities,
    filterOpportunities
};
