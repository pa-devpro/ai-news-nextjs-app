import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthenticationForm from './AuthenticationForm';
import * as authHandlers from '@/handlers/authHandlers';
import { signIn } from 'next-auth/react';

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

jest.mock('@/handlers/authHandlers');

describe('AuthenticationForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders sign in form by default', () => {
    render(<AuthenticationForm />);
    expect(screen.getAllByText('Sign In')[0]).toHaveClass('text-blue-500');
    expect(screen.getByRole('button', { name: 'Sign In' })).toHaveClass(
      'bg-blue-500',
    );
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('switches to registration form', () => {
    render(<AuthenticationForm />);
    fireEvent.click(screen.getAllByText('Register')[0]);
    expect(screen.getAllByText('Register')[0]).toHaveClass('text-blue-500');
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('toggles password visibility', () => {
    render(<AuthenticationForm />);
    const passwordInput = screen.getByLabelText('Password');

    expect(passwordInput).toHaveAttribute('type', 'password');

    const toggleButton = screen.getByTestId('toggle-password-visibility');
    console.log({ toggleButton });
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  it('handles sign in submission', async () => {
    const mockSignIn = jest.spyOn(authHandlers, 'handleSignIn');
    mockSignIn.mockResolvedValueOnce({ success: 'Signed in successfully' });

    render(<AuthenticationForm />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });

    fireEvent.submit(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith(
        'test@example.com',
        'password123',
        signIn,
      );
    });
  });

  it('handles forgot password submission', async () => {
    const mockForgotPassword = jest.spyOn(authHandlers, 'handleForgotPassword');
    mockForgotPassword.mockResolvedValueOnce({ success: 'Reset email sent' });

    render(<AuthenticationForm />);
    fireEvent.click(screen.getByText('Forgot Password?'));

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.submit(screen.getByRole('button', { name: 'Reset Password' }));

    await waitFor(() => {
      expect(mockForgotPassword).toHaveBeenCalledWith('test@example.com');
    });
  });

  it('handles registration submission', async () => {
    const mockRegister = jest.spyOn(authHandlers, 'handleRegistration');

    render(<AuthenticationForm />);
    fireEvent.click(screen.getAllByText('Register')[0]);

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });

    fireEvent.submit(screen.getByRole('button', { name: 'Register' }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalled();
    });
  });
});
