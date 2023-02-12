import { useState, useEffect } from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
} from 'src/components/ui';
import type {
  INewStudentCredentials,
  IStudent,
  IDirectMessageStudent,
} from 'src/interfaces';
import { postCreateNewStudent, postDirectMessageToStudent } from 'src/services';
import NewStudentForm from './NewStudentForm';
import StudentProfileModal from './StudentProfileModal';
import DirectMessageModal from './DirectMessageModal';
import TeacherClasroomView from './TeacherClasroomView';

const ClassroomModal: React.FC = () => {
  const [showForm, setShowForm] = useState('');
  const [selectStudent, setSelectStudent] = useState<IStudent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [alert, setAlert] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setAlert(null), 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [alert]);

  useEffect(() => {
    const timer = setTimeout(() => setError(null), 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  const registerNewStudentHandler = async (
    newStudent: INewStudentCredentials,
  ) => {
    try {
      // Submit form data
      const msg = await postCreateNewStudent(newStudent);
      // Update alert with api response message
      setAlert(msg);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }

      setError(`Unexpected error ${err}`);
    }
  };

  const sendMessageToStudentHandler = async (
    newMessage: IDirectMessageStudent,
  ) => {
    try {
      // Send message to student from teacher
      const msg = await postDirectMessageToStudent(newMessage);
      // Update alert with api response message
      setAlert(msg);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }

      setError(`Unexpected error ${err}`);
    }
  };

  const modalTitle = () => {
    switch (showForm) {
      case 'newStudent':
        return 'Invite a Student';
      case 'studentProfile':
        return `${selectStudent?.forename} ${selectStudent?.surname}`;
      case 'directMessage':
        return `Send a message to ${selectStudent?.forename} ${selectStudent?.surname}`;
      default:
        return 'Classroom';
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setShowForm('');
            setError(null);
            setAlert(null);
          }}
          variant="outlined"
        >
          View Classroom
        </Button>
      </DialogTrigger>
      <DialogContent title={modalTitle()} width="95%" height="90vh">
        <div
          sx={{
            color: 'primary',
            textAlign: 'center',
            variant: 'text.label',
          }}
        >
          {showForm === 'newStudent' && (
            <NewStudentForm
              error={error}
              onSubmit={registerNewStudentHandler}
            />
          )}
          {showForm === 'studentProfile' && (
            <StudentProfileModal
              setForm={setShowForm}
              student={selectStudent}
            />
          )}
          {showForm === 'directMessage' && (
            <DirectMessageModal
              student={selectStudent as IStudent}
              error={error}
              onSubmit={sendMessageToStudentHandler}
            />
          )}
          {showForm === '' && (
            <TeacherClasroomView
              onViewStudent={(student) => {
                setSelectStudent(student);
                setShowForm('studentProfile');
              }}
              onAddStudent={() => setShowForm('newStudent')}
            />
          )}
          {alert && (
            <p sx={{ variant: 'text.h4', color: 'info', textAlign: 'center' }}>
              {alert}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClassroomModal;
