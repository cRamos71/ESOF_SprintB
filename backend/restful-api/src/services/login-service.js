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
exports.loginUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const loginUser = (email, password, role) => __awaiter(void 0, void 0, void 0, function* () {
    let userDetails;
    if (role === 'student') {
        userDetails = yield prisma.student.findUnique({ where: { email } });
    }
    else if (role === 'manager') {
        userDetails = yield prisma.manager.findUnique({ where: { email } });
    }
    else if (role === 'partner') {
        userDetails = yield prisma.partner.findUnique({ where: { email } });
    }
    else if (role === 'company') {
        userDetails = yield prisma.company.findUnique({ where: { email } });
    }
    else {
        throw new Error('Invalid role specified');
    }
    if (!userDetails)
        throw new Error('Invalid credentials');
    const isPasswordValid = yield bcryptjs_1.default.compare(password, userDetails.password);
    if (!isPasswordValid)
        throw new Error('Invalid credentials');
    const user = yield prisma.users.findUnique({ where: { user_id: userDetails.user_id } });
    if (!user)
        throw new Error('User not found in the users table');
    const token = jsonwebtoken_1.default.sign({ userId: user.user_id, email: userDetails.email, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token, userDetails };
});
exports.loginUser = loginUser;
