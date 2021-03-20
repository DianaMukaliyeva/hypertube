import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import FormButton from '../../common/FormButton';
import InputField from '../../common/InputField';
import useField from '../../../hooks/useField';

import { Alert } from '@material-ui/lab';

const UpdatePassword = (props) => {
  const { classes, alert, setAlert, handleUpdate } = props;
  const { t } = useTranslation();
  const oldPassword = useField('password', 'password', 'update-old-password');
  const password = useField('password', 'password', 'update-password');
  const confirmPassword = useField(
    'password',
    'confirmPassword',
    'update-confirm-pw'
  );

  const handlePasswordUpdate = async (event) => {
    event.preventDefault();

    if (!oldPassword.value || !password.value || !confirmPassword.value) return;
    const data = {
      oldPassword: oldPassword.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    };

    await handleUpdate(data, setAlert, {
      oldPassword,
      password,
      confirmPassword,
    });
  };

  return (
    <form className={classes.form} onSubmit={handlePasswordUpdate} noValidate>
      <InputField
        values={oldPassword}
        label={t('form.currentPassword')}
        autocomplete="old-pwd"
        required={true}
      />
      <InputField
        values={password}
        label={t('form.newPassword')}
        autocomplete="new-pwd"
      />
      <InputField
        values={confirmPassword}
        label={t('form.confirmPassword')}
        autocomplete="new-pwd"
      />

      {alert.show && (
        <Alert
          className={classes.alert}
          severity={alert.severity}
          onClose={() => setAlert({ ...alert, show: false })}
        >
          {alert.message}
        </Alert>
      )}
      <FormButton name={t('myProfile.updatePassword')} />
    </form>
  );
};

UpdatePassword.propTypes = {
  classes: PropTypes.object.isRequired,
  alert: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

export default UpdatePassword;
