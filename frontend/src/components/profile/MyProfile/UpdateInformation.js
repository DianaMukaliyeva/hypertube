import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Alert } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import FormButton from '../../common/FormButton';
import InputField from '../../common/InputField';

const UpdateInformation = (props) => {
  const {
    classes,
    userData,
    username,
    firstName,
    lastName,
    email,
    alert,
    setAlert,
    handleUpdate,
  } = props;
  const { t } = useTranslation();
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
    if (username.value && username.value !== userData.username)
      data.username = username.value;
    if (email.value && email.value !== userData.email) data.email = email.value;
    if (firstName.value && firstName.value !== userData.firstName)
      data.firstname = firstName.value;
    if (lastName.value && lastName.value !== userData.lastName)
      data.lastname = lastName.value;
    if (lang && lang.code !== userData.language) data.language = lang.code;

    if (Object.keys(data).length !== 0) await handleUpdate(data, setAlert);
  };

  return lang ? (
    <form
      className={classes.form}
      onSubmit={handleInformationUpdate}
      noValidate
    >
      <InputField
        values={username}
        label={`${t('form.username')}: ${userData.username}`}
      />
      <InputField
        values={firstName}
        label={`${t('form.firstName')}: ${userData.firstname}`}
      />
      <InputField
        values={lastName}
        label={`${t('form.lastName')}: ${userData.lastname}`}
      />
      <InputField values={email} label={`Email: ${userData.email}`} />
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
          <TextField
            required
            {...params}
            label={t('form.selectLanguage')}
            variant="outlined"
          />
        )}
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
      <FormButton name={t('myProfile.update')} />
    </form>
  ) : null;
};

UpdateInformation.propTypes = {
  classes: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  username: PropTypes.object.isRequired,
  firstName: PropTypes.object.isRequired,
  lastName: PropTypes.object.isRequired,
  email: PropTypes.object.isRequired,
  alert: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

export default UpdateInformation;
