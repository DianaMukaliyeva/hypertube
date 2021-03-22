/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import supertest from 'supertest';
import app from '../app';
import User from '../models/User';
import database from '../utilities/database';
import userUtils from './testUtils/userTestUtils';

const request = supertest(app);

let token;

beforeAll(async () => {
  await User.deleteOne({
    username: 'leon',
  });

  await request.post('/api/users/').send(userUtils.newValidUser);

  token = await request.post('/api/auth/login').send(userUtils.validLogInUser);
});

describe('Test Movie API Endpoints', () => {
  test('API endpoint test valid | GET /movies/:imdb_code expect 200', async () => {
    await request.get('/api/movies/tt5463162')
      .set('Authorization', `Bearer ${token.body.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('API endpoint test INVALID | GET /movies/ - wrong token expect 401', async () => {
    await request.get('/api/movies/')
      .set('Authorization', 'Bearer 23242ifasfjaf.dsaf23wr4a.ar2r4')
      .expect(401);
  });

  test('API endpoint test valid | GET /movies/ expect 200', async () => {
    await request.get('/api/movies/')
      .set('Authorization', `Bearer ${token.body.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('PATCH set movie watched INVALID | PATCH /api/movies/{imdbCode} - wrong token expect 401', async () => {
    await request.patch('/api/movies/tt5463162')
      .set('Authorization', 'Bearer 42a4a24.a242ar4a424.a42242')
      .expect(401);
  });

  test('PATCH set movie watched valid | PATCH /api/movies/{imdbCode} - expect 201', async () => {
    await request.patch('/api/movies/tt5463162')
      .set('Authorization', `Bearer ${token.body.token}`)
      .expect(201);
  });

  test('POST comment INVALID | POST /api/movies/{imdbCode}/comments - wrong token expect 401', async () => {
    await request.post('/api/movies/tt5463162/comments')
      .set('Authorization', 'Bearer 42a4a24.a242ar4a424.a42242')
      .send({ comment: 'cool movie!' })
      .expect(401);
  });

  test('POST comment INVALID | POST /api/movies/{imdbCode}/comments - empty comment field expect 400', async () => {
    await request.post('/api/movies/tt5463162/comments')
      .set('Authorization', `Bearer ${token.body.token}`)
      .send({ comment: '' })
      .expect(400);
  });

  test('POST comment valid | POST /api/movies/{imdbCode}/comments - expect 201', async () => {
    await request.post('/api/movies/tt5463162/comments')
      .set('Authorization', `Bearer ${token.body.token}`)
      .send({ comment: 'cool movie!' })
      .expect(201);
  });

  test('POST comment valid | POST /api/movies/{imdbCode}/comments - Script tag should be added as comment expect 201', async () => {
    await request.post('/api/movies/tt5463162/comments')
      .set('Authorization', `Bearer ${token.body.token}`)
      .send({ comment: '<script>alert("Hello")</script>' })
      .expect(201);
  });

  test('GET comments INVALID | GET /api/movies/{imdbCode}/comments - wrong token expect 401', async () => {
    await request.get('/api/movies/tt5463162/comments')
      .set('Authorization', 'Bearer 42a4a24.a242ar4a424.a42242')
      .expect(401);
  });

  test('GET comment valid | GET /api/movies/{imdbCode}/comments - expect 200', async () => {
    await request.get('/api/movies/tt5463162/comments')
      .set('Authorization', `Bearer ${token.body.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

afterAll(async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  database.closeDatabase();
});
