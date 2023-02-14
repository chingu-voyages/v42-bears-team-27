import { useContext } from 'react';
import useSWRImmutable from 'swr/immutable';
import { MdAdd } from 'react-icons/md';

import Loader from 'src/components/common/Loader';
import { Avatar, IconButton } from 'src/components/ui';
import type { IClassroom, IStudent } from 'src/interfaces';
import { AuthContext } from 'src/store/auth';
import { fetcher } from 'src/services';
import { extractStringInitials } from 'src/utils';

type Props = {
  onAddStudent: () => void;
  onViewStudent: (student: IStudent) => void;
};

const TeacherClasroomView: React.FC<Props> = ({
  onAddStudent,
  onViewStudent,
}) => {
  const authCtx = useContext(AuthContext);

  const { data: classroomData, isLoading } = useSWRImmutable<IClassroom>(
    '/api/v0/classroom',
    fetcher,
  );

  if (isLoading) {
    return <Loader>Loading...</Loader>;
  }

  const studentsData = classroomData?.students;

  return (
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
          {classroomData?.teacher && (
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
                alt={extractStringInitials(classroomData.teacher.forename)}
              />
              <p
                sx={{ variant: 'text.h4' }}
              >{`${classroomData.teacher.forename} ${classroomData.teacher.surname}`}</p>
            </div>
          )}
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
              <button
                key={student._id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  WebkitAppearance: 'none',
                  borderRadius: 0,
                  textAlign: 'inherit',
                  background: 'none',
                  boxShadow: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  border: 'none',
                  color: 'inherit',
                  font: 'inherit',
                }}
                type="button"
                onClick={() => onViewStudent(student)}
              >
                <Avatar
                  width={64}
                  height={64}
                  alt={extractStringInitials(student.forename)}
                />
                <p sx={{ variant: 'text.h4' }}>{student.forename}</p>
              </button>
            ))}
          {authCtx?.role === 'teacher' && (
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
                <IconButton
                  aria-label="Invite student to classroom"
                  onClick={onAddStudent}
                >
                  <MdAdd sx={{ color: 'primary' }} size={32} />
                </IconButton>
              </div>
              <p sx={{ variant: 'text.h4' }}>&nbsp;</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TeacherClasroomView;
