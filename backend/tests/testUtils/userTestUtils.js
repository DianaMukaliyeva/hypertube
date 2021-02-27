/* eslint-disable quotes */
/* eslint-disable quote-props */
const newValidUser = {
  username: 'leon',
  email: 'o1ddss22@rvemold.com',
  lastname: 'Muller',
  firstname: 'Leon',
  password: 'Nena123',
  confirmPassword: 'Nena123',
  language: 'de',
};

const validLogInUser = {
  email: 'o1ddss22@rvemold.com',
  password: 'Nena123',
};

const invalidLogin = [
  {
    email: '',
    password: 'Nena123',
  },
  {
    email: 'o1ddss22rvemold.com',
    password: 'Nena123',
  },
  {
    email: 'o1ddss22@rvemoldcom',
    password: 'Nena123',
  },
  {
    email: 'o1ddss22@rvemoldsd.com',
    password: 'Nena123',
  },
  {
    email: 'o1ddss22@rvemold.com',
    password: '',
  },
  {
    email: 'o1ddss22@rvemold.com',
    password: 'Nena1234',
  },
];

const sqlInjections = [
  {
    email: { "$ne": null },
    password: { "$ne": null },
  },
  {
    email: { "$gt": undefined },
    password: { "$gt": undefined },
  },
  {
    email: { "$gt": "" },
    password: { "$gt": "" },
  },
  {
    email: 'o1ddss22@rvemold.com',
    password: { "$ne": null },
  },
  {
    email: { "$eq": "o1ddss22@rvemold.com" },
    password: { "$regex": "^m" },
  },
];

const invalidUsers = [
  {
    username: 'leon',
    email: 'o1ddss22@rvemold.com',
    lastname: 'Muller',
    firstname: 'Leon',
    password: 'Nenaaaaaa',
    confirmPassword: 'Nenaaaaaa',
    language: 'de',
  },
  {
    username: 'leon',
    email: 'o1ddss22@rvemold.com',
    lastname: 'Muller',
    firstname: 'Leon',
    password: 'nena1234',
    confirmPassword: 'nena1234',
    language: 'de',
  },
  {
    username: 'leon',
    email: 'o1ddss22@rvemold.com',
    lastname: 'Muller',
    firstname: 'Leon',
    password: 'NENA1234',
    confirmPassword: 'NENA1234',
    language: 'de',
  },
  {
    username: 'leon',
    email: 'o1ddss22@rvemold.com',
    lastname: 'Muller',
    firstname: 'Leon',
    password: 'NENA1234',
    confirmPassword: 'Nena12',
    language: 'de',
  },
  {
    username: 'leon',
    email: 'o1ddss22rvemold.com',
    lastname: 'Muller',
    firstname: 'Leon',
    password: 'NENA1234',
    confirmPassword: 'Nena1234',
    language: 'de',
  },
  {
    username: 'leon',
    email: 'o1ddss22@rvemold.com',
    lastname: 'Muller',
    firstname: '!!!',
    password: 'NENA1234',
    confirmPassword: 'Nena1234',
    language: 'de',
  },
  {
    username: 'leon',
    email: 'o1ddss22@rvemold.com',
    lastname: '!__',
    firstname: 'Lena',
    password: 'NENA1234',
    confirmPassword: 'Nena1234',
    language: 'de',
  },
  {
    username: '!@@@',
    email: 'o1ddss22@rvemold.com',
    lastname: 'Lustig',
    firstname: 'Lena',
    password: 'NENA1234',
    confirmPassword: 'Nena1234',
    language: 'de',
  },
  {
    username: 'leon',
    email: 'o1ddssdsds22@rvemold.com',
    lastname: 'Lustig',
    firstname: 'Lala',
    password: 'Nena123',
    confirmPassword: 'Nena123',
    language: 'de',
  },
  {
    username: 'john',
    email: 'o1ddss22@rvemold.com',
    lastname: 'wayne',
    firstname: 'john',
    password: 'Nena123',
    confirmPassword: 'Nena123',
    language: 'de',
  },
];

export default {
  newValidUser,
  invalidUsers,
  validLogInUser,
  sqlInjections,
  invalidLogin,
};
