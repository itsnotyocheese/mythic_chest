// app/profile/signup/page.js
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebaseConfig';
import FirebaseAuthUI from '../../components/FirebaseAuthUI';

const SignUpPage = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/profile');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div style={styles.container}>
      <h1>Sign Up</h1>
      <p>Create an account to get started!</p>
      <FirebaseAuthUI />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
  },
};

export default SignUpPage;
