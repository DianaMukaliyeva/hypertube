import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateAccountForm from './CreateAccountForm';
import userService from '../../services/user';

const validUser = {
  username: 'dragonslayer',
  firstname: 'kalle',
  lastname: 'kuikka',
  email: 'drago@gmail.com',
  password: 'SalainenSana1',
  confirmPassword: 'SalainenSana1',
  language: 'en',
};

const invalidUsername = 'fjsd!!!';

const mockRejection = () => {
  return new Promise((resolve, reject) => {
    reject({
      response: {
        data: {
          statusCode: 400,
          errorType: 'bad request',
          details: [
            {
              param: 'username',
              provided: '********',
              reason: 'formValidation.nameFormat',
            },
          ],
        },
      },
    });
  });
};

const hasHelperText = (field, text) => {
  const helperId = field.getAttribute('aria-describedby');
  const helperText = document.getElementById(helperId);
  expect(helperText).toHaveTextContent(text);
};

describe('all elements are rendered', () => {
  beforeEach(() => {
    render(<CreateAccountForm />);
  });

  it('renders name fields', () => {
    screen.getByLabelText(/username/i);
    screen.getByLabelText(/first/i);
    screen.getByLabelText(/last/i);
  });

  it('renders email field', () => {
    screen.getByLabelText(/email/i);
  });

  it('renders password fields', () => {
    screen.getByLabelText(/form.password/i);
    screen.getByLabelText(/confirmpassword/i);
  });

  it('renders language selection', () => {
    const langSelect = screen.getByLabelText(/selectlang/i);
    expect(langSelect).toHaveAttribute('value', 'form.en');

    userEvent.click(langSelect);
    screen.getByText('form.en');
    screen.getByText('form.ru');
    screen.getByText('form.de');

    userEvent.click(screen.getByText('form.fi'));
    expect(langSelect).toHaveAttribute('value', 'form.fi');
  });

  it('renders submit button', () => {
    screen.getByRole('button', { name: /create/i });
  });
});

describe('form is submitted', () => {
  it('handles submit with correct values', async () => {
    const create = jest.spyOn(userService, 'create').mockResolvedValue({});
    render(<CreateAccountForm />);

    userEvent.paste(screen.getByLabelText(/username/i), validUser.username);
    await screen.findByDisplayValue(validUser.username);

    userEvent.paste(screen.getByLabelText(/firstname/i), validUser.firstname);
    await screen.findByDisplayValue(validUser.firstname);

    userEvent.paste(screen.getByLabelText(/lastname/i), validUser.lastname);
    await screen.findByDisplayValue(validUser.lastname);

    userEvent.paste(screen.getByLabelText(/email/i), validUser.email);
    await screen.findByDisplayValue(validUser.email);

    userEvent.paste(
      screen.getByLabelText(/form.password/i),
      validUser.password
    );
    await screen.findByDisplayValue(validUser.password);

    userEvent.paste(
      screen.getByLabelText(/confirmpassword/i),
      validUser.confirmPassword
    );
    await screen.findByDisplayValue(validUser.confirmPassword);

    const langSelect = screen.getByLabelText(/selectlang/i);
    userEvent.click(langSelect);
    const option = screen.getByText(/en/);
    userEvent.click(option);

    userEvent.click(screen.getByRole('button', { name: /create/i }));
    await waitFor(() => expect(create).toHaveBeenCalled());
    expect(create).toHaveBeenCalledWith(validUser);
  });

  it('handles submit with invalid username', async () => {
    const create = jest
      .spyOn(userService, 'create')
      .mockImplementation(() => mockRejection());
    render(<CreateAccountForm />);

    userEvent.paste(screen.getByLabelText(/username/i), invalidUsername);
    await screen.findByDisplayValue(invalidUsername);

    userEvent.paste(screen.getByLabelText(/firstname/i), validUser.firstname);
    await screen.findByDisplayValue(validUser.firstname);

    userEvent.paste(screen.getByLabelText(/lastname/i), validUser.lastname);
    await screen.findByDisplayValue(validUser.lastname);

    userEvent.paste(screen.getByLabelText(/email/i), validUser.email);
    await screen.findByDisplayValue(validUser.email);

    userEvent.paste(
      screen.getByLabelText(/form.password/i),
      validUser.password
    );
    await screen.findByDisplayValue(validUser.password);

    userEvent.paste(
      screen.getByLabelText(/confirmpassword/i),
      validUser.confirmPassword
    );
    await screen.findByDisplayValue(validUser.confirmPassword);

    const langSelect = screen.getByLabelText(/selectlang/i);
    userEvent.click(langSelect);
    const option = screen.getByText(/en/);
    userEvent.click(option);

    userEvent.click(screen.getByRole('button', { name: /create/i }));
    await waitFor(() => expect(create).toHaveBeenCalled());
    expect(create).toHaveBeenCalledWith({
      ...validUser,
      username: invalidUsername,
    });

    hasHelperText(screen.getByLabelText(/username/i), /nameFormat/i);
    hasHelperText(screen.getByLabelText(/firstname/i), /correct/i);
    hasHelperText(screen.getByLabelText(/lastname/i), /correct/i);
    hasHelperText(screen.getByLabelText(/email/i), /correct/i);
    hasHelperText(screen.getByLabelText(/form.password/i), /correct/i);
    hasHelperText(screen.getByLabelText(/confirmpassword/i), /correct/i);
  });
});
