export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IUserData {
  role: 'student' | 'teacher';
  [key: string]: any;
}

export interface ITask {
  id: string | number;
  type: 'lesson' | 'exercise' | 'test';
  subject: string;
  topic: string;
}

export interface IEvent {
  type: 'one-time' | 'schedule';
  createdAt: Date;
  dueDate: Date;
  tasks: ITask[];
}

export interface IClassroomData {
  events: IEvent[];
  [key: string]: any;
}
