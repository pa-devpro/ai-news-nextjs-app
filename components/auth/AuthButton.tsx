'use client';

import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FaSignOutAlt } from 'react-icons/fa';
import styles from './AuthButton.module.css';

const AuthButton = () => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignInClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (session) {
    return (
      <div className={styles.authContainer}>
        <p className={styles.authText}>Signed in as</p>
        <p className={styles.authText}>{session.user?.email}</p>
        <FaSignOutAlt className={styles.authIcon} onClick={() => signOut()} />
      </div>
    );
  }

  return (
    <>
      <button className={styles.authButton} onClick={handleSignInClick}>
        Sign in
      </button>
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <span className={styles.closeButton} onClick={handleCloseModal}>
              &times;
            </span>
            <form
              className={styles.authForm}
              onSubmit={(e) => {
                e.preventDefault();
                const email = e.currentTarget.email.value;
                const password = e.currentTarget.password.value;
                signIn('credentials', { email, password });
              }}
            >
              <input
                className={styles.authInput}
                name="email"
                type="email"
                placeholder="Email"
                required
              />
              <input
                className={styles.authInput}
                name="password"
                type="password"
                placeholder="Password"
                required
              />
              <button className={styles.authButton} type="submit">
                Sign in
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthButton;
