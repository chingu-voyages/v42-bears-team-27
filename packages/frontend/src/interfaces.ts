type ID = string;
type TaskType = 'lesson' | 'exercise' | 'test';

export interface IUserCredentials {
  email: string;
  password: string;
}

export interface INewTeacherCredentials {
  title: string;
  fullName: string;
  email: string;
  password: string;
}

export interface INewStudentCredentials {
  fullName: string;
  email: string;
}

export interface ITeacher {
  _id: ID;
  title: string;
  fullName: string;
}

export interface IStudent {
  _id: ID;
  fullName: string;
  tasks: number;
}

export interface ITask {
  _id: ID;
  type: TaskType;
  subject: string;
  topic: string;
}

export interface IEvent {
  _id: ID;
  dueDate: string;
  setAt: string;
  tasks: ITask[];
}

export interface ITopic {
  _id: ID;
  slug: string;
  title: string;
  types: TaskType[];
}

export interface ISubject {
  _id: ID;
  title: string;
  topics: ITopic[];
}

export interface IClassroom {
  _id: ID;
  name: string;
  teacher: ID;
  students: ID[];
  subjects: ID[];
  events: ID[];
}
