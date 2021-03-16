import React from 'react';
import { render, screen, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UpdatePhoto from './UpdatePhoto';

const mockSetAvatar = jest.fn();
const avatar = 'photostr';

describe('all elements are rendered', () => {
  it('renders empty avatar if no avatar is set', () => {
    render(<UpdatePhoto avatar={null} setAvatar={mockSetAvatar} />);
    expect(screen.getByRole('img', { name: /current/i })).toHaveAttribute(
      'src',
      'emptyAvatar.png'
    );
  });

  it('renders avatar if it is set', () => {
    render(<UpdatePhoto avatar={avatar} setAvatar={mockSetAvatar} />);
    expect(screen.getByRole('img', { name: /current/i })).toHaveAttribute(
      'src',
      avatar
    );
  });

  it('renders upload input', () => {
    render(<UpdatePhoto avatar={null} setAvatar={mockSetAvatar} />);
    expect(screen.getByTestId('upload-input')).toHaveAttribute(
      'accept',
      'image/*'
    );
  });

  it('renders delete button if avatar is set', () => {
    render(<UpdatePhoto avatar={avatar} setAvatar={mockSetAvatar} />);
    const button = screen.getByRole('button');
    expect(within(button).getByTitle(/trash can/i));
  });

  it('does not render delete button if avatar is not set', () => {
    render(<UpdatePhoto avatar={null} setAvatar={mockSetAvatar} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('does not render alert', () => {
    render(<UpdatePhoto avatar={null} setAvatar={mockSetAvatar} />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});

describe('handles photo upload', () => {
  it('if size is ok photo is uploaded', () => {
    const image = 'data:image/jpeg;base64,/9j/4AAQSkZJ//20==';
    const file = new File(['image'], 'hello.png', { type: 'image/jpeg' });

    // eslint-disable-next-line no-undef
    jest.spyOn(global, 'FileReader').mockImplementation(function () {
      this.readAsDataURL = jest.fn(() => (this.result = image));
    });

    render(<UpdatePhoto avatar={null} setAvatar={mockSetAvatar} />);
    const input = screen.getByTestId('upload-input');
    userEvent.upload(input, file);

    expect(FileReader).toHaveBeenCalled();
    const reader = FileReader.mock.instances[0];

    act(() => reader.onloadend());
    expect(mockSetAvatar).toHaveBeenCalled();
    expect(mockSetAvatar).toHaveBeenCalledWith(image);
  });

  it('if size is too big photo is not uploaded and alert is shown', () => {
    const image = 'data:image/jpeg;base64,/9j/4AAQSkZJ//20==';
    const file = new File(['image'], 'hello.png', { type: 'image/jpeg' });

    Object.defineProperty(file, 'size', { value: 1024 * 1024 + 1 });

    // eslint-disable-next-line no-undef
    jest.spyOn(global, 'FileReader').mockImplementation(function () {
      this.readAsDataURL = jest.fn(() => (this.result = image));
    });

    render(<UpdatePhoto avatar={null} setAvatar={mockSetAvatar} />);
    const input = screen.getByTestId('upload-input');
    userEvent.upload(input, file);

    expect(FileReader).toHaveBeenCalled();
    expect(mockSetAvatar).not.toHaveBeenCalled();
    expect(screen.getByRole('alert')).toHaveTextContent(/size/i);
  });
});
