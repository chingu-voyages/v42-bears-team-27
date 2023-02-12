import { useContext, useMemo } from 'react';
import useSWR from 'swr';
import stc from 'string-to-color';

import Loader from 'src/components/common/Loader';
import { Button } from 'src/components/ui';
import type { IStudent, IStudentProfile } from 'src/interfaces';
import { AuthContext } from 'src/store/auth';
import { fetcher } from 'src/services';

type Props = {
  setForm: (form: string) => void;
  student?: IStudent | null;
};

const StudentProfileModal: React.FC<Props> = ({ setForm, student }) => {
  const authCtx = useContext(AuthContext);
  const { data: studentData, isLoading } = useSWR<IStudentProfile>(
    `/api/v0/student/profile/${student?._id}`,
    fetcher,
  );

  const totalTime = useMemo(
    () =>
      studentData && JSON.stringify(studentData?.timeSpent) !== '{}'
        ? Object.values(studentData.timeSpent).reduce((a, b) => b + a)
        : 1,
    [studentData],
  );
  const totalPoints = useMemo(
    () =>
      studentData && JSON.stringify(studentData?.points) !== '{}'
        ? Object.values(studentData.points).reduce((a, b) => b + a)
        : 1,
    [studentData],
  );

  if (isLoading) {
    return <Loader>Loading Profile...</Loader>;
  }

  return (
    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p sx={{ variant: 'text.h4', mt: 4 }}>Time Spent</p>
      <div
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: 500,
          height: 60,
          border: '2px solid #32a1ce',
          borderRadius: '5px',
        }}
      >
        {studentData &&
          Object.keys(studentData.timeSpent).map((el) => (
            <div
              key={el}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: stc(el),
                color: 'white',
                width: `${
                  (100 * studentData.timeSpent[el as keyof IStudentProfile]) /
                  totalTime
                }%`,
              }}
            >
              {el}
            </div>
          ))}
      </div>
      <p sx={{ variant: 'text.h4', mt: 5 }}>Points Achieved</p>
      <div
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: 500,
          height: 60,
          border: '2px solid #32a1ce',
          borderRadius: '5px',
          mb: 6,
        }}
      >
        {studentData &&
          Object.keys(studentData.points).map((el) => (
            <div
              key={el}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: stc(el),
                color: 'white',
                width: `${
                  (100 * studentData.points[el as keyof IStudentProfile]) /
                  totalPoints
                }%`,
              }}
            >
              {el}
            </div>
          ))}
      </div>

      {authCtx?.role === 'teacher' && (
        <Button
          onClick={() => setForm('directMessage')}
          variant="outlined"
          autoFocus
        >
          Send Message
        </Button>
      )}
    </div>
  );
};

export default StudentProfileModal;
