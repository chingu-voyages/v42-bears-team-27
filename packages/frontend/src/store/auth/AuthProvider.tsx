import { useState, useMemo } from 'react';

import type {
  ITeacherCrendentials,
  IStudentCrendentials,
} from '../../interfaces';
import { AuthContext, type IAuthContext } from './AuthContext';

type UserCredentials = ITeacherCrendentials | IStudentCrendentials;

type Props = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<UserCredentials | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (userCrendetials: UserCredentials) => {
    setUser(userCrendetials);
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
