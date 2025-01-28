import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';
import styles from './Footer.module.css';
import { siteInfo } from '@/config/constants';

function Footer() {
  function getYear() {
    return new Date().getFullYear();
  }

  return (
    <footer className={styles.FooterContainer}>
      <div className={styles.FooterContent}>
        <div className={styles.FooterSocial}>
          <Link
            href="https://github.com/pa-devpro"
            target="_blank"
            style={{ color: 'inherit' }}
          >
            <FaGithub />
          </Link>
          <Link href="#" target="_blank" style={{ color: 'inherit' }}>
            <FaLinkedin />
          </Link>
        </div>
        <div className={styles.FooterCopy}>
          &copy; <span>{getYear()}</span>{' '}
          <Link href="/" style={{ color: 'inherit' }}>
            {siteInfo.title}
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
