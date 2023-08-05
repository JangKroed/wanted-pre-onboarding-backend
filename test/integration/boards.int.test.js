import request from 'supertest';
import app from '../../src/app.js';
import sequelize from '../../src/db/config/connection.js';

describe('Integration Test - Boards Controller', () => {
  let accessToken;

  beforeAll(async () => {
    const user = {
      email: 'test@example.com',
      name: 'test user',
      password: 'testpassword',
    };
    await request(app).post('/api/users/signup').send(user);

    const response = await request(app).post('/api/users/login').send(user);
    accessToken = response.body.accessToken;
  });

  afterAll(() => {
    sequelize.sync({ force: true });
  });

  it('should create a new board', async () => {
    const newBoard = {
      title: 'Test Board',
      contents: 'This is a test board.',
    };

    const response = await request(app)
      .post('/api/boards')
      .set('Cookie', [`accessToken=${accessToken}`])
      .send(newBoard);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ ok: true, message: 'create board success' });
  });

  it('should not create a board with invalid input', async () => {
    const invalidBoard = {
      title: '',
      contents: '',
    };

    const response = await request(app)
      .post('/api/boards')
      .set('Cookie', [`accessToken=${accessToken}`])
      .send(invalidBoard);

    expect(response.status).toBe(400);
  });

  it('should get a list of boards', async () => {
    const response = await request(app)
      .get('/api/boards/?pageNum=1')
      .set('Cookie', [`accessToken=${accessToken}`]);

    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.boardList).toBeDefined();
  });

  it('should get a specific board', async () => {
    const boardId = 1;

    const response = await request(app)
      .get(`/api/boards/${boardId}`)
      .set('Cookie', [`accessToken=${accessToken}`]);

    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.board).toBeDefined();
  });

  it('should update a board', async () => {
    const boardId = 1;

    const updatedBoard = {
      title: 'Updated Board',
      contents: 'This board has been updated.',
    };

    const response = await request(app)
      .put(`/api/boards/${boardId}`)
      .set('Cookie', [`accessToken=${accessToken}`])
      .send(updatedBoard);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ ok: true, message: 'board update success' });
  });

  it('should delete a board', async () => {
    const boardId = 1;

    const response = await request(app)
      .delete(`/api/boards/${boardId}`)
      .set('Cookie', [`accessToken=${accessToken}`]);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ ok: true, message: 'board delete success' });
  });

  it('should not delete a board with invalid boardId', async () => {
    const invalidBoardId = 999;

    const response = await request(app)
      .delete(`/api/boards/${invalidBoardId}`)
      .set('Cookie', [`accessToken=${accessToken}`]);

    expect(response.status).toBe(400);
  });
});
