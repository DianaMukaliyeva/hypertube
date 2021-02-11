const errorHandler = (error, request, response, next) => {
  switch (error.code) {
    case 'movieRequest': // todo: write helper function that parses these into set format using the error object
      return response.status(400).json({
        errorType: error.name,
        details: [
          {
            param: error.stack,
            provided: 'PLACEHOLDER',
            reason: error.message,
          },
        ],
      });
    default:
      return next(error);
  }
};

const unknownEndpoint = (request, response) => response.status(404).send({ error: 'unknown endpoint' }).end();

export default { errorHandler, unknownEndpoint };
