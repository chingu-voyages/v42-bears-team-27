import { createContext } from 'react';

import type {
  ITeacherCrendentials,
  IStudentCrendentials,
} from '../../interfaces';

type UserCredentials = ITeacherCrendentials | IStudentCrendentials;

export interface IAuthContext {
  user: UserCredentials | null;
  isLoggedIn: boolean;
  onLogin: (userCredentials: UserCredentials) => void;
  onLogout: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);
