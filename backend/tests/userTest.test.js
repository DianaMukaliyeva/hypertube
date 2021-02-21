/* eslint-disable no-undef */
import supertest from 'supertest';
import app from '../app';

import userUtils from './testUtils/userTestUtils';

const request = supertest(app);

describe('Users API tests', () => {
  test('test okay', async () => {
    await request.post('/api/users/').send(userUtils.newValidUser).expect(201);
  });
});

afterAll(async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
});
