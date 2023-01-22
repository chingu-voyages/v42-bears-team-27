export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IUserData {
  role: 'student' | 'teacher';
  [key: string]: any;
}
