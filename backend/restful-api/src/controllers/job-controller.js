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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const job_service_1 = __importDefault(require("../services/job-service"));
const workOpportunity_1 = require("../models/workOpportunity");
const createWorkOpportunity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, type, location, work_schedule, contract_type, urgency, date, required_skills } = req.body;
    const userID = req.userId;
    try {
        const newOpportunity = yield job_service_1.default.createWorkOpportunity({
            userID,
            title,
            description,
            type,
            location,
            work_schedule,
            contract_type,
            date: new Date(date),
            urgency,
            required_skills,
        });
        const workOpportunity = new workOpportunity_1.WorkOpportunity(newOpportunity.opportunity_id, newOpportunity.company_id, newOpportunity.title, newOpportunity.description, newOpportunity.type, newOpportunity.location, newOpportunity.work_schedule, newOpportunity.contract_type, newOpportunity.urgency, newOpportunity.date, required_skills);
        // Notify interested students
        yield workOpportunity.notifyInterestedStudents();
        res.status(200).json(newOpportunity);
    }
    catch (error) {
        console.error(error);
        res.status(200).json({ error: error.message });
    }
});
const getAllWorkOpportunities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Fetching job opportunities...");
        const opportunities = yield job_service_1.default.getAllJobOpportunities();
        console.log("Fetched opportunities:", opportunities);
        res.status(200).json(opportunities);
    }
    catch (error) {
        console.error("Error retrieving work opportunities:", error);
        res.status(200).json({ error: "Unable to fetch work opportunities" });
    }
});
const filterWorkOpportunities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { urgency, location, work_schedule } = req.query;
    try {
        const opportunities = yield job_service_1.default.filterOpportunities({
            urgency: urgency ? String(urgency) : undefined,
            location: location ? String(location) : undefined,
            work_schedule: work_schedule ? String(work_schedule) : undefined,
        });
        res.status(200).json(opportunities);
    }
    catch (error) {
        res.status(200).json({ error: error.message });
    }
});
const opportunitiesCandidatures = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const opportunities = yield job_service_1.default.getAppliedStudents(userId);
        res.status(200).json(opportunities);
    }
    catch (error) {
        res.status(200).json({ error: error.message });
    }
});
exports.default = {
    getAllWorkOpportunities,
    createWorkOpportunity,
    filterWorkOpportunities,
    opportunitiesCandidatures
};
