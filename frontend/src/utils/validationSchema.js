import * as yup from 'yup';

import i18n from 'i18next';

const schema = yup.object().shape({
  username: yup
    .string()
    .matches(/^[a-zA-Z0-9]+$/, i18n.t('form.nameFormat'))
    .min(2, i18n.t('form.minLen', { number: 2 }))
    .max(5, i18n.t('form.maxLen', { number: 5 })),
  name: yup
    .string()
    .matches(/^[a-zA-Z0-9]+$/, i18n.t('form.nameFormat'))
    .min(2, i18n.t('form.minLen', { number: 2 }))
    .max(5, i18n.t('form.maxLen', { number: 5 })),
  email: yup.string().email(i18n.t('form.email')),
  password: yup.string(),
});

export default schema;
