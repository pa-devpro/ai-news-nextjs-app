'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';
import { IconSearch, IconX } from '@tabler/icons-react';
import { FaSignOutAlt } from 'react-icons/fa';
import AuthenticationForm from '../../features/auth/components/AuthenticationForm';
import { Dialog, DialogContent, DialogTrigger } from '../dashboard/ui/dialog';
import { siteInfo } from '@/config/constants';
import { useRouter } from 'next/navigation';
import { FaBars } from 'react-icons/fa';
import { Notifications } from '../dashboard/ui/notifications';
import { useSession } from '@/lib/hooks/useSession';
import { signOut } from '@/features/auth/actions/auth';

function Navbar() {
  const session = useSession();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleNavigation = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuOpen &&
        !(event.target as Element).closest(`.${styles.NavbarHeader}`)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <div className={styles.Navbar}>
      <div className={styles.NavbarHeader}>
        <div className={styles.NavHeaderIconsLeft}>
          <SearchContainer />
        </div>
        <div className={styles.center}>
          <Link href="/" className={styles.logo} onClick={handleNavigation}>
            {siteInfo.title}
          </Link>
        </div>
        <div className={styles.NavHeaderIconsRight}>
          <Notifications />
          {session ? (
            <>
              <button
                className={styles.hamburger}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <FaBars />
              </button>
              <div
                className={`${styles.navMenuItems} ${mobileMenuOpen ? styles.showMenu : ''}`}
              >
                <Link
                  href="/dashboard"
                  className={styles.navLink}
                  onClick={handleNavigation}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleNavigation();
                    signOut();
                  }}
                  className={styles.logoutButton}
                >
                  <FaSignOutAlt />
                  <span className={styles.buttonText}>Logout</span>
                </button>
              </div>
            </>
          ) : (
            <Dialog
              open={authDialogOpen}
              onOpenChange={(open) => {
                setAuthDialogOpen(open);
                handleNavigation();
              }}
            >
              <DialogTrigger asChild>
                <button className={styles.loginButton}>Login</button>
              </DialogTrigger>
              <DialogContent className={styles.dialogContent}>
                <AuthenticationForm />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
}

export const SearchContainer = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`/search/${encodeURIComponent(searchInput)}`);
      setSearchOpen(false);
    }
  };

  return (
    <div className={styles.searchContainer} ref={searchRef}>
      {searchOpen ? (
        <div className={styles.searchBox}>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <button
              className={styles.closeButton}
              onClick={() => setSearchOpen(false)}
              type="button"
            >
              <IconX size={18} stroke={2} />
            </button>
          </form>
        </div>
      ) : (
        <IconSearch onClick={() => setSearchOpen(true)} />
      )}
    </div>
  );
};
export default Navbar;
