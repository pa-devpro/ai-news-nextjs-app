'use client';
import { useState } from 'react';
import {
  getSession,
  signin,
  signinWithOTP,
  signOut,
  signup,
} from '@/features/auth/actions/auth';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSession = async () => {
    const session = await getSession();
    console.log({ session });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await signin(email, password);
    if (error) {
      setError(error || 'Login failed');
    } else {
      setError(null);
      // Redirect to the homepage or a protected route
      // window.location.href = '/';
    }
  };

  const handleSignInWithOTP = async () => {
    const { error } = await signinWithOTP(email);
    if (error) {
      setError(error || 'Login failed');
    } else {
      setError(null);
      // Redirect to the homepage or a protected route
      // window.location.href = '/';
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('name', 'TEST');

    const { errors } = await signup(formData);
    if (errors) {
      setError(errors.message || 'Signup failed');
    } else {
      setError(null);
      // You might want to verify the email before redirecting
      alert('Signup successful, please check your email for verification.');
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h1>Login / Signup</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
        <button
          type="button"
          onClick={handleSignup}
          style={{ marginLeft: '1rem' }}
        >
          Signup
        </button>
        <button
          type="button"
          onClick={handleSession}
          style={{ marginLeft: '2rem' }}
        >
          Session
        </button>

        <button
          type="button"
          onClick={handleSignOut}
          style={{ marginLeft: '2rem' }}
        >
          Sign Out
        </button>

        <button
          type="button"
          onClick={handleSignInWithOTP}
          style={{ margin: '2rem' }}
        >
          Sign In with OTP
        </button>
      </form>
    </div>
  );
}
