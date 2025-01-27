'use client';
import React, { useState } from 'react';
import styles from './Navbar.module.css';
import ThemeButton from '../theme-button/ThemeButton';
import Link from 'next/link';
import { IconSearch, IconX } from '@tabler/icons-react';
import { siteInfo } from '@/lib/data';
import { useSession, signOut } from 'next-auth/react';
import { FaSignOutAlt } from 'react-icons/fa';
import { Dialog, DialogTrigger, DialogContent } from '@radix-ui/react-dialog';
import AuthenticationForm from '../authentication/AuthenticationForm';

function Navbar() {
  const { data: session } = useSession();
  const [searchOpen, setSearchOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  return (
    <div className={styles.Navbar}>
      <div className={styles.NavbarHeader}>
        <div className={styles.NavHeaderIconsLeft}>
          <ThemeButton />
        </div>
        <div className={styles.center}>
          <Link href="/" className={styles.logo}>
            {siteInfo.title}
          </Link>
        </div>
        <div className={styles.NavHeaderIconsRight}>
          <div className={styles.searchContainer}>
            {searchOpen ? (
              <div className={styles.searchBox}>
                <input type="text" placeholder="Search..." />
                <IconX onClick={() => setSearchOpen(false)} />
              </div>
            ) : (
              <IconSearch onClick={() => setSearchOpen(true)} />
            )}
          </div>
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
              <DialogContent>
                <AuthenticationForm />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
