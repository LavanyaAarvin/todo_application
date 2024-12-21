const request = require('supertest');
const { app } = require('../server');
const AuthController = require('../controllers/auth');
const AuthService = require('../services/auth');
const sendTokenResponse = require('../utils/sendTokenResponse');


describe('AuthController', () => {
  let authController;
  let authService;

  beforeEach(() => {
    authService = new AuthService();
    authController = new AuthController(authService);
  });

  describe('POST /api/v1/auth/register', () => {
    it('should register a user successfully', async () => {
      // Mock service behavior
      authService.register = jest.fn().mockResolvedValue({
        email: 'test@test.com',
        password: 'password123',
      });

      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'test@test.com',
          password: 'password123',
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('User registered successfully.');
    });

    it('should handle registration errors', async () => {
      // You can mock a service error
      authService.register = jest.fn().mockRejectedValue(new Error('Error registering user'));

      const response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'test@test.com',
          password: 'password123',
        });

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Server error');
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should log in a user successfully', async () => {
      // Mock service behavior
      authService.login = jest.fn().mockResolvedValue({
        email: 'test@test.com',
        password: 'password123',
      });

      sendTokenResponse.mockImplementation((user, statusCode, res) => {
        res.status(statusCode).json({
          success: true,
          message: 'Logged in successfully',
        });
      });

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'test@test.com',
          password: 'password123',
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Logged in successfully');
    });

    it('should return error if email or password is missing', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: '',
          password: 'password123',
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Please provide an email and password');
    });
  });

  describe('POST /api/v1/auth/logout', () => {
    it('should log out a user successfully', async () => {
      const response = await request(app).post('/api/v1/auth/logout');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Logged out successfully..!!!');
    });
  });
});
