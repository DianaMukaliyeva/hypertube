const sharedFunctions = {};

sharedFunctions.showErrors = (errors, params) => {
  errors.map((detail) => {
    if (detail.param === 'username') {
      params.username.setValues({
        ...params.username.values,
        helperText: detail.reason,
        error: true,
      });
    } else if (detail.param === 'firstName') {
      params.firstName.setValues({
        ...params.firstName.values,
        helperText: detail.reason,
        error: true,
      });
    } else if (detail.param === 'lastName') {
      params.lastName.setValues({
        ...params.lastName.values,
        helperText: detail.reason,
        error: true,
      });
    } else if (detail.param === 'email') {
      params.email.setValues({ ...params.email.values, helperText: detail.reason, error: true });
    } else if (detail.param === 'password') {
      params.password.setValues({
        ...params.password.values,
        helperText: detail.reason,
        error: true,
      });
    } else if (detail.param === 'confirmPassword') {
      params.confirmPassword.setValues({
        ...params.confirmPassword.values,
        helperText: detail.reason,
        error: true,
      });
    }
  });
};
export default sharedFunctions;
