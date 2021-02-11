import * as yup from 'yup';

// TO DO add more validation
// TO DO for edit profile form, add more regex for other languages
const schema = yup.object().shape({
  username: yup
    .string()
    .matches(/^[a-zA-Z0-9]+$/, 'form.nameFormat')
    .min(2, 'form.minLen')
    .max(5, 'form.maxLen'),
  name: yup
    .string()
    .matches(/^[a-zA-Z0-9]+$/, 'form.nameFormat')
    .min(2, 'form.minLen')
    .max(5, 'form.maxLen'),
  email: yup.string().email('form.email'),
  password: yup.string(),
});

export default schema;
