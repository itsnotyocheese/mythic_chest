// components/Header.js
import Link from 'next/link';

const Header = () => {
  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <Link href="/" style={styles.link}>Home</Link>
        <Link href="/about" style={styles.link}>About</Link>
        <Link href="/profile" style={styles.link}>Profile</Link>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    padding: '1rem',
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
  },
  nav: {
    display: 'flex',
    justifyContent: 'right',
    gap: '1.5rem',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
};

export default Header;
