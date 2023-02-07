import { useContext } from 'react';
// import useSWR from 'swr';
// import { MdAdd } from 'react-icons/md';

// import { fetcher } from 'src/services';
import { Button } from 'src/components/ui';
import type { IStudent } from 'src/interfaces';
import { AuthContext } from 'src/store/auth';

type Props = {
  setForm: (form: string) => void;
  student?: IStudent | null;
};

const StudentProfileModal: React.FC<Props> = ({ setForm, student }) => {
  const authCtx = useContext(AuthContext);

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
        gap: '2em',
      }}
    >
      <p>Time Spent</p>
      <p>Points Achieved</p>
      <p>{JSON.stringify(student?.tasks)}</p>

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
