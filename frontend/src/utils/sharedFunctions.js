const sharedFunctions = {};

sharedFunctions.showErrors = (errors, params) => {
  errors.map((detail) => {
    if (detail.param === 'username') {
      params.username.setError(detail.reason);
    } else if (detail.param === 'firstname') {
      params.firstName.setError(detail.reason);
    } else if (detail.param === 'lastname') {
      params.lastName.setError(detail.reason);
    } else if (detail.param === 'email') {
      params.email.setError(detail.reason);
    } else if (detail.param === 'password') {
      params.password.setError(detail.reason);
    } else if (detail.param === 'confirmPassword') {
      params.confirmPassword.setError(detail.reason);
    } else if (detail.param === 'oldPassword') {
      params.oldPassword.setError(detail.reason);
    }
  });
};
export default sharedFunctions;
