import React from 'react';
import { useTranslation } from 'react-i18next';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';

import useField from '../../hooks/useField';
import useModal from '../../hooks/useModal';
import authService from '../../services/auth';

import InputField from '../common/InputField';
import RecoveryLinkForm from './RecoveryLinkForm';
import CustomModal from '../common/CustomModal';
import FormButton from '../common/FormButton';
import OmniAuthLogin from './OmniAuthLogin';

import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Alert } from '@material-ui/lab';
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
}));

const LoginForm = ({ setUser }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const focusField = useRef();
  const email = useField('email', 'loginEmail', 'login-email');
  const password = useField('password', 'loginPassword', 'login-password');
  const alert = useAlert();

  const recoveryLinkModal = useModal(<RecoveryLinkForm />);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (email.value === '') {
      email.setValues({
        ...email.values,
        helperText: t('formValidation.required'),
        error: true,
      });
      return;
    }

    if (password.value === '') {
      password.setValues({
        ...password.values,
        helperText: t('formValidation.required'),
        error: true,
      });
      return;
    }

    try {
      await authService.login(email.value, password.value);
      const decoded = jwt_decode(localStorage.getItem('token'));
      setUser({ userId: decoded.id, lang: decoded.lang });
      history.push('/');
    } catch (err) {
      switch (err.response.data.statusCode) {
        case 400:
          alert.showError(t('formValidation.invalidCredentials'), 10000);
          break;
        case 500:
          alert.showError(t('formValidation.server'), 5000);
          break;
        default:
          alert.showError(t('formValidation.unexpected'), 5000);
          break;
      }
    }
  };

  useEffect(() => {
    focusField.current && focusField.current.focus();
  }, []);

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {t('login.title')}
        </Typography>
        <OmniAuthLogin />
        <Box mt={3}>{t('form.or')}</Box>
        <form className={classes.form} onSubmit={handleLogin} noValidate>
          <InputField
            values={email}
            label={t('form.email')}
            required={true}
            inputRef={focusField}
          />
          <InputField
            values={password}
            label={t('form.password')}
            autocomplete="current-password"
            required={true}
          />
          {alert.values.show && (
            <Alert severity={alert.values.severity} onClose={alert.closeAlert}>
              {alert.values.message}
            </Alert>
          )}
          <FormButton name={t('login.login')} />
        </form>
        <Box>
          <Link href="#" onClick={recoveryLinkModal.handleClickOpen}>
            {t('login.forgotPw')}
          </Link>
        </Box>
      </div>
      <CustomModal {...recoveryLinkModal} />
    </Container>
  );
};

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default LoginForm;
