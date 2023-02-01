import { createContext } from 'react';

import type {
  INewTeacherCredentials,
  IUserCredentials,
  IUserData,
} from 'src/interfaces';

export type UserRole = 'student' | 'teacher';

export interface IAuthContext {
  user: IUserData | null;
  role: UserRole | null;
  isLoggedIn: boolean;
  onSignup: (teacherCredentials: INewTeacherCredentials) => Promise<string>;
  onLogin: (
    userCredentials: IUserCredentials,
    userRole: UserRole,
  ) => Promise<string>;
  onLogout: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);
