import React from 'react';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UpdateInformation from './UpdateInformation';

const userData = {
  username: 'jens',
  firstname: 'lars',
  lastname: 'svensson',
  email: 'l.svens@gmail.com',
  language: 'en',
};

const validUsername = 'jans';
const invalidUsername = '@@@@k';

const props = {
  classes: {
    form: 'form',
    select: 'select',
    alert: 'alert',
  },
  userData,
  alert: {
    show: false,
    message: '',
    severity: '',
  },
  setAlert: jest.fn(),
  handleUpdate: jest.fn(),
};

const hasHelperText = (field, text) => {
  const helperId = field.getAttribute('aria-describedby');
  const helperText = document.getElementById(helperId);
  if (!text && !helperText) return;
  expect(helperText).toHaveTextContent(text);
};

describe('all components are rendered', () => {
  it('renders username field', () => {
    render(<UpdateInformation {...props} />);
    screen.getByLabelText(/form.username/i);
  });

  it('renders first name field', () => {
    render(<UpdateInformation {...props} />);
    screen.getByLabelText(/form.firstName/i);
  });

  it('renders last name field', () => {
    render(<UpdateInformation {...props} />);
    screen.getByLabelText(/form.lastName/i);
  });

  it('renders email field', () => {
    render(<UpdateInformation {...props} />);
    screen.getByLabelText(/email/i);
  });

  it('renders language field', () => {
    render(<UpdateInformation {...props} />);
    screen.getByLabelText(/form.selectLanguage/i);
  });

  it('renders update information button', () => {
    render(<UpdateInformation {...props} />);
    screen.getByRole('button', { name: /update/i });
  });
});

describe('form is submitted', () => {
  it('handles update with valid username', async () => {
    render(<UpdateInformation {...props} />);

    userEvent.paste(screen.getByLabelText(/username/i), validUsername);
    await screen.findByDisplayValue(validUsername);

    userEvent.click(screen.getByRole('button', { name: /update/i }));
    waitFor(() => {
      expect(props.handleUpdate).toHaveBeenCalled();
    });
    expect(props.handleUpdate).toHaveBeenCalledWith(
      { username: validUsername },
      expect.anything(),
      expect.anything()
    );
  });

  it('handles update with invalid username', async () => {
    render(<UpdateInformation {...props} />);

    userEvent.paste(screen.getByLabelText(/username/i), invalidUsername);
    await screen.findByDisplayValue(invalidUsername);

    hasHelperText(screen.getByLabelText(/username/i), /nameformat/i);

    userEvent.click(screen.getByRole('button', { name: /update/i }));
    waitFor(() => {
      expect(props.handleUpdate).toHaveBeenCalled();
    });
    expect(props.handleUpdate).toHaveBeenCalledWith(
      { username: invalidUsername },
      expect.anything(),
      expect.anything()
    );
  });

  it('handles update with empty username', async () => {
    render(<UpdateInformation {...props} />);

    userEvent.paste(screen.getByLabelText(/username/i), 'h');
    await screen.findByDisplayValue('h');
    hasHelperText(screen.getByLabelText(/username/i), /minlen/i);

    userEvent.clear(screen.getByLabelText(/username/i));
    await waitForElementToBeRemoved(screen.getByText(/minlen/i));

    hasHelperText(screen.getByLabelText(/username/i), '');

    userEvent.click(screen.getByRole('button', { name: /update/i }));
    waitFor(() => {
      expect(props.handleUpdate).toHaveBeenCalled();
    });
    expect(props.handleUpdate).toHaveBeenCalledWith(
      {},
      expect.anything(),
      expect.anything()
    );
  });
});
