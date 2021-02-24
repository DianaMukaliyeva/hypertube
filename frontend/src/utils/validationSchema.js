import * as yup from 'yup';

const schema = yup.object().shape({
  username: yup
    .string()
    .matches(/^[a-zA-Z0-9]+$/, 'form.nameFormat')
    .min(1, 'form.minLen')
    .max(45, 'form.maxLen'),
  name: yup
    .string()
    .matches(/^[a-zA-Z0-9]+$/, 'form.nameFormat')
    .min(1, 'form.minLen')
    .max(45, 'form.maxLen'),
  email: yup.string().email('form.email'),
  password: yup
    .string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/, 'form.passwordFormat'),
});

export default schema;
