/* eslint-disable no-undef */
import supertest from 'supertest';
import app from '../app';
import User from '../models/User';
import database from '../utilities/database';

import userUtils from './testUtils/userTestUtils';

const request = supertest(app);

beforeAll(async () => {
  await User.deleteOne({
    username: 'leon',
  });
});

describe('Users Creation API Tests', () => {
  test('create user / Username is NOT valid - expect 400', async () => {
    await request.post('/api/users/').send(userUtils.invalidUsers[7]).expect(400);
  });

  test('create user / Lastname is NOT valid - expect 400', async () => {
    await request.post('/api/users/').send(userUtils.invalidUsers[6]).expect(400);
  });

  test('create user / Firstname is NOT valid - expect 400', async () => {
    await request.post('/api/users/').send(userUtils.invalidUsers[5]).expect(400);
  });

  test('create user / Email is NOT valid - expect 400', async () => {
    await request.post('/api/users/').send(userUtils.invalidUsers[4]).expect(400);
  });

  test('create user / Password is NOT confirmed - expect 400', async () => {
    await request.post('/api/users/').send(userUtils.invalidUsers[3]).expect(400);
  });

  test('create user / Password does NOT contain lower case letter - expect 400', async () => {
    await request.post('/api/users/').send(userUtils.invalidUsers[2]).expect(400);
  });

  test('create user / Password does NOT contain upper case letter - expect 400', async () => {
    await request.post('/api/users/').send(userUtils.invalidUsers[1]).expect(400);
  });

  test('create user / Password does NOT contain number - expect 400', async () => {
    await request.post('/api/users/').send(userUtils.invalidUsers[0]).expect(400);
  });

  test('create user - expect 201', async () => {
    await request.post('/api/users/').send(userUtils.newValidUser).expect(201);
  });

  test('create user / Duplicate User is NOT valid - expect 400', async () => {
    await request.post('/api/users/').send(userUtils.newValidUser).expect(400);
  });

  test('create user / Duplicate Username is NOT valid - expect 400', async () => {
    await request.post('/api/users/').send(userUtils.invalidUsers[8]).expect(400);
  });

  test('create user / Duplicate Email is NOT valid - expect 400', async () => {
    await request.post('/api/users/').send(userUtils.invalidUsers[8]).expect(400);
  });
});

afterAll(async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  database.closeDatabase();
});
