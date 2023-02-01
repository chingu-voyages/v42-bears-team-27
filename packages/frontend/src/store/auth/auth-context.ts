import { createContext } from 'react';

import type {
  INewTeacherCredentials,
  IStudent,
  ITeacher,
  IUserCredentials,
} from 'src/interfaces';

export type User = ITeacher | IStudent;
export type UserRole = 'student' | 'teacher';

export interface IAuthContext {
  user: User | null;
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
