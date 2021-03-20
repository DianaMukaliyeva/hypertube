/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app';
import User from '../models/User';

import userUtils from './testUtils/userTestUtils';
import updateUtils from './testUtils/updateUserUtils';

const request = supertest(app);

let user;
let token;

beforeAll(async () => {
  await User.deleteOne({
    username: 'leon',
  });

  await request.post('/api/users/').send(userUtils.newValidUser);

  user = await updateUtils.userInDb();
  token = await request.post('/api/auth/login').send(userUtils.validLogInUser);
});

describe('Update User API Tests', () => {
  test('invalid update / email invalid - expect 400', async () => {
    await request.patch(`/api/users/${user[0]._id}`)
      .set('Authorization', `Bearer ${token.body.token}`)
      .send(updateUtils.invalidUpdates[0])
      .expect(400);
  });

  test('invalid update / email invalid - expect 400', async () => {
    await request.patch(`/api/users/${user[0]._id}`)
      .set('Authorization', `Bearer ${token.body.token}`)
      .send(updateUtils.invalidUpdates[1])
      .expect(400);
  });

  test('invalid update / username invalid - expect 400', async () => {
    await request.patch(`/api/users/${user[0]._id}`)
      .set('Authorization', `Bearer ${token.body.token}`)
      .send(updateUtils.invalidUpdates[2])
      .expect(400);
  });

  test('invalid update / firstname invalid - expect 400', async () => {
    await request.patch(`/api/users/${user[0]._id}`)
      .set('Authorization', `Bearer ${token.body.token}`)
      .send(updateUtils.invalidUpdates[3])
      .expect(400);
  });

  test('invalid update / lastname invalid - expect 400', async () => {
    await request.patch(`/api/users/${user[0]._id}`)
      .set('Authorization', `Bearer ${token.body.token}`)
      .send(updateUtils.invalidUpdates[4])
      .expect(400);
  });

  test('invalid update / invalid language - expect 400', async () => {
    await request.patch(`/api/users/${user[0]._id}`)
      .set('Authorization', `Bearer ${token.body.token}`)
      .send(updateUtils.invalidUpdates[5])
      .expect(400);
  });

  test('invalid password update / invalid old password - expect 400', async () => {
    await request.patch(`/api/users/${user[0]._id}`)
      .set('Authorization', `Bearer ${token.body.token}`)
      .send(updateUtils.invalidUpdates[6])
      .expect(400);
  });

  test('invalid password update / invalid password - expect 400', async () => {
    await request.patch(`/api/users/${user[0]._id}`)
      .set('Authorization', `Bearer ${token.body.token}`)
      .send(updateUtils.invalidUpdates[7])
      .expect(400);
  });

  test('invalid password update / invalid confirm password - expect 400', async () => {
    await request.patch(`/api/users/${user[0]._id}`)
      .set('Authorization', `Bearer ${token.body.token}`)
      .send(updateUtils.invalidUpdates[8])
      .expect(400);
  });

  test('valid update / update username - expect 200', async () => {
    await request.patch(`/api/users/${user[0]._id}`)
      .set('Authorization', `Bearer ${token.body.token}`)
      .send(updateUtils.validUpdates[0])
      .expect(200);
  });

  test('valid update / language en - expect 200', async () => {
    await request.patch(`/api/users/${user[0]._id}`)
      .set('Authorization', `Bearer ${token.body.token}`)
      .send(updateUtils.validUpdates[1])
      .expect(200);
  });

  test('valid update / language fi - expect 200', async () => {
    await request.patch(`/api/users/${user[0]._id}`)
      .set('Authorization', `Bearer ${token.body.token}`)
      .send(updateUtils.validUpdates[2])
      .expect(200);
  });

  test('valid update / language ru - expect 200', async () => {
    await request.patch(`/api/users/${user[0]._id}`)
      .set('Authorization', `Bearer ${token.body.token}`)
      .send(updateUtils.validUpdates[3])
      .expect(200);
  });

  test('valid update / valid firstname - expect 200', async () => {
    await request.patch(`/api/users/${user[0]._id}`)
      .set('Authorization', `Bearer ${token.body.token}`)
      .send(updateUtils.validUpdates[4])
      .expect(200);
  });

  test('valid update / valid lastname - expect 200', async () => {
    await request.patch(`/api/users/${user[0]._id}`)
      .set('Authorization', `Bearer ${token.body.token}`)
      .send(updateUtils.validUpdates[5])
      .expect(200);
  });

  test('valid update / valid password change - expect 200', async () => {
    await request.patch(`/api/users/${user[0]._id}`)
      .set('Authorization', `Bearer ${token.body.token}`)
      .send(updateUtils.validUpdates[6])
      .expect(200);
  });

  test('valid update / full update - expect 200', async () => {
    await request.patch(`/api/users/${user[0]._id}`)
      .set('Authorization', `Bearer ${token.body.token}`)
      .send(updateUtils.validUpdates[7])
      .expect(200);
  });

  test('API endpoint test valid | GET /api/users/{userId} expect 200', async () => {
    await request.get(`/api/users/${user[0]._id}`)
      .set('Authorization', `Bearer ${token.body.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

afterAll(async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  mongoose.connection.close();
});
