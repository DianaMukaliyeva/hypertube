const detailedError = (...details) => {
  const error = new Error();
  error.statusCode = 400;
  error.errorType = 'bad request';
  error.details = details;
  return error;
};

const unauthorizedError = () => {
  const error = new Error();
  error.statusCode = 401;
  error.errorType = 'unauthorized';
  return error;
};

const createDetail = (param, provided = '', reason) => ({
  param,
  provided,
  reason,
});

export { createDetail, detailedError, unauthorizedError };
