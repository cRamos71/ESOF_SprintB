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
const logout_controller_1 = require("../controllers/logout-controller");
describe('Logout Controller', () => {
    it('should clear the auth token cookie and return a success message', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the Response object
        const mockClearCookie = jest.fn();
        const mockStatus = jest.fn(() => ({ json: mockJson }));
        const mockJson = jest.fn();
        const res = {
            clearCookie: mockClearCookie,
            status: mockStatus,
            json: mockJson,
        };
        const req = {};
        yield (0, logout_controller_1.logout)(req, res);
        // Assertions
        expect(mockClearCookie).toHaveBeenCalledWith('auth_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        });
        expect(mockStatus).toHaveBeenCalledWith(200);
        expect(mockJson).toHaveBeenCalledWith({ message: 'User logged out successfully.' });
    }));
    it('should handle errors and return a 500 response', () => __awaiter(void 0, void 0, void 0, function* () {
        // Force an error by mocking clearCookie to throw
        const mockClearCookie = jest.fn(() => {
            throw new Error('Some error');
        });
        const mockStatus = jest.fn(() => ({ json: mockJson }));
        const mockJson = jest.fn();
        const res = {
            clearCookie: mockClearCookie,
            status: mockStatus,
            json: mockJson,
        };
        const req = {};
        // Call the logout controller
        yield (0, logout_controller_1.logout)(req, res);
        // Assertions
        expect(mockClearCookie).toHaveBeenCalled();
        expect(mockStatus).toHaveBeenCalledWith(500);
        expect(mockJson).toHaveBeenCalledWith({
            message: 'An error occurred during logout.',
            error: 'Some error',
        });
    }));
});
