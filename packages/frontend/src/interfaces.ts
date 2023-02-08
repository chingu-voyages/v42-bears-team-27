type ID = string;
type TaskType = 'lesson' | 'exercise';

export interface IUserCredentials {
  email: string;
  password: string;
}

export interface INewTeacherCredentials {
  title: string;
  forename: string;
  surname: string;
  email: string;
  password: string;
}

export interface INewStudentCredentials {
  forename: string;
  surname: string;
  email: string;
}

export interface ITeacher {
  _id: ID;
  title: string;
  forename: string;
  surname: string;
}

export interface IStudent {
  _id: ID;
  forename: string;
  surname: string;
  inbox: {
    messageID: ID;
    hasBeenRead: boolean;
  }[];
  tasks: IStudentTask[];
}

export interface IStudentTask {
  taskID: ID;
  completed: boolean;
  event: ID | IEvent;
}

export interface ITask {
  _id: ID;
  event: ID;
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
  teacher: ITeacher;
  students: IStudent[];
  subjects: ID[];
  events: ID[];
}
