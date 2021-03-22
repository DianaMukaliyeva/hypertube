import React, { useState } from 'react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import useField from '../../hooks/useField';

import userService from '../../services/user';
import sharedFunctions from '../../utils/sharedFunctions';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Alert } from '@material-ui/lab';

import InputField from '../common/InputField';
import FormButton from '../common/FormButton';
import OmniAuthLogin from './OmniAuthLogin';
import useAlert from '../../hooks/useAlert';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  select: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const CreateAccountForm = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const username = useField('text', 'username', 'create-username');
  const firstName = useField('text', 'name', 'create-firstname');
  const lastName = useField('text', 'name', 'create-lastname');
  const email = useField('email', 'email', 'create-email');
  const password = useField('password', 'password', 'create-password');
  const confirmPassword = useField('password', 'confirmPassword', 'create-confirm-password');
  const [lang, setLang] = useState({ label: t('form.en'), code: 'en' });
  const alert = useAlert();

  const langOptions = [
    { label: t('form.en'), code: 'en' },
    { label: t('form.de'), code: 'de' },
    { label: t('form.fi'), code: 'fi' },
    { label: t('form.ru'), code: 'ru' },
  ];

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const data = {
        username: username.value,
        email: email.value,
        firstname: firstName.value,
        lastname: lastName.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
        language: lang.code,
      };
      await userService.create(data);
      alert.showSuccess(t('createAccount.success'), 10000);
    } catch (err) {
      switch (err.response.data.statusCode) {
        case 400:
          sharedFunctions.showErrors(err.response.data.details, {
            username,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
          });
          break;
        case 500:
          alert.showError(t('error.server'), 10000);
          break;
        default:
          alert.showError(t('error.unexpected'), 10000);
          break;
      }
    }
  };

  const handleLangChange = (event, value) => {
    if (value !== null) {
      i18next.changeLanguage(value.code);
      setLang({ ...value, label: t(`form.${value.code}`) });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {t('createAccount.title')}
        </Typography>
        <OmniAuthLogin />
        <Box mt={3}>{t('form.or')}</Box>
        <form className={classes.form} onSubmit={handleCreate} noValidate>
          <InputField values={username} label={t('form.username')} required={true} />
          <InputField values={firstName} label={t('form.firstName')} required={true} />
          <InputField values={lastName} label={t('form.lastName')} required={true} />
          <InputField values={email} label={t('form.email')} required={true} />
          <InputField
            values={password}
            label={t('form.password')}
            autocomplete="new-password"
            required={true}
          />
          <InputField
            values={confirmPassword}
            label={t('form.confirmPassword')}
            autocomplete="new-password"
            required={true}
          />
          <Autocomplete
            id="language"
            required={true}
            value={lang}
            options={langOptions}
            getOptionLabel={(option) => option.label}
            getOptionSelected={(option, value) => option.value === value.value}
            className={classes.select}
            onChange={handleLangChange}
            renderInput={(params) => (
              <TextField required {...params} label={t('form.selectLanguage')} variant="outlined" />
            )}
          />
          {alert.values.show && (
            <Alert severity={alert.values.severity} onClose={alert.closeAlert}>
              {alert.values.message}
            </Alert>
          )}
          <FormButton name={t('createAccount.create')} />
        </form>
      </div>
    </Container>
  );
};

export default CreateAccountForm;
