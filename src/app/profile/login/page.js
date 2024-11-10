// app/profile/login/page.js
import Link from 'next/link';
import FirebaseAuthUI from '../../components/FirebaseAuthUI';

const LoginPage = () => {
  return (
    <div style={styles.container}>
      <h1>Login</h1>
      <FirebaseAuthUI />
      <p>
        Don’t have an account? <Link href="/profile/signup">Sign up here</Link>.
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

export default LoginPage;
