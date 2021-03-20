import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Alert } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import FormButton from '../../common/FormButton';
import InputField from '../../common/InputField';
import useField from '../../../hooks/useField';

const UpdateInformation = (props) => {
  const { classes, userData, alert, setAlert, handleUpdate } = props;
  const { t } = useTranslation();
  const username = useField('text', 'updateUsername', 'update-username');
  const firstName = useField('text', 'updateName', 'update-firstname');
  const lastName = useField('text', 'updateName', 'update-lastname');
  const email = useField('email', 'email', 'update-email');
  const [lang, setLang] = useState({ label: '', code: '' });
  const langOptions = [
    { label: t('form.en'), code: 'en' },
    { label: t('form.de'), code: 'de' },
    { label: t('form.fi'), code: 'fi' },
    { label: t('form.ru'), code: 'ru' },
  ];

  useEffect(() => {
    setLang(langOptions.find((lang) => lang.code === userData.language));
  }, [userData.language]);

  const handleInformationUpdate = async (event) => {
    event.preventDefault();

    const data = {};
    if (username.value && username.value !== userData.username) data.username = username.value;
    if (email.value && email.value !== userData.email) data.email = email.value;
    if (firstName.value && firstName.value !== userData.firstName) data.firstname = firstName.value;
    if (lastName.value && lastName.value !== userData.lastName) data.lastname = lastName.value;
    if (lang && lang.code !== userData.language) data.language = lang.code;

    await handleUpdate(data, setAlert, {
      username,
      firstName,
      lastName,
      email,
    });
  };

  return lang ? (
    <form className={classes.form} onSubmit={handleInformationUpdate} noValidate>
      <InputField values={username} label={`${t('form.username')}: ${userData.username}`} />
      <InputField values={firstName} label={`${t('form.firstName')}: ${userData.firstname}`} />
      <InputField values={lastName} label={`${t('form.lastName')}: ${userData.lastname}`} />
      <InputField values={email} label={`${t('form.email')}: ${userData.email}`} />
      <Autocomplete
        id="language"
        value={lang}
        options={langOptions}
        getOptionLabel={(option) => option.label}
        getOptionSelected={(option, value) => option.value === value.value}
        className={classes.select}
        onChange={(event, value) => {
          if (value !== null) setLang(value);
        }}
        renderInput={(params) => (
          <TextField required {...params} label={t('form.selectLanguage')} variant="outlined" />
        )}
      />

      {alert.show && (
        <Alert
          className={classes.alert}
          severity={alert.severity}
          onClose={() => setAlert({ ...alert, show: false })}>
          {alert.message}
        </Alert>
      )}
      <FormButton name={t('myProfile.update')} />
    </form>
  ) : null;
};

UpdateInformation.propTypes = {
  classes: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  alert: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

export default UpdateInformation;
