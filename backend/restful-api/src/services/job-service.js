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
const student_1 = require("../models/student");
const prisma = new client_1.PrismaClient();
/*
token: sessionStorage.getItem("token"),
title: formData.title,
description: formData.description,
category: formData.category,
location: formData.location,
schedule: formData.schedule,
*/
/*const createWorkOpportunity = async (data) => {
  try {

    const decoded = decode(sessionStorage.getItem("token"));
    
    const opportunity = await prisma.work_Opportunities.create({
      data: {
        company_id: decoded.company_id,
        title: data.title,
        description: data.description,
        type: data.type,
        location: data.location,
        work_schedule: data.schedule,
        contract_type: data.contract,
        date: data.date,
        required_skills: data.required_skills
      }
    });
    return opportunity;
  } catch (error) {
    throw new Error('Error creating job opportunity: ' + error.message);
  }
};*/
const students = [
    new student_1.Student(1, 'Alice', 'alice@example.com', ['JavaScript', 'React']),
    new student_1.Student(2, 'Bob', 'bob@example.com', ['Java', 'Spring']),
];
// Mocked list of opportunities
const opportunities = [];
// Service method to create a new work opportunity
const createWorkOpportunity = (company_id, title, description, type, location, work_schedule, contract_type, urgency, date, skillsRequired) => {
    const opportunity = new workOpportunity_1.WorkOpportunity(opportunities.length + 1, company_id, title, description, type, location, work_schedule, contract_type, urgency, date, skillsRequired);
    // Register all students as observers
    students.forEach((student) => opportunity.registerObserver(student));
    // Add the opportunity to the list
    opportunities.push(opportunity);
    // Notify all observers
    opportunity.notifyObservers();
    return opportunity;
};
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
