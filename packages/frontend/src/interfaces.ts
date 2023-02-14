type ID = string;
type TaskRef = 'Lesson' | 'Exercise';

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

export interface IDirectMessageStudent {
  studentID: ID;
  messageHeader: string;
  messageBody: string;
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

export interface IStudentProfile {
  _id: ID;
  timeSpent: {
    [key: string]: number;
  };
  points: {
    [key: string]: number;
  };
}

export interface IExerciseContent {
  _id: ID;
  page: {
    _id: ID;
    questions: {
      _id: ID;
      prompt: string;
      answer: string;
    }[];
  };
}

export interface IExercise {
  topic: string;
  subject: ID | ISubject;
  content: IExerciseContent;
}

export interface IEventTask {
  _id: ID;
  event: ID | IEvent;
  assignment: ID | ILesson | IExercise;
  assignmentModel: TaskRef;
}

export interface IEvent {
  _id: ID;
  dueDate: string;
  setAt: string;
  tasks: IEventTask[];
}

export interface ITopicType {
  _id: ID;
  material: ID | ILesson | IExercise;
  materialModel: TaskRef;
}

export interface ILessonContent {
  _id: ID;
  pages: {
    _id: ID;
    headline: string;
    text: string;
  }[];
}

export interface ILesson {
  topic: string;
  subject: ID | ISubject;
  content: ILessonContent;
}

export interface ITopic {
  _id: ID;
  slug: string;
  title: string;
  types: (ID | ITopicType)[];
}

export interface ISubject {
  _id: ID;
  slug: string;
  title: string;
  imageUrl: string;
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

export interface IMessageData {
  _id: ID;
  messageID: ID;
  messageHeader: string;
  messageBody: string;
  hasBeenRead: boolean;
}
