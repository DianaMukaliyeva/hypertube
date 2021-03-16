/* eslint-disable no-undef */
import '@testing-library/jest-dom';

jest.mock('react-i18next', () => ({
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
  getItem: jest.fn,
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

beforeEach(() => {
  //throw error when prop types fail
  global.console.error = (...args) => {
    const propTypeFailures = [/Failed %s type/, /Warning: Received/];

    if (propTypeFailures.some((p) => p.test(args[0]))) {
      throw new Error(args[0]);
    }

    global.console.error(args);
  };
});
