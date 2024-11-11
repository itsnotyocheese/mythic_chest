// components/Header.js
'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebaseConfig'; 
import Link from 'next/link';

const Header = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        // Subscribe to authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
            setUser(user); // Set user state if signed in
            } else {
            setUser(null); // Set user state to null if not signed in
            }
        });

        // Clean up the subscription on component unmount
        return () => unsubscribe();
        }, []);


  return (
    <header className="p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center text-white">
        {/* Conditional display of user info */}
        {user && (
          <span className="text-lg font-medium">Welcome, {user.displayName}</span>
        )}

        {/* Navbar links */}
        <nav className="flex ml-auto space-x-6">
          <Link href="/" className="text-white hover:text-gray-300 transition duration-300">
            Home
          </Link>
          <Link href="/database" className="text-white hover:text-gray-300 transition duration-300">
            All Games
          </Link>
          <Link href="/profile" className="text-white hover:text-gray-300 transition duration-300">
            Profile
          </Link>
        </nav>
      </div>
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
