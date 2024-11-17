"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user-controller"); // Correctly import the register function
const router = express_1.default.Router(); // TypeScript will infer the correct type for router
// User routes
router.post('/register', user_controller_1.registerUser);
exports.default = router;
