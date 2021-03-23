import React from 'react';
import { useTranslation } from 'react-i18next';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import authService from '../../services/auth';
import useField from '../../hooks/useField';

import InputField from '../common/InputField';
import FormButton from '../common/FormButton';
import sharedFunctions from '../../utils/sharedFunctions';
import useAlert from '../../hooks/useAlert';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Alert } from '@material-ui/lab';

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

const RecoveryLinkForm = () => {
  const { t } = useTranslation();
  const focusField = useRef();
  const email = useField('email', 'email', 'forgot-email');
  const alert = useAlert();

  const handleForgotPwd = async (event) => {
    event.preventDefault();
    try {
      await authService.recoveryLink(email.value);
      alert.showSuccess(t('pwRecovery.checkEmail'));
    } catch (err) {
      switch (err.response.data.statusCode) {
        case 400:
          sharedFunctions.showErrors(err.response.data.details, {
            email,
          });
          break;
        case 500:
          alert.showError(t('error.server'));
          break;
        default:
          alert.showError(t('error.unexpected'));
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
          {t('pwRecovery.title')}
        </Typography>

        <form className={classes.form} onSubmit={handleForgotPwd} noValidate>
          <InputField values={email} label={t('form.email')} required={true} />
          {alert.values.show && (
            <Alert severity={alert.values.severity} onClose={alert.closeAlert}>
              {alert.values.message}
            </Alert>
          )}
          <FormButton name={t('pwRecovery.send')} />
        </form>
        <div>{t('pwRecovery.helper')}</div>
      </div>
    </Container>
  );
};

export default RecoveryLinkForm;
