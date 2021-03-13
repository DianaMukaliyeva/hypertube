import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Alert } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import FormButton from '../FormButton';
import InputField from '../InputField';

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
    { label: 'English', code: 'en' },
    { label: 'German', code: 'de' },
    { label: 'Finnish', code: 'fi' },
    { label: 'Russian', code: 'ru' },
  ];

	useEffect(() => {
		setLang(langOptions.find((lang) => lang.code === userData.language));
	}, [userData.language]);

  const handleInformationUpdate = async (event) => {
    event.preventDefault();

    const data = {};
    if (username.value) data.username = username.value;
    if (email.value) data.email = email.value;
    if (firstName.value) data.firstname = firstName.value;
    if (lastName.value) data.lastname = lastName.value;
    if (lang) data.language = lang.code;

    await handleUpdate(data, setAlert);
  };

  return lang ? (
    <form className={classes.form} noValidate>
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
      <FormButton
        handleClick={handleInformationUpdate}
        name={t('myProfile.update')}
      />
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
