import { useContext } from 'react';
// import useSWR from 'swr';
import stc from 'string-to-color';

// import { fetcher } from 'src/services';
import type { IStudent } from 'src/interfaces';
import { Button } from 'src/components/ui';
import { AuthContext } from 'src/store/auth';

type Props = {
  setForm: (form: string) => void;
  student?: IStudent | null;
};

interface IMockProfile {
  _id: string;
  timeSpent: {
    [key: string]: number;
  };
  points: {
    [key: string]: number;
  };
}
const mockProfile: IMockProfile = {
  _id: '4a1658s45s634x65f465',
  timeSpent: {
    Mathematics: 1300000,
    Geography: 500000,
  },
  points: {
    Mathematics: 24,
    Geography: 12,
  },
};
const totalTime = Object.values(mockProfile.timeSpent).reduce((a, b) => b + a);
const totalPoints = Object.values(mockProfile.points).reduce((a, b) => b + a);

const StudentProfileModal: React.FC<Props> = ({ setForm, student }) => {
  const authCtx = useContext(AuthContext);
  // const { data } = useSWR<IClassroom>(`/api/v0/student/profile/${student?._id}`, fetcher);

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
        {mockProfile &&
          Object.keys(mockProfile.points).map((el) => (
            <div
              key={el}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: stc(el),
                color: 'white',
                width: `${
                  (100 * mockProfile.points[el as keyof IMockProfile]) /
                  totalPoints
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
        {mockProfile &&
          Object.keys(mockProfile.timeSpent).map((el) => (
            <div
              key={el}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: stc(el),
                color: 'white',
                width: `${
                  (100 * mockProfile.timeSpent[el as keyof IMockProfile]) /
                  totalTime
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
