'use client';
import React, { useState } from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';
import { IconSearch, IconX } from '@tabler/icons-react';
import { useSession, signOut } from 'next-auth/react';
import { FaSignOutAlt } from 'react-icons/fa';
import AuthenticationForm from '../../features/auth/components/AuthenticationForm';
import { Dialog, DialogContent, DialogTrigger } from '../dashboard/ui/dialog';
import { siteInfo } from '@/config/constants';
import { useRouter } from 'next/navigation';

function Navbar() {
  const { data: session } = useSession();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  return (
    <div className={styles.Navbar}>
      <div className={styles.NavbarHeader}>
        <div className={styles.NavHeaderIconsLeft}>
          {/* <ThemeButton /> */}
          <SearchContainer />
        </div>
        <div className={styles.center}>
          <Link href="/" className={styles.logo}>
            {siteInfo.title}
          </Link>
        </div>
        <div className={styles.NavHeaderIconsRight}>
          {session ? (
            <>
              <Link href="/dashboard">Dashboard</Link>

              <button onClick={() => signOut()} className={styles.logoutButton}>
                <FaSignOutAlt />
              </button>
            </>
          ) : (
            <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
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
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`/search/${encodeURIComponent(searchInput)}`);
      setSearchOpen(false);
    }
  };
  return (
    <div className={styles.searchContainer}>
      {searchOpen ? (
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <IconX onClick={() => setSearchOpen(false)} />
        </div>
      ) : (
        <IconSearch onClick={() => setSearchOpen(true)} />
      )}
    </div>
  );
};

export default Navbar;
