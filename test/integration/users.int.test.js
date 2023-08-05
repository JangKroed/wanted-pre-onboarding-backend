import request from 'supertest';
import app from '../../src/app.js';
import sequelize from '../../src/db/config/connection.js';

describe('Integration Test - Users Controller', () => {
  afterAll(() => {
    sequelize.sync({ force: true });
  });

  it('should signup a user successfully', async () => {
    const newUser = {
      email: 'test@example.com',
      name: 'test user',
      password: 'testpassword',
    };

    const response = await request(app).post('/api/users/signup').send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ ok: true, message: 'signup success' });
  });

  it('should not signup with an existing email', async () => {
    const existingUser = {
      email: 'test@example.com',
      name: 'test user',
      password: 'testpassword',
    };

    const response = await request(app).post('/api/users/signup').send(existingUser);
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('exist email');
  });

  it('should login a user successfully', async () => {
    const user = {
      email: 'test@example.com',
      password: 'testpassword',
    };

    const response = await request(app).post('/api/users/login').send(user);
    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.message).toBe('login success');
    expect(response.body.accessToken).toBeTruthy();
    expect(response.header['set-cookie']).toBeTruthy();
  });

  it('should not login with incorrect password', async () => {
    const user = {
      email: 'test@example.com',
      password: 'incorrectpassword',
    };

    const response = await request(app).post('/api/users/login').send(user);
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('is not equal password');
  });

  it('should not login with a non-existing email', async () => {
    const user = {
      email: 'nonexisting@example.com',
      password: 'testpassword',
    };

    const response = await request(app).post('/api/users/login').send(user);
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('is not user email');
  });
});
