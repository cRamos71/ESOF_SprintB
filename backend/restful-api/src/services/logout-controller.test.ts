import { Request, Response } from 'express';
import { logout } from '../controllers/logout-controller';

describe('Logout Controller', () => {
  it('should clear the auth token cookie and return a success message', async () => {
    // Mock the Response object
    const mockClearCookie = jest.fn();
    const mockStatus = jest.fn(() => ({ json: mockJson }));
    const mockJson = jest.fn();

    const res = {
      clearCookie: mockClearCookie,
      status: mockStatus,
      json: mockJson,
    } as unknown as Response;

    const req = {} as Request;

    
    await logout(req, res);

    // Assertions
    expect(mockClearCookie).toHaveBeenCalledWith('auth_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith({ message: 'User logged out successfully.' });
  });

  it('should handle errors and return a 500 response', async () => {
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
    } as unknown as Response;

    const req = {} as Request;

    // Call the logout controller
    await logout(req, res);

    // Assertions
    expect(mockClearCookie).toHaveBeenCalled();
    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({
      message: 'An error occurred during logout.',
      error: 'Some error',
    });
  });
});