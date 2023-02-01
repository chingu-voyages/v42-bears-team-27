import { useState, useMemo } from 'react';

import type { INewTeacherCredentials, IUserCredentials } from 'src/interfaces';
import {
  postCreateNewTeacher,
  postLoginExistingUser,
  postLogoutExistingUser,
} from 'src/services';
import type { IAuthContext, User, UserRole } from './auth-context';
import { AuthContext } from './auth-context';

type Props = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const signupTeacherHandler = async (
    teacherCredentials: INewTeacherCredentials,
  ) => {
    try {
      const teacherData = await postCreateNewTeacher(teacherCredentials);
      setUser({ ...teacherData });
      setRole('teacher');
      setIsLoggedIn(true);
    } catch (err) {
      if (err instanceof Error) {
        return err.message;
      }

      return `Unexpected error ${err}`;
    }

    return 'Success: Signed up!';
  };

  const loginHandler = async (
    userCredentials: IUserCredentials,
    userRole: UserRole,
  ) => {
    try {
      const userData = await postLoginExistingUser(userCredentials, userRole);
      setUser({ ...userData });
      setRole(userRole);
      setIsLoggedIn(true);
    } catch (err) {
      if (err instanceof Error) {
        return err.message;
      }

      return `Unexpected error ${err}`;
    }

    return 'Success: Logged in!';
  };

  const logoutHandler = async () => {
    // NOTE: Can add feedback whether or not logout wsa successful
    await postLogoutExistingUser();
    setUser(null);
    setRole(null);
    setIsLoggedIn(false);
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
