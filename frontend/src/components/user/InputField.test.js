import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useField from '../../hooks/useField';
import InputField from './InputField';

const usernameField = {
  type: 'text',
  label: 'username',
  id: 'test-username',
  required: true,
};

const validUsername = 'ulla';
const validUsernameHelperText = 'form.correct';

const invalidUsername = '$@//*<<<>>>>';
const invalidUsernameHelperText = 'form.nameFormat';

test('input value changes when typed', async () => {
  const { result } = renderHook(() =>
    useField(usernameField.type, usernameField.label, usernameField.id)
  );

  const { rerender } = render(
    <InputField
      values={result.current}
      label={usernameField.label}
      required={usernameField.required}
    />
  );

  const inputField = screen.getByRole('textbox');
  userEvent.type(inputField, 'h');

  await waitFor(() => expect(result.current.value).toBe('h'));
  rerender(
    <InputField
      values={result.current}
      label={usernameField.label}
      required={usernameField.required}
    />
  );

  userEvent.type(inputField, 'e');

  await waitFor(() => expect(result.current.value).toBe('he'));
  rerender(
    <InputField
      values={result.current}
      label={usernameField.label}
      required={usernameField.required}
    />
  );
  act(() => {
    userEvent.type(inputField, 'y');
  });

  await waitFor(() => expect(result.current.value).toBe('hey'));
});

test('correct input has the right helper text', async () => {
  const { result } = renderHook(() =>
    useField(usernameField.type, usernameField.label, usernameField.id)
  );

  const { rerender } = render(
    <InputField
      values={result.current}
      label={usernameField.label}
      required={usernameField.required}
    />
  );

  const inputField = screen.getByRole('textbox');

  act(() => {
    userEvent.paste(inputField, validUsername);
  });

  await waitFor(() => expect(result.current.value).toBe(validUsername));

  rerender(
    <InputField
      values={result.current}
      label={usernameField.label}
      required={usernameField.required}
    />
  );

  screen.getByText(validUsernameHelperText);
});

test('invalid input has the right helper text', async () => {
  const { result } = renderHook(() =>
    useField(usernameField.type, usernameField.label, usernameField.id)
  );

  const { rerender } = render(
    <InputField
      values={result.current}
      label={usernameField.label}
      required={usernameField.required}
    />
  );

  const inputField = screen.getByRole('textbox');
  act(() => {
    userEvent.paste(inputField, invalidUsername);
  });

  await waitFor(() => expect(result.current.value).toBe(invalidUsername));

  rerender(
    <InputField
      values={result.current}
      label={usernameField.label}
      required={usernameField.required}
    />
  );

  screen.getByText(invalidUsernameHelperText);
});

test('empty input has the right helper text', async () => {
  const { result } = renderHook(() =>
    useField(usernameField.type, usernameField.label, usernameField.id)
  );

  const { rerender } = render(
    <InputField
      values={result.current}
      label={usernameField.label}
      required={usernameField.required}
    />
  );

  const inputField = screen.getByRole('textbox');
  act(() => {
    userEvent.paste(inputField, validUsername);
  });

  await waitFor(() => expect(result.current.value).toBe(validUsername));

  rerender(
    <InputField
      values={result.current}
      label={usernameField.label}
      required={usernameField.required}
    />
  );

  act(() => {
    userEvent.clear(inputField);
  });

  await waitFor(() => expect(result.current.value).toBe(''));

  rerender(
    <InputField
      values={result.current}
      label={usernameField.label}
      required={usernameField.required}
    />
  );

  screen.getByText(invalidUsernameHelperText);
});
