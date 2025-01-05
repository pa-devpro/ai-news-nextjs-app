import Link from 'next/link';
import styles from './Footer.module.css';
import { siteInfo } from '@/lib/data';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

function Footer() {
  function getYear() {
    return new Date().getFullYear();
  }

  return (
    <footer className={styles.FooterContainer}>
      <div className={styles.FooterContent}>
        <div className={styles.FooterLinks}>
          <Link href="/" style={{ color: 'inherit' }}>
            Home
          </Link>
          <Link href="/about" style={{ color: 'inherit' }}>
            About
          </Link>
          <Link href="/contact" style={{ color: 'inherit' }}>
            Contact
          </Link>
        </div>
        <div className={styles.FooterSocial}>
          <Link
            href="https://github.com/pa-devpro/news-ai.git"
            target="_blank"
            style={{ color: 'inherit' }}
          >
            <FaGithub />
          </Link>
          <Link
            href="https://twitter.com/yourprofile"
            target="_blank"
            style={{ color: 'inherit' }}
          >
            <FaTwitter />
          </Link>
          <Link
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            style={{ color: 'inherit' }}
          >
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
