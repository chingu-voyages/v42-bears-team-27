import { useState, useMemo } from 'react';

import type { IUserCredentials, IUserData } from '../../interfaces';
import { AuthContext, type IAuthContext } from './auth-context';

type Props = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jsonToken, setJSONToken] = useState<string | null>(null);

  const signupHandler = async (userCredentials: any) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/teacher/create`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials),
      },
    );

    if (!res.ok) {
      return 'Error: Failed to signup!';
    }

    const { token, ...userData }: any = await res.json();

    setUser({ role: 'teacher', ...userData });
    setIsLoggedIn(true);
    setJSONToken(token);

    return 'Success: Signed up!';
  };

  const loginHandler = async (
    userCredentials: IUserCredentials,
    userRole: 'student' | 'teacher',
  ) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/${userRole}/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials),
      },
    );

    if (!res.ok) {
      return 'Error: Failed to login!';
    }

    const { token, ...userData }: any = await res.json();

    setUser({ role: userRole, ...userData });
    setIsLoggedIn(true);
    setJSONToken(token);

    return 'Success: Logged in!';
  };

  const logoutHandler = () => {
    setUser(null);
    setIsLoggedIn(false);
    setJSONToken(null);
  };

  const authContext: IAuthContext = useMemo(
    () => ({
      user,
      isLoggedIn,
      jsonToken,
      onSignup: signupHandler,
      onLogin: loginHandler,
      onLogout: logoutHandler,
    }),
    [user, isLoggedIn, jsonToken],
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
