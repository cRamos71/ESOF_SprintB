"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const job_controller_1 = __importDefault(require("../controllers/job-controller"));
const auth_middleware_1 = require("../../middleware/auth-middleware"); // Import the token verification middleware
const router = (0, express_1.Router)();
router.post('/registeropportunities', auth_middleware_1.verifyToken, job_controller_1.default.createWorkOpportunity);
router.get('/work-opportunities', auth_middleware_1.verifyToken, job_controller_1.default.getAllWorkOpportunities);
router.post('/opportunities/filter', auth_middleware_1.verifyToken, job_controller_1.default.filterWorkOpportunities);
exports.default = router;
