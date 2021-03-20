//import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import useField from './useField';

const validEmail = 'hilla@halla.fi';
const invalidEmail = 'hilla';
const invalidEmail2 = 'hilla@';

describe('calling onChange changes value and helper text', () => {
  it('valid email shows correct helper text', async () => {
    const { result } = renderHook(() =>
      useField('email', 'email', 'test-email')
    );

    expect(result.current.value).toBe('');

    act(() => {
      result.current.onChange({
        target: {
          value: validEmail,
        },
      });
    });

    await waitFor(() => expect(result.current.value).toBe(validEmail));
    expect(result.current.helperText).toBe('formValidation.correct');
  });

  it('invalid email shows error helper text', async () => {
    const { result } = renderHook(() =>
      useField('email', 'email', 'test-email')
    );

    expect(result.current.value).toBe('');

    act(() => {
      result.current.onChange({
        target: {
          value: invalidEmail,
        },
      });
    });

    await waitFor(() => expect(result.current.value).toBe(invalidEmail));
    expect(result.current.helperText).toContain('formValidation.emailFormat');
  });

  it('invalid email shows error helper text', async () => {
    const { result } = renderHook(() =>
      useField('email', 'email', 'test-email')
    );

    expect(result.current.value).toBe('');

    act(() => {
      result.current.onChange({
        target: {
          value: invalidEmail2,
        },
      });
    });

    await waitFor(() => expect(result.current.value).toBe(invalidEmail2));
    expect(result.current.helperText).toContain('formValidation.emailFormat');
  });
});
