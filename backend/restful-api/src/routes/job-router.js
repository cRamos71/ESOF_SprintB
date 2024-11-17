"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const job_controller_1 = __importDefault(require("../controllers/job-controller"));
const router = (0, express_1.Router)();
router.post('/registeropportunities', job_controller_1.default.createWorkOpportunity);
router.get('/work-opportunities', job_controller_1.default.getAllWorkOpportunities);
router.get('/opportunities/filter', job_controller_1.default.filterWorkOpportunities);
exports.default = router;
