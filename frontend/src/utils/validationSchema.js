import * as yup from 'yup';

// eslint-disable-next-line
const nameRegex = /^[\w'A-Za-z\u0430-\u044f\\u0080-\\uFFFF -][^_,.!¡?÷¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]+$/;

const schema = yup.object().shape({
  username: yup
    .string()
    .min(2, 'formValidation.minLen')
    .matches(nameRegex, 'formValidation.nameFormat')
    .max(45, 'formValidation.maxLen'),
  name: yup
    .string()
    .min(2, 'formValidation.minLen')
    .matches(nameRegex, 'formValidation.nameFormat')
    .max(45, 'formValidation.maxLen'),
  email: yup.string().email('formValidation.emailFormat'),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
      'formValidation.passwordFormat'
    ),
  loginEmail: yup.string(),
  loginPassword: yup.string(),
  updateUsername: yup
    .string()
    .matches(nameRegex, 'formValidation.nameFormat')
    .test(
      'empty-or-min-2-chars',
      'formValidation.minLen',
      (username) => !username || username.length > 1
    )
    .max(45, 'formValidation.maxLen'),
  updateName: yup
    .string()
    .test(
      'empty-or-min-2-chars',
      'formValidation.minLen',
      (name) => !name || name.length > 1
    )
    .matches(nameRegex, 'formValidation.nameFormat')
    .max(45, 'formValidation.maxLen'),
});

export default schema;
