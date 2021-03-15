import * as yup from 'yup';

const schema = yup.object().shape({
  username: yup
    .string()
    .min(2, 'form.minLen')
    .matches(/^[a-zA-Z0-9]+$/, 'form.nameFormat')
    .max(45, 'form.maxLen'),
  name: yup
    .string()
    .min(2, 'form.minLen')
    .matches(/^[a-zA-Z0-9]+$/, 'form.nameFormat')
    .max(45, 'form.maxLen'),
  email: yup.string().email('form.email'),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
      'form.passwordFormat'
    ),
  loginEmail: yup.string(),
  loginPassword: yup.string(),
  updateUsername: yup
    .string()
    .matches(/^[a-zA-Z0-9]*$/, 'form.nameFormat')
    .test(
      'empty-or-min-2-chars',
      'form.minLen',
      (username) => !username || username.length > 1
    )
    .max(45, 'form.maxLen'),
  updateName: yup
    .string()
    .test(
      'empty-or-min-2-chars',
      'form.minLen',
      (name) => !name || name.length > 1
    )
    .matches(/^[a-zA-Z0-9]*$/, 'form.nameFormat')
    .max(45, 'form.maxLen'),
});

export default schema;
