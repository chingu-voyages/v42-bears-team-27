import { createContext } from 'react';

import type { IUserCredentials, IUserData } from '../../interfaces';

export interface IAuthContext {
  user: IUserData | null;
  isLoggedIn: boolean;
  jsonToken: string | null;
  onLogin: (
    userCredentials: IUserCredentials,
    userRole: 'student' | 'teacher',
  ) => Promise<string>;
  onLogout: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);
