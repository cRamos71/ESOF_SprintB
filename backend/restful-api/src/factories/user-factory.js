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
exports.UserFactory = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const student_service_1 = require("../services/student-service");
const company_service_1 = require("../services/company-service");
const partner_service_1 = require("../services/partner-service");
const manager_service_1 = require("../services/manager-service");
const prisma = new client_1.PrismaClient();
class UserFactory {
    static create(role, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const emailExists = yield UserFactory.checkEmailExists(role, userData.email);
            if (emailExists) {
                throw new Error('Email is already taken');
            }
            const hashedPassword = yield bcryptjs_1.default.hash(userData.password, 10);
            const newUser = yield prisma.users.create({
                data: {},
            });
            switch (role) {
                case 'student':
                    return yield (0, student_service_1.createStudent)(newUser.user_id, userData, hashedPassword);
                case 'company':
                    return yield (0, company_service_1.createCompany)(newUser.user_id, userData, hashedPassword);
                case 'partner':
                    return yield (0, partner_service_1.createPartner)(newUser.user_id, userData, hashedPassword);
                case 'manager':
                    return yield (0, manager_service_1.createManager)(newUser.user_id, userData, hashedPassword);
                default:
                    throw new Error('Invalid role');
            }
        });
    }
    static checkEmailExists(role, email) {
        return __awaiter(this, void 0, void 0, function* () {
            let existingUser;
            switch (role) {
                case 'student':
                    existingUser = yield prisma.student.findUnique({ where: { email } });
                    break;
                case 'manager':
                    existingUser = yield prisma.manager.findUnique({ where: { email } });
                    break;
                case 'partner':
                    existingUser = yield prisma.partner.findUnique({ where: { email } });
                    break;
                case 'company':
                    existingUser = yield prisma.company.findUnique({ where: { email } });
                    break;
                default:
                    throw new Error('Invalid role for email check');
            }
            return existingUser ? true : false;
        });
    }
}
exports.UserFactory = UserFactory;
