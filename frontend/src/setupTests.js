import '@testing-library/jest-dom';
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// const originalConsoleError = global.console.error;

beforeEach(() => {
  /* throw error when prop types fail
  global.console.error = (...args) => {
    const propTypeFailures = [/Failed %s type/, /Warning: Received/];

    if (propTypeFailures.some((p) => p.test(args[0]))) {
      throw new Error(args[0]);
    }

    originalConsoleError(args);
  };*/
});
