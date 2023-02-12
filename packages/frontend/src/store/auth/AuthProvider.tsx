import { useMemo } from 'react';

import type { INewTeacherCredentials, IUserCredentials } from 'src/interfaces';
import { useLocalstorageState } from 'src/hooks';
import {
  postCreateNewTeacher,
  postLoginExistingUser,
  logoutExistingUser,
} from 'src/services';
import type { IAuthContext, User, UserRole } from './auth-context';
import { AuthContext } from './auth-context';

type Props = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useLocalstorageState<User | null>(
    'app:user-data',
    null,
  );
  const [role, setRole] = useLocalstorageState<UserRole | null>(
    'app:user-role',
    null,
  );
  const [isLoggedIn, setIsLoggedIn] = useLocalstorageState(
    'app:logged-in',
    false,
  );

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
    await logoutExistingUser();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoggedIn, role, user],
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
