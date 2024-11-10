// components/LogoutButton.js
'use client';
import { auth } from '../../lib/firebaseConfig';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/profile/login'); // Redirect to login after logout
  };

  return (
    <button onClick={handleLogout} style={styles.button}>Logout</button>
  );
};

const styles = {
  button: {
    padding: '0.5rem',
    fontSize: '1rem',
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default LogoutButton;
