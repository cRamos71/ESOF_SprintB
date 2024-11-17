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
const createWorkOpportunity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { company_id, title, description, type, location, work_schedule, contract_type, urgency, date, skillsRequired } = req.body;
    try {
        const newOpportunity = job_service_1.default.createWorkOpportunity(company_id, title, description, type, location, work_schedule, contract_type, urgency, new Date(date), skillsRequired);
        res.status(200).json(newOpportunity);
    }
    catch (error) {
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
exports.default = {
    getAllWorkOpportunities,
    createWorkOpportunity,
    filterWorkOpportunities
};
