import { useState, useMemo } from 'react';

import type {
  ITeacherCredentials,
  IStudentCredentials,
} from '../../interfaces';
import { AuthContext, type IAuthContext } from './AuthContext';

type UserCredentials = ITeacherCredentials | IStudentCredentials;

type Props = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<UserCredentials | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (userCredentials: UserCredentials) => {
    setUser(userCredentials);
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const authContext: IAuthContext = useMemo(
    () => ({
      user,
      isLoggedIn,
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
