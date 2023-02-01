import { useState, useMemo } from 'react';

import type {
  INewTeacherCredentials,
  IUserCredentials,
  IUserData,
} from 'src/interfaces';
import type { IAuthContext, UserRole } from './auth-context';
import { AuthContext } from './auth-context';

type Props = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUserData | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const signupTeacherHandler = async (
    teacherCredentials: INewTeacherCredentials,
  ) => {
    // TODO: Delegate logic to services
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/teacher/create`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teacherCredentials),
      },
    );

    if (!res.ok) {
      return 'Error: Failed to signup!';
    }

    const teacherData = await res.json();

    setUser({ ...teacherData });
    setRole('teacher');
    setIsLoggedIn(true);

    return 'Success: Signed up!';
  };

  const loginHandler = async (
    userCredentials: IUserCredentials,
    userRole: UserRole,
  ) => {
    // TODO: Delegate logic to services
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

    const userData = await res.json();

    setUser({ ...userData });
    setRole(userRole);
    setIsLoggedIn(true);

    return 'Success: Logged in!';
  };

  const logoutHandler = async () => {
    // TODO: Delegate logic to services
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
    setRole(null);
    setIsLoggedIn(false);

    return 'Success: Logged Out!';
  };

  const authContext: IAuthContext = useMemo(
    () => ({
      user,
      role,
      isLoggedIn,
      onSignup: signupTeacherHandler,
      onLogin: loginHandler,
      onLogout: logoutHandler,
    }),
    [isLoggedIn, role, user],
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
