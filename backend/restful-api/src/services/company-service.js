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
exports.createCompany = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createCompany = (userId, userData, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const company = yield prisma.company.create({
        data: {
            user_id: userId,
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
            last_access: new Date(),
            approval_badge: userData.approval_badge || false,
        },
    });
    const managers = yield prisma.manager.findMany();
    for (const manager of managers) {
        yield prisma.notification.create({
            data: {
                user_id: manager.manager_id,
                manager_id: manager.manager_id,
                message: `New company "${userData.name}" has registered and requires approval.`,
            },
        });
    }
    return company;
});
exports.createCompany = createCompany;
