import { useState, useMemo, useEffect } from 'react';

import type { IUserCredentials, IUserData } from 'interfaces';
import { AuthContext, type IAuthContext } from './auth-context';

type Props = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jsonToken, setJSONToken] = useState<string | null>(null);

  useEffect(() => {
    const sessionExpiration = localStorage.getItem('sessionExpiration');
    if (sessionExpiration && !isLoggedIn) {
      const expiration = Number(sessionExpiration);
      if (expiration < new Date().getTime()) {
        // logoutHandler();
      } else {
        // commented to be able to commit, not finished
        // const fetchData = async () => {
        // TODO make it work for teachers and students
        // -> API endpoint should return user data and decide if it is student or teacher depending of the data returned
        // return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/teacher`);
        // }
        // const res = fetchData();
        // TODO
        // setUser({ role: userRole, ...userData });
        // setIsLoggedIn(true);
      }
    }
  }, [isLoggedIn]);

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

    const { token, ...userData }: any = await res.json();

    setUser({ role: 'teacher', ...userData });
    setIsLoggedIn(true);
    // setJSONToken(token);
    localStorage.setItem('sessionExpiration', (Date.now() + 864000).toString());

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

    const { token, ...userData }: any = await res.json();

    setUser({ role: userRole, ...userData });
    setIsLoggedIn(true);
    // setJSONToken(token);
    localStorage.setItem('sessionExpiration', (Date.now() + 864000).toString()); // 10 days

    return 'Success: Logged in!';
  };

  const logoutHandler = () => {
    setUser(null);
    setIsLoggedIn(false);
    setJSONToken(null);
    // setJSONToken(token);
    localStorage.removeItem('sessionExpiration');
    // TODO fetch GET (http://localhost:5000/api/v0/logout) to remove cookie
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
