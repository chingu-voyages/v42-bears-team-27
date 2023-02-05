import { useContext, useState } from 'react';
import useSWR from 'swr';
import { MdAdd } from 'react-icons/md';

import { fetcher } from 'src/services';
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  IconButton,
} from 'src/components/ui';
import type {
  INewStudentCredentials,
  ITeacher,
  IClassroom,
} from 'src/interfaces';
import { AuthContext } from 'src/store/auth';
import { postCreateNewStudent } from 'src/services/student';
import { extractStringInitials } from 'src/utils';
import NewStudentForm from './NewStudentForm';

const ClassroomModal: React.FC = () => {
  const authCtx = useContext(AuthContext);

  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [alert, setAlert] = useState<string | null>(null);

  const { data } = useSWR<IClassroom>('/api/v0/classroom', fetcher);
  const studentsData = data?.students;

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
        <Button onClick={() => setShowAddStudentForm(false)} variant="outlined">
          View Classroom
        </Button>
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
                    <Avatar
                      width={64}
                      height={64}
                      alt={extractStringInitials(
                        (authCtx.user as ITeacher).fullName,
                      )}
                    />
                    {/* Bug with "no comma name" fullName */}
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
                    flexWrap: 'wrap',
                  }}
                >
                  {studentsData &&
                    studentsData.map((student) => (
                      <div
                        key={student._id}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Avatar
                          width={64}
                          height={64}
                          alt={extractStringInitials(student.fullName)}
                        />
                        <p sx={{ variant: 'text.h4' }}>{student.fullName}</p>
                      </div>
                    ))}
                  <div
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Avatar
                      width={64}
                      height={64}
                      alt={extractStringInitials('Homer Simpson')}
                    />
                    <p sx={{ variant: 'text.h4' }}>Homer Simpson</p>
                  </div>
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
                    >
                      <IconButton onClick={() => setShowAddStudentForm(true)}>
                        <MdAdd sx={{ color: 'primary' }} size={32} />
                      </IconButton>
                    </div>
                    <p sx={{ variant: 'text.h4' }}>&nbsp;</p>
                  </div>
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
