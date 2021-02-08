/* eslint-disable no-undef */
import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

describe('User API tests', () => {
  test('test okay', async () => {
    await request.get('/test').expect(200);
  });

  test('test not okay', async () => {
    await request.get('/test').expect(201);
  });
});

afterAll(async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
});
