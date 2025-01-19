'use client';

import { useEffect, useState } from 'react';
import styles from './AuthButton.module.css';
import LoginForm from './AuthenticationForm';
import { useRef } from 'react';

const AuthButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !(modalRef.current as HTMLElement).contains(event.target as Node)
      ) {
        handleCloseModal();
      }
    };
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.classList.add('no-scroll');
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.classList.remove('no-scroll');
    }
  }, [isModalOpen]);

  const handleSignInClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className={styles.authButton} onClick={handleSignInClick}>
        Sign in
      </button>
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent} ref={modalRef}>
            <span className={styles.closeButton} onClick={handleCloseModal}>
              &times;
            </span>
            <LoginForm />
          </div>
        </div>
      )}
    </>
  );
};

export default AuthButton;
