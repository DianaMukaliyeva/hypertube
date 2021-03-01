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

  await request.post('/api/users/').send(userUtils.newValidUser);
});

describe('Login User API Tests', () => {
  test('SQL injection login user - expect 400', async () => {
    await request.post('/api/auth/login').send(userUtils.sqlInjections[0]).expect(400);
  });

  test('SQL injection login user - expect 400', async () => {
    await request.post('/api/auth/login').send(userUtils.sqlInjections[1]).expect(400);
  });

  test('SQL injection login user - expect 400', async () => {
    await request.post('/api/auth/login').send(userUtils.sqlInjections[2]).expect(400);
  });

  test('SQL injection login user - expect 400', async () => {
    await request.post('/api/auth/login').send(userUtils.sqlInjections[3]).expect(400);
  });

  test('SQL injection login user - expect 400', async () => {
    await request.post('/api/auth/login').send(userUtils.sqlInjections[4]).expect(400);
  });

  test('invalid email / empty field - expect 400', async () => {
    await request.post('/api/auth/login').send(userUtils.invalidLogin[0]).expect(400);
  });

  test('invalid email / not @ sign - expect 400', async () => {
    await request.post('/api/auth/login').send(userUtils.invalidLogin[1]).expect(400);
  });

  test('invalid email / not . ending - expect 400', async () => {
    await request.post('/api/auth/login').send(userUtils.invalidLogin[2]).expect(400);
  });

  test('invalid email / wrong email - expect 400', async () => {
    await request.post('/api/auth/login').send(userUtils.invalidLogin[3]).expect(400);
  });

  test('invalid password / empty field - expect 400', async () => {
    await request.post('/api/auth/login').send(userUtils.invalidLogin[4]).expect(400);
  });

  test('invalid password / wrong password - expect 400', async () => {
    await request.post('/api/auth/login').send(userUtils.invalidLogin[5]).expect(400);
  });

  test('forgot password / empty field - expect 400', async () => {
    await request
      .post('/api/auth/recoverylink')
      .send(userUtils.invalidForgotPassword[0])
      .expect(400);
  });

  test('forgot password / invalid email - expect 400', async () => {
    await request
      .post('/api/auth/recoverylink')
      .send(userUtils.invalidForgotPassword[1])
      .expect(400);
  });

  test('forgot password / invalid email - expect 400', async () => {
    await request
      .post('/api/auth/recoverylink')
      .send(userUtils.invalidForgotPassword[2])
      .expect(400);
  });

  test('forgot password / email is not registered - expect 400', async () => {
    await request
      .post('/api/auth/recoverylink')
      .send(userUtils.invalidForgotPassword[3])
      .expect(400);
  });

  test('forgot password success - expect 200', async () => {
    await request.post('/api/auth/recoverylink').send(userUtils.validForgotPassword).expect(200);
  });

  test('login user success - expect 200', async () => {
    await request.post('/api/auth/login').send(userUtils.validLogInUser).expect(200);
  });
});

afterAll(async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  database.closeDatabase();
});
