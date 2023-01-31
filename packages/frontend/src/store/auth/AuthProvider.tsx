import { useState, useMemo } from 'react';

import type { IUserCredentials, IUserData } from 'interfaces';
import { AuthContext, type IAuthContext } from './auth-context';

type Props = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const signupHandler = async (userCredentials: any) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/teacher/create`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials),
      },
    );

    if (!res.ok) {
      return 'Error: Failed to signup!';
    }

    const { ...userData }: any = await res.json();

    setUser({ role: 'teacher', ...userData });
    setIsLoggedIn(true);

    return 'Success: Signed up!';
  };

  const loginHandler = async (
    userCredentials: IUserCredentials,
    userRole: 'student' | 'teacher',
  ) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/auth/${userRole}`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials),
      },
    );

    if (!res.ok) {
      return 'Error: Failed to login!';
    }

    const { ...userData }: any = await res.json();

    setUser({ role: userRole, ...userData });
    setIsLoggedIn(true);

    return 'Success: Logged in!';
  };

  const logoutHandler = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/auth/logout`,
      {
        method: 'GET',
        credentials: 'include',
      },
    );

    if (!res.ok) {
      return 'Error: Server error!';
    }

    setUser(null);
    setIsLoggedIn(false);

    return 'Success: Logged Out!';
  };

  const authContext: IAuthContext = useMemo(
    () => ({
      user,
      isLoggedIn,
      onSignup: signupHandler,
      onLogin: loginHandler,
      onLogout: logoutHandler,
    }),
    [user, isLoggedIn],
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
