import { createContext } from 'react';

import type {
  ITeacherCredentials,
  IStudentCredentials,
} from '../../interfaces';

type UserCredentials = ITeacherCredentials | IStudentCredentials;

export interface IAuthContext {
  user: UserCredentials | null;
  isLoggedIn: boolean;
  onLogin: (userCredentials: UserCredentials) => void;
  onLogout: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);
