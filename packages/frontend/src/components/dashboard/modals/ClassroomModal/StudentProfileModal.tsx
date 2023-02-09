import { useContext, useMemo } from 'react';
import useSWR from 'swr';
import stc from 'string-to-color';

import { fetcher } from 'src/services';
import type { IStudent, IStudentProfile } from 'src/interfaces';
import { Button } from 'src/components/ui';
import { AuthContext } from 'src/store/auth';

type Props = {
  setForm: (form: string) => void;
  student?: IStudent | null;
};

const StudentProfileModal: React.FC<Props> = ({ setForm, student }) => {
  const authCtx = useContext(AuthContext);
  const { data } = useSWR<IStudentProfile>(
    `/api/v0/student/profile/${student?._id}`,
    fetcher,
  );

  const totalTime = useMemo(
    () =>
      data && JSON.stringify(data?.timeSpent) !== '{}'
        ? Object.values(data.timeSpent).reduce((a, b) => b + a)
        : 1,
    [data],
  );
  const totalPoints = useMemo(
    () =>
      data && JSON.stringify(data?.points) !== '{}'
        ? Object.values(data.points).reduce((a, b) => b + a)
        : 1,
    [data],
  );

  if (!authCtx || !student) {
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
        Loading Profile...
      </p>
    );
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
        {data &&
          Object.keys(data.timeSpent).map((el) => (
            <div
              key={el}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: stc(el),
                color: 'white',
                width: `${
                  (100 * data.timeSpent[el as keyof IStudentProfile]) /
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
        {data &&
          Object.keys(data.points).map((el) => (
            <div
              key={el}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: stc(el),
                color: 'white',
                width: `${
                  (100 * data.points[el as keyof IStudentProfile]) / totalPoints
                }%`,
              }}
            >
              {el}
            </div>
          ))}
      </div>

      {authCtx.role === 'teacher' && (
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
