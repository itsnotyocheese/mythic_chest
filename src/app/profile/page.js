// app/dashboard/page.js
'use client';
import useAuth from '../hooks/useAuth';
import LogoutButton from './logout/page';

const DashboardPage = () => {
  const user = useAuth();

  if (!user) return null; // Prevents flashing of protected content before redirect

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <p>This is a protected dashboard page.</p>
      <LogoutButton />
    </div>
  );
};

export default DashboardPage;