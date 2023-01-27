type TaskType = 'lesson' | 'exercise' | 'test';

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
  type: TaskType;
  subject: string;
  topic: string;
  sourceUrl: string;
}

export interface IEvent {
  isSchedule: boolean;
  dueDate: string;
  tasks: ITask[];
  setAt: string;
}

export interface IStudent {
  fullName: string;
  tasks: number;
}

export interface IType {
  id: string | number;
  title: TaskType;
  url: string;
}

export interface ITopic {
  title: string;
  types: IType[];
}

export interface ISubject {
  id: string | number;
  title: string;
  topics: ITopic[];
}

export interface IClassroom {
  name: string;
  students: IStudent[];
  subjects: ISubject[];
  events: IEvent[];
  [key: string]: any;
}
