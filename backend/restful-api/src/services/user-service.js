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
exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const registerUser = (role, userData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Validate the role
    const validRoles = ['student', 'manager', 'partner', 'company'];
    if (!validRoles.includes(role)) {
        throw new Error('Invalid user role');
    }
    // Check if the email already exists in the role-specific tables
    const existingEmail = (yield prisma.student.findUnique({
        where: { email: userData.email },
    })) ||
        (yield prisma.manager.findUnique({
            where: { email: userData.email },
        })) ||
        (yield prisma.partner.findUnique({
            where: { email: userData.email },
        })) ||
        (yield prisma.company.findUnique({
            where: { email: userData.email },
        }));
    if (existingEmail) {
        throw new Error('Email already exists');
    }
    // Hash the password before saving
    const hashedPassword = yield bcryptjs_1.default.hash(userData.password, 10);
    // Create the user in the `users` table
    const newUser = yield prisma.users.create({
        data: {},
    });
    // Create the specific user type based on the role
    switch (role) {
        case 'student':
            return yield prisma.student.create({
                data: {
                    user_id: newUser.user_id,
                    name: userData.name,
                    email: userData.email,
                    password: hashedPassword,
                    birth_date: userData.birth_date,
                    address: userData.address,
                    disponibility: userData.disponibility,
                    interests: userData.interests,
                    last_access: new Date(),
                    skills: {
                        create: (_a = userData.skills) === null || _a === void 0 ? void 0 : _a.map((skillId) => ({
                            skills_id: skillId,
                        })),
                    },
                },
            });
        case 'manager':
            return yield prisma.manager.create({
                data: {
                    user_id: newUser.user_id,
                    name: userData.name,
                    email: userData.email,
                    password: hashedPassword,
                    last_access: new Date(),
                },
            });
        case 'partner':
            return yield prisma.partner.create({
                data: {
                    user_id: newUser.user_id,
                    name: userData.name,
                    email: userData.email,
                    password: hashedPassword,
                    last_access: new Date(),
                },
            });
        case 'company':
            return yield prisma.company.create({
                data: {
                    user_id: newUser.user_id,
                    name: userData.name,
                    email: userData.email,
                    password: hashedPassword,
                    last_access: new Date(),
                    approval_badge: userData.approval_badge || false,
                },
            });
        default:
            throw new Error('Invalid user role');
    }
});
exports.registerUser = registerUser;
