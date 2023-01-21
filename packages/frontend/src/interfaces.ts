// TODO: remove all instances of type import + interface itself
export interface ITeacherCredentials {
  username: string;
  password: string;
}
// TODO: remove all instances of type import + interface itself
export interface IStudentCredentials {
  email: string;
  password: string;
}

export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IUserData {
  role: 'student' | 'teacher';
  email: string;
  [key: string]: any;
}
