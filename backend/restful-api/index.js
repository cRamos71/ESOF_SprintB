"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_router_1 = __importDefault(require("./src/routes/user-router")); // Import the router
const login_router_1 = __importDefault(require("./src/routes/login-router"));
const job_router_1 = __importDefault(require("./src/routes/job-router"));
const logout_router_1 = __importDefault(require("./src/routes/logout-router"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use((err, req, res, next) => {
    res.status(200).json({ message: err.message });
});
app.use(express_1.default.json());
app.use('/api', user_router_1.default);
app.use('/api', login_router_1.default);
app.use('/api', job_router_1.default);
app.use('/api', logout_router_1.default);
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
