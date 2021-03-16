import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import FormButton from '../../common/FormButton';
import InputField from '../../common/InputField';
import { Alert } from '@material-ui/lab';

const UpdatePassword = (props) => {
  const {
    classes,
    oldPassword,
    password,
    confirmPassword,
    alert,
    setAlert,
    handleUpdate,
  } = props;
  const { t } = useTranslation();

  const handlePasswordUpdate = async (event) => {
    event.preventDefault();

    if (!oldPassword.value || !password.value || !confirmPassword.value) return;
    const data = {
      oldPassword: oldPassword.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    };

    await handleUpdate(data, setAlert);
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
  oldPassword: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
  confirmPassword: PropTypes.object.isRequired,
  alert: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

export default UpdatePassword;
