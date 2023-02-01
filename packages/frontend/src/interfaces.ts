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
  id: ID;
  title: string;
  fullName: string;
}

export interface IStudent {
  id: ID;
  fullName: string;
  tasks: number;
}

export interface ITask {
  id: ID;
  type: TaskType;
  subject: string;
  topic: string;
}

export interface IEvent {
  id: ID;
  dueDate: string;
  setAt: string;
  tasks: ITask[];
}

export interface ITopic {
  id: ID;
  slug: string;
  title: string;
  types: TaskType[];
}

export interface ISubject {
  id: ID;
  title: string;
  topics: ITopic[];
}

export interface IClassroom {
  id: ID;
  name: string;
  teacher: ID;
  students: ID[];
  subjects: ID[];
  events: ID[];
}
