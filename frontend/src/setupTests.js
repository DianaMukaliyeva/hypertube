import '@testing-library/jest-dom';
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// const originalConsoleError = global.console.error;

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook
  // can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        // eslint-disable-next-line no-empty-function
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

const localStorageMock = {
  setItem: jest.fn(),
  clear: jest.fn(),
};
// eslint-disable-next-line no-undef
global.localStorage = localStorageMock;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

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
