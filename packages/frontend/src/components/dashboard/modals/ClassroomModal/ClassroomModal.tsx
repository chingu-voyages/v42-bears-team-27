import { useContext, useState } from 'react';
import { MdAdd } from 'react-icons/md';

import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  IconButton,
} from 'src/components/ui';
import type { INewStudentCredentials, ITeacher } from 'src/interfaces';
import { AuthContext } from 'src/store/auth';
import { postCreateNewStudent } from 'src/services/student';
import NewStudentForm from './NewStudentForm';

const ClassroomModal: React.FC = () => {
  const authCtx = useContext(AuthContext);

  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [alert, setAlert] = useState<string | null>(null);

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

  if (!authCtx) {
    return (
      <p
        sx={{
          variant: 'text.h3',
          position: 'absolute',
          top: '40%',
          left: '50%',
          translate: '-50% -50%',
        }}
      >
        Loading Classroom...
      </p>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outlined">View Classroom</Button>
      </DialogTrigger>
      <DialogContent
        title={showAddStudentForm ? 'Invite a Student' : 'Classroom'}
        width="95%"
        height="90vh"
      >
        <div sx={{ color: 'primary', textAlign: 'center' }}>
          {showAddStudentForm ? (
            <NewStudentForm
              error={error}
              onSubmit={registerNewStudentHandler}
            />
          ) : (
            <>
              <div>
                <p sx={{ variant: 'text.h3', mt: 0, mb: 2 }}>Teacher</p>
                <div
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      sx={{
                        width: 64,
                        height: 64,
                        p: 3,
                        bg: 'gray',
                        borderRadius: '50%',
                      }}
                    />
                    <p sx={{ variant: 'text.h4' }}>{`${
                      (authCtx.user as ITeacher).title
                    }.${(authCtx.user as ITeacher).fullName
                      .split(',')[1]
                      .trim()}`}</p>
                  </div>
                </div>
              </div>
              <div>
                <p sx={{ variant: 'text.h3', mt: 1, mb: 3 }}>Students</p>
                <div
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    columnGap: 3,
                  }}
                >
                  <IconButton onClick={() => setShowAddStudentForm(true)}>
                    <MdAdd size={32} />
                  </IconButton>
                </div>
              </div>
            </>
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
