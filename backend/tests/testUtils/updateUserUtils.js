import User from '../../models/User';

const invalidUpdates = [
  {
    email: 'peter@mailcom',
  },
  {
    email: 'petermail.com',
  },
  {
    username: 'p',
  },
  {
    firstname: '23p!',
  },
  {
    lastname: 'p424!!!',
  },
  {
    language: 'sw',
  },
  {
    oldPassword: '123N',
    password: 'Peter123',
    confirmPassword: 'Peter123',
  },
  {
    oldPassword: 'Nena123',
    password: 'Peter',
    confirmPassword: 'Peter',
  },
  {
    oldPassword: 'Nena123',
    password: 'Peter123',
    confirmPassword: 'Peter1235',
  },
];

const validUpdates = [
  {
    username: 'peter',
  },
  {
    language: 'en',
  },
  {
    language: 'fi',
  },
  {
    language: 'ru',
  },
  {
    firstname: 'Jens',
  },
  {
    firstname: 'Lehmann',
  },
  {
    oldPassword: 'Nena123',
    password: 'Peter123',
    confirmPassword: 'Peter123',
  },
  {
    username: 'Jan',
    firstname: 'Angela',
    lastname: 'Schmidt',
    email: 'jens@mail.com',
    oldPassword: 'Peter123',
    password: 'Nena123',
    confirmPassword: 'Nena123',
  },
];

const userInDb = async () => {
  const users = await User.find({ email: 'o1ddss22@rvemold.com' });
  return users;
};

export default {
  userInDb,
  invalidUpdates,
  validUpdates,
};
