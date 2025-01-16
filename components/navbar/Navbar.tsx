'use client';
import React from 'react';
import styles from './Navbar.module.css';
import ThemeButton from '../theme-button/ThemeButton';
import Link from 'next/link';
import { NavbarWrapper } from 'react-show-hide-sticky-navbar';

import { IconSearch, IconX } from '@tabler/icons-react';
import { siteInfo } from '@/lib/data';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaSignOutAlt } from 'react-icons/fa';

function Navbar() {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const { data: session } = useSession();

  const handleSearchClick = () => {
    setSearchOpen(!searchOpen);
  };

  function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const searchKeyword = (e.target as HTMLFormElement).searchKeyword.value;
    router.push(`/search/${searchKeyword}`);
    setSearchOpen(false);
  }

  return (
    <NavbarWrapper>
      <nav style={{ height: '70px' }} className={styles.Navbar}>
        {searchOpen ? (
          <div className={styles.NavSearchContainer}>
            <IconSearch className={styles.StartingIcon} />
            <form
              onSubmit={handleSearchSubmit}
              className={styles.NavSearchForm}
            >
              <input
                className={styles.NavSearchInput}
                type="text"
                name="searchKeyword"
                placeholder="Search"
                required
              />
            </form>
            <div
              onClick={handleSearchClick}
              className={styles.TrailingIconWrapper}
            >
              <IconX className={styles.TrailingIcon} />
            </div>
          </div>
        ) : (
          <div className={styles.NavbarHeader}>
            <div className={styles.NavHeaderIconsLeft}>
              <ThemeButton />
            </div>

            <Link
              style={{ color: 'inherit', textDecoration: 'inherit' }}
              href="/"
            >
              <h1>{siteInfo.title}</h1>
            </Link>

            <div onClick={handleSearchClick} className={styles.iconContainer}>
              <IconSearch size={20} />
              {session && (
                <FaSignOutAlt
                  className={styles.signOutIcon}
                  onClick={() => signOut()}
                />
              )}
            </div>
          </div>
        )}
        <hr></hr>
      </nav>
    </NavbarWrapper>
  );
}

export default Navbar;
