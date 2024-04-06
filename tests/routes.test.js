const request = require('supertest');
const app = require('../index'); // Assuming your Express app instance is exported from app.js
const User = require('../models/auth.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

describe('Authentication Routes', () => {


   describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      const newUser = {
        email: `test-${Date.now()}@example.com`, // Unique email address
        password: 'password',
      };

      const response = await request(app)
        .post('/auth/register')
        .send(newUser);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('_id');
      expect(response.body.user.email).toBe(newUser.email);

      // Optionally, you can check if the password is hashed
      const userInDB = await User.findOne({ email: newUser.email });
      expect(userInDB).toBeDefined();
      const isPasswordMatch = await bcrypt.compare(newUser.password, userInDB.password);
      expect(isPasswordMatch).toBe(true);
    });

    it('should return 409 if user already exists', async () => {
      // Test case implementation...
    });
  });


  describe('POST /auth/login', () => {
  it('should log in a user', async () => {
    const testEmail = 'test-1712409864522@example.com';
    const testPassword = 'password';

    const response = await request(app)
      .post('/auth/login')
      .send({ email: testEmail, password: testPassword });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user.email).toBe(testEmail); // Ensure the correct user is logged in
  });

  it('should return 409 if email is not found', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'nonexistent@example.com', password: 'password' });

    expect(response.status).toBe(409);
  });

  it('should return 400 if password is incorrect', async () => {
    const user = await User.findOne({ email: 'test-1712409864522@example.com' });

    const response = await request(app)
      .post('/auth/login')
      .send({ email: user.email, password: 'wrongpassword' });

    expect(response.status).toBe(400);
  });
});

});
